import styles from './Nav.module.scss';
import { NavLink } from 'react-router-dom';
import { isAuthenticated } from './NavService';

const Nav = () => {
  let innerContent = null;
  if (isAuthenticated()) {
    <>
      <NavLink activeClassName={styles.activeLink} to='/profile'>
        Профіль
      </NavLink>
      <NavLink activeClassName={styles.activeLink} to='/lectures'>
        Лекції
      </NavLink>
      <NavLink activeClassName={styles.activeLink} to='/assignments'>
        Завдання
      </NavLink>
    </>;
  } else {
    innerContent = (
      <>
        <NavLink activeClassName={styles.activeLink} to='/login'>
          Увійти
        </NavLink>
        <NavLink activeClassName={styles.activeLink} to='/registration'>
          Реєстрація
        </NavLink>
      </>
    );
  }
  return <nav className={styles.nav}>{innerContent}</nav>;
};

export default Nav;
