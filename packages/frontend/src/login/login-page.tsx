import React, {CSSProperties, ReactElement} from "react";
import {LoginModel} from "../../../public/models/account/login-model";
import _ from "lodash";
import {AuthenticationService} from "../service/AuthenticationService";

const formStyle: CSSProperties = {
    maxWidth: "350px"
}

interface LoginPageProps {
    authService: AuthenticationService
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
        return <form style={formStyle}>
            <div className="my-2">
                <label className="col-4" htmlFor="username">Username</label>
                <input className="col-8"
                       name="username"
                       id="username"
                       type="text"
                       onChange={event => this.usernameUpdate(event.target.value)}
                       value={this.state.login.username}/>
            </div>
            <div className="my-2">
                <label className="col-4" htmlFor="password">Password</label>
                <input className="col-8"
                       name="password"
                       id="password"
                       type="text"
                       onChange={event => this.passwordUpdate(event.target.value)}
                       value={this.state.login.password}/>
            </div>
            <div className="my-2">
                <input className="btn btn-primary" type="button" value="Login" onClick={() => this.login()}/>
            </div>
        </form>;
    }

    async login(): Promise<void> {
        const user = await this.props.authService.login(this.state.login);
        console.log(user);
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