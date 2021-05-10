import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

const Toast = ({ message, heading, headingIcon, headerClassName }) => {
    const buttonRef = useRef(null);
    console.log("Toast")
    useEffect(() => {
        console.log(buttonRef.current.click)
    }, [])
    return (
    <div
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <Icon className="rounded mr-2" />
        <strong className="mr-auto">{heading}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          ref={buttonRef}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">Hello, world! This is a toast message.</div>
    </div>
  );
};

export default Toast;
