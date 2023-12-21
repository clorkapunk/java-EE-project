import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCircleInfo, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const UnathorizedMessage = ({show, onHide, title}) => {
    const navigate = useNavigate()


    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                backdrop={true}
                // style={{background: 'rgba(0, 0, 0, 0.4)'}}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton style={{border: 0, paddingBottom: 0}}>
                    <Modal.Title>Please login</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{display: "flex", alignItems: "center"}}>
                    <FontAwesomeIcon style={{height: 20, marginRight: 10}} icon={faCircleInfo}/>
                    <p style={{margin: 0}}>The "{title}" service is available only to authorized users.</p>
                </Modal.Body>
                <Modal.Footer style={{border: 0, paddingTop: 0, justifyContent: "space-between"}}>
                    <Button variant="secondary"
                            onClick={onHide}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => navigate('/login')}
                    >Log in</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UnathorizedMessage;