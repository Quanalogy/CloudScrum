/**
 * Created by munk on 23-08-16.
 */


import {Component, Input} from "@angular/core";
import {Project} from "./project";
@Component({
    selector: 'project-component',
    template: require("./project.component.html")
})

export class ProjectComponent{
    @Input() project: Project;
}