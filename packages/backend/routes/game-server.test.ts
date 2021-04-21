import * as http from "http";
import {Namespace, Server} from "socket.io";
import io from 'socket.io-client';
import {AddressInfo} from "net";
import {GameServer} from "./game-server";
import {testSocketSession} from "../util/session";
import {AuthenticationResult} from "../../public/models/account/authentication-result";
import {Game} from "../../public/models/game/game";

describe('GameServer', () => {
   let server: http.Server;

   let serverSocket: Server;
   let serverGameNamespace: Namespace;
   let clientSocket: SocketIOClient.Socket;

   let gameServer: GameServer;

   beforeEach((done) => {
      server = http.createServer();
      server.listen(() => {
         serverSocket = new Server(server);
         serverGameNamespace = serverSocket.of('/game/1');

         clientSocket = io(`http://localhost:${(server.address() as AddressInfo).port}/game/1`, {
            autoConnect: false
         });

         gameServer = new GameServer({
            gameId: '1',
            playerUsernames: ['test1', 'test2', 'test3', 'test4'],
            clockDuration: 5000
         }, serverGameNamespace);

         done();
      });
   });

   afterEach(() => {
      clientSocket.close();
      serverSocket.close();
      server.close();
   });

   describe('with invalid user', () => {
      beforeEach(() => {
         serverGameNamespace.use(testSocketSession('test5'));
      });

      it('should send a failed auth message', (done) => {
         clientSocket.on('auth', (auth: AuthenticationResult) => {
            expect(auth.authenticated).toBe(false);

            done();
         });

         clientSocket.connect();
      });

      it('should drop connection', (done) => {
         clientSocket.on('disconnect', () => {
            done();
         });

         clientSocket.connect();
      });
   });

   describe('with valid user', () => {
      beforeEach(() => {
         serverGameNamespace.use(testSocketSession('test1'));
      });

      it('should send success authentication', (done) => {
         clientSocket.on('auth', (auth: AuthenticationResult) => {
            expect(auth.authenticated).toBe(true);

            done();
         });

         clientSocket.connect();
      });

      it('should send game state when connected ', (done) => {
         clientSocket.on('game', (game: Game) => {
            expect(game).toEqual(gameServer.game);
            done();
         });

         clientSocket.connect();
      });
   });
});