import "./FeedbackModal.css";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import Title from "./Title";
import Text from "./Text";
import Button from "./Button";
import IconButton from "./IconButton";

export default function FeedbackModal({ status, onClose }) {
  if (!status) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Botão de fechar sempre visível */}
        {status !== "sending" && (
          <IconButton
            onClick={onClose}
            ariaLabel="Fechar modal"
            icon={<IoClose size={24} />}
            className="modal-close"
          />
        )}

        <div className="modal-body">
          {status === "sending" && (
            <>
              <ImSpinner2 className="modal-icon spinner" />
              <Title level={2}>A enviar a mensagem...</Title>
              <Text>Aguarde, estamos a processar a sua mensagem.</Text>
            </>
          )}

          {status === "success" && (
            <>
              <FaCheckCircle className="modal-icon success" />
              <Title level={2}>Mensagem enviada!</Title>
              <Text>Entraremos em contacto em breve.</Text>
            </>
          )}
        </div>

        {status === "success" && (
          <div className="modal-footer">
            <Button type="button" label="Fechar" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
}
