import React from 'react';

const Button = ({
  text,
  iconName,
  iconProps,
  buttonClassName,
  loading,
  onClick,
  fullWidth,
  className,
  type,
  ...extraProps
}) => {
  return (
    <button
      className={`btn ${className} ${
        fullWidth && 'btn-block'
      } d-flex align-items-center justify-content-center`}
      onClick={onClick}
      disabled={loading}
      type={type}
      {...extraProps}
    >
      {loading ? (
        <div className="spinner-border spinner-border-sm mx-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <span className="material-icons" {...iconProps}>
            {iconName}
          </span>
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  className: 'btn-primary',
  fullWidth: false,
  loading: false,
  type: 'button',
};

export default Button;
