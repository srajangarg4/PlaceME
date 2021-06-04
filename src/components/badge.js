import React from 'react';

const Badge = ({ text, className }) => {
  return (
    <span className={`badge badge-pill badge-primary py-1 px-4 ${className}`}>
      {text}
    </span>
  );
};

Badge.defaultProps = {
  className: '',
};

export default Badge;
