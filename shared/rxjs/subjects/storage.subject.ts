import { Observable, Subject, Subscriber, Subscription, take } from 'rxjs';
import { Observer } from 'rxjs/internal/types';

export interface StorageSubjectConfig {
  stopOnError?: boolean;
  takeFirst?: boolean;
  instantInit?: boolean;
}


interface Config {
  stopOnError: boolean;
  take: number;
}

export class StorageSubject<T> extends Subject<T> {
  initialized: boolean = false;
  value!: T;
  config: Config;

  private _subscribtions: Subscription[] = [];

  constructor(
    private init$: () => Observable<T>,
    { stopOnError = false, takeFirst = true, instantInit = false }: StorageSubjectConfig,
  ) {
    super();
    this.config = { stopOnError, take: takeFirst ? 1 : 0 };
    if (instantInit) {
      this.initialized = true;
      this.load();
    }
  }

  reload(): void {
    this.load();
  }

  nextObservable(observable: Observable<T>, takeAmount: number = this.config.take): void {
    takeAmount > 0 && (observable = observable.pipe(take(takeAmount)));
    this._subscribtions.push(
      observable.subscribe({ next: this.next.bind(this), error: this.error.bind(this) }),
    );
  }

  override next(value: T): void {
    this.value = value;
    super.next(value);
  }

  override error(err: any): void {
    this.config.stopOnError && super.error(err);
  }

  // noinspection JSUnusedGlobalSymbols
  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    if (!this.initialized) {
      this.initialized = true;
      this.load();
    }
    // @ts-ignore
    const subscription = super._subscribe(subscriber);
    !!this.value && subscriber.next(this.value);
    return subscription;
  }

  private load(): void {
    this.nextObservable(this.init$());
  }
}
