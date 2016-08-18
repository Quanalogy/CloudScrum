/**
 * Created by munk on 12-08-16.
 */

export class Item{
    constructor(
        public itemName: string,
        public itemId: number,
        public priority = 0,
        public assignee = "",
        public progress = 0,
        public catagory = ""
    ) {
        //
    }
}
