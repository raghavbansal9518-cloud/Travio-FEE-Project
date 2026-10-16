import React from 'react';

export default function ToastNotification({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-notifications-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`travio-toast-item toast-${toast.type || 'success'}`}>
          <div className="toast-icon">
            {toast.type === 'error' ? (
              <i className="fa-solid fa-circle-exclamation"></i>
            ) : toast.type === 'info' ? (
              <i className="fa-solid fa-circle-info"></i>
            ) : toast.type === 'warning' ? (
              <i className="fa-solid fa-triangle-exclamation"></i>
            ) : (
              <i className="fa-solid fa-circle-check"></i>
            )}
          </div>
          <div className="toast-body">
            <strong>{toast.title}</strong>
            <p>{toast.message}</p>
          </div>
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss toast"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
