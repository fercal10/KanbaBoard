import {  moveItemInArray } from "@angular/cdk/drag-drop";
import { Command } from "src/app/command-manager/command.interface";
import {  KanbanList } from "../model";

export class ReorderListCommands implements Command {
    constructor(
        private list: KanbanList[],
        private fromIndex: number,
        private toIndex: number,
    ) { }
    execute(): void {
         moveItemInArray(this.list, this.fromIndex, this.toIndex);
    }
    undo(): void {
         moveItemInArray(this.list, this.toIndex, this.fromIndex);

    }

}