/**
 * Created by munk on 10-08-16.
 */
import {NgModule}       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {appRouterProvider} from "./app.routes";
import {FormsModule} from "@angular/forms";
import {PageNotFound} from "./page-not-found.component";
import {LoginComponent} from "./user/login.component";
import {CreateUserComponent} from "./user/create-user-form.component";
import {HomeComponent} from "./home/home.component";
import {UserPanelComponent} from "./home/userpanel/userPanel.component";
import {HomeGuard} from "./home/home.guard";
import {UserService} from "./user/user.service";
import {JwtHelper, AuthHttp, AuthConfig, AUTH_PROVIDERS} from "angular2-jwt";
import {HomeService} from "./home/home.service";
import {ScrumboardComponent} from "./home/scrumboard/scrumboard.component";
import {DragulaService, DragulaModule} from 'ng2-dragula/ng2-dragula';
import {JsonpModule, HttpModule} from "@angular/http";


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
        ScrumboardComponent
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        appRouterProvider,
        DragulaModule,
        JsonpModule,
        HttpModule
    ],
    providers: [
        DragulaService,
        HomeGuard,
        UserService,
        HomeService,
        JwtHelper,
        AuthHttp,
        AUTH_PROVIDERS
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}