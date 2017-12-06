import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user.model';
import {ToDo} from './todo.model';

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor (private userService: UserService) { } // Declares UserService to be dependency injected as userService

  title = 'Angular';
  users: Array<User>;
  newUserName: String;

  ngOnInit(): void {
    this.userService.getObservableGroup().subscribe(g => {
      this.users = g;
      this.users.forEach(u => {
        u.todos = (u.name.match('John') !== null) ?
          [{ action: 'String Guitar', done: true } as ToDo] :
          [{ action: 'Make Bed', done: true } as ToDo];
      });
    });
  }

  public addUser (name: String): void {
    const lastId = this.users.map(u => u.id).reduce((a, b) => Math.max(a, b)) as number + 1;

    if (this.newUserName) {
      const user = new User(lastId, name);
      user.todos = [{ action: 'Join Group', done: true } as ToDo];
      this.users.push(user);
    }
  }
}
