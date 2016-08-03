import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
//import {LoginComponent} from './login.component';
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {appRouterProvider} from "./appRoutes";

bootstrap(AppComponent, [
    appRouterProvider,
    disableDeprecatedForms(), //Since we are converting to the new API,
                                // and no longer need the old API, we call disableDeprecatedForms()
                                //to disable the old form functionality and the warning message.
    provideForms()
]).catch((err: any) => console.error(err));