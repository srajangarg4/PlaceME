import React from 'react';
import Icon from './icon';

const Badge = ({ text, className, show, onClick }) => {
  return (
    <span
      className={`badge badge-pill badge-primary py-1 px-4 ${className}`}
      onClick={onClick}
    >
      {show && <Icon name="done" />}
      {text}
    </span>
  );
};

Badge.defaultProps = {
  className: '',
  show: false,
};

export default Badge;
