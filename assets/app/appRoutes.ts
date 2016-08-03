/**
 * Created by munk on 02-08-16.
 */
import {CreateUserComponent} from "./create-user-form.component";
import {PageNotFound} from "./page-not-found.component";
import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from "./login.component";

const routes: RouterConfig = [
    {path: 'login', component: LoginComponent},
    {path: 'create-user', component: CreateUserComponent},
    //{path: '**', component: PageNotFound}
    {path: 'notFound', component: PageNotFound}
];

export const appRouterProvider = [
    provideRouter(routes)
];