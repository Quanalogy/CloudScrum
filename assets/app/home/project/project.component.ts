/**
 * Created by munk on 23-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {HomeService} from "../home.service";
import {Project} from "./project";
@Component({
    selector: 'project-component',
    template: require("./project.component.html"),
    directives: [ROUTER_DIRECTIVES]
})

export class ProjectComponent implements OnInit{

    newProject = '';
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
        if(!this.newProject){
            return;
        }
        this.homeService.postProject(this.newProject).subscribe(res=>{
            if(res.ok){
                this.newProject = '';
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
        this.userProjects.push(new Project('MyProject'));
        this.userProjects.push(new Project('MyProject1'));
        this.userProjects.push(new Project('MyProject2'));
    }

}