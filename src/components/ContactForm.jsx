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
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "message") validateField(name, value);
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    if (name === "name" || name === "email") validateField(name, value);
  }

  function getFieldErrors(name, value) {
    const fieldErrors = [];

    switch (name) {
      case "name":
        if (!value.trim()) fieldErrors.push("O nome é obrigatório.");
        if (value.length > 0 && value.length < 2)
          fieldErrors.push("O nome deve ter pelo menos 2 caracteres.");
        if (value && !/^[a-zA-ZÀ-ÿ\s'-]*$/.test(value))
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

  function validateField(name, value) {
    const fieldErrors = getFieldErrors(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors.length > 0 ? fieldErrors : null,
    }));
  }

  function validateForm() {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const fieldErrors = getFieldErrors(key, value);
      if (fieldErrors.length > 0) newErrors[key] = fieldErrors;
    });
    return newErrors;
  }

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
          } // apenas string ou null
        />
        <Textarea
          label="Mensagem"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message} // array ou null
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

// COM O MODAL A DAR O FEEDBACK
// import { useState } from "react";
// import Form from "./Form";
// import Input from "./Input";
// import Textarea from "./Textarea";
// import Button from "./Button";
// import FeedbackModal from "./FeedbackModal";
// import "./Form.css";

// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [status, setStatus] = useState(""); // "", "sending", "success"

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "message") validateField(name, value);
//   }

//   function handleBlur(e) {
//     const { name, value } = e.target;
//     if (name === "name" || name === "email") validateField(name, value);
//   }

//   function validateField(name, value) {
//     let error = "";

//     if (name === "name") {
//       if (!value.trim()) error = "O nome é obrigatório.";
//       else if (value.length < 2)
//         error = "O nome deve ter pelo menos 2 caracteres.";
//     }

//     if (name === "email") {
//       if (!value.trim()) error = "O email é obrigatório.";
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//         error = "Introduz um email válido (ex.: nome@exemplo.com).";
//       }
//     }

//     if (name === "message") {
//       if (!value.trim()) error = "A mensagem é obrigatória.";
//       else if (value.length < 10)
//         error = "A mensagem deve ter pelo menos 10 caracteres.";
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//   }

//   function validateForm() {
//     const newErrors = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       const error = validateFieldReturn(key, value);
//       if (error) newErrors[key] = error;
//     });
//     return newErrors;
//   }

//   function validateFieldReturn(name, value) {
//     if (name === "name") {
//       if (!value.trim()) return "O nome é obrigatório.";
//       if (value.length < 2) return "O nome deve ter pelo menos 2 caracteres.";
//     }
//     if (name === "email") {
//       if (!value.trim()) return "O email é obrigatório.";
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//         return "Introduz um email válido.";
//     }
//     if (name === "message") {
//       if (!value.trim()) return "A mensagem é obrigatória.";
//       if (value.length < 10)
//         return "A mensagem deve ter pelo menos 10 caracteres.";
//     }
//     return "";
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       setStatus("sending");

//       setTimeout(() => {
//         console.log(formData);
//         setStatus("success");
//         setFormData({ name: "", email: "", message: "" });
//       }, 4000);
//     }
//   }

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           label="Nome"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           error={errors.name}
//         />

//         <Input
//           type="email"
//           label="Email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           error={errors.email}
//         />

//         <Textarea
//           label="Mensagem"
//           id="message"
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           error={errors.message}
//         />

//         <div className="form-actions">
//           <Button type="submit" label="Enviar mensagem" />
//         </div>
//       </Form>

//       <FeedbackModal status={status} onClose={() => setStatus("")} />
//     </>
//   );
// }
