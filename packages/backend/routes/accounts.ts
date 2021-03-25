import {User} from "../schemas/user";

const express = require('express');
import passport from 'passport';
import {CreateAccountModel} from "../../public/models/account/create-account-model";
import {UserModel} from "../../public/models/account/user-model";
import {LoginModel} from "../../public/models/account/login-model";
import {isAuthenticatedGuard} from "../util/guards";

export const accountRouter = express.Router();

accountRouter.post('/login', passport.authenticate('local'), (req, res) => {
    const body: LoginModel = req.body;
    res.status(200).json(<UserModel>{
        username: body.username
    });
});

accountRouter.get('/logout', ((req, res, next) => {
    req.logout();
    res.status(200).json({
       status: 'Successfully logged out'
    });
}));

accountRouter.post('/register', (req, res, err) => {
    const body: CreateAccountModel = req.body;
    User.register({username: body.username}, body.password).then(user => {
        res.status(200).json(<UserModel>{
            username: user.username
        });
    }).catch(err => {
        res.status(400).json(err);
    });
});

accountRouter.get('/checkauth', isAuthenticatedGuard, ((req, res, next) => {
    res.status(200).json({
        username: req.user.username
    });
}));