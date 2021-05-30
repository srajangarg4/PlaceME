import React from 'react';

const Input = ({
  error,
  styles,
  iconName,
  errorMessage,
  className,
  onChange,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${styles ?? ''}`}>
      <input
        className={` ${error && 'is-invalid'} ${className ?? ''}`}
        onChange={(e) => onChange(e.target.value)}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Input;
