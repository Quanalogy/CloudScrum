/**
 * Created by munk on 10-08-16.
 */
import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {appRouterProvider} from "./app.routes";
import {HTTP_PROVIDERS} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {PageNotFound} from "./page-not-found.component";
import {LoginComponent} from "./user/login.component";
import {CreateUserComponent} from "./user/create-user-form.component";
import {HomeComponent} from "./home/home.component";
import {UserPanelComponent} from "./home/userPanel.component";
import {HomeGuard} from "./home/home.guard";
import {UserService} from "./user/user.service";
import {JwtHelper} from "angular2-jwt";

// For info abot @NgModule
// https://angular.io/docs/ts/latest/guide/ngmodule.html
@NgModule({
    declarations: [
        AppComponent,
        PageNotFound,
        LoginComponent,
        CreateUserComponent,
        HomeComponent,
        UserPanelComponent,
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        appRouterProvider
    ],
    providers: [
        HTTP_PROVIDERS,
        HomeGuard,
        UserService,
        JwtHelper
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}