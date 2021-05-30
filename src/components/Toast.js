import React from 'react';

const Toast = ({ message, heading, headingIcon, headerClassName, show }) => {
  return (
    show && (
      <div
        className="position-fixed bottom-0 right-0 p-3"
        style={{ zIndex: 5, right: 0, bottom: 0 }}
      >
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="100"
        >
          <div className="toast-header">
            <img src="..." className="rounded mr-2" alt="..." />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    )
  );
};

export default Toast;
