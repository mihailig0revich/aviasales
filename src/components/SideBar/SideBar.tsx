import { connect } from 'react-redux';

import FilterPanel from '../FilterPanel/FilterPanel';
import { IAction, IState } from '../../types/types';
import { changeFilter, filterAll } from '../../redux/actions';

import styles from './sideBar.module.scss';

interface ISideBar {
  checkAll: boolean;
  checkTransfers: Array<boolean>;
  dispatchChangeFilter: (i: number) => IAction;
  dispatchFilterAll: () => IAction;
}

function SideBar({ checkAll, checkTransfers, dispatchChangeFilter, dispatchFilterAll }: ISideBar) {
  return (
    <div className={styles.sideBar}>
      <FilterPanel
        checkAll={checkAll}
        checkTransfers={checkTransfers}
        changeFilter={dispatchChangeFilter}
        filterAll={dispatchFilterAll}
      />
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    checkAll: state.transferAll,
    checkTransfers: state.transferFilter,
  };
};

export default connect(mapStateToProps, { dispatchChangeFilter: changeFilter, dispatchFilterAll: filterAll })(SideBar);
