import React from 'react';
import { useState, useEffect } from 'react';

const initializeState = (options = [], value = []) => {
  const customSet = new Set(value);
  const obj = {};
  options.forEach(({ value } = {}, index) => {
    if (customSet.has(value)) {
      obj[index] = true;
    } else {
      obj[index] = false;
    }
  });
  console.log('Initaise', obj, options, value);
  return obj;
};

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
  const [state, setState] = useState(() => initializeState(options, value));
  console.log(value);
  useEffect(() => {
    const arr = [];
    Object.keys(state).forEach((key) => {
      if (state[key]) {
        arr.push(options[key].value);
      }
    });
    onChange(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
        return (
          <div className={divClassName} key={index.toString()}>
            <input
              className={inputFieldClassName}
              type="checkbox"
              disabled={disabled ? true : false}
              id={name + index.toString()}
              onChange={() => {
                setState({ ...state, [index]: !state[index] });
              }}
              value={item.value}
              checked={state[index]}
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
};

export default MultipleSelect;
