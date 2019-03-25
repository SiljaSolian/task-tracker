import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-tracking/components/task-list/task-list.component';
import { TaskDashboardComponent } from './task-tracking/components/task-dashboard/task-dashboard.component';

const routes: Routes = [ {
  path: '',
  children: [
    { path: 'tasklist', component: TaskListComponent },
    { path: '', component: TaskDashboardComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
