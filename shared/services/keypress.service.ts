import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeypressService {
  private keydown$ = new Subject<{ key: string; pressed: boolean }>();

  constructor() {
    document.onkeydown = ev => this.keydown$.next({ key: ev.key, pressed: true });
    document.onkeyup = ev => this.keydown$.next({ key: ev.key, pressed: false });
  }

  get control$(): Observable<{ key: string; pressed: boolean }> {
    return this.keydown$.pipe(filter(k => k.key === 'Control' || k.key === 'Meta'));
  }
}
