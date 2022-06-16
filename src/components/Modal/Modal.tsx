import * as React from "react";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Modal.module.css";
import { ModalProps } from "./Modal.props";

const Modal: React.FC<ModalProps> = ({ setModalOpen, children }) => {
  return (
    <div>
      <div className={styles.modalOverlay} />
      <div className={styles.modalBoxContainer}>
        <div className={styles.modalBoxControl}>
          <ButtonIcon
            icon="close"
            appearance="white"
            onClick={() => setModalOpen(false)}
          ></ButtonIcon>
        </div>

        <div className={styles.modalBoxContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
