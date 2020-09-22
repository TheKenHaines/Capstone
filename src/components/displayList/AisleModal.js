import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function AisleModal(props) {
  const handleChange =(event) => {
    props.onChange(event);
  }

  const update = (e) => {
    props.updateAisle(e)
    props.onHide(e)
  }

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Aisle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
          <form>
            <input
              type="text"
              placeholder="Enter Aisle"
              name="aisleLocation"
            />
          </form>
          
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={update}>Save Aisle</Button>
      </Modal.Footer>
    </Modal>
  );
}

