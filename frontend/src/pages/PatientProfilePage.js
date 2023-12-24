import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {$authHost} from "../userAPI";
import {Button, Card, CardBody, CardTitle, Col, Container, Form, OverlayTrigger, Popover, Row} from "react-bootstrap";
import ProfileEditModal from "../components/modal/ProfileEditModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarCheck,
    faCheck, faChevronLeft,
    faChevronRight,
    faFileInvoiceDollar, faGear, faLock,
    faPenToSquare, faTrashCan,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import AppointmentItem from "../components/AppointmentItem";
import Login from "./Login";
import DoctorCreateBillsModal from "../components/modal/DoctorCreateBillsModal";

const PatientProfilePage = () => {
    const [data, setData] = useState({
        firstname: 'sample',
        lastname: 'sample',
        email: 'sample',
        number: 'sample',
        hospital: {
            title: 'sample'
        },
        specialization: {
            id: 'sample',
            title: 'sample'
        },
        schedule: 'sample',
        office: 'sample',
        address: 'sample',
        iin: 'sample',
        dob: '1999-01-01',
        gender: 'sample',
        verified: false
    })
    const [appointments, setAppointments] = useState([])
    const [appointmentsRaw, setAppointmentsRaw] = useState([])
    const [appointmentMessage, setAppointmentMessage] = useState("Please load appointments.")
    const [modalVisible, setModalVisible] = useState(false)
    const [page, setPage] = useState(0)
    const {id} = useParams()
    const [status, setStatus] = useState('')
    const [isLoading, setLoading] = useState(false);

    const [cancelledVilible, setCancelledVilible] = useState(true)
    const [approvedVilible, setApprovedVilible] = useState(true)
    const [completedVilible, setCompletedVilible] = useState(true)
    const [sentVilible, setSentVilible] = useState(true)
    const [rejectedVilible, setRejectedVilible] = useState(true)
    const [loh, setLoh] = useState('loh')
    const numberPerPage = 4

    const navigate = useNavigate()

    const {user} = useContext(Context)


    useEffect(() => {

        $authHost.get('/api/v1/doctor/patient/' + id).then(data => {
            setData(data.data.user)
        })

    }, [])

    function loadAppointments() {
        $authHost.get('/api/v1/doctor/patient-appointments/' + id).then(data => {
            const temp = data.data.appointments
            setAppointmentsRaw(temp)
            const tempApps = pagenateAppointments(numberPerPage, temp)
            setAppointments(tempApps)
            setTimeout(() => {
                setLoading(false)
                setPage(0)
                setAppointmentMessage("No appointments available.")
            }, 500)
        })
    }

    function pagenateAppointments(numberPerPage, appointmentsTemp = []) {
        const newAppointments = []
        var appointmentsTemp = appointmentsTemp.sort((a, b) => {
                const first = Date.parse(a.date + " " + a.time.substring(0, a.time.indexOf('-')))
                const second = Date.parse(b.date + " " + b.time.substring(0, b.time.indexOf('-')))
                if (first > second) return -1;
                else if (first < second) return 1;
                else return 0;
            }
        )
        var temp = []
        var count = 0
        var amount = 0
        while (appointmentsTemp.length !== amount) {
            temp.push(appointmentsTemp[amount])
            count += 1
            amount += 1
            if (count === numberPerPage) {
                newAppointments.push(temp)
                temp = []
                count = 0
            } else if (appointmentsTemp.length === amount) {
                newAppointments.push(temp)
                temp = []
                count = 0
            }
        }
        return newAppointments
    }

    useEffect(() => {
        console.log(appointmentsRaw)
        var apps = appointmentsRaw.filter(x => {
            if (cancelledVilible && x.status === "CANCELLED") {
                return true
            } else if (completedVilible && x.status === "COMPLETED") {
                return true
            } else if (approvedVilible && x.status === "APPROVED") {
                return true
            } else if (rejectedVilible && x.status === "REJECTED") {
                return true
            } else if (sentVilible && x.status === "SENT") {
                return true
            } else return false
        })
        console.log(apps)
        const temp = pagenateAppointments(4, apps)
        setAppointments(temp)
        setPage(0)
    }, [cancelledVilible, completedVilible, approvedVilible, rejectedVilible, sentVilible])


    const dob = new Date(data.dob).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})


    return (
        <Container style={{minHeight: "90vh"}}>
            <DoctorCreateBillsModal userData={data} show={modalVisible} onHide={() => setModalVisible(false)}/>
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
                        <Button variant='outline-info'
                                onClick={() => setModalVisible(true)}
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
                                <p style={{margin: 0}}>Issue an invoice to this patient</p>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Button>
                    </Card>
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card
                className='mt-3 mb-5'
                style={{
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
                    <p style={{margin: 0}}>Patient's appointments</p>

                    <Form className="doctor-schedule-list-hide-check-switch"
                          style={{
                              display: "flex",
                              flexDirection: "row",
                              fontSize: '0.8em',
                          }}>
                        <div style={{display: "flex", flexDirection: 'column', marginInline: 10}}>
                            <Form.Check
                                style={{margin: 0}}
                                type="switch"
                                id="custom-switch"
                                label={"Cancelled"}
                                checked={cancelledVilible}
                                onChange={(e) => setCancelledVilible(e.target.checked)}
                            />
                            <Form.Check
                                style={{margin: 0}}
                                type="switch"
                                label={"Approved"}
                                checked={approvedVilible}
                                onChange={(e) => setApprovedVilible(e.target.checked)}
                            />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: 'start',
                            flexDirection: 'column',
                            marginInline: 20
                        }}>
                            <Form.Check
                                style={{margin: 0}}
                                type="switch"
                                id="custom-switch"
                                label={"Rejected"}

                                checked={rejectedVilible}
                                onChange={(e) => setRejectedVilible(e.target.checked)}
                            />
                            <Form.Check
                                style={{margin: 0}}
                                type="switch"
                                label={"Sent"}

                                checked={sentVilible}
                                onChange={(e) => setSentVilible(e.target.checked)}
                            />
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: 'start',
                            flexDirection: 'column',
                            marginInline: 10
                        }}>
                            <Form.Check
                                style={{margin: 0}}
                                type="switch"
                                id="custom-switch"
                                label={"Completed"}
                                checked={completedVilible}
                                onChange={(e) => setCompletedVilible(e.target.checked)}
                            />
                        </div>
                    </Form>

                    <Button
                        variant='secondary'
                        onClick={() => {
                            if (isLoading) return null
                            else {
                                setLoading(true)
                                loadAppointments()
                            }
                        }}
                    >{isLoading ? 'Loading…' : 'Click to load'}</Button>
                </CardTitle>
                <Card.Body style={{padding: 30, paddingBottom: 10, display: "flex"}}>
                    {appointments.length === 0 ?
                        <p style={{width: '100%', textAlign: "center"}}>{appointmentMessage}</p>
                        :
                        <>
                            {
                                (page !== 0 && appointments[page] !== undefined)
                                &&
                                <Button
                                    name="back"
                                    id="back"
                                    onClick={() => {
                                        if (page === 0) return
                                        setPage(prevState => {
                                            return prevState - 1
                                        })
                                    }}
                                    style={{border: 0, background: "transparent", color: "black", fontSize: '1.3em'}}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                </Button>
                            }
                            <Row xs={numberPerPage} style={{width: "100%"}}>
                                {
                                    appointments[page] !== undefined &&
                                    appointments[page]
                                        .map(item =>
                                            <AppointmentItem doctorView={true} key={item.id} item={item}/>
                                        )
                                }
                            </Row>

                            {
                                (page !== appointments.length - 1 && appointments[page] !== undefined)
                                &&
                                <Button
                                    name="next"
                                    id="next"
                                    onClick={() => {
                                        if (page === appointments.length - 1) return
                                        setPage(prevState => {
                                            return prevState + 1
                                        })
                                    }}
                                    style={{border: 0, background: "transparent", color: "black", fontSize: '1.3em'}}
                                >
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </Button>
                            }
                        </>
                    }
                </Card.Body>
            </Card>


        </Container>
    );
};

export default PatientProfilePage;