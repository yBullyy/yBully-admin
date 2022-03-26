import React,{useEffect, useState} from 'react';
import { Modal, Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

import { updateUser } from '../../helpers/firestore';

const EditModal = ({ show, onHide,users,activeUser}) => {
    const user = users[activeUser];
    const [role, setRole] = useState(user && user.role);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        try {
            await updateUser(user.uid, { role });
            toast.success('User updated successfully');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
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
                    {
                        isLoading 
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <ReactLoading type="spinningBubbles" color="#fff" height={20} width={20} />
                        </div>
                        : "Update User"
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;