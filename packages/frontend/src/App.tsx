import React, {ReactElement} from 'react';
import './App.css';
import {AuthenticationService} from "./service/AuthenticationService";
import {LoginPage} from "./login/login-page";
import {GamePage} from "./game/game-page";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {UserModel} from "../../public/models/account/user-model";
import _ from "lodash";
import {Header} from "./header/header";
import {LoginModel} from "../../public/models/account/login-model";
import {RegisterPage} from "./login/register-page";
import {CreateAccountModel} from "../../public/models/account/create-account-model";

export interface AppProps {}

export interface AppState {
    user?: UserModel
}

export class App extends React.Component<AppProps, AppState> {
  authService: AuthenticationService;

  constructor(props: AppProps) {
    super(props);
    this.state = {};

    this.authService = new AuthenticationService();
  }

  async componentDidMount(): Promise<void> {
      this.checkAuth();
  }

  async checkAuth(): Promise<void> {
		const user = await this.authService.checkAuth();

		const newState: AppState = _.cloneDeep(this.state);
		newState.user = user;
		this.setState(newState);
  }

  render(): ReactElement {
    return (
        <div className="App">
      		<BrowserRouter>
                <header>
                    <Header user={this.state.user}/>
                </header>
                <Switch>
                    <Route path='/game' render={() => <GamePage/>}/>
                    <Route path='/login' render={(props) => <LoginPage history={props.history} loginCallback={user => this.login(user)}/>}/>
                    <Route path='/register' render={(props) => <RegisterPage history={props.history} registerCallback={user => this.register(user)}/>}/>
                </Switch>
            </BrowserRouter>
    	</div>
    );
  }

  async login(login: LoginModel): Promise<UserModel | undefined> {
      const user = await  this.authService.login(login);

      const newState: AppState = _.cloneDeep(this.state);
      newState.user = user;
      this.setState(newState);

      return user;
  }

  register(create: CreateAccountModel): Promise<UserModel | undefined> {
      return this.authService.register(create);
  }
}

export default App;
