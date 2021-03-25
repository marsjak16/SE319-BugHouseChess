import {UserModel} from "../../../public/models/account/user-model";
import {Config} from "../config/config";
import {LoginModel} from "../../../public/models/account/login-model";

export class AuthenticationService {
    async checkAuth(): Promise<UserModel | undefined> {
        const response = await fetch(Config.apiUrl + '/account/checkauth', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.status == 200) {
            return await response.json();
        } else {
            return undefined;
        }
    }

    async login(login: LoginModel): Promise<UserModel | undefined> {
        const response = await fetch(Config.apiUrl + '/account/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(login)
        });

        if (response.status == 200) {
            return response.json();
        } else {
            return undefined;
        }
    }

    async logout(): Promise<void> {
        await fetch(Config.apiUrl + '/account/logout', {
            method: 'GET',
            credentials: "include"
        });
    }
}
