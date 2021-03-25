import React, {CSSProperties, ReactElement} from "react";
import {UserModel} from "../../../public/models/account/user-model";
import {Link} from "react-router-dom";

interface HeaderProps {
    user?: UserModel
}

const HeaderStyle: CSSProperties = {
    color: "black"
};

export class Header extends React.Component<HeaderProps> {
    render(): ReactElement {
        return <div className='row no-gutters mt-2 mb-5'>
            <Link style={HeaderStyle} to='/' className='h2 ml-4'>
                BugHouse Chess
            </Link>
            <div className='ml-auto my-auto mr-5'>
                {this.props.user ? <div>Welcome {this.props.user?.username}!</div> : <div>
                    <Link to='/login'>Login</Link>
                </div>}
            </div>
        </div>
    }
}