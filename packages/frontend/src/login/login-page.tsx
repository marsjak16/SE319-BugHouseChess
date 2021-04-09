import React, {CSSProperties, ReactElement} from "react";
import {LoginModel} from "../../../public/models/account/login-model";
import _ from "lodash";
import {UserModel} from "../../../public/models/account/user-model";
import * as H from "history";

const formStyle: CSSProperties = {
    maxWidth: "350px"
}

export type LoginCallback = (login: LoginModel) => Promise<UserModel | undefined>

interface LoginPageProps {
    loginCallback: LoginCallback,
    history: H.History
}

interface LoginPageState {
    login: LoginModel
}

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {login: {username: "", password: ""}};
    }

    render(): ReactElement {
        return <div>
            <form className="mx-auto my-auto" style={formStyle}>
                <div></div>
                <div className="row my-2">
                    <label className="col-4" htmlFor="username">Username</label>
                    <input className="col-8"
                           name="username"
                           id="username"
                           type="text"
                           onChange={event => this.usernameUpdate(event.target.value)}
                           value={this.state.login.username}/>
                </div>
                <div className="row my-2">
                    <label className="col-4" htmlFor="password">Password</label>
                    <input className="col-8"
                           name="password"
                           id="password"
                           type="text"
                           onChange={event => this.passwordUpdate(event.target.value)}
                           value={this.state.login.password}/>
                </div>
                <div className="row my-2">
                    <input className="offset-4 col-4 btn btn-primary" type="button" value="Login" onClick={() => this.login()}/>
                    <input className="offset-1 col-3 btn btn-outline-primary" type="button" value="Register" onClick={() => this.props.history.push('/register')}/>
                </div>
            </form>
        </div>;
    }

    async login(): Promise<void> {
        const user = await this.props.loginCallback(this.state.login);

        if (user) {
            this.props.history.push('/');
        }
    }

    usernameUpdate(newUserName: string): void {
        const newState: LoginPageState = _.cloneDeep(this.state);
        newState.login.username = newUserName;
        this.setState(newState);
    }

    passwordUpdate(newPassword: string): void {
        const newState: LoginPageState = _.cloneDeep(this.state);
        newState.login.password = newPassword;
        this.setState(newState);
    }
}