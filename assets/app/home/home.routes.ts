/**
 * Created by munk on 10-08-16.
 */
import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {UserPanelComponent} from "./userPanel.component";

export const HomeRoutes: Routes = [{
        path: 'home',
        component: HomeComponent,
        children: [
            {path: '', redirectTo: 'userpanel', pathMatch: 'full'},
            {path: 'userpanel', component: UserPanelComponent},
        ]
}];
