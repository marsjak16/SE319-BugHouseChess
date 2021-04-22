import React from 'react';
import {LoginCallback, LoginPage} from "./login-page";
import * as H from "history";
import {mock} from "jest-mock-extended";
import {create, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import {changeInput} from "../util/testing";
import {LoginModel} from "../../../public/models/account/login-model";
import {UserModel} from "../../../public/models/account/user-model";

jest.mock('history');

describe('Login Page', () => {
    let historyMock: H.History;
    let loginCallbackMock: LoginCallback & jest.Mock;
    let component: ReactTestRenderer;

    let usernameField: ReactTestInstance;
    let passwordField: ReactTestInstance;
    let loginButton: ReactTestInstance;

    beforeEach(() => {
        historyMock = mock<H.History>();
        loginCallbackMock = jest.fn();
        component = create(<LoginPage loginCallback={loginCallbackMock} history={historyMock}/>);

        usernameField = component.root.findByProps({name: 'username'});
        passwordField = component.root.findByProps({name: 'password'});
        loginButton = component.root.findByProps({value: 'Login'});
    });

    describe('with valid form', () => {
        const testLogin: LoginModel = {
            username: 'test1',
            password: 'test2'
        };

        const testUserModel: UserModel = {
            username: testLogin.username
        };

        beforeEach(() => {
            changeInput(usernameField, testLogin.username);
            changeInput(passwordField, testLogin.password);
        });

        it('should call callback when login is pressed', () => {
            loginButton.props.onClick();

            expect(loginCallbackMock).toHaveBeenCalledWith(testLogin);
        });

        it('should navigate to main page when login completes', async () => {
            loginCallbackMock.mockReturnValue(Promise.resolve(testUserModel));

            await loginButton.props.onClick();

            expect(historyMock.push).toHaveBeenCalledWith('/');
        });
    });
});