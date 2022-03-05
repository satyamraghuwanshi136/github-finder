import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={props.icon}></i> {props.title}
      </h1>
      <ul>
        <li>
          <NavLink exact to="/">
            home
          </NavLink>
          <NavLink exact to="/about">
            about
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'github finder',
  icon: 'fab fa-github',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
