import "./Button.css";

export default function Button({ type = "button", label, onClick }) {
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     // espaço também pode ativar
  //     onClick?.(e);
  //   }
  // };

  return (
    <button
      type={type}
      onClick={onClick}
      // onKeyDown={handleKeyDown}
      className="button"
    >
      {label}
    </button>
  );
}
