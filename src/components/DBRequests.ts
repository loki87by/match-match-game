import { UserData, DbElement } from '../consts/types';
import { createErrorPopup, displayScores } from '../consts/helpers';

class DBRequest {
  db: any;

  score: number;

  cursorKey: number;

  constructor() {
    this.score = NaN;
    this.cursorKey = NaN;
    this.db = '';
  }

  initial = () => {
    const dbReq = indexedDB.open('loki87by', 1);
    dbReq.onsuccess = (event: Event) => {
      this.db = (event.target as DbElement).result;
    };
    dbReq.onupgradeneeded = (event) => {
      this.db = (event.target as DbElement).result;
      this.db.createObjectStore('users', { keyPath: 'email', autoIncrement: true });
    };
    dbReq.onsuccess = (event) => {
      this.db = (event.target as DbElement).result;
    };
    dbReq.onerror = (event) => {
      createErrorPopup(event);
    };
  };

  addUser = (data: UserData, func: Function) => {
    const tx = this.db.transaction(['users'], 'readwrite');
    const store = tx.objectStore('users');
    store.put(data);
    tx.oncomplete = () => {
      func();
    };
    tx.onerror = (event: Event) => {
      createErrorPopup(event);
    };
  };

  getNote(data: UserData) {
    const tx = this.db.transaction(['users'], 'readwrite');
    const store = tx.objectStore('users');
    const user = store.get(data.email);
    user.onsuccess = (event: any) => {
      this.score = event.target.result.score;
      return this.score;
    };
    user.onerror = (event: Event) => {
      createErrorPopup(event);
    };
  }

  getAndDisplayScores = () => {
    const tx = this.db.transaction(['users'], 'readonly');
    const store = tx.objectStore('users');
    const req = store.getAll();
    const topNotes: Object[] = [];
    req.onsuccess = (event: any) => {
      const notes = event.target.result;
      notes.sort((a: UserData, b: UserData) => ((a.score || 0) < (b.score || 0) ? 1 : -1));
      for (let i = 0; i < 10; i += 1) {
        topNotes.push(notes[i]);
      }
      displayScores(topNotes);
    };
    req.onerror = (event: ErrorEvent) => {
      createErrorPopup(event);
    };
  };

  updateScore(data: UserData) {
    const tx = this.db.transaction(['users'], 'readwrite');
    const store = tx.objectStore('users');
    store.put(data);
    tx.onerror = (event: Event) => {
      createErrorPopup(event);
    };
  }
}

const dbr = new DBRequest();

export default dbr;
