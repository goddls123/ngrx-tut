import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.state';
import { Todo } from '../../models/todo.model';
import * as TodoActions from '../../action/todo.actions';
import { getTodos } from '../../reducer/todo.reducer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  todoList: Observable<Todo[]>;
  filter;
  constructor(private store: Store<AppState>) {
    // store.select('todoList').subscribe((todos) => {
    //   this.todoList = this.filterTodos(todos, this.filter);
    // });

    this.todoList = store.select(getTodos);
    store.select(getTodos).subscribe((todo) => {
      console.log(todo);
    });
  }

  ngOnInit(): void {}

  toggleTodo(index: number) {
    console.log(index);
    this.store.dispatch(TodoActions.toggleTodo({ index }));
  }
  editMode(ev) {
    console.log(ev.target);
  }
}
