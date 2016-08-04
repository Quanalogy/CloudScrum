/**
 * Created by munk on 02-08-16.
 */
import {CreateUserComponent} from "./create-user-form.component";
import {PageNotFound} from "./page-not-found.component";
import { provideRouter, RouterConfig } from '@angular/router';
import {LoginComponent} from "./login.component";
import {HomeComponent} from "./home.component";
import {ProfileComponent} from "./profile.component";
import {LoggedInGuard} from "./logged-in.guard";



const routes: RouterConfig = [
    {path: '', component: HomeComponent, terminal: true},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [LoggedInGuard]},
    {path: 'create-user', component: CreateUserComponent},
    //{path: '**', component: PageNotFound}
    {path: 'notFound', component: PageNotFound}
];

export const appRouterProvider = [
    provideRouter(routes)
];