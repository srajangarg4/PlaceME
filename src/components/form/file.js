const File = ({
  error,
  styles,
  iconName,
  errorMessage,
  className,
  value,
  onChange,
  ...extraProps
}) => {
  return (
    <div className={`form-group ${styles ?? ''}`}>
      <input
        type="file"
        className={` ${error && 'is-invalid'} ${className ?? ''}`}
        onChange={(e) => onChange(e?.target?.files?.[0])}
        {...extraProps}
      />
      <div className="help-block">
        {error && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};

export default File;
