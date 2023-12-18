import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import {Context} from "../../index";

const ProfileEditModal = ({show, onHide}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [email, setEmail] = useState(user.user.email)



    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton style={{border: 0, paddingBottom: 0}}>
                    <Modal.Title style={{fontSize: '1.5rem'}}>Profile edit</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{display: "flex", flexDirection: "column"}}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        style={{width: "100%"}}
                        placeholder="New email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer style={{border: 0, paddingTop: 0, justifyContent: "space-between"}}>
                    <Button variant="secondary"
                            onClick={onHide}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                    >Accept</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileEditModal;