import React,{useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import {Col,Form,Row} from "react-bootstrap";
import { toast } from 'react-toastify';
import { updateUser } from '../../helpers/firestore';

const EditModal = ({ show, onHide,users,activeUser}) => {
    const user = users[activeUser];
    const [role, setRole] = useState(user && user.role);

    useEffect(() => {
        if(user){
            setRole(user.role);
        }
    }, [user]);

    const getInputLabel = (label,value) => {
        return (<Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control type="text" defaultValue={value} disabled />
            </Form.Group>)
    };

    const onUpdateUser = async () => {
        console.log("onUpdateUser => ",user,role);
        try {
            await updateUser(user.uid, { role });
            toast.success('User updated successfully');
        } catch (error) {
            toast.error(error.message);
        }
        onHide();
    }
    return (
        <Modal show={show} onHide={onHide} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            {getInputLabel("Name", user && user.name)}
                        </Col>
                        <Col md={6}>
                            {getInputLabel("Email", user && user.email)}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            {getInputLabel("Total Approved Tweets",user && user.totalApprovedTweets)}
                        </Col>
                        <Col md={3}>
                            {getInputLabel("Total Bully Tweets",user && user.totalBullyTweets)}
                        </Col>
                        <Col md={3}>
                            {getInputLabel("Total Reported Tweets",user && user.totalReportedTweets)}
                        </Col>
                        <Col md={3}>
                            {getInputLabel("Total Scanned Tweets",user && user.totalScannedTweets)}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            {getInputLabel("Trust Score",user && user.trustScore)}
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" onChange={(e) => setRole(e.target.value)} value={role} >
                                    <option value="user">User</option>
                                    <option value="trustedUser">Trusted User</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onUpdateUser}>
                    Update User
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;