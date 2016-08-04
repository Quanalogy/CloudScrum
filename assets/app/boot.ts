import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import {provideForms, disableDeprecatedForms, FORM_PROVIDERS} from "@angular/forms";
import {appRouterProvider} from "./app.routes";
import {UserService} from "./user.service";
import {LoggedInGuard} from "./logged-in.guard";
import {HTTP_PROVIDERS} from "@angular/http";
import { AUTH_PROVIDERS } from 'angular2-jwt';

bootstrap(AppComponent, [
    UserService,
    LoggedInGuard,
    appRouterProvider,
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    disableDeprecatedForms(), //Since we are converting to the new API,
                                // and no longer need the old API, we call disableDeprecatedForms()
                                //to disable the old form functionality and the warning message.
    provideForms()
]).catch((err: any) => console.error(err));