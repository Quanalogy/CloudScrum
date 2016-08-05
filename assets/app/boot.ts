import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {appRouterProvider} from "./appRoutes";
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(AppComponent, [
    appRouterProvider,
    disableDeprecatedForms(), //Since we are converting to the new API,
                                // and no longer need the old API, we call disableDeprecatedForms()
                                //to disable the old form functionality and the warning message.
    provideForms(),
    HTTP_PROVIDERS
]).catch((err: any) => console.error(err));