import {Game} from "../models/game/game";
import {GameConfig, setupGame} from "./setup-game";

describe('SetupGame', () => {
   const players: string[] = ['test1', 'test2', 'test3', 'test4'];
   const config: GameConfig = {
      playerUsernames: players,
      gameId: '1',
      clockDuration: 5000
   };

   let game: Game;

   beforeEach(() => {
      game = setupGame(config);
   });

   it('should create game with specified players', () => {
      expect(game.playerUsernames.sort()).toEqual(config.playerUsernames.sort());
   });

   it('should create game with empty player pieces', () => {
      expect(game.player1Pieces).toEqual([]);
      expect(game.player2Pieces).toEqual([]);
      expect(game.player3Pieces).toEqual([]);
      expect(game.player4Pieces).toEqual([]);
   });

   it('should create game with specified duration', () => {
      expect(game.clockDuration).toEqual(config.clockDuration);
   });
});