import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RepoItem from './RepoItem';

const Repos = (props) => {
  const { repos } = props;
  return (
    <Fragment>
      <h2>Recent repositories:</h2>
      <RepoItem repos={repos} />
    </Fragment>
  );
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
