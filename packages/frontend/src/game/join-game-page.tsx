import * as H from "history";
import React, {CSSProperties, ReactElement} from "react";
import io from "socket.io-client";
import {Config} from "../config/config";
import {AuthenticationResult} from "../../../public/models/account/authentication-result";
import {QueueStatus} from "../../../public/models/game/queue-status";
import {JoinGame} from "../../../public/models/game/join-game";

interface JoinGameProps  {
    history: H.History
}

interface JoinGameState {
    status?: QueueStatus
}

const mainDiv: CSSProperties = {
	margin: 'auto',
    width: '50%',
	textAlign: 'center',
};

export class JoinGamePage extends React.Component<JoinGameProps, JoinGameState> {
    private socket!: SocketIOClient.Socket;

    constructor(props: JoinGameProps) {
        super(props);

        this.state = {}
    }

    componentDidMount(): void {
        this.socket = io(Config.apiUrl + `/join-game`, {
            // @ts-ignore
            withCredentials: true
        });

        this.socket.on('auth', (result: AuthenticationResult) => {
            if (!result.authenticated) {
                this.props.history.push('/login');
            }
        });

        this.socket.on('queue-status', (status: QueueStatus) => {
            this.setState({
               status: status
            });
        });

        this.socket.on('join-game', (game: JoinGame) => {
           this.props.history.push(`/game/${game.gameId}`);
        });
    }

    componentWillUnmount(): void {
        this.socket.close();
    }

    render(): ReactElement {
        if (this.state.status?.inQueue) {
            return <div style={mainDiv}>
                <div>In Queue with {this.state.status.numInQueue} other players</div>
                <input className='btn btn-primary mt-2'
                       type='button'
                       value='Leave Queue'
                       onClick={() => this.toggleQueue()}/>
            </div>
        }

        return <div style={mainDiv}>
					<input className='btn btn-primary'
                      type='button'
                      value='Join Queue'
                      onClick={() => this.toggleQueue()}/>
				</div>
    }

    private toggleQueue(): void {
        if (this.state.status?.inQueue) {
            this.socket.emit('leave-queue');
        } else {
            this.socket.emit('join-queue');
        }
    }
}