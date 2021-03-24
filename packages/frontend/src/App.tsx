import React, {ReactElement} from 'react';
import logo from './logo.svg';
import './App.css';
import {AuthenticationService} from "./service/AuthenticationService";

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
      		<body>
        		<LoginPage/>
      		</body>
    	</div>
    );
  }
}

export default App;
