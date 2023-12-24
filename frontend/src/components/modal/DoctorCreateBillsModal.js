import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {$authHost} from "../../userAPI";

const DoctorCreateBillsModal = ({show, onHide, userData}) => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [doctor, setDoctor] = useState('')

    const [description, setDescription] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() => {
        $authHost.get('/api/v1/doctor/' + user.user.id).then(data => {
            setDoctor(data.data)
        })
    }, [])

    function createBill() {
        $authHost.put('/api/v1/doctor/bill', {
            patientId: userData.id, doctorId: user.user.id, description: description, total: total
        })
            .then(data => {
            onHide()
        })
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                backdrop="true"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton style={{border: 0, paddingBottom: 0}}>
                    <Modal.Title style={{fontSize: '1.5rem'}}>Invoice</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{display: "flex", flexDirection: "column"}}>
                    <div className='mb-4'>
                        <Form.Text style={{fontSize: "1em"}}>To: {userData.firstname + " " + userData.lastname}
                        </Form.Text>
                        <br/>
                        <Form.Text style={{fontSize: "1em"}}>From: {doctor.firstname + " " + doctor.lastname}
                        </Form.Text>
                    </div>

                    <Form>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{color: 'black', opacity: 0.7, fontSize: '1em'}}>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
                                         />
                        </Form.Group>
                    </Form>

                    <InputGroup >
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)"
                                      type='number'
                                      value={total} onChange={(e) => setTotal(e.target.value)}
                        />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer style={{border: 0, paddingTop: 0, justifyContent: "space-between"}}>
                    <Button variant="secondary"
                            onClick={onHide}
                    >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => createBill()}
                    >Accept</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DoctorCreateBillsModal;