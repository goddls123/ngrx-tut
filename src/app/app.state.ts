import { Tutorial, Notice } from './models/totorial.model';
import { Filter, Todo } from './models/todo.model';
import { NoticeState } from './models/notice.model';

export interface AppState {
  readonly todoList: Todo[];
  readonly filter: Filter;
  readonly noticies: Notice[];
}
