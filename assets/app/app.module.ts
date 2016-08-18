/**
 * Created by munk on 10-08-16.
 */
import {NgModule, provide}       from '@angular/core';
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
import {JwtHelper, AuthHttp, AuthConfig} from "angular2-jwt";
import {HomeService} from "./home/home.service";
import {ScrumboardComponent} from "./home/scrumboard.component";
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {ItemComponent} from "./home/scrumboard/item/item.component";


// For info abot @NgModule
// https://angular.io/docs/ts/latest/guide/ngmodule.html
@NgModule({
    declarations: [
        AppComponent,
        PageNotFound,
        LoginComponent,
        CreateUserComponent,
        HomeComponent,
        ItemComponent,
        UserPanelComponent,
        ScrumboardComponent
    ],
    imports:      [
        BrowserModule,
        FormsModule,
        appRouterProvider
    ],
    providers: [
        HTTP_PROVIDERS,
        DragulaService,
        HomeGuard,
        UserService,
        HomeService,
        JwtHelper,
        AuthHttp,
        provide(AuthConfig, {useValue: new AuthConfig()})
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
