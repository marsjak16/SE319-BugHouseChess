import React, {CSSProperties, ReactElement} from "react";
import {UserModel} from "../../../public/models/account/user-model";
import {Link} from "react-router-dom";
import * as H from "history";

export type logoutCallback = () => Promise<void>

interface HeaderProps {
    user?: UserModel,
    history: H.History,
    logoutCallback: logoutCallback
}

const HeaderStyle: CSSProperties = {
    color: "black"
};

export class Header extends React.Component<HeaderProps> {
    render(): ReactElement {
        return <div className='row no-gutters mt-2 mb-5'>
            <Link style={HeaderStyle} to='/game' className='h2 ml-4'>
                BugHouse Chess
            </Link>
            <div className='ml-auto my-auto mr-5'>
                {this.props.user ? <div className='row'>
                    <span className='my-auto'>Welcome {this.props.user?.username}!</span>
                    <button className='btn btn-link' onClick={() => this.logout()}>Logout</button>
                </div> : <div>
                    <Link to='/login'>Login</Link>
                </div>}
            </div>
        </div>
    }

    private async logout(): Promise<void> {
        await this.props.logoutCallback();

        this.props.history.push('/');
    }
}