import React from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = (props) => {
  if (props.loading) {
    return <Spinner />;
  } else if (props.warning) {
    return (
      props.warning && (
        <div className={`text-danger `}>
          <i className="fas fa-info-circle"></i> No user found
        </div>
      )
    );
  } else {
    return (
      <div id="myStyles">
        {props.users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    );
  }
};

Users.propTypes = {
  user: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

const myStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
