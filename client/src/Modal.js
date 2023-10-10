import React from "react";
import "./Modal.css";

const Modal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>To see post details, please login.</p>
      </div>
    </div>
  );
};

export default Modal;
