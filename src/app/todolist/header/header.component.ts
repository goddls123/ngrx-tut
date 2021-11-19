import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as TodoActions from '../../action/todo.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public todo: string;
  constructor(private store: Store<AppState>) {}

  addTodo(ev, name) {
    const keyCode = ev.which ? ev.which : ev.keyCode;
    const todo = { name, completed: false };

    if (keyCode === 13 || ev.type === 'click') {
      this.store.dispatch(TodoActions.addTodo({ todo }));
      this.todo = '';
    }
  }
  ngOnInit(): void {}
}
