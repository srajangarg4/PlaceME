import React from 'react';

const SelectOption = ({
  error,
  styles,
  iconName,
  errorMessage,
  className,
  options,
  onChange,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${styles ?? ''}`}>
      <select
        className={`form-control ${error && 'is-invalid'} ${className ?? ''}`}
        onChange={onChange}
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

export default SelectOption;
