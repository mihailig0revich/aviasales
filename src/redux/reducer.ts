import { IAction, IState } from '../types/types';

export enum actionTypes {
  SORT = 'SORT',
  FILTER_ALL = 'FILTER_ALL',
  CHANGE_FILTER = 'CHANGE_FILTER',
  ID_ERROR = 'ID_ERROR',
  TICKETS_ERROR = 'TICKETS_ERROR',
  GET_ID = 'GET_ID',
  GET_TICKETS = 'GET_TICKETS',
  IS_LOADED_TICKETS = 'IS_LOADED_TICKETS',
  IS_LOADED_ID = 'IS_LOADED_ID',
  IS_LOADED_ALL_TICKETS = 'IS_LOADED_ALL_TICKETS',
}

const initialState: IState = {
  sortBy: 'fast',
  flightOptions: [],
  transferAll: true,
  transferFilter: [true, true, true, true],
  searchId: '',
  searchIdError: false,
  searchIdErrorText: '',
  searchIdLoader: false,
  ticketsError: false,
  ticketsErrorText: '',
  ticketsLoader: false,
  isLoadedAllTickets: false,
};

function reducer(state = initialState, action: IAction): IState {
  switch (action.type) {
    case actionTypes.SORT:
      return { ...state, sortBy: action.payload };
    case actionTypes.FILTER_ALL:
      return {
        ...state,
        transferAll: !state.transferAll,
        transferFilter: state.transferFilter.map(() => !state.transferAll),
      };
    case actionTypes.CHANGE_FILTER: {
      const temp = state.transferFilter.map((item, index) => (index === action.payload ? !item : item));
      const filter = temp.filter((item) => item).length;
      if (filter === 0 || filter === 4) {
        return { ...state, transferFilter: temp, transferAll: temp[0] };
      }
      return { ...state, transferFilter: temp, transferAll: false };
    }
    case actionTypes.ID_ERROR:
      return { ...state, searchIdError: true, searchIdErrorText: action.payload };
    case actionTypes.TICKETS_ERROR:
      return { ...state, ticketsError: true, ticketsErrorText: action.payload };
    case actionTypes.GET_ID:
      return { ...state, ticketsError: false, searchIdError: false, searchId: action.payload };
    case actionTypes.GET_TICKETS:
      return {
        ...state,
        ticketsError: false,
        searchIdError: false,
        flightOptions: [...state.flightOptions, ...action.payload],
      };
    case actionTypes.IS_LOADED_TICKETS:
      return { ...state, ticketsError: false, searchIdError: false, ticketsLoader: action.payload };
    case actionTypes.IS_LOADED_ID:
      return { ...state, ticketsError: false, searchIdError: false, searchIdLoader: action.payload };
    case actionTypes.IS_LOADED_ALL_TICKETS:
      return { ...state, ticketsError: false, searchIdError: false, isLoadedAllTickets: action.payload };
    default:
      return state;
  }
}

export default reducer;
