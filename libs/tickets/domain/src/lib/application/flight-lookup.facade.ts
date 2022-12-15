import {inject, Injectable} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {Flight} from '../entities/flight';
import {FlightService} from '../infrastructure/flight.service';

@Injectable({providedIn: 'root'})
export class FlightLookupFacade {
  flightService = inject(FlightService);
  readonly online$ = interval(2000).pipe(
    startWith(-1),
    tap((v) => console.log('counter', v)),
    map(() => Math.random() < 0.5),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: true})
  );
  // Source
  private input$ = new BehaviorSubject<string>('');
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // Sinks
  readonly loading$ = this.loadingSubject.asObservable();

  readonly flights$ = combineLatest({
    input: this.input$,
    online: this.online$,
  }).pipe(
    filter(({online}) => online),
    tap(() => this.loadingSubject.next(true)),
    switchMap(({input}) => this.load(input)),
    tap(() => this.loadingSubject.next(false))
  );
  private errorSubject = new BehaviorSubject<unknown>({});
  readonly error$ = this.errorSubject.asObservable();

  lookup(filter: string): void {
    this.input$.next(filter);
  }

  private load(filter: string): Observable<Flight[]> {
    if (!filter) {
      return of([]);
    }

    return this.flightService.find(filter, '').pipe(
      catchError((err) => {
        this.errorSubject.next(err);
        return of([]);
      })
    );
  }
}
