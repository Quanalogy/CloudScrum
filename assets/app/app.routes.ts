/**
 * Created by munk on 02-08-16.
 */
import {PageNotFound} from "./page-not-found.component";
import { provideRouter, RouterConfig } from '@angular/router';
import {UserRoutes} from "./user/user.routes";
import {HomeRoutes} from "./home/home.routes";

const routes: RouterConfig = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    ...UserRoutes, ...HomeRoutes,
    {path: 'notFound', component: PageNotFound},
    {path: '**', component: PageNotFound}
];

export const appRouterProvider = [
    provideRouter(routes)
];