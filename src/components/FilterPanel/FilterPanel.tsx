import CheckBox from '../CheckBox/CheckBox';
import { IAction } from '../../types/types';

import styles from './filterPanel.module.scss';

interface IFilterPanel {
  checkAll: boolean;
  checkTransfers: Array<boolean>;
  changeFilter: (i: number) => IAction;
  filterAll: () => IAction;
}

function FilterPanel({ checkAll, checkTransfers, changeFilter, filterAll }: IFilterPanel) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
      <CheckBox check={checkAll} changeCheck={filterAll}>
        Все
      </CheckBox>
      <CheckBox check={checkTransfers[0]} changeCheck={() => changeFilter(0)}>
        Без пересадок
      </CheckBox>
      <CheckBox check={checkTransfers[1]} changeCheck={() => changeFilter(1)}>
        1 пересадка
      </CheckBox>
      <CheckBox check={checkTransfers[2]} changeCheck={() => changeFilter(2)}>
        2 пересадки
      </CheckBox>
      <CheckBox check={checkTransfers[3]} changeCheck={() => changeFilter(3)}>
        3 пересадки
      </CheckBox>
    </div>
  );
}

export default FilterPanel;
