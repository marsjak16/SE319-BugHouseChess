import session from "express-session";

export const sessionMiddleware = session({
    name: 'express-session',
    secret: 'aasdl;gj',
    resave: false,
    saveUninitialized: false
});