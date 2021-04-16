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
    login: LoginModel,
    valid_input: 'is-valid' | 'is-invalid' | '',
    password_valid: 'is-invalid' | '',
    username_valid: 'is-invalid' | ''
}

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            login: {username: "", password: ""},
            valid_input: '',
            password_valid: '',
            username_valid: ''
        };
    }

    render(): ReactElement {
        return <div>
            <form className="mx-auto my-auto" id="login-form" style={formStyle} noValidate={true}>
                <span id="error_message" style={{color:"red", visibility: this.isHidden()}}>
                    The username or password was incorrect
                </span>
                <div className="row my-2">
                    <label className="col-4" htmlFor="username">Username</label>
                    <input className={"col-8 form-control " + this.state.username_valid}
                           name="username"
                           id="username"
                           type="text"
                           onChange={event => this.usernameUpdate(event.target.value)}
                           value={this.state.login.username}
                           required={true}/>
                    <div className="offset-4 invalid-feedback">
                        Username field cannot be left blank.
                    </div>
                </div>
                <div className="row my-2">
                    <label className="col-4" htmlFor="password">Password</label>
                    <input className={"col-8 form-control " + this.state.password_valid}
                           name="password"
                           id="password"
                           type="text"
                           onChange={event => this.passwordUpdate(event.target.value)}
                           value={this.state.login.password}
                           required={true}/>
                    <div className="offset-4 invalid-feedback">
                        Password field cannot be left blank.
                    </div>
                </div>
                <div className="row my-2">
                    <input className="offset-4 col-4 btn btn-primary" type="button" value="Login" onClick={() => this.login()}/>
                    <input className="offset-1 col-3 btn btn-outline-primary" type="button" value="Register" onClick={() => this.props.history.push('/register')}/>
                </div>
            </form>
        </div>;
    }

    isHidden(): "hidden" | undefined {
        if (this.state.valid_input == "is-invalid") {
            return undefined;
        }
        return "hidden";
    }

    async login(): Promise<void> {
        if (this.state.login.password == "" || this.state.login.username == "") {
            const newState: LoginPageState = _.cloneDeep(this.state);

            if (this.state.login.password == "") {
                newState.password_valid = 'is-invalid';
            }
            else {
                newState.password_valid = '';
            }
            if (this.state.login.username == "") {
                newState.username_valid = 'is-invalid';
            }
            else {
                newState.username_valid = '';
            }
            this.setState(newState);
        }
        else {
            const user = await this.props.loginCallback(this.state.login);
            if (user) {
                this.props.history.push('/');
            } else {
                const newState: LoginPageState = _.cloneDeep(this.state);
                newState.valid_input = 'is-invalid';
                newState.username_valid = '';
                newState.password_valid = '';
                this.setState(newState);
            }
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