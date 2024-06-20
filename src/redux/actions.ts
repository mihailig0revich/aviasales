import { Dispatch } from 'redux';

import { IFlightCard, sortType } from '../types/types';

import { actionTypes } from './reducer';

interface FilterAll {
  type: actionTypes.FILTER_ALL;
}
interface SortFlight {
  type: actionTypes.SORT;
  payload: sortType;
}
interface ChangeFilter {
  type: actionTypes.CHANGE_FILTER;
  payload: number;
}
interface IdError {
  type: actionTypes.ID_ERROR;
  payload: string;
}
interface TicketsError {
  type: actionTypes.TICKETS_ERROR;
  payload: string;
}
interface GetId {
  type: actionTypes.GET_ID;
  payload: string;
}
interface GetTickets {
  type: actionTypes.GET_TICKETS;
  payload: IFlightCard[];
}
interface IsLoadedTickets {
  type: actionTypes.IS_LOADED_TICKETS;
  payload: boolean;
}
interface IsLoadedId {
  type: actionTypes.IS_LOADED_ID;
  payload: boolean;
}
interface IsLoadedAllTickets {
  type: actionTypes.IS_LOADED_ALL_TICKETS;
  payload: boolean;
}

export type AppActions =
  | FilterAll
  | SortFlight
  | ChangeFilter
  | IdError
  | TicketsError
  | GetId
  | GetTickets
  | IsLoadedTickets
  | IsLoadedId
  | IsLoadedAllTickets;

export const filterAll = (): AppActions => ({ type: actionTypes.FILTER_ALL });

export const sortFlight = (payload: sortType): AppActions => ({ type: actionTypes.SORT, payload });

export const changeFilter = (payload: number): AppActions => ({ type: actionTypes.CHANGE_FILTER, payload });

export const idError = (payload: string): AppActions => ({ type: actionTypes.ID_ERROR, payload });

export const ticketsError = (payload: string): AppActions => ({ type: actionTypes.TICKETS_ERROR, payload });

export const getId = (payload: string): AppActions => ({ type: actionTypes.GET_ID, payload });

export const getTickets = (payload: IFlightCard[]): AppActions => ({ type: actionTypes.GET_TICKETS, payload });

export const isLoadedTickets = (payload: boolean): AppActions => ({ type: actionTypes.IS_LOADED_TICKETS, payload });

export const isLoadedId = (payload: boolean): AppActions => ({ type: actionTypes.IS_LOADED_ID, payload });

export const isLoadedAllTickets = (payload: boolean): AppActions => ({
  type: actionTypes.IS_LOADED_ALL_TICKETS,
  payload,
});

export const asyncGetId = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(isLoadedId(true));
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search');
      if (!response.ok) {
        dispatch(idError('error occurred'));
        dispatch(isLoadedId(false));
        return;
      }
      const temp = await response.json();
      dispatch(getId(temp.searchId));
    } catch {
      dispatch(idError('error occurred'));
    }
    dispatch(isLoadedId(false));
  };
};

export const asyncGetTickets = (searchId = '') => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(isLoadedTickets(true));
    dispatch(isLoadedAllTickets(true));
    try {
      for (let i = 0; i < 5; i += 1) {
        const firstResp = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
        if (firstResp.ok) {
          const firstRespJson = await firstResp.json();
          dispatch(getTickets(firstRespJson.tickets));
          break;
        }
      }
    } catch (e: any) {
      dispatch(ticketsError('error occurred'));
    }
    dispatch(isLoadedTickets(false));

    let errorCount = 0;
    const stopWhile = false;
    let dataArr: IFlightCard[] = [];
    try {
      while (!stopWhile) {
        const resp = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
        if (resp.ok) {
          const respJson = await resp.json();
          if (respJson.stop) {
            break;
          }
          dataArr = [...dataArr, ...respJson.tickets];
          errorCount = 0;
        } else {
          errorCount += 1;
          if (errorCount >= 5) {
            dispatch(ticketsError('error occurred'));
            break;
          }
        }
      }
    } catch (e: any) {
      dispatch(ticketsError('error occurred'));
    }
    dispatch(getTickets(dataArr));
    dispatch(isLoadedAllTickets(false));
  };
};
