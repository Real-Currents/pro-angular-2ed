import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {ToDo} from './todo.model';

@Injectable()
export class UserService {
  constructor() {
  }

  private group: Array<User> = [
    new User (1, 'John'),
    new User (2, 'Joe'),
    new User (3, 'Jimmy')
  ];

  public getGroup(): Array<User> {
    return this.group;
  }

  public getGroupPromise(): Promise<Array<User>> {
    const promise = new Promise(res => {
      setTimeout(() => {
        res(this.group);
      }, 1000);
    });

    return promise;
  }

  public getObservableGroup(): Observable<Array<User>> {
    const observable = new Observable(obs => {
      const timeout =
        setTimeout(() => {
          obs.next(this.group);
        }, 1000);

      return () => clearTimeout(timeout);
    });
    console.clear();

    observable.subscribe(v => {
      console.log('Self subscription!');
      console.log('Observable ', v);
    });

    return observable;
  }
}
