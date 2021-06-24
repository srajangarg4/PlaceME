import React from 'react';

const Checkbox = ({
  error,
  errorMessage,
  containerClassName,
  inputClassName,
  labelClassName,
  disabled,
  onChange,
  name,
  label,
  divClassName,
  value,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${containerClassName}`}>
      <div className={divClassName}>
        <input
          className={inputClassName}
          type="checkbox"
          id={name}
          disabled={disabled ? true : false}
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
          {...extraProps}
        />
        <label className={labelClassName} htmlFor={name}>
          {label}
        </label>
      </div>
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

Checkbox.defaultProps = {
  divClassName: 'custom-control custom-checkbox',
  inputClassName: 'custom-control-input',
  labelClassName: 'custom-control-label text-muted',
  disabled: false,
  containerClassName: '',
  required: false,
};

export default Checkbox;
