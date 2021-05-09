import styles from './Nav.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { getSubjectId, handleLogout } from './NavService';
import { isAuthenticated } from '../../guards/isAuthenticated';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [subjectId, setSubjectId] = useState(undefined);
  let innerContent = null;
  let location = useLocation();

  useEffect(() => {
    setSubjectId(getSubjectId());
  }, [location]);

  if (isAuthenticated()) {
    innerContent = (
      <>
        <NavLink activeClassName={styles.activeLink} to='/profile'>
          Профіль
        </NavLink>
        <NavLink activeClassName={styles.activeLink} exact to='/subjects'>
          Предмети
        </NavLink>
        <NavLink
          activeClassName={styles.activeLink}
          exact
          to={`/subjects/${subjectId}/lectures`}
        >
          Лекції
        </NavLink>
        <NavLink
          activeClassName={styles.activeLink}
          to={`/subjects/${subjectId}/assignments`}
        >
          Завдання
        </NavLink>
        <NavLink
          className={styles.logoutBtn}
          onClick={handleLogout}
          to='/login'
        >
          Вийти
        </NavLink>
      </>
    );
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
