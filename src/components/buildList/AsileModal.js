import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class AddLocationModal extends Component {
  
    render() {
        return (
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Where as this item located? 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
        <div className="row">
        <h1>Enter Item Location</h1>
        </div>
        <div className="row">
        <input type="text" placeHolder="Aisle Location"/>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }
}