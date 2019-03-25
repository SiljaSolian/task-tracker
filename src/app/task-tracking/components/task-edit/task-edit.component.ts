import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task;
  @Output() done = new EventEmitter();

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  onSave() {
    this.taskService.AddorUpdateTask(this.task);
    this.done.emit('done');
  }

  onCancel() {
    this.done.emit('done');
  }
}
