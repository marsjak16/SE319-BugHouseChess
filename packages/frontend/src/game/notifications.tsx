import React, {Component, CSSProperties, ReactElement} from 'react';
import {MoveError} from "../../../public/models/game/move-error";
import {PlacementError} from "../../../public/models/game/placement-error";
import _ from "lodash";
import {CheckStatus, CheckType} from "../../../public/models/game/check-status";

const AlertContainerStyle: CSSProperties = {
    position: 'absolute',
    right: '30px',

    display: 'flex',
    flexDirection: 'column',

    minWidth: '400px'
};

const AlertStyle: CSSProperties = {
    cursor: 'pointer'
};

export interface NotificationsProps {
    socket: SocketIOClient.Socket,
    usernames?: string[]
}

enum MessageColor {
    ERROR = 'alert-danger',
    MESSAGE = 'alert-primary'
}

export interface Message {
    messageId: number,
    message: string,
    color: MessageColor,
    timeout: NodeJS.Timeout
}

export interface NotificationsState {
    messages: Message[]
}

export class Notifications extends Component<NotificationsProps, NotificationsState> {
    private  messageIdCount = 0;

    constructor(props: NotificationsProps) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentDidMount(): void {
        this.props.socket.on('moveError', (error: MoveError) => {
            this.addMessage(error.message, MessageColor.ERROR);
        });

        this.props.socket.on('placementError', (error: PlacementError) => {
            this.addMessage(error.message, MessageColor.ERROR);
        });

        this.props.socket.on('check', (status: CheckStatus) => {
            if (status.type == CheckType.CHECK) {
                this.addMessage(`${this.props.usernames?.[status.player] ?? `Player #${status.player}`} is in check`, MessageColor.MESSAGE)
            } else {
                this.addMessage(`${this.props.usernames?.[status.player] ?? `Player #${status.player}`} is in checkmate`, MessageColor.MESSAGE)
            }
        });
    }

    private addMessage(message: string, color: MessageColor) {
        const popTimeout = setTimeout(() => this.popMessage(), 5000);

        const newState: NotificationsState = _.cloneDeep(this.state);
        newState.messages.push({
            message,
            timeout: popTimeout,
            messageId: ++this.messageIdCount,
            color
        });
        this.setState(newState);
    }

    private popMessage() {
        const newState: NotificationsState = _.cloneDeep(this.state);
        newState.messages.shift();
        this.setState(newState);
    }

    private messageClicked(message: Message) {
        clearTimeout(message.timeout);

        const newState: NotificationsState = _.cloneDeep(this.state);
        newState.messages = newState.messages.filter(m => m.messageId != message.messageId);
        this.setState(newState);
    }

    render(): ReactElement {
        return <div style={AlertContainerStyle}>
            {this.state.messages.map((m , i) => <div key={m.messageId}
                         style={AlertStyle}
                         className={`alert ${m.color}`}
                         onClick={() => this.messageClicked(m)}>
                        {m.message}
                    </div>
            )}
        </div>
    }
}