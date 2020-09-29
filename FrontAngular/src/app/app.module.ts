import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { stompConfig } from './stomp.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
