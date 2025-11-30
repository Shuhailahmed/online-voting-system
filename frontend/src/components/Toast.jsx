import { useEffect } from "react";

export default function Toast({
  open,
  type = "success",
  message = "",
  onClose,
  timeout = 3500,
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      onClose?.();
    }, timeout);
    return () => clearTimeout(t);
  }, [open, timeout, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast toast-${type}`}
      onClick={() => onClose?.()}
    >
      <div className="toast-content">
        <strong className="toast-title">
          {type === "success" ? "Success" : "Notice"}
        </strong>
        <div className="toast-message">{message}</div>
      </div>
      <button
        className="toast-close"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        ✕
      </button>
    </div>
  );
}
