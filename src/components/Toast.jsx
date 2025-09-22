import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import IconButton from "./IconButton";
import "./Toast.css";

export default function Toast({
  type = "success",
  message,
  duration = 8000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  let icon;
  if (type === "success") icon = <FaCheckCircle />;
  else if (type === "error") icon = <FaTimesCircle />;
  else if (type === "sending") icon = <ImSpinner2 className="spinner" />;

  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">{icon}</span>
      <span className="toast-message">{message}</span>
      {type !== "sending" && (
        <IconButton
          onClick={onClose}
          ariaLabel="Fechar modal"
          icon={<IoClose size={24} />}
          className="modal-close"
        />
      )}
    </div>
  );
}
