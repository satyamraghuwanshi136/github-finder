import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
  const { login, id, avatar_url, html_url } = props.user;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`/users/${login}`} className="btn btn-dark btn-sm my-1">
          more
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
