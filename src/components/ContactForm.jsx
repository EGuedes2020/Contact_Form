import { useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import Toast from "./Toast";
import "./Form.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Guarda erros campo a campo
  const [errors, setErrors] = useState({});
  // Estado do formulário ("" | "sending" | "success" | "error")
  const [status, setStatus] = useState("");
  // Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Função que devolve os erros de um campo
  function getFieldErrors(name, value) {
    const fieldErrors = [];

    switch (name) {
      case "name":
        if (!value.trim()) fieldErrors.push("O nome é obrigatório.");
        if (value.length > 0 && value.length < 2)
          fieldErrors.push("O nome deve ter pelo menos 2 caracteres.");
        if (value && !/^[\p{L}\s'-]+$/u.test(value))
          fieldErrors.push(
            "O nome não pode conter números ou caracteres especiais."
          );
        break;

      case "email":
        if (!value.trim()) fieldErrors.push("O email é obrigatório.");
        else if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          fieldErrors.push("Introduz um email válido (ex.: nome@mail.com).");
        break;

      case "message":
        if (!value.trim()) fieldErrors.push("A mensagem é obrigatória.");
        if (value.length > 0 && value.length < 10)
          fieldErrors.push("A mensagem deve ter pelo menos 10 caracteres.");
        break;

      default:
        break;
    }

    return fieldErrors;
  }

  // Aplica validação num campo
  function validateField(name, value) {
    const fieldErrors = getFieldErrors(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors.length > 0 ? fieldErrors : null,
    }));
  }

  // Valida todos os campos (usado no submit)
  function validateForm() {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const fieldErrors = getFieldErrors(key, value);
      if (fieldErrors.length > 0) newErrors[key] = fieldErrors;
    });
    return newErrors;
  }

  // onChange → comportamentos diferentes por campo
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name" || name === "email") {
      // Nome e email → só validamos em tempo real se já tinha erro antes
      if (errors[name]) validateField(name, value);
    }

    if (name === "message") {
      if (errors.message) {
        // Se já há erro → valida imediatamente
        validateField(name, value);
      } else {
        // Se ainda não mostrou erro → espera 3s antes de validar
        clearTimeout(window.messageTimeout);
        window.messageTimeout = setTimeout(() => {
          validateField(name, value);
        }, 3000);
      }
    }
  }

  // onBlur → valida sempre ao sair do campo
  function handleBlur(e) {
    const { name, value } = e.target;
    validateField(name, value);
  }

  // Submit → garante que tudo é validado
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      setToastMessage("Preenche ou corrige todos os campos do formulário");
      setStatus("error");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setStatus("");
        setToastMessage("");
      }, 5000);
      return;
    }

    setErrors({});
    setStatus("sending");
    setShowToast(true);

    // Simula envio (API fake)
    setTimeout(() => {
      console.log(formData);
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
      setToastMessage("Mensagem enviada com sucesso!");
      setTimeout(() => {
        setShowToast(false);
        setStatus("");
        setToastMessage("");
      }, 10000);
    }, 2000);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Nome"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name} // array ou null
        />
        <Input
          type="email"
          label="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            errors.email && errors.email.length > 0 ? errors.email[0] : null
          }
        />
        <Textarea
          label="Mensagem"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
        />
        <div className="form-actions">
          <Button type="submit" label="Enviar mensagem" />
        </div>
      </Form>

      {showToast && (
        <Toast
          type={status}
          message={status === "sending" ? "A enviar mensagem..." : toastMessage}
          duration={status === "error" ? 5000 : 10000}
          onClose={() => {
            setShowToast(false);
            setStatus("");
            setToastMessage("");
          }}
        />
      )}
    </>
  );
}
