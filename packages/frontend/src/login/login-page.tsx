import React, {CSSProperties, ReactElement} from "react";
import {LoginModel} from "../../../public/models/account/login-model";
import _ from "lodash";
import {UserModel} from "../../../public/models/account/user-model";

const formStyle: CSSProperties = {
    maxWidth: "350px"
}

export type LoginCallback = (login: LoginModel) => Promise<UserModel | undefined>

interface LoginPageProps {
    loginCallback: LoginCallback
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
            <div className="card">
                <div className="card-header">
                    Testing card headers
                </div>
                <div className="card-body">
                    This is some text within a card body
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                </div>
            </div>
            <form className="mx-auto my-auto" style={formStyle}>
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
            </form>
        </div>;
    }

    async login(): Promise<void> {
        const user = await this.props.loginCallback(this.state.login);
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