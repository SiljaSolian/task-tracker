import { NgModule } from '@angular/core';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { TaskWidgetComponent } from './components/task-widget/task-widget.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TaskListComponent,
        TaskDashboardComponent,
        TaskWidgetComponent,
        TaskEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        TaskService
    ]
  })
export class TaskTrackingModule {

}
