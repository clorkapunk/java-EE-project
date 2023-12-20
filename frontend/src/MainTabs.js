import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Button, Card, Col, Container, Navbar, Row, Tab, Tabs} from "react-bootstrap";
import CustomersList from "./admin/CustomersList";
import PostMenu from "./admin/PostMenu";
import PutMenu from "./admin/PutMenu";
import {useNavigate} from "react-router-dom";
import BooksList from "./manager/BooksList"
import BooksPostMenu from "./manager/BooksPostMenu";
import BooksPutMenu from "./manager/BooksPutMenu";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import UnathorizedMessage from "./components/modal/UnathorizedMessage";
import {faCalendarCheck, faFileInvoiceDollar, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MainTabs = observer(() => {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const {user} = useContext(Context)
    const navigate = useNavigate()



    function unathorizedAccessModal(title){
        setModalVisible(true)
        setModalTitle(title)
    }


    return (
        <>
            <UnathorizedMessage show={modalVisible} title={modalTitle} onHide={() => setModalVisible(false)} />
            <Container className="w-50" style={{minHeight: "90vh"}}>
                <Row lg={2} md={2} xl={2} xxl={2} className="d-flex justify-content-center mt-5">

                    <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                        <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                              onClick={() => {
                                  user._isAuth ? navigate('/appointments') : unathorizedAccessModal("Appointments")
                              }}>
                            <FontAwesomeIcon style={{height: 80, marginBottom: 30}} icon={faCalendarCheck} />
                            <Card.Text style={{textAlign: "center"}}>
                                Appointments
                            </Card.Text>
                        </Card>
                    </Col>

                    <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                        <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                              onClick={() => {
                                  user._isAuth ? navigate('/profile') : unathorizedAccessModal("Profile page")
                              }}>
                            <FontAwesomeIcon style={{height: 80, marginBottom: 30}} icon={faUser} />
                            <Card.Text style={{textAlign: "center"}}>
                                Profile page
                            </Card.Text>
                        </Card>
                    </Col>

                    <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                        <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                              onClick={() => {
                                  user._isAuth ? navigate('/bills') : unathorizedAccessModal("Bills")
                              }}>
                            <FontAwesomeIcon style={{height: 80, marginBottom: 30}} icon={faFileInvoiceDollar} />
                            <Card.Text style={{textAlign: "center"}}>
                                Bills
                            </Card.Text>
                        </Card>
                    </Col>

                    <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                        <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40}}>
                            <Card.Img variant="top"
                                      style={{width: "30%", alignSelf: "center", marginBottom: 30}}
                                      src="https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/good-icon.png"/>
                            <Card.Text style={{textAlign: "center"}}>
                                Clinics
                            </Card.Text>
                        </Card>
                    </Col>

                    <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                        <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40}}>
                            <Card.Img variant="top"
                                      style={{width: "30%", alignSelf: "center", marginBottom: 30}}
                                      src="https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/good-icon.png"/>
                            <Card.Text style={{textAlign: "center"}}>
                                District doctor
                            </Card.Text>
                        </Card>
                    </Col>

                </Row>


            </Container>

        </>
    );
})

export default MainTabs;