import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Container, OverlayTrigger, Popover, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars, faCalendarCheck,
    faCheck,
    faChevronRight, faFileInvoiceDollar,
    faGear, faLock,
    faPenToSquare,
    faPrint, faTrashCan,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";
import {$authHost} from "../userAPI";
import {useCol} from "react-bootstrap/Col";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import ProfileEditModal from "../components/modal/ProfileEditModal";

const ProfilePage = observer(() => {
    const [data, setData] = useState({
        firstname: 'sample',
        lastname: 'sample',
        email: 'sample',
        number: 'sample',
        hospital: {
            title: 'sample',
            districtDoctor: {
                schedule: 'MON-FRI: 08:00-18:00',
            }
        },
        specialization: {
            id: 'sample',
            title: 'sample'
        },

        office: 'sample',
        address: 'sample',
        iin: 'sample',
        dob: '1999-01-01',
        gender: 'sample',
        verified: false
    })
    const [modalVisible, setModalVisible] = useState(false)

    const navigate = useNavigate()

    const {user} = useContext(Context)

    useEffect(() => {
        if (user.user.role === "USER" || user.user.role === "ADMIN") {
            $authHost.get('/api/v1/patient/' + user.user.id).then(data => {
                setData(data.data)
            })
        } else if (user.user.role === "DOCTOR") {
            $authHost.get('/api/v1/doctor/' + user.user.id).then(data => {
                setData(data.data)
            })
        }

    }, [])

    const dob = new Date(data.dob).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})


    const replace_map = {
        'MON': 'Monday',
        'FRI': 'Friday',
        'TUE': 'Tuesday',
        'WED': 'Wednesday',
        'THU': 'Thursday',
        'SAT': 'Saturday',
        'SUN': 'Sunday'
    };



    const schedule = data.hospital.districtDoctor.schedule
        .replace(' ', ' : ')
        .replaceAll('-', ' - ')
        .replaceAll(/(?:^|(?<= ))(MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?= )|$)/g, function (match) {
            console.log(match)
            return replace_map[match];
        })
        .replace(' : ', ': ')

    return (
        <Container style={{minHeight: "90vh"}}>
            <ProfileEditModal show={modalVisible} onHide={() => setModalVisible(false)}/>
            <h3 className="my-4">Profile</h3>
            <Row>
                <Col md={4}>
                    <Card style={{
                        display: "flex",
                        boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 30,
                        border: 0,
                        borderRadius: 0
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "100%",
                            position: "absolute",
                            top: 20,
                            right: 20
                        }}>
                            <Button variant="outline-info"
                                    onClick={() => setModalVisible(true)}
                                    style={{border: 0}}><FontAwesomeIcon icon={faPenToSquare}/></Button>
                        </div>
                        <div style={{
                            height: 150,
                            width: 150,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px dashed #979797",
                            borderRadius: 100,
                            fontSize: '2rem',
                            marginBottom: 20,
                            textAlign: "center"
                        }}>
                            {data.firstname.at(0) + data.lastname.at(0)}
                        </div>
                        <div style={{marginBottom: 10, textAlign: "center"}}>
                            {data.firstname} <br/> {data.lastname}
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            color: 'gray',
                            fontSize: "0.9rem",
                            marginBottom: 10
                        }}>
                            {
                                data.verified ?
                                    <>
                                        <FontAwesomeIcon icon={faCheck} style={{marginRight: 10}}/>
                                        <p style={{margin: 0}}>Verified</p>
                                    </>
                                    :
                                    <>
                                        <FontAwesomeIcon icon={faXmark} style={{marginRight: 10}}/>
                                        <p style={{margin: 0}}>Not verified</p>
                                    </>
                            }
                        </div>

                        <div style={{display: "flex", alignItems: "center", textAlign: "center", marginBottom: 10}}>
                            {data.number.replace("8", "+7")}
                        </div>
                        <div style={{display: "flex", alignItems: "center", color: 'gray', marginBottom: 10}}>
                            {data.email}
                        </div>


                    </Card>
                    <Card style={{cursor: "pointer", border: 0}} className="mt-2">
                        <Button variant='outline-success'
                                onClick={() =>
                                    user.user.role === "DOCTOR" ?
                                        navigate('/appointment-schedule')
                                        :
                                        navigate('/appointments')
                                }
                                style={{
                                    border: 0,
                                    color: "black",
                                    padding: 15,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <FontAwesomeIcon style={{marginRight: 10}} icon={faCalendarCheck}/>
                                <p style={{margin: 0}}>
                                    {
                                        user.user.role === "DOCTOR" ?
                                            "Go to your schedule of appointments"
                                            :
                                            "Go to your appointments"
                                    }

                                </p>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Button>
                    </Card>
                    {
                        ( user.user.role === "USER" || user.user.role === "ADMIN" )&&
                        <Card style={{cursor: "pointer", border: 0}} className="mt-2">
                            <Button variant='outline-info'
                                    onClick={() => navigate('/bills')}
                                    style={{
                                        border: 0,
                                        color: "black",
                                        padding: 15,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <FontAwesomeIcon style={{marginRight: 10}} icon={faFileInvoiceDollar}/>
                                    <p style={{margin: 0}}>Go to your bills</p>
                                </div>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </Button>
                        </Card>
                    }

                </Col>
                <Col md={8}>
                    <Card style={{
                        borderRadius: 0,
                        border: 0,
                        height: '100%',
                        boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)"
                    }}>
                        <CardTitle style={{
                            display: "flex",
                            background: "#F7F7F7",
                            margin: 0,
                            padding: "10px 30px 10px 30px",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <p style={{margin: 0}}>Personal Data</p>
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={
                                    <Popover>
                                        <Popover.Body
                                            style={{display: 'flex', flexDirection: 'column', paddingInline: 0}}>
                                            <Button variant="outline-dark" style={{
                                                border: 0,
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "center",
                                                borderRadius: 0
                                            }}><FontAwesomeIcon style={{marginRight: 10}} icon={faLock}/>Change password</Button>
                                            <Button variant="outline-dark" style={{
                                                border: 0,
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "center",
                                                borderRadius: 0
                                            }}><FontAwesomeIcon style={{marginRight: 10}} icon={faPenToSquare}/>Edit
                                                profile</Button>
                                            <Button variant="outline-dark" style={{
                                                border: 0,
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "center",
                                                borderRadius: 0
                                            }}><FontAwesomeIcon style={{marginRight: 10}} icon={faTrashCan}/>Delete
                                                profile</Button>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <Button variant="outline-dark" style={{border: 0}}><FontAwesomeIcon
                                    icon={faGear}/> Settings</Button>
                            </OverlayTrigger>
                        </CardTitle>
                        <Card.Body style={{padding: 30}}>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>Login</p>
                                <p style={{margin: 0}}>{data.email}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>Surname</p>
                                <p style={{margin: 0}}>{data.lastname}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>First name</p>
                                <p style={{margin: 0}}>{data.firstname}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>IIN</p>
                                <p style={{margin: 0}}>{data.iin}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>Birth date</p>
                                <p style={{margin: 0}}>{dob}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>Gender</p>
                                <p style={{margin: 0}}>{data.gender}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>Address</p>
                                <p style={{margin: 0}}>{data.address}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            <Card.Text style={{
                                display: "flex",
                                margin: 0,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <p style={{margin: 0, color: 'gray'}}>Clinic</p>
                                <p style={{margin: 0}}>{data.hospital.title}</p>
                            </Card.Text>
                            <hr style={{marginBlock: 10}}/>
                            {
                                user.user.role === "DOCTOR" &&
                                <>
                                    <Card.Text style={{
                                        display: "flex",
                                        margin: 0,
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <p style={{margin: 0, color: 'gray'}}>Specialization</p>
                                        <p style={{margin: 0}}>{data.specialization.id + ' ' + data.specialization.title}</p>
                                    </Card.Text>
                                    <hr style={{marginBlock: 10}}/>
                                    <Card.Text style={{
                                        display: "flex",
                                        margin: 0,
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <p style={{margin: 0, color: 'gray'}}>Office</p>
                                        <p style={{margin: 0}}>№ {data.office}</p>
                                    </Card.Text>
                                    <hr style={{marginBlock: 10}}/>
                                    <Card.Text style={{
                                        display: "flex",
                                        margin: 0,
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <p style={{margin: 0, color: 'gray'}}>Schedule</p>
                                        <p style={{margin: 0}}>{schedule}</p>
                                    </Card.Text>
                                    <hr style={{marginBlock: 10}}/>
                                </>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default ProfilePage;