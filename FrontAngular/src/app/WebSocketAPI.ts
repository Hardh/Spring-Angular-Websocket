import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';

export class WebSocketAPI {
    // tslint:disable-next-line:no-inferrable-types
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    // tslint:disable-next-line:no-inferrable-types
    topic: string = '/topic/greetings';
    stompClient: any;
    appComponent: AppComponent;
    constructor(appComponent: AppComponent) {
        this.appComponent = appComponent;
    }
    _connect() {
        console.log('Initialize WebSocket Connection');
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        // tslint:disable-next-line:variable-name
        const _this = this;
        // tslint:disable-next-line:only-arrow-functions
        _this.stompClient.connect({}, function(frame) {
            // tslint:disable-next-line:only-arrow-functions
            _this.stompClient.subscribe(_this.topic, function(sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            // _this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log('Disconnected');
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log('errorCallBack -> ' + error);
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message) {
        console.log('calling logout api via web socket');
        this.stompClient.send('/app/hello', {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log('Message Recieved from Server :: ' + message);
        this.appComponent.handleMessage(JSON.stringify(message.body));
    }
}
