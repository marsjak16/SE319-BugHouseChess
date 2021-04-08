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
                    <Route render={props => <Header history={props.history} logoutCallback={() => this.logout()} user={this.state.user}/>}/>
                </header>
                <Switch>
                    <Route path='/game/:gameId' render={(props) => <GamePage history={props.history} match={props.match}/>}/>
                    <Route path='/login' render={(props) => <LoginPage history={props.history} loginCallback={user => this.login(user)}/>}/>
                    <Route path='/register' render={(props) => <RegisterPage history={props.history} registerCallback={user => this.authService.register(user)}/>}/>
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

  async logout(): Promise<void> {
      await this.authService.logout();

      const newState: AppState = _.cloneDeep(this.state);
      newState.user = undefined;
      this.setState(newState);
  }
}

export default App;
