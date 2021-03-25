import React, {ReactElement} from "react";
import {UserModel} from "../../../public/models/account/user-model";
import {Link} from "react-router-dom";

interface HeaderProps {
    user?: UserModel
}

export class Header extends React.Component<HeaderProps> {
    render(): ReactElement {
        return <div>
            <div>
                {this.props.user?.username ?? <div>
                    <Link to='/login'/>
                </div>}
            </div>
        </div>
    }
}