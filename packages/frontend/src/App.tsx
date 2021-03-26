import React, {ReactElement} from 'react';
import './App.css';
import {AuthenticationService} from "./service/AuthenticationService";
import {LoginPage} from "./login/login-page";
import {GamePage} from "./game/game-page";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {UserModel} from "../../public/models/account/user-model";
import _ from "lodash";
import {Header} from "./header/header";

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
                    <Route path='/login' render={() => <LoginPage authService={this.authService}/>}/>
                    <Route path='/game' render={() => <GamePage/>}/>
                </Switch>
            </BrowserRouter>
    	</div>
    );
  }
}

export default App;
