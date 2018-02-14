import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BrowserService} from './browser.service';

export const enum StorageType {
  Local,
  Session
}

export const PREFIX = 'app';

/**
 * Handles local and session storage.
 * For example, to set a session value:
 *    storage.session.setItem('someKey', 'someValue');
 *
 * To store an object (must be JSON.stingifyable):
 *    storage.session.setJson('someKey', {someObject: true});
 *
 * You can also subscribe to an observable for that item:
 *    let someKey$ = storage.session.getObservable('someKey');
 *    someKey$.subscribe({
 *      next: (value) => console.log(value);
 *    });
 *
 *    Once you have an observable, if you call setItem(...) or setJson(...)
 *    the value of the observable's next will be either a string or an Object accordingly.
 *
 * You can clear your storage:
 *    storage.session.clear();
 *
 * You can remove an item:
 *    storage.session.removeItem('someKey');
 *
 *    Note: this will call complete() on the Subject which will cause
 *    complete to fire on the Observables and the Subject will then be deleted.
 *    If you then set a value with the same key, a new Subject will be created
 *    so you need to also get new Observables for it.
 *
 *    As mentioned above, you can call setItem(...) and setJson(...) as many times
 *    as you want, and that will fire the Observables.
 *
 * To change the prefix for the keys, change the storage.prefix value to the string you want.
 */
@Injectable()
export class StorageService {

  private subjects = {
    local: {},
    session: {},

    property: (type: StorageType): Object => {
      return this.subjects[this.property(type)];
    }
  };

  private types: Array<string> = ['local', 'session'];

  private store = {
    local: null,
    session: null
  };

  local = {
    clear: (): void => {
      this.clear(StorageType.Local);
    },
    getItem: (key: string): string => {
      return this.getItem(key, StorageType.Local);
    },
    getJson: (key: string): Object => {
      return this.getJson(key, StorageType.Local);
    },
    getObserver: <T>(key: string): Observable<T> => {
      return this.getObserver<T>(key, StorageType.Local);
    },
    key: (n: number): any => {
      return this.key(n, StorageType.Local);
    },
    length: (): number => {
      return this.length(StorageType.Local);
    },
    removeItem: (key: string): void => {
      this.removeItem(key, StorageType.Local);
    },
    removeParentItem: (key: string): void => {
      this.removeParentItem(key, StorageType.Local);
    },
    setItem: (key: string, value: string): void => {
      this.setItem(key, value, StorageType.Local);
    },
    setJson: (key: string, value: any): void => {
      this.setJson(key, value, StorageType.Local);
    },
    setParentJson: (key: string, value: any): void => {
      this.setParentJson(key, value, StorageType.Local);
    }
  };

  session = {
    clear: (): void => {
      this.clear(StorageType.Session);
    },
    getItem: (key: string): string => {
      return this.getItem(key, StorageType.Session);
    },
    getJson: (key: string): Object => {
      return this.getJson(key, StorageType.Session);
    },
    getObserver: <T>(key: string): Observable<T> => {
      return this.getObserver<T>(key, StorageType.Session);
    },
    key: (n: number): any => {
      return this.key(n, StorageType.Session);
    },
    length: (): number => {
      return this.length(StorageType.Session);
    },
    removeItem: (key: string): void => {
      this.removeItem(key, StorageType.Session);
    },
    removeParentItem: (key: string): void => {
      this.removeParentItem(key, StorageType.Local);
    },
    setItem: (key: string, value: string): void => {
      this.setItem(key, value, StorageType.Session);
    },
    setJson: (key: string, value: any): void => {
      this.setJson(key, value, StorageType.Session);
    },
    setParentJson: (key: string, value: any): void => {
      this.setParentJson(key, value, StorageType.Session);
    }
  };

  constructor(private browserService: BrowserService) {
    this.store.local = browserService.localStorage;
    this.store.session = browserService.sessionStorage;
  }

  private buildKey(key: string): string {
    return `${PREFIX}-${key}`;
  }

  private clear(type: StorageType): void {
    this.engine(type).clear();

    const subjects = this.subjects.property(type);
    for (const key in subjects) {
      if (subjects.hasOwnProperty(key)) {
        subjects[key].complete();
      }
    }

    this.subjects[this.property(type)] = {};
  }

  private engine(type: StorageType) {
    return this.store[this.property(type)];
  }

  private getItem(key: string, type: StorageType): string {
    return this.engine(type).getItem(this.buildKey(key));
  }

  private getJson(key: string, type: StorageType): Object {
    return JSON.parse(this.engine(type).getItem(this.buildKey(key)));
  }

  private getObserver<T>(key: string, type: StorageType): Observable<T> {
    if (!this.subjects[this.property(type)][key]) {
      this.subjects.property(type)[key] = new Subject<string>();
    }
    return this.subjects.property(type)[key].asObservable();
  }

  private key(n: number, type: StorageType): any {
    return this.engine(type).key(n);
  }

  private length(type: StorageType): number {
    return this.engine(type).length;
  }

  private property(type: StorageType) {
    return this.types[type];
  }

  private removeItem(key: string, type: StorageType): void {
    this.engine(type).removeItem(this.buildKey(key));

    if (this.subjects.property(type)[key]) {
      this.subjects.property(type)[key].complete();
    }

    delete this.subjects[this.property(type)][key];
  }

  // Removes Session/Local item in the current window's parent (for example, oAuth Popup needs to store
  // the auth token in the parent, no the current window).
  private removeParentItem(key: string, type: StorageType): void {

    if (type === StorageType.Session) {
      this.browserService.window.opener.sessionStorage.removeItem(this.buildKey(key));
    } else {
      this.browserService.window.opener.localStorage.removeItem(this.buildKey(key));
    }

    if (this.subjects.property(type)[key]) {
      this.subjects.property(type)[key].complete();
    }

    delete this.subjects[this.property(type)][key];
  }

  private setItem(key: string, value: string, type: StorageType): void {

    if (!this.subjects[this.property(type)][key]) {
      this.subjects.property(type)[key] = new Subject<string>();
    }

    this.engine(type).setItem(this.buildKey(key), value);
    this.subjects.property(type)[key].next(value);
  }

  private setJson(key: string, value: Object, type: StorageType): void {
    if (!this.subjects[this.property(type)][key]) {
      this.subjects.property(type)[key] = new Subject<string>();
    }

    this.engine(type).setItem(this.buildKey(key), JSON.stringify(value));
    this.subjects.property(type)[key].next(value);
  }

  // Sets Session/Local item in the current window's parent (for example, oAuth Popup needs to store
  // the auth token in the parent, no the current window).
  private setParentJson(key: string, value: Object, type: StorageType): void {
    if (!this.subjects[this.property(type)][key]) {
      this.subjects.property(type)[key] = new Subject<string>();
    }

    if (type === StorageType.Session) {
      this.browserService.window.opener.sessionStorage.setItem(this.buildKey(key), JSON.stringify(value));
    } else {
      this.browserService.window.opener.localStorage.setItem(this.buildKey(key), JSON.stringify(value));
    }

    this.subjects.property(type)[key].next(value);
  }
}
