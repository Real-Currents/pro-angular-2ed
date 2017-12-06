// import { TestBed, async, inject } from '@angular/core/testing';
import {UserService} from './user.service';

describe('UserService', () => {
  let userService = null;
  let userGroup = null;

  beforeEach(() => {
    userService = new UserService();
    userGroup = null;
  });

  it('works', () => {
    userGroup = userService.getGroup();
    expect(userGroup).not.toBeNull();
    expect(userGroup.length).toBe(3);
  });

  it('still works', done => {
    const promisedGroup = userService.getGroupPromise();
    promisedGroup.then(v => {
      console.log('Observable ', v);
      userGroup = v;
      expect(userGroup).not.toBeNull();
      expect(userGroup.length).toBe(3);
      done();
    });

    console.clear();
  });

  it('could work', done => {
    const observableGroup = userService.getObservableGroup();
    const disposable = observableGroup.subscribe(v => {
      console.log('Observable ', v);
      userGroup = v;
      // These assertions are never called because of unsubscribe()
      expect(userGroup).not.toBeNull();
      expect(userGroup.length).toBe(3);
      done();
    });

    console.clear();

    // Observer will return null because of unsubscribe()
    setTimeout(() => {
      console.log('Finish testing!');
      disposable.unsubscribe();
      expect(userGroup).toBeNull();
      done();
    }, 1);
  });
});
