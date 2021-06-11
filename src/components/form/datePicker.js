import React from 'react';
import { getFormattedDate } from 'utils';

const DatePicker = ({
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
  required,
  name,
  value,
  ...extraProps
}) => {
  if(value instanceof Date) {
    value = getFormattedDate("yyyy-mm-dd", value);
  }
  return (
    <div className={`form-group ${containerClassName}`}>
      <label
        htmlFor={name}
        className={`${labelClassName} ${required ? 'required' : ''}`}
      >
        {label}
      </label>
      <input
        className={`${error && 'is-invalid'} ${inputFieldClassName}`}
        onChange={(e) => onChange(new Date(e.target.value))}
        id={name}
        disabled={disabled}
        type="date"
        value={value}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

DatePicker.defaultProps = {
  labelClassName: 'text-muted',
  inputFieldClassName: 'form-control',
  disabled: false,
  containerClassName: '',
  required: false,
};

export default DatePicker;
