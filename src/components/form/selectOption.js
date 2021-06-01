import React from 'react';

const SelectOption = ({
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
  options,
  name,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${containerClassName}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <select
        className={`${error && 'is-invalid'} ${inputFieldClassName}`}
        id={name}
        onChange={onChange}
        disabled={disabled}
        {...extraProps}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

SelectOption.defaultProps = {
  labelClassName: 'text-muted',
  inputFieldClassName: 'form-control',
  disabled: false,
  containerClassName: '',
};

export default SelectOption;
