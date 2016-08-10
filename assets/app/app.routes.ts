/**
 * Created by munk on 02-08-16.
 */
import {UserRoutes} from "./user/user.routes";
import {HomeRoutes} from "./home/home.routes";
import { Routes, RouterModule }   from '@angular/router';
import {PageNotFound} from "./page-not-found.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    ...UserRoutes,
    {path: 'notFound', component: PageNotFound},
    ...HomeRoutes,
    {path: '**', component: PageNotFound}
];




export const appRouterProvider = RouterModule.forRoot(routes);