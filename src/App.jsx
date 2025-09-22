import ContactForm from "./components/ContactForm";
import Title from "./components/Title";
import "./styles/global.css";

export default function App() {
  return (
    <div className="app">
      <Title level={1}>👋 Entre em contacto connosco</Title>
      <ContactForm />
    </div>
  );
}
