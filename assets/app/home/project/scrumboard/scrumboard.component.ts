/**
 * Created by munk on 12-08-16.
 */

import {Component, OnInit, Input} from "@angular/core";
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {Item} from "./item/item";
import {EItemCategory} from "../../../../../backend/models/item/EItemCategory";
import {HomeService} from "../../home.service";
import {ActivatedRoute} from "@angular/router";
import {Tag} from "./item/tag/tag";


@Component({
    selector: 'scrumboard-component',
    template: require("./scrumboard.component.html"),
    providers: [
        DragulaService
    ],
    viewProviders: [DragulaService],
})

export class ScrumboardComponent implements OnInit{

    itemModel = new Item('', '', EItemCategory.backlog, 0, 0, new Date(Date.now()), new Date(Date.now()), null);
    addingMode = false;

    backlogArray: Array<Item> = [];
    backendArray: Array<Item> = [];
    inprogressArray: Array<Item> = [];
    reviewArray: Array<Item> = [];
    doneArray: Array<Item> = [];
    arraySize = this.backlogArray.length;
    inputName = "";

    id = "";

    constructor(
        private dragulaService: DragulaService,
        private homeService: HomeService,
        private route: ActivatedRoute
    ){

        dragulaService.setOptions("bag-one", {
            accepts: (el, target, source, sibling) => { // Makes sure that the direction of the elements is correct
                if(source.id === "backlog" && target.id === "inProgress"){
                    return true;
                } else if(source.id === "inProgress" && target.id === "review"){
                    return true;
                } else if(source.id === "review" && target.id === "done"){
                    return true;
                } else if(source.id === "review" && target.id === "inProgress"){
                    return true;
                } else {
                    return false;
                }
            }
        });


        dragulaService.dropModel.subscribe(value => {    // when element dropped into new category, the category attribute should update
            this.onDrop(value.slice(1)[0], value.slice(2)[0].id);
        });
    }

    // method for ensuring that when a drop has been made, the category of the element updates
    //TODO make a better way of getting the element. Atm this is done by getting inner HTML, but this won't work when the elements includes more than the name!!
    private onDrop(el, id) {

        const regexp = /^([^\s]*)/;
        let elementName: string = el.innerText.trim();
        let elementId = regexp.exec(elementName)[1];

        switch (id.toString()){
            case "backlog":
                this.backlogArray.forEach((value, index, array) => {
                    if(value._id === elementId){
                        value.category = EItemCategory.backlog;
                        this.patchItem(value);
                    }
                });
                return;
            case "inProgress":
                this.inprogressArray.forEach((value, index, array) => {
                    if(value._id === elementId){
                        value.category = EItemCategory.inProgress;
                        this.patchItem(value);
                    }
                });
                return;
            case "review":
                this.reviewArray.forEach((value, index, array) => {
                    if(value._id === elementId){
                        value.category = EItemCategory.review;
                        this.patchItem(value);
                    }
                });
                return;
            case "done":
                this.doneArray.forEach((value, index, array) => {
                    if(value._id === elementId){
                        value.category = EItemCategory.done;
                        this.patchItem(value);
                    }
                });
                return;
        }
    }


    ngOnInit() {
        // get the id from the route params
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        console.log(this.id);

        this.updateItems();
    }

    // Method for patching an item, hence any changes goes through here
    patchItem(item: Item){
        this.homeService.patchItem(item).subscribe(res => {
            // console.log(res);
        }, err => {
            // console.log(err);
        });
    }

    // Method for getting all elements in scrumboard. This is used oninit and when posting new element
    updateItems(){
        this.backlogArray = [];
        this.inprogressArray = [];
        this.reviewArray = [];
        this.doneArray = [];
        this.homeService.getItems(this.id).subscribe((res) => {
            res.forEach(item => {
                switch (item.category){
                    case EItemCategory.backlog:
                        return this.backlogArray[this.backlogArray.length] = item;
                    case EItemCategory.inProgress:
                        return this.inprogressArray[this.inprogressArray.length] = item;
                    case EItemCategory.review:
                        return this.reviewArray[this.reviewArray.length] = item;
                    case EItemCategory.done:
                        return this.doneArray[this.doneArray.length] = item;
                }
            });
        });
    }


    // Method for adding a new item to the scrumboard
    postItem(){

        if(!this.itemModel.name || !this.itemModel.estimate){
            return;
        }

        //this.itemModel.sprintId = this.id;

        this.homeService.postNewItem(this.itemModel, this.id).subscribe((res) => {
            this.updateItems();
        }, (err) => {
            console.log(err);
        });

    }

}
