import React, {ReactElement} from 'react';
import './App.css';
import {AuthenticationService} from "./service/AuthenticationService";
import {LoginPage} from "./login/login-page";
import {BrowserRouter, Switch, Route} from "react-router-dom";

export interface AppProps {
	user?: UserModel
}

export class App extends React.Component<AppProps> {
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
        	<header>
				<Header user={this.state.user}/>
          	</header>
      		<BrowserRouter>
                <Switch>
                    <Route path='/login' render={() => <LoginPage authService={this.authService}/>}/>
                </Switch>
            </BrowserRouter>
    	</div>
    );
  }
}

export default App;
