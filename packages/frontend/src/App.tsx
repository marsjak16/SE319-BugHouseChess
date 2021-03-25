import React, {ReactElement} from 'react';
import './App.css';
import {AuthenticationService} from "./service/AuthenticationService";
import {LoginPage} from "./login/login-page";
import {BrowserRouter, Switch, Route} from "react-router-dom";

export interface AppProps {

}

export class App extends React.Component<AppProps> {
  authService: AuthenticationService;

  constructor(props: AppProps) {
    super(props);

    this.authService = new AuthenticationService();
  }

  render(): ReactElement {
    return (
        <div className="App">
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
