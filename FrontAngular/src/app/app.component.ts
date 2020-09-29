import { Component, OnDestroy, OnInit } from '@angular/core';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'FrontAngular';
  greeting: any;
  name: string;

  private subscription: Subscription;

  constructor(
    private stompService: StompService
  ) { }

  ngOnInit() { }

  connect() {
    if (!this.stompService.active) {
      this.stompService.activate();
    }
    this.subscription = this.stompService
      .watch('/topic/greetings')
      .subscribe(res => {
        const resBody: (any) = JSON.parse(res.body);
        this.greeting = resBody.content;
      });
  }

  disconnect() {
    this.stompService.disconnect();
  }

  sendMessage() {
    this.stompService.publish('/app/hello', JSON.stringify({ name: this.name }));
  }

  handleMessage(message) {
    this.greeting = message;
  }

  ngOnDestroy() {
    this.stompService.disconnect();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getStatus() {
    this.stompService.state
      .subscribe((status) => {
        console.log(`Stomp connection status: ${StompState[status]}`);
      });
  }
}
