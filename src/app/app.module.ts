import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing  } from './app.routing';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard, JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, GameService } from './_services';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewGameComponent } from './game/new-game/new-game.component';
import { GameBoardComponent } from './game/game-board/game-board.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing 
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NewGameComponent,
        GameBoardComponent
    ],
    providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      GameService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }