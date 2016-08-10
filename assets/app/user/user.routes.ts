/**
 * Created by munk on 04-08-16.
 */
import {Routes} from "@angular/router";
import {CreateUserComponent} from "./create-user-form.component";
import {LoginComponent} from "./login.component";

export const UserRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'create-user', component: CreateUserComponent},
];