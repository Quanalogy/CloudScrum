/**
 * Created by munk on 10-08-16.
 */
import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {UserPanelComponent} from "./userPanel.component";
import {HomeGuard} from "./home.guard";

export const HomeRoutes: Routes = [{
        path: 'home',
        component: HomeComponent,
        canActivate: [HomeGuard],
        children: [
            {path: '', redirectTo: 'userpanel', pathMatch: 'full'},
            {path: 'userpanel', component: UserPanelComponent},
        ]
}];
