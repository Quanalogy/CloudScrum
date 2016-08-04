/**
 * Created by munk on 04-08-16.
 */
import {RouterConfig} from "@angular/router";
import {CreateUserComponent} from "./create-user-form.component";
import {LoginComponent} from "./login.component";

export const UserRoutes: RouterConfig = [
    {path: 'login', component: LoginComponent},
    {path: 'create-user', component: CreateUserComponent},
];