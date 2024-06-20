import { connect } from 'react-redux';
import { useCallback } from 'react';

import CardList from '../CardList/CardList';
import SortPanel from '../SortPanel/SortPanel';
import { IAction, IFlightCard, IState, sortType } from '../../types/types';
import { sortFlight } from '../../redux/actions';
import { cardFilter, sortCheap, sortFast } from '../../utils/utils';
import Loader from '../Loader/Loader';

import styles from './body.module.scss';

interface IMyBody {
  sortBy: sortType;
  dispatchSortFlight: (i: sortType) => IAction;
  flight: IFlightCard[];
  loadAll: boolean;
  loadFirst: boolean;
  error: boolean;
  errorText: string;
}

function Body({ sortBy, dispatchSortFlight, flight, loadAll, loadFirst, error, errorText }: IMyBody) {
  const flightFast = useCallback(() => sortFast(flight), [flight]);
  const flightCheap = useCallback(() => sortCheap(flight), [flight]);

  const readyData = sortBy === 'fast' ? flightFast() : flightCheap();
  const loadAllData = loadAll && !loadFirst && <Loader />;
  const loadFirstData = loadFirst ? <Loader /> : <CardList error={error} errorText={errorText} flight={readyData} />;

  return (
    <div className={styles.body}>
      <SortPanel sortBy={sortBy} sortFlight={dispatchSortFlight} />
      {loadAllData}
      {loadFirstData}
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  const filterFlight: IFlightCard[] = cardFilter(state.flightOptions, state.transferAll, state.transferFilter);
  return {
    sortBy: state.sortBy,
    flight: filterFlight,
    loadAll: state.isLoadedAllTickets,
    loadFirst: state.ticketsLoader,
    error: state.ticketsError,
    errorText: state.ticketsErrorText,
  };
};

export default connect(mapStateToProps, { dispatchSortFlight: sortFlight })(Body);
