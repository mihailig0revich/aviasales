import styles from './error.module.scss';

interface IError {
  errorText: string;
}

function Error({ errorText }: IError) {
  return (
    <div>
      <p className={styles.errorStyle}>{errorText}</p>
    </div>
  );
}

export default Error;
