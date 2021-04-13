import React, {CSSProperties, ReactElement} from "react";
import {LoginModel} from "../../../public/models/account/login-model";
import _ from "lodash";
import {UserModel} from "../../../public/models/account/user-model";
import {CreateAccountModel} from "../../../public/models/account/create-account-model";
import * as H from "history";

const formStyle: CSSProperties = {
    maxWidth: "350px"
};

export type RegisterCallback = (login: LoginModel) => Promise<UserModel | undefined>

interface RegisterPageProps  {
    registerCallback: RegisterCallback,
    history: H.History
}

interface RegisterPageState {
    create: CreateAccountModel
    username_valid: 'is-valid' | 'is-invalid' | '',
    username_error: String,
    password_valid: 'is-valid' | 'is-invalid' | ''
}

export class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {

    constructor(props: RegisterPageProps) {
        super(props);
        this.state = {
            create: {username: "", password: ""},
            username_valid: '',
            username_error: '',
            password_valid: ''
        };
    }

    render(): ReactElement {
        return <div>
            <form className="mx-auto my-auto register-form" style={formStyle} noValidate={true}>
                <div className="my-2 row">
                    <label className="col-4" htmlFor="username">Username</label>
                    <input className={"col-8 form-control " + this.state.username_valid}
                           name="username"
                           id="username"
                           type="text"
                           onChange={event => this.usernameUpdate(event.target.value)}
                           value={this.state.create.username}
                           required={true}/>
                    <div className="offset-4 invalid-feedback">
                        {this.state.username_error}
                    </div>
                </div>
                <div className="my-2 row">
                    <label className="col-4" htmlFor="password">Password</label>
                    <input className={"col-8 form-control " + this.state.password_valid}
                           name="password"
                           id="password"
                           type="text"
                           onChange={event => this.passwordUpdate(event.target.value)}
                           value={this.state.create.password}/>
                    <div className="offset-4 invalid-feedback">
                        Password field cannot be left blank.
                    </div>
                </div>
                <div className="my-2 row">
                    <input className="offset-4 col-4 btn btn-primary" type="button" value="Register" onClick={() => this.register()}/>
                </div>
            </form>
        </div>;
    }

    async register(): Promise<void> {
        if (this.state.create.password == "" || this.state.create.username == "") {
            const newState: RegisterPageState = _.cloneDeep(this.state);

            if (this.state.create.password == "") {
                newState.password_valid = 'is-invalid';
            }
            else {
                newState.password_valid = 'is-valid';
            }
            if (this.state.create.username == "") {
                newState.username_error = 'Username field cannot be left blank.';
                newState.username_valid = 'is-invalid';
            }
            else {
                newState.username_valid = 'is-valid';
            }
            this.setState(newState);
        }
        else {
            const user = await this.props.registerCallback(this.state.create);
            if (user) {
                this.props.history.push('/login');
            } else {
                const newState: RegisterPageState = _.cloneDeep(this.state);
                newState.username_error = 'This username is already taken.'
                newState.username_valid = 'is-invalid';
                this.setState(newState);
            }
        }
    }

    usernameUpdate(newUserName: string): void {
        const newState: RegisterPageState = _.cloneDeep(this.state);
        newState.create.username = newUserName;
        this.setState(newState);
    }

    passwordUpdate(newPassword: string): void {
        const newState: RegisterPageState = _.cloneDeep(this.state);
        newState.create.password = newPassword;
        this.setState(newState);
    }
}