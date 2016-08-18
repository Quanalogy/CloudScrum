/**
 * Created by munk on 12-08-16.
 */

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Item} from "./scrumboard/item/item";
import {DragulaService, Dragula} from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'scrumboard-component',
    templateUrl: '/js/app/home/scrumboard.component.html',
    directives: [ROUTER_DIRECTIVES,Dragula],
    providers: [
        DragulaService
    ],
    viewProviders: [DragulaService],
})

export class ScrumboardComponent implements OnInit{


    itemArray: Array<Item> = [];
    inprogressArray: Array<Item> = [];
    reviewArray: Array<Item> = [];
    doneArray: Array<Item> = [];
    arraySize = this.itemArray.length;
    id = 0;
    inputName = "";

    constructor(private dragulaService: DragulaService){
        /*dragulaService.setOptions('second-bag',{
            accepts: function (el, target, source, sibling) {
                // if (el.id < 10)
                    return true;
                // return false;
            }
        });*/


        /*dragulaService.setOptions('first-bag', {
            copy: false,
            copySortSource: true
        });

        dragulaService.setOptions('first2-bag', {
            accepts: (el, target, source, sibling) => {
                if(source === 'first-bag'){
                    return true;
                }
                return false;
            }
        });

        dragulaService.drop.subscribe((value) => {
            this.onDrop(value);
        });

        //setup dragNdrop for creating content
        dragulaService.setOptions('page-bag', {
            copy: true,
            copySortSource: true
        });*/
    }

    //(0 - bagname, 1 - el, 2 - target, 3 - source, 4 - sibling)
    private onDrop(value) {
        console.log(value);
        /*if (value[2] == null) //dragged outside any of the bags
            return;
        if (value[2].id !== "content" && value[2].id !== value[3].id) //dragged to a container that should not add the element
            value[1].remove();*/
    }

    ngOnInit() {
/*        this.dragulaService.setOptions('first-bag', {
            accepts: function (el, target, source, sibling) {
                return (target.id)
            }
        })*/
    }

    addItem(itemName: string){
        if(!itemName){
            return;
        }
        this.itemArray.push(new Item(itemName, this.id));
        this.id = this.id +1;
        this.inputName = "";
    }

}