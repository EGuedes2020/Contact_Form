import "./IconButton.css";

export default function IconButton({
  onClick,
  ariaLabel,
  icon,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`icon-button ${className}`}
    >
      {icon}
    </button>
  );
}
