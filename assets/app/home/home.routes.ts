/**
 * Created by munk on 10-08-16.
 */
import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {UserPanelComponent} from "./userpanel/userPanel.component";
import {HomeGuard} from "./home.guard";
import {ScrumboardComponent} from "./project/scrumboard/scrumboard.component";
import {ProjectComponent} from "./project/project.component";

export const HomeRoutes: Routes = [{
        path: 'home',
        component: HomeComponent,
        canActivate: [HomeGuard],
        children: [
            {path: '', redirectTo: 'userpanel', pathMatch: 'full'},
            {path: 'userpanel', component: UserPanelComponent},
            {path: 'scrumboard', component: ScrumboardComponent},
            {path: 'projects', component: ProjectComponent}
        ]
}];
