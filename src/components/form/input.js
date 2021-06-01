import React from 'react';

const Input = ({
  id,
  error,
  label,
  iconName,
  errorMessage,
  containerClassName,
  inputFieldClassName,
  labelClassName,
  disabled,
  onChange,
  name,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${containerClassName}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        className={`${error && 'is-invalid'} ${inputFieldClassName}`}
        onChange={(e) => onChange(e.target.value)}
        id={name}
        disabled={disabled}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

Input.defaultProps = {
  labelClassName: 'text-muted',
  inputFieldClassName: 'form-control',
  disabled: false,
  containerClassName: '',
};

export default Input;
