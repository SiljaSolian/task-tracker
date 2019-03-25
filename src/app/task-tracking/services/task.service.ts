import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { TaskState } from '../models/task-state';

/**
 * Service in charge of CRUD tasks.
 */
@Injectable()
export class TaskService {
    private url: string;
    public tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

    constructor(private http: HttpClient) {
        this.url = environment.backendEndpoint;
        this.GetTasks();
    }

    /**
     * Obtains the list of tasks from the rest-api.
     */
    private GetTasks() {
        this.http.get(this.url + 'tasks').toPromise()
        .then((tasks: Task[]) => {
            this.tasks.next(tasks);
        })
        .catch(this.HandleError);
    }

    /**
     * Creates a new empty task.
     */
    public NewTask(): Task {
        let task = new Task();
        task.name = '';
        task.description = '';
        task.estimate = 0;
        task.state = TaskState.PLANNED;
        return task;
    }

    /**
     * Removes a given task.
     */
    public DeleteTask(task: Task) {
        let promise = new Promise((resolve, reject) => {
            let index = this.tasks.value.indexOf(task);
            if (index !== -1) {
                this.tasks.value.splice(index, 1);
            }
            resolve();
        });
        return promise;
    }

    /**
     * Mocks a call to a web Service to delete the tasks.
     */
    public DeleteTasks(tasks: Task[]) {
        let promise = new Promise((resolve, reject) => {
            let cleanedTaskSet = [];
            for (let i = 0; i < this.tasks.value.length; i++) {
                if (!tasks.includes(this.tasks.value[i])) {
                    cleanedTaskSet.push(this.tasks.value[i]);
                }
            }
            this.tasks.next(cleanedTaskSet);
            resolve(this.tasks.value);
        });
        return promise;
    }

    /**
     * Returns a promise since actually creating or updating a new
     * task using the rest api would return a promise.
     */
    public AddorUpdateTask(task: Task) {
        let promise = new Promise((resolve, reject) => {
            if (!task.id) {
                task.id = this.NewGuid();
                this.tasks.value.push(task);
            }
            resolve(task);
        });
        return promise;
    }

    /**
     * Used to mock the GUID creation.
     */
    private NewGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise
            let r = Math.random() * 16 | 0;
            // tslint:disable-next-line:no-bitwise
            let v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Simple Error handling.
     */
    private HandleError(err: any) {
        console.error(err);
    }
}
