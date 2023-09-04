import React from "react";
import "./Modal.css";
import ReactDom from "react-dom";

function Modal(props) {

  return ReactDom.createPortal(
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="titleCloseBtn">
          <button onClick={() => {props.setIsModalOpen(false);}}>
            &times;
          </button>
        </div>

        <div className="title">
          <h1>{props.children}</h1>
        </div>

        <div className="body">
          <h1>Are you sure you want to continue?</h1>
        </div>

        <div className="footer">
          <button
            onClick={() => {
              props.setIsModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.doAction(props.actionParam);
              props.setIsModalOpen(false);
            }}
            id='continueButton'
            >Continue</button>
        </div>

      </div>
    </div>,
    document.getElementById('portal')
  );
}

export default Modal;