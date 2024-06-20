import { IAction, sortType } from '../../types/types';

import styles from './sortPanel.module.scss';

interface ISortPanel {
  sortBy: sortType;
  sortFlight: (i: sortType) => IAction;
}

function SortPanel({ sortBy, sortFlight }: ISortPanel) {
  return (
    <div className={styles.sortPanel}>
      <button
        type="button"
        onClick={() => sortFlight('fast')}
        className={`${styles.btn} ${styles.left} ${sortBy === 'fast' ? styles.btn_active : ' '}`}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        type="button"
        onClick={() => sortFlight('cheap')}
        className={`${styles.btn} ${sortBy === 'cheap' ? styles.btn_active : ' '}`}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
    </div>
  );
}

export default SortPanel;
