import React from 'react';

const Alert = (props) => {
  let { alert } = props;
  return (
    alert !== null && (
      <div className={`alert alert-` + alert.type}>
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    )
  );
};

export default Alert;
