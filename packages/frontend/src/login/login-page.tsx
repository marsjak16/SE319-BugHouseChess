import React, {CSSProperties, ReactElement} from "react";

const formStyle: CSSProperties = {
    maxWidth: "350px"
}

export class LoginPage extends React.Component {

    render(): ReactElement {
        return <form style={formStyle}>
            <div className="my-2">
                <label className="col-4" htmlFor="username">Username</label>
                <input className="col-8" name="username" id="username" type="text"/>
            </div>
            <div className="my-2">
                <label htmlFor="password">Password</label>
                <input name="password" id="password" type="text"/>
            </div>
            <div className="my-2">
                <input className="btn btn-primary" type="button" value="Login" onClick={this.login}/>
            </div>
        </form>;
    }

    login(): void {

    }
}