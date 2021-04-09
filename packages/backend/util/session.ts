import session from "express-session";
import {Namespace} from "socket.io";
import passport from "passport";

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