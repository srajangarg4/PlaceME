import React from 'react';

const File = ({
  id,
  error,
  label,
  value,
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
        type="file"
        id={name}
        className={` ${error && 'is-invalid'} ${inputFieldClassName}`}
        onChange={(e) => onChange(e?.target?.files?.[0])}
        disabled={disabled}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

File.defaultProps = {
  labelClassName: 'text-muted',
  inputFieldClassName: 'form-control-file',
  disabled: false,
  containerClassName: '',
};

export default File;
