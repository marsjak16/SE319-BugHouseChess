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
}

export class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {

    constructor(props: RegisterPageProps) {
        super(props);
        this.state = {create: {username: "", password: ""}};
    }

    render(): ReactElement {
        return <div>
            <form className="mx-auto my-auto" style={formStyle}>
                <div className="my-2 row">
                    <label className="col-4" htmlFor="username">Username</label>
                    <input className="col-8"
                           name="username"
                           id="username"
                           type="text"
                           onChange={event => this.usernameUpdate(event.target.value)}
                           value={this.state.create.username}/>
                </div>
                <div className="my-2 row">
                    <label className="col-4" htmlFor="password">Password</label>
                    <input className="col-8"
                           name="password"
                           id="password"
                           type="text"
                           onChange={event => this.passwordUpdate(event.target.value)}
                           value={this.state.create.password}/>
                </div>
                <div className="my-2 row">
                    <input className="offset-4 col-4 btn btn-primary" type="button" value="Register" onClick={() => this.register()}/>
                </div>
            </form>
        </div>;
    }

    async register(): Promise<void> {
        const user = await this.props.registerCallback(this.state.create);

        if (user) {
            this.props.history.push('/login');
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