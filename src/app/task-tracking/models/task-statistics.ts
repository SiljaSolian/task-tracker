import { TaskStatisticValues } from './task-statistic-values';

export class TaskStatistics {
    public planned: TaskStatisticValues;
    public inProgress: TaskStatisticValues;
    public completed: TaskStatisticValues;
    public totalTasks: number;
    public totalHours: number;

    constructor() {
        this.planned = new TaskStatisticValues();
        this.inProgress = new TaskStatisticValues();
        this.completed = new TaskStatisticValues();
        this.totalTasks = 0;
        this.totalHours = 0;
    }

    public updateTotals() {
        this.totalTasks = this.planned.numberOfTasks + this.inProgress.numberOfTasks + this.completed.numberOfTasks;
        this.totalHours = this.planned.hours + this.inProgress.hours + this.completed.hours;
    }
}
