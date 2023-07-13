import { Injectable } from '@angular/core';

import {
  dummyBoard,
  KanbanBoard,
  KanbanList,
  KanbanTask,
  KanbanTaskFactory,
} from './model';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommandManagerService } from '../command-manager/command-manager.service';
import { ReorderListCommands } from './commands/reorder-list';
import { ReorderTaskCommand } from './commands/reorder-task';
import { TranferTaskCommand } from './commands/transfer-task';

@Injectable()
export class KanbanStateService {
  public board: KanbanBoard = dummyBoard;

  constructor(private commandManager: CommandManagerService) { }

  updateListTitle(list: KanbanList, newTitle: string): void {
    list.title = newTitle;
  }

  removeList(listToRemove: KanbanList): void {
    this.board.lists = this.board.lists.filter((list) => list !== listToRemove);
  }

  addTaskToList(list: KanbanList): void {
    list.tasks.push(KanbanTaskFactory.createDefault());
  }

  removeTaskFromList(list: KanbanList, taskIndex: number): void {
    list.tasks.splice(taskIndex, 1);
  }

  updateTask(task: KanbanTask, newDescription: string): void {
    task.description = newDescription;
  }

  reorderTask(list: KanbanList, fromIndex: number, toIndex: number): void {
    const command = new ReorderTaskCommand(list, fromIndex, toIndex);
    this.commandManager.execute(command);

  }

  transferTask(fromList: KanbanList, toList: KanbanList, fromIndex: number, toIndex: number): void {
    const command = new TranferTaskCommand(fromList, toList, fromIndex, toIndex);

    this.commandManager.execute(command);
  }

  moveList(fromIndex: number, toIndex: number): void {
    const command = new ReorderListCommands(this.board.lists, fromIndex, toIndex);
    this.commandManager.execute(command);
  }
}
