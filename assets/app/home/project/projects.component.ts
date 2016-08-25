/**
 * Created by munk on 23-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HomeService} from "../home.service";
import {Project} from "./project";
@Component({
    selector: 'projects-component',
    template: require("./projects.component.html"),
    directives: [ROUTER_DIRECTIVES]
})

export class ProjectsComponent implements OnInit{

    project = new Project('', [], []);
    projectCreateError = false;
    userProjects: Array<Project> = [];



    constructor(
        private homeService: HomeService
    ){

    }

    ngOnInit(){
        this.updateProjects();
    }

    // Method for creating a new project.
    createProject(){
        if(!this.project.name){
            return;
        }

        this.homeService.postProject(this.project).subscribe(res=>{
            if(res.ok){
                this.project.name = '';
                this.projectCreateError = false;
                this.updateProjects();
            } else {
                this.projectCreateError = true;
            }
        }, err => {
            this.projectCreateError = true;
        });
    }

    // TODO make getrequest instead of mock db
    updateProjects(){
        this.userProjects = [];
        this.homeService.getProjects().subscribe(res => {
            res.forEach(item => {
                this.userProjects.push(item);
            });
        }, err => {
            console.log(err);
        });
    }

}