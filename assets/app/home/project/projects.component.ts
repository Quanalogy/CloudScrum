/**
 * Created by munk on 23-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {HomeService} from "../home.service";
import {Project} from "./project";
@Component({
    selector: 'projects-component',
    template: require("./projects.component.html")
})

export class ProjectsComponent implements OnInit{

    project = '';
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
        if(this.project === ''){
            console.log("No project name");
            return;
        }
        console.log("Project name ok")

        this.homeService.postProject(this.project).subscribe(res=>{
            console.log(res.ok);
            if(res.ok){
                this.project = '';
                this.projectCreateError = false;
                this.updateProjects();
            } else {
                this.projectCreateError = true;
            }
        }, err => {
            console.log("Error in posting project");
            this.projectCreateError = true;
        });
    }

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