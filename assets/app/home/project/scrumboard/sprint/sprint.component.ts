/**
 * Created by munk on 25-08-16.
 */

import {Component, Input} from "@angular/core";
import {Sprint} from "./sprint";

@Component({
    selector: 'sprint-component',
    template: require("./sprint.component.html")
})

export class SprintComponent{
    @Input() sprint: Sprint;
    @Input() index: string;
}