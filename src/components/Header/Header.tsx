import Logo from '../../img/Logo.svg';

import styles from './header.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <img alt="asd" className={styles.logo} src={Logo} />
    </div>
  );
}

export default Header;
