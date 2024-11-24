import React from "react";
import "../css/Modal.css"; // Archivo CSS para estilizar el modal

function Modal({ show, onClose, title, children }) {
  if (!show) return null; // No renderizar si el modal no está visible

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">{title}</h3>
        <div className="modal-body">{children}</div>
        <button className="modal-close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
