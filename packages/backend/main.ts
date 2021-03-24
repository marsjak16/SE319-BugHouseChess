import cookieParser from "cookie-parser";
import express from 'express';
import http from 'http';
import ip from 'ip';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import {accountRouter} from "./routes/accounts";
import {User} from "./schemas/user";
import bodyParser from "body-parser";

console.log('Initializing App');

// Connect to the Mongo Database
mongoose.connect('mongodb://localhost/bughouse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Add a test user
User.find({username: 'test'}, (err: any, result) => {
    if (result.length == 0) {
        console.log('Adding a test user');
        (User as any).register({username: 'test'}, 'test');
    }
});

// Setup the express HTTP endpoints
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'aasdl;gj', resave: true, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Setup passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/account', accountRouter);

// Start the server
console.log('Starting Server');
const server = http.createServer(app);
server.listen('8080', () => {
    console.log(`Server started at ${ip.address()}:8080, localhost:8080, and ${ip.loopback()}:8080`)
});