/**
 * Created by munk on 23-08-16.
 */


import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Project} from "./project";
@Component({
    selector: 'project-component',
    template: require("./project.component"),
    directives: [ROUTER_DIRECTIVES]
})

export class ProjectComponent{
    @Input() project: Project;
}