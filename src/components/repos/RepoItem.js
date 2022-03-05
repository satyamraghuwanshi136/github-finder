import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repos }) => {
  return repos.map((repo) => (
    <div className="card">
      <h4>
        <a className="text-primary" href={repo.html_url}>
          {repo.name}
        </a>
      </h4>
    </div>
  ));
};

RepoItem.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoItem;
