import {Component, Input} from "@angular/core";
import {Item} from "./item";

@Component({
    selector: 'item-component',
    template: require("./item.component.html"),
    styleUrls: ['/stylesheets/item.css']
})

export class ItemComponent {
    @Input() item: Item;
}
