import React from 'react';
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";
import DropZone from "./dropzone/DropZone";

export default function PictureModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add A Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className={styles.content}
        >
          <DropZone {...props} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
