import { NavLink } from 'react-router-dom';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>TEST</div>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to='/categories/top'>
              Top
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/categories/business'>
              Business
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
