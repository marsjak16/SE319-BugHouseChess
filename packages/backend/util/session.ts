import session from "express-session";
import {Namespace} from "socket.io";
import passport from "passport";
import {Socket} from "socket.io/dist/socket";
import {ExtendedError} from "socket.io/dist/namespace";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export const sessionMiddleware = session({
    name: 'express-session',
    secret: 'aasdl;gj',
    resave: false,
    saveUninitialized: false
});

export function setupNamespaceMiddleware(namespace: Namespace) {
    namespace.use((socket, next) => {
        // @ts-ignore
        sessionMiddleware(socket.request, {}, next);
    });
    namespace.use((socket, next) => {
        // @ts-ignore
        passport.initialize()(socket.request, {}, next);
    });
    namespace.use((socket, next) => {
        passport.session()(socket.request, {}, next);
    });
}

export type socketIoMiddleware = (socket: Socket<DefaultEventsMap, DefaultEventsMap>, next: (err?: ExtendedError) => void) => void;

export function testSocketSession(username: string): socketIoMiddleware {
    return (socket, next) => {
        (socket.request as any).session = {
            passport: {
                user: username
            }
        };

        next();
    };
}