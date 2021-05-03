import React from 'react';

const Input = ({
  error,
  styles,
  iconName,
  errorMessage,
  className,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${styles ?? ''}`}>
      {/* {iconName && (
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="material-icons">{iconName}</i>
          </span>
        </div>
      )} */}

      <input
        className={` ${error && 'is-invalid'} ${className ?? ''}`}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Input;
