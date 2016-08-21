/**
 * Created by munk on 12-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Item} from "./scrumboard/item/item";
import {DragulaService, Dragula} from 'ng2-dragula/ng2-dragula';
import {fromStringToEnum, EItemCategory, fromEnumToString} from "../../../backend/models/item/EItemCategory";
import {HomeService} from "./home.service";

@Component({
    selector: 'scrumboard-component',
    template: require("./scrumboard.component.html"),
    directives: [ROUTER_DIRECTIVES,Dragula],
    providers: [
        DragulaService
    ],
    viewProviders: [DragulaService],
})

export class ScrumboardComponent implements OnInit{

    itemModel = new Item('', '', EItemCategory.backlog, 0, 0, new Date(Date.now()), new Date(Date.now()));
    addingMode = false;

    itemArray: Array<Item> = [];
    backendArray: Array<Item> = [];
    inprogressArray: Array<Item> = [];
    reviewArray: Array<Item> = [];
    doneArray: Array<Item> = [];
    arraySize = this.itemArray.length;
    id = 0;
    inputName = "";


    constructor(
        private dragulaService: DragulaService,
        private homeService: HomeService
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

        dragulaService.drop.subscribe(value => {    // when element dropped into new category, the category attribute should update
            const el = value.slice(0);
            const target = value.slice(2).id;
            el.itemCategory = fromStringToEnum(target);
        });
    }


    ngOnInit() {
        this.updateItems();
    }

    updateItems(){
        this.itemArray = [];
        this.inprogressArray = [];
        this.reviewArray = [];
        this.doneArray = [];
        this.homeService.getItems().subscribe((res) => {
            res.forEach(item => {
                switch (item.category){
                    case EItemCategory.backlog:
                        return this.itemArray[this.itemArray.length] = item;
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


    postItem(){

        if(!this.itemModel.name || !this.itemModel.estimate){
            return;
        }

        this.homeService.postNewItem(this.itemModel).subscribe((res) => {
            console.log(res);
            this.updateItems();
        }, (err) => {
            console.log(err);
        });

    }

}
