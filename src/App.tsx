import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './App.module.scss';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Body from './components/Body/Body';
import { IState } from './types/types';
import { asyncGetId, asyncGetTickets } from './redux/actions';
import Loader from './components/Loader/Loader';
import Error from './components/Error/Error';

interface IApp {
  getId: () => void;
  getTickets: (i: string) => void;
  searchId: string;
  loadId: boolean;
  error: boolean;
  errorText: string;
}

function App({ getId, searchId, getTickets, loadId, error, errorText }: IApp) {
  useEffect(() => {
    getId();
  }, [getId]);
  useEffect(() => {
    if (searchId) {
      getTickets(searchId);
    }
  }, [getTickets, searchId]);

  if (loadId) {
    return <Loader />;
  }

  if (error) {
    <Error errorText={errorText} />;
  }

  return (
    <div className={styles.App}>
      <Header />
      <Body />
      <SideBar />
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    searchId: state.searchId,
    loadId: state.searchIdLoader,
    error: state.searchIdError,
    errorText: state.searchIdErrorText,
  };
};

export default connect(mapStateToProps, { getId: asyncGetId, getTickets: asyncGetTickets })(App);
