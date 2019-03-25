import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-widget',
  templateUrl: './task-widget.component.html',
  styleUrls: ['./task-widget.component.css']
})
export class TaskWidgetComponent implements OnInit {
  @Output() checked = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Input() task: Task;
  private isChecked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public SetChecked(value: boolean) {
    this.isChecked = value;
    this.checked.emit({id: this.task.id, checked: this.isChecked});
  }

  public Edit() {
    this.edit.emit(this.task);
  }

}
