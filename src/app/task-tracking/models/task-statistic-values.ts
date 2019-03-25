import { TaskState } from './task-state';

export class TaskStatisticValues {
    public numberOfTasks: number;
    public hours: number;

    constructor() {
        this.numberOfTasks = 0;
        this.hours = 0;
    }
}
