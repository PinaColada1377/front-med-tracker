import * as React from "react";
import { Button } from "../Button/Button";
import styles from "./Modal.module.css";
import { ModalProps } from "./Modal.props";


const Modal: React.FC<ModalProps> = ({setModalOpen, children }) => {
  return (
    <div>
      <div className={styles.modalOverlay} />

      <div className={styles.modalBoxContainer}>
        <div className={styles.modalBoxControl}>
          <Button appearance="ghost" onClick={() => setModalOpen(false)}>Close</Button>
        </div>

        <div className={styles.modalBoxContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
