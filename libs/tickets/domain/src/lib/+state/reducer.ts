import {createFeature, createReducer, on} from '@ngrx/store';
import {Flight, initFlight} from '../entities/flight';
import {ticketsActions} from "./actions";
import {Passenger} from "../entities";
import {FlightTicket} from "../entities/flight-ticket";


export type PassengerState = Omit<Passenger, 'tickets'> & {
  ticketIds: number[];
};

// Store passengerId and flightId instead of passenger and flight
export type FlightTicketState = Omit<FlightTicket, 'passenger' | 'flight'> & {
  passengerId: number;
  flightId: number;
};

export interface TicketsState {
  flights: Flight[];
  basket: unknown;
  flightToEdit: Flight;
  hide: number[];

  passengers: Record<number, PassengerState>;
  passengerIds: number[];

  flightTickets: Record<number, FlightTicketState>;
  flightTicketIds: number[];
}


export const initialState: TicketsState = {
  flights: [],
  basket: {},
  flightToEdit: initFlight,
  hide: [314],
  passengers: {
    17: {id: 17, firstName: 'John', lastName: 'Doe', ticketIds: [107, 109]},
    24: {id: 24, firstName: 'Jane', lastName: 'Doe', ticketIds: [108, 110]},
  },
  passengerIds: [17, 24],

  flightTickets: {
    107: {id: 107, flightId: 1, passengerId: 17, price: 317},
    108: {id: 108, flightId: 1, passengerId: 24, price: 317},
    109: {id: 109, flightId: 2, passengerId: 17, price: 294},
    110: {id: 110, flightId: 2, passengerId: 24, price: 294},
  },
  flightTicketIds: [107, 108, 109, 110],
};

export const ticketsFeature = createFeature({
  name: 'tickets',
  reducer: createReducer(
    initialState,
    on(ticketsActions.flightsLoaded, (state, {flights}) => ({...state, flights})),
    on(ticketsActions.updateFlight, (state, {flight}) => ({
      ...state,
      flights: [...state.flights.filter(({id}) => id == flight.id), flight]
    })),
    on(ticketsActions.flightLoaded, (state, {flight}) => ({...state, flightToEdit: flight,})),
    on(ticketsActions.clearFlights, (state) => ({...state, flights: []}))
  ),
});
