import React, {ReactElement} from "react";
import {UserModel} from "../../../public/models/account/user-model";
import {Link} from "react-router-dom";

interface HeaderProps {
    user?: UserModel
}

export class Header extends React.Component<HeaderProps> {
    render(): ReactElement {
        return <div className='row no-gutters mt-2'>
            <div className='h2 ml-4'>
                BugHouse Chess
            </div>
            <div className='ml-auto my-auto mr-5'>
                {this.props.user ? <div>Welcome {this.props.user?.username}</div> : <div>
                    <Link to='/login'>Login</Link>
                </div>}
            </div>
        </div>
    }
}