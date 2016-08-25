/**
 * Created by munk on 25-08-16.
 */

import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Sprint} from "./sprint";

@Component({
    selector: 'sprint-component',
    template: require("./sprint.component.html"),
    directives: [ROUTER_DIRECTIVES]
})

export class SprintComponent{
    @Input() sprint: Sprint;
    @Input() index: string;
}