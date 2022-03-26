import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {Form} from "react-bootstrap";
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

import { useUserAuth } from '../../contexts/AuthContext';
import { addAdmin } from '../../helpers/firestore';

const AddAdminModal = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useUserAuth();

    const onAddAdminHandler = async () => {
        setIsLoading(true);
        try {
            let user = await signup(email, password);
            let userId = user.user.uid;
            console.log(userId);
            await addAdmin(userId, name, email);
            toast.success('Admin added successfully');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
        setEmail('');
        setPassword('');
        setName('');
        onHide();
    };
    
    return (
        <Modal show={show} onHide={onHide} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title>Add Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onAddAdminHandler}>
                    {
                        isLoading 
                        ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <ReactLoading type="spinningBubbles" color="#fff" height={20} width={20} />
                        </div>
                        : "Add Admin"
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAdminModal;