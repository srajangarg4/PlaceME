import { addToast } from 'actions';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from 'store';

export const showToast = (type, message) => {
  if (type && message) {
    dispatch(addToast({ type, message }));
  }
};

export const showSuccess = (message) => showToast('Success', message);

export const showError = (error) => showToast('Error', error?.message);

const Toast = () => {
  const toast = useSelector((state) => state.toast);
  useEffect(() => {
    if (toast !== null) {
      window.jquery('#liveToast').toast('show');
    }
    console.log('Toast RenderHua hai', toast);
  }, [toast]);
  return (
    <div
      className="position-fixed top-0 right-0 p-3"
      style={{ zIndex: 5, right: 0, top: 0 }}
    >
      <div
        id="liveToast"
        className="toast fade hide"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-delay="2000"
      >
        <div className="toast-header">
          <img src="..." className="rounded mr-2" alt="..." />
          <strong className="mr-auto">{toast?.type}</strong>
          <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{toast?.message}</div>
      </div>
    </div>
  );
};

export default Toast;
