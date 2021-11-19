import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeFilter } from '../../action/filter.action';
import * as TodoActions from '../../action/todo.actions';
import { AppState } from '../../app.state';
import { getFilterName, getFilterState } from '../../reducer/filter.reducer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  length: number;
  constructor(private store: Store<AppState>) {
    store.select('todoList').subscribe((todoList) => {
      this.length = todoList.filter((todo) => !todo.completed).length;
    });
  }

  ngOnInit(): void {}

  OnDestroy(): void {
    this.store.select('todoList').subscribe();
  }

  changeFilter(name) {
    this.store.dispatch(changeFilter({ name }));
  }

  deleteTodo() {
    this.store.dispatch(TodoActions.removeTodo());
  }
}
