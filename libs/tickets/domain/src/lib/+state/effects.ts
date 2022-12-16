import {Actions, createEffect, ofType} from '@ngrx/effects';

import {inject, Injectable} from '@angular/core';
import {FlightService} from '../infrastructure/flight.service';
import {ticketsActions} from './actions';
import {catchError, map, switchMap, tap, throwError} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class TicketsEffects {
  flightService = inject(FlightService);
  actions$ = inject(Actions);
  snackBar = inject(MatSnackBar);

  loadFlights = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketsActions.loadFlights),
      switchMap(({from, to}) => this.flightService.find(from, to)),
      map((flights) => ticketsActions.flightsLoaded({flights}))
    )
  );

  loadFlightById = createEffect(() =>
    this.actions$.pipe(
      ofType(ticketsActions.loadFlightById),
      switchMap(({id}) => this.flightService.findById(id)),
      map((flight) => ticketsActions.flightLoaded({flight}))
    )
  );

  saveFlight = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ticketsActions.saveFlight),
        switchMap(({flight}) => this.flightService.save(flight)),
        tap(() => this.snackBar.open('Flight successfully saved!')),
        catchError((err) => {
          this.snackBar.open('Error saving Flight!');
          return throwError(() => err);
        })
      ),
    {
      dispatch: false,
    }
  );
}
