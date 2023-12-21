import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarCheck, faCircleInfo, faKitMedical, faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {Card, Col, Row} from "react-bootstrap";
import UnathorizedMessage from "./UnathorizedMessage";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DiscrictDoctorModal = observer(({show, onHide}) => {
    const [unAuthModalVisible, setUnAuthModalVisible] = useState(false)
    const [unAuthModalTitle, setUnAuthModalTitle] = useState("")
    const {user} = useContext(Context)
    const navigate = useNavigate()

    function unathorizedAccessModal(title) {
        setUnAuthModalVisible(true)
        setUnAuthModalTitle(title)
    }

    return (
        <>
            <UnathorizedMessage show={unAuthModalVisible} title={unAuthModalTitle}
                                onHide={() => setUnAuthModalVisible(false)}/>
            <Modal
                show={show}
                onHide={onHide}
                backdrop={true}
                keyboard={false}
                centered
                style={unAuthModalVisible && {filter: "brightness(0.4)"}}
                className='doctor-modal'

            >
                <div style={{width: "auto"}}>
                    <Modal.Header closeButton style={{border: 0, paddingBottom: 0, width: '100%'}}>
                    </Modal.Header>
                    <Modal.Body style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        paddingInline: 60,
                        paddingBottom: 60,
                        paddingTop: 20
                    }}>
                        <h4>District Doctor</h4>
                        <Row className='mt-4' xs={2} style={{width: "100%"}}>
                            <Col style={{display: "flex", justifyContent: "center", padding: 0, paddingInline: 10}}>
                                <Card className="doctor-modal-card"
                                      style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                                      onClick={() => {
                                          user._isAuth ? navigate('/district-doctor') : unathorizedAccessModal("An appointment with a district doctor")
                                      }}
                                >
                                    <FontAwesomeIcon className='text-success' style={{height: 40, marginBottom: 20}}
                                                     icon={faCalendarCheck}/>
                                    <Card.Text style={{textAlign: "center"}}>
                                        An appointment with a district doctor
                                    </Card.Text>
                                </Card>
                            </Col>
                            <Col style={{display: "flex", justifyContent: "center", padding: 0, paddingInline: 10}}>
                                <Card className="doctor-modal-card"
                                      style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                                      onClick={() => {
                                          user._isAuth ? navigate('/') : unathorizedAccessModal("House call")
                                      }}
                                >
                                    <FontAwesomeIcon className='text-success' style={{height: 40, marginBottom: 20}}
                                                     icon={faKitMedical}/>
                                    <Card.Text style={{textAlign: "center"}}>
                                        House call
                                    </Card.Text>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
});

export default DiscrictDoctorModal;