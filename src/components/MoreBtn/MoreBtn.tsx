import styles from './moreBtn.module.scss';

interface IMoreBtn {
  handleClick: () => void;
}

function MoreBtn({ handleClick }: IMoreBtn) {
  return (
    <button className={styles.moreBtn} type="button" onClick={handleClick}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </button>
  );
}

export default MoreBtn;
