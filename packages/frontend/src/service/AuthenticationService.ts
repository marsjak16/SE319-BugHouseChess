import {UserModel} from "../../../public/models/account/user-model";
import {Config} from "../config/config";
import {LoginModel} from "../../../public/models/account/login-model";

export class AuthenticationService {
    user?: UserModel;

    async login(login: LoginModel): Promise<UserModel> {
        const response = await fetch(Config.apiUrl + '/account/login', {
            method: 'POST',
            body: JSON.stringify(login)
        });

        return response.json();
    }
}