import { Injectable } from "@angular/core";
import { Command } from "./command.interface";

@Injectable()
export class CommandManagerService {
    private doneCommandStack: Command[] = [];
    private undoCommandStack: Command[] = [];

    get canUndo(): boolean {
        return this.doneCommandStack.length > 0;
    }
    get canRedo(): boolean {
        return this.undoCommandStack.length > 0;
    }

    execute(command: Command): void {
        command.execute();
        this.doneCommandStack.push(command);

        this.resetUndoStack();
    }

    undo(): void {
        if (this.doneCommandStack.length === 0) return;

        const lastDoneCommand = this.doneCommandStack.pop()!;
        lastDoneCommand.undo();

        this.undoCommandStack.push(lastDoneCommand);

    }

    redo(): void {
        if (this.undoCommandStack.length === 0) return;

        const lastUndoCommand = this.undoCommandStack.pop()!;
        lastUndoCommand.execute();

        this.doneCommandStack.push(lastUndoCommand);
    }
    private resetUndoStack(): void {
        this.undoCommandStack = [];
    }
}