import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  private tasks: Task[];
  private showButtons: boolean = false;
  private currentTask: Task;
  private checkedTasks: any = {};

  constructor(private taskService: TaskService) {
    this.taskService.tasks.subscribe((tasksFromService) => {
      this.tasks = tasksFromService;
    });
  }

  onTaskChecked(event: any) {
    this.checkedTasks[event.id] = event.checked;
  }

  /**
   * Displays a local menu.
   */
  onMenuClicked() {
    this.showButtons = !this.showButtons;
  }

  /**
   * Deletes all marked tasks.
   */
  onDelete() {
    this.showButtons = false;
    let tasksToDelete = [];
    for (let i = 0; i < this.tasks.length; i++) {
      let isChecked = this.checkedTasks[this.tasks[i].id];
      if (isChecked) {
        tasksToDelete.push(this.tasks[i]);
      }
    }
    this.taskService.DeleteTasks(tasksToDelete)
    .then(() => {
      this.checkedTasks = [];
    });
  }

  /**
   * Adds a new task.
   */
  onAdd() {
    this.showButtons = false;
    this.currentTask = this.taskService.NewTask();
  }

  onEditDone() {
    this.currentTask = null;
  }
}
