export type sortType = 'cheap' | 'fast';

export interface IState {
  sortBy: sortType;
  flightOptions: Array<any>;
  transferAll: boolean;
  transferFilter: Array<boolean>;
  searchId: string;
  searchIdError: boolean;
  searchIdErrorText: string;
  ticketsError: boolean;
  ticketsErrorText: string;
  searchIdLoader: boolean;
  ticketsLoader: boolean;
  isLoadedAllTickets: boolean;
}

export interface ITrip {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops: string[];
}

export interface IFlightCard {
  carrier: string;
  price: number;
  segments: [ITrip, ITrip];
}

export interface IAction {
  type: string;
  payload?: any;
}
