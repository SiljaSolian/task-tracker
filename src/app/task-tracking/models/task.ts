import { TaskState } from './task-state';

/**
 * Simple Task entity.
 */
export class Task {
    public id: string;
    public name: string;
    public description: string;
    public estimate: number;
    public state: TaskState;
}
