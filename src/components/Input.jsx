import Label from "./Label";
import "./Input.css";

export default function Input({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  ...props
}) {
  const renderError = () => {
    if (!error) return null;

    // Se for array de erros, mostrar cada um em linha separada
    if (Array.isArray(error)) {
      return (
        <div
          id={`${id}-error`}
          role="alert"
          className="input-error-message"
          novalidate
        >
          {error.map((err, i) => (
            <span key={i} style={{ display: "block" }}>
              {err}
            </span>
          ))}
        </div>
      );
    }

    // Se for string, apenas uma linha
    return (
      <p id={`${id}-error`} role="alert" className="input-error-message">
        {error}
      </p>
    );
  };

  return (
    <div className="input-wrapper">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input ${error ? "input-error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {renderError()}
    </div>
  );
}
