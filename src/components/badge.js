import React from 'react';
import Icon from './icon';

const Badge = ({ text, className, selected, onClick }) => {
  return (
    <span
      className={`badge badge-pill badge-primary py-1 px-4 ${className}`}
      onClick={onClick}
    >
      {selected && <Icon name="done" />}
      {text}
    </span>
  );
};

Badge.defaultProps = {
  className: '',
  selected: false,
};

export default Badge;
