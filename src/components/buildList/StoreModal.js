import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./buildList.module.css";
import { ItemListContext } from './ItemListContext';

export default function StoreModal(props) {
   const {handleChange, store} = useContext(ItemListContext);

  
  

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Pick A Store
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <input
              onChange={handleChange}
              name="store"
              value={store}
              type="text"
              placeholder="Enter Store"
            />
          </form>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className={styles.storeBtn} onClick={props.onHide}>Save Store</Button>
      </Modal.Footer>
    </Modal>
  );
}
