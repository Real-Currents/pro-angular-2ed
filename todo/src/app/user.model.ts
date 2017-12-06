import { ToDo } from './todo.model';

export class User {
  constructor(public id: number, public name: String) { }

  // public id: number;
  // public name: String;
  private _todos: Array<any>;

  get todos(): Array<ToDo> {
    return (this._todos) ? this._todos : [];
  }

  set todos(values: Array<ToDo>) {
    values.forEach(v => {
        if (this._todos) {
          this._todos.push(v);
        } else {
          this._todos = [{ action: 'Clean Room', done: false } as ToDo] as Array<ToDo>;
          this._todos.push(v);
        }
      }
    );
  }

  public whatsToDo (): Array<ToDo> {
    return (this._todos) ? this._todos.filter(t => (!t.done)) : [];
  }

  public whatsDone (): Array<ToDo> {
    return (this._todos) ? this._todos.filter(t => (!!t.done)) : [];
  }
}
