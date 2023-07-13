import { moveItemInArray } from "@angular/cdk/drag-drop";
import { Command } from "src/app/command-manager/command.interface";
import { KanbanList } from "../model";

export class ReorderTaskCommand implements Command {
    constructor(
        private list: KanbanList,
        private fromIndex: number,
        private toIndex: number
    ) { }
    execute(): void {
        moveItemInArray(this.list.tasks, this.fromIndex, this.toIndex);
    }
    undo(): void {
        moveItemInArray(this.list.tasks, this.toIndex, this.fromIndex);
    }

}