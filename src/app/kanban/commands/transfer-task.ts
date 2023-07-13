import { Command } from "src/app/command-manager/command.interface";
import { KanbanList } from "../model";
import { transferArrayItem } from "@angular/cdk/drag-drop";

export class TranferTaskCommand implements Command{
    constructor(
        private fromList: KanbanList,
        private toList: KanbanList,
        private fromIndex:number,
        private toIndex:number
    ) {
    }
    execute(): void {
        transferArrayItem(this.fromList.tasks,this.toList.tasks,this.fromIndex,this.toIndex);
    }
    undo(): void {
        transferArrayItem(this.toList.tasks,this.fromList.tasks,this.toIndex,this.fromIndex);
    }
    
}