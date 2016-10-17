/**
 * Created by munk on 25-08-16.
 */

import {Component, Input, OnInit} from "@angular/core";
import {HomeService} from "../../../home.service";
import {Sprint} from "./sprint";
@Component({
    selector: 'sprints-component',
    template: require("./sprints.component.html")
})

export class SprintsComponent implements OnInit{
    @Input() sprintId: string;
    sprints: Array<Sprint> = [];

    constructor(public homeService: HomeService){

    }

    ngOnInit(){
        this.updateSprints();
    }

    updateSprints(){
        this.sprints = [];
        this.homeService.getSprints(this.sprintId).subscribe(sprints => {
            sprints.forEach(sprint => {
                this.sprints.push(sprint);
            });
        });
    }
}