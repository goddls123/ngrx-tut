import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeComponent } from './notice/notice.component';
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
  { path: '', component: TodolistComponent },
  { path: 'notice/:mainPage/:subPage', component: NoticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
