import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import http from 'http';
import ip from 'ip';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import {accountRouter} from "./routes/accounts";
import {User} from "./schemas/user";
import bodyParser from "body-parser";
import {gameRouter} from "./routes/game";
import {sessionMiddleware} from "./util/session";

console.log('Initializing App');

// Connect to the Mongo Database
mongoose.connect('mongodb://localhost/bughouse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Add a test user
function addTestUser(username: string, password: string) {
    User.find({username: username}, (err: any, result) => {
        if (result.length == 0) {
            console.log(`Adding a test user with username: ${username} and password ${password}`);
            (User as any).register({username: username}, password);
        }
    });
}

addTestUser('test1', 'test');
addTestUser('test2', 'test');
addTestUser('test3', 'test');
addTestUser('test4', 'test');
addTestUser('test5', 'test');

// Setup the express HTTP endpoints
const app = express();
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Setup passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const server = http.createServer(app);

app.use('/account', accountRouter);
app.use('/game', gameRouter(server));

// Start the server
console.log('Starting Server');
server.listen('8080', () => {
    console.log(`Server started at ${ip.address()}:8080, localhost:8080, and ${ip.loopback()}:8080`)
});