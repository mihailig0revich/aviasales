import { FC, ReactElement, ReactNode, useState } from 'react';

import { IAction } from '../../types/types';

import styles from './checkBox.module.scss';

interface ICheckBox {
  children: ReactNode | ReactElement;
  check: boolean;
  changeCheck: () => IAction;
}

function CheckBox({ children, check, changeCheck }: ICheckBox) {
  return (
    <label className={styles.container}>
      <input type="checkbox" onChange={changeCheck} checked={check} />
      <span className={styles.checkmark}></span>
      <p className={styles.text}>{children}</p>
    </label>
  );
}

export default CheckBox;
