import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskStatistics } from '../../models/task-statistics';
import { TaskState } from '../../models/task-state';

/**
 * This component is in charge of showing the task statistics.
 */
@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  private tasks: Task[];
  private statistics: TaskStatistics;

  constructor(
    private taskService: TaskService
  ) {
    this.taskService.tasks.subscribe((tasksFromService) => {
      this.tasks = tasksFromService;
      this.UpdateStatistics();
    });
  }

  ngOnInit() {
  }

  /**
   * Extracts basic statistics from the obtained tasks.
   */
  private UpdateStatistics() {
    this.statistics = new TaskStatistics();
    for (let i = 0; i < this.tasks.length; i++) {
      switch (this.tasks[i].state) {
        case TaskState.PLANNED:
          this.statistics.planned.numberOfTasks++;
          this.statistics.planned.hours += this.tasks[i].estimate;
          break;
        case TaskState.IN_PROGRESS:
          this.statistics.inProgress.numberOfTasks++;
          this.statistics.inProgress.hours += this.tasks[i].estimate;
          break;
        case TaskState.COMPLETED:
          this.statistics.completed.numberOfTasks++;
          this.statistics.completed.hours += this.tasks[i].estimate;
          break;
        default:
          console.error('Obtained unknown task type');
          break;
      }
    }
    this.statistics.updateTotals();
  }

}
