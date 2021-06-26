import React from 'react';

const MultipleSelect = ({
  error,
  label,
  errorMessage,
  containerClassName,
  inputFieldClassName,
  labelClassName,
  disabled,
  onChange,
  options,
  name,
  divClassName,
  value,
  labelFieldClassName,
  required,
}) => {

  return (
    <div className={`form-group ${containerClassName}`}>
      <label
        htmlFor={name}
        className={`${labelClassName} ${required ? 'required' : ''}`}
      >
        {label}
      </label>
      <br />
      {options?.map((item, index) => {
        const checked = value?.includes(item?.value)
        return (
          <div className={divClassName} key={index.toString()}>
            <input
              className={inputFieldClassName}
              type="checkbox"
              disabled={disabled ? true : false}
              id={name + index.toString()}
              onChange={() => {
                checked
                  ? onChange(value?.filter(itm => itm !== item?.value))
                  : onChange([...value, item?.value])
              }}
              value={item.value}
              checked={checked}
            />
            <label
              className={labelFieldClassName}
              htmlFor={name + index.toString()}
            >
              {item?.text}
            </label>
          </div>
        );
      })}
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

MultipleSelect.defaultProps = {
  labelClassName: 'text-muted',
  divClassName: 'custom-control custom-checkbox custom-control-inline',
  inputFieldClassName: 'custom-control-input',
  labelFieldClassName: 'custom-control-label text-muted',
  disabled: false,
  containerClassName: '',
  required: false,
  options: [],
  value:[]
};

export default MultipleSelect;
