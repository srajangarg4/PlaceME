import React from 'react';

const Button = ({
  text,
  isIcon,
  iconName,
  iconProps,
  loading,
  onClick,
  className,
  ...extraProps
}) => {
  return (
    <button
      className={`btn ${!isIcon ? 'btn-primary' : ''} ${
        className ?? ''
      } d-flex align-items-center
        justify-content-center
        `}
      onClick={onClick}
      disabled={loading}
      {...extraProps}
    >
      {loading ? (
        <div className="spinner-border spinner-border-sm mx-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <span className="material-icons" {...iconProps}>
          {iconName}
        </span>
      )}
      <span>{text}</span>
    </button>
  );
};

export default Button;
