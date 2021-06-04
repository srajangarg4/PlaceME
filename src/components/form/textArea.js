import React from 'react';

const TextArea = ({
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
  ...extraProps
}) => {
  return (
    <div className={`form-group ${containerClassName}`}>
      <label
        htmlFor={name}
        className={`${labelClassName} ${required ? 'required' : ''}`}
      >
        {label}
      </label>
      <textarea
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

TextArea.defaultProps = {
  labelClassName: 'text-muted',
  inputFieldClassName: 'form-control',
  disabled: false,
  containerClassName: '',
  required: false,
};

export default TextArea;
