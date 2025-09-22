import Label from "./Label";
import "./Textarea.css";

export default function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  ...props
}) {
  return (
    <div className="textarea-wrapper">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`textarea ${error ? "textarea-error" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="textarea-error-message">
          {error}
        </p>
      )}
    </div>
  );
}
