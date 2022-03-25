import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;