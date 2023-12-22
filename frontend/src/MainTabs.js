import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Button, Card, Carousel, Col, Container, Image, Navbar, Row, Tab, Tabs} from "react-bootstrap";
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
import {
    faCalendarCheck,
    faCalendarDays,
    faFileInvoiceDollar,
    faUser,
    faUserDoctor
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DiscrictDoctorModal from "./components/modal/DiscrictDoctorModal";
import firstImg from './images/1.jpg'
import secondImg from './images/2.jpg'
import thirdImg from './images/3.jpg'

const MainTabs = observer(() => {
    const [unAuthModalVisible, setUnAuthModalVisible] = useState(false)
    const [unAuthModalTitle, setUnAuthModalTitle] = useState("")
    const [districtDoctorModalVisible, setDistrictDoctorModalVisible] = useState(false)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const caroselItems = [
        {
            id: 1,
            img: firstImg,
            label: 'Our missions',
            text: 'The clinic\'s mission is to provide high-quality medical care based on the principles of compassion, respect and professionalism.'
        },
        {
            id: 2,
            img: secondImg,
            label: 'Our team',
            text: 'Our team is a group of experienced and qualified specialists who are dedicated to their work and calling to provide quality medical care.'
        },
        {
            id: 3,
            img: thirdImg,
            label: 'Happiness',
            text: 'If you are looking for a clinic that will provide you with high quality medical care, contact the clinic. We will be happy to assist you.'
        }

    ]


    function unathorizedAccessModal(title) {
        setUnAuthModalVisible(true)
        setUnAuthModalTitle(title)
    }


    return (
        <>
            <UnathorizedMessage show={unAuthModalVisible} title={unAuthModalTitle}
                                onHide={() => setUnAuthModalVisible(false)}/>
            <DiscrictDoctorModal show={districtDoctorModalVisible} onHide={() => setDistrictDoctorModalVisible(false)}/>
            <Container className="w-50" style={{minHeight: "90vh"}}>
                <Row lg={2} md={2} xl={2} xxl={2} className="d-flex justify-content-center mt-5">

                    <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                        <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                              onClick={() => {
                                  user._isAuth ? navigate('/profile') : unathorizedAccessModal("Profile page")
                              }}>
                            <FontAwesomeIcon className='main-menu-icons' style={{height: 80, marginBottom: 30}}
                                             icon={faUser}/>
                            <Card.Text style={{textAlign: "center"}}>
                                Profile page
                            </Card.Text>
                        </Card>
                    </Col>

                    {(user.user.role === "USER" || user.user.role === "ADMIN" || !user.isAuth) &&
                        <>

                            <Col className="m-2"
                                 style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                                <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                                      onClick={() => {
                                          setDistrictDoctorModalVisible(true)
                                      }}>
                                    <FontAwesomeIcon className='main-menu-icons' style={{height: 80, marginBottom: 30}}
                                                     icon={faUserDoctor}/>
                                    <Card.Text style={{textAlign: "center"}}>
                                        District doctor
                                    </Card.Text>
                                </Card>
                            </Col>
                            <Col className="m-2"
                                 style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                                <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                                      onClick={() => {
                                          user._isAuth ? navigate('/appointments') : unathorizedAccessModal("Appointments")
                                      }}>
                                    <FontAwesomeIcon className='main-menu-icons' style={{height: 80, marginBottom: 30}}
                                                     icon={faCalendarCheck}/>
                                    <Card.Text style={{textAlign: "center"}}>
                                        Appointments
                                    </Card.Text>
                                </Card>
                            </Col>
                            <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                                <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                                      onClick={() => {
                                          user._isAuth ? navigate('/bills') : unathorizedAccessModal("Bills")
                                      }}>
                                    <FontAwesomeIcon className='main-menu-icons' style={{height: 80, marginBottom: 30}}
                                                     icon={faFileInvoiceDollar}/>
                                    <Card.Text style={{textAlign: "center"}}>
                                        Bills
                                    </Card.Text>
                                </Card>
                            </Col>

                        </>
                    }
                    {(user.user.role === "DOCTOR" || user.user.role === "ADMIN") &&
                        <>
                            <Col className="m-2" style={{display: "flex", justifyContent: "center", width: "auto", padding: 0}}>
                                <Card style={{width: '22rem', paddingInline: 20, paddingBlock: 40, cursor: "pointer"}}
                                      onClick={() => {
                                          user._isAuth ? navigate('/appointment-schedule') : unathorizedAccessModal("Schedule")
                                      }}>
                                    <FontAwesomeIcon className='main-menu-icons' style={{height: 80, marginBottom: 30}}
                                                     icon={faCalendarDays}/>
                                    <Card.Text style={{textAlign: "center"}}>
                                        Schedule
                                    </Card.Text>
                                </Card>
                            </Col>
                        </>

                    }





                </Row>

                <Carousel className='mt-4 mb-5' slide={false}>
                    {caroselItems.map(item =>
                        <Carousel.Item key={item.id}>
                            <Image src={item.img} style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: 5,
                                cursor: "pointer"
                            }}/>
                            <Carousel.Caption style={{
                                textShadow: "0px 0px 3px rgba(0,0,0,1)",
                                background: "rgba(14,149,116,0.8)",
                                borderRadius: 10,
                            }}>
                                <h3>{item.label}</h3>
                                <p>
                                    {item.text}
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}

                </Carousel>

            </Container>

        </>
    );
})

export default MainTabs;