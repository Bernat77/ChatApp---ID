//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';



import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatInputComponent } from './pages/chat/component/chat-input/chat-input.component';
import { ChatListComponent } from './pages/chat/component/chat-list/chat-list.component';
import { ChatTitleBarComponent } from './pages/chat/component/chat-title-bar/chat-title-bar.component';
import { ChatMessageComponent } from './pages/chat/component/chat-message/chat-message.component';
import { ChatWindowComponent } from './pages/chat/component/chat-window/chat-window.component';

//services
import { AlertService } from './services/alert.service';
import { AlertModule } from 'ngx-bootstrap';
import {LoadingService } from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ChatComponent,
    ChatInputComponent,
    ChatListComponent,
    ChatTitleBarComponent,
    ChatMessageComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    AlertService,
    NgxLoadingModule,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
