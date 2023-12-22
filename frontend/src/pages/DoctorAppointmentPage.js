import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {$authHost} from "../userAPI";
import {Button, Card, CardTitle, Container, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPrint} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";

const DoctorAppointmentPage = observer(() => {
    const {user} = useContext(Context)
    const {id} = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const [result, setResult] = useState('')
    const [appointment, setAppointment] = useState({
        doctor: {
            specialization: {
                id: 0,
                title: 'sample'
            },
            hospital: {
                title: 'sample',
                address: 'sample'
            }
        }
    })

    const scrollToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    function postResult() {
        $authHost.put('/api/v1/doctor/appointment/' + appointment.id, {
            result: result
        }).then(data => {

                navigate('/appointment-schedule')

            }
        ).catch(
            e => console.log(e)
        )
    }

    useEffect(() => {
        $authHost.get('/api/v1/appointments/doctor/' + user.user.id + "/" + id).then(data => {
            setAppointment(data.data)
        })

    }, [])

    const date = new Date(appointment.date).toLocaleDateString("en-US", {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <Container style={{minHeight: '90vh'}} className="mt-3 w-50">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h2>Details</h2>
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                        <Popover>
                            <Popover.Body style={{display: 'flex', flexDirection: 'column', paddingInline: 0}}>
                                <Button variant="outline-dark" style={{border: 0, borderRadius: 0}}><FontAwesomeIcon
                                    style={{marginRight: 5}} icon={faPrint}/> Print ticket</Button>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button style={{background: "transparent", color: 'black', border: 0}}><FontAwesomeIcon
                        style={{height: 20}} icon={faBars}/></Button>
                </OverlayTrigger>

            </div>
            <Card style={{border: 0, borderRadius: 0, padding: 30, marginBlock: 30}}>
                <CardTitle>Positions</CardTitle>
                <div style={{padding: 15, border: "1px solid #D8DADE", borderRadius: 5, marginTop: 10}}>
                    Appointment: Direct doctor
                </div>
                <CardTitle className="mt-5">Data Reception data</CardTitle>
                <div style={{padding: 15, border: "1px solid #D8DADE", borderRadius: 5, marginTop: 10}}>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Date and time of appointment<br/>
                        {date} {appointment.time}
                    </Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{
                        marginBottom: 0,
                        fontSize: "0.8rem"
                    }}>{appointment.doctor.specialization.id} - {appointment.doctor.specialization.title}</Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>In the clinic
                        <br/>
                        {appointment.doctor.hospital.title}
                        <br/>
                        {appointment.doctor.hospital.address}
                    </Card.Text>
                </div>
                <div style={{padding: 15, border: "1px solid #D8DADE", borderRadius: 5, marginTop: 10}}>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Date and time of creation<br/>
                        {new Date(appointment.createdAt).toLocaleDateString("en-US", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Order No.<br/>{appointment.id}</Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Status<br/>{appointment.status}</Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Note<br/>{appointment.note}</Card.Text>
                </div>
                <CardTitle className='mt-5'>Result of the visit</CardTitle>
                {appointment.status === "APPROVED" ?
                    <div style={{padding: 15, border: "1px solid #D8DADE", borderRadius: 5, marginTop: 10}}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={3} value={result}
                                              onChange={(e) => setResult(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <br/>
                        Doctor: {appointment.doctor.firstname + " " + appointment.doctor.lastname}
                    </div>
                    :
                    <div style={{padding: 15, border: "1px solid #D8DADE", borderRadius: 5,marginTop: 10}}>
                        {appointment.result === "" ? "No relusts yet" : appointment.result}
                        <br/>
                        <br/>
                        Doctor: {appointment.doctor.firstname + " " + appointment.doctor.lastname}
                    </div>
                }

                <div className='mb-2 mt-4' style={{display: "flex", justifyContent: "space-between"}}>
                    <Button className="district-doctor-page-back-btn" style={{
                        width: "auto", paddingInline: 100, paddingBlock: 10, background: "#F5F5F5"
                    }}
                            onClick={() => {
                                navigate('/appointment-schedule')
                                scrollToTop()
                            }}
                    >

                        Back
                    </Button>
                    {appointment.status === "APPROVED" &&
                        <Button variant='success' style={{paddingBlock: 10, paddingInline: 80}}
                                onClick={postResult}
                        >

                            Post result
                        </Button>
                    }

                </div>
            </Card>
        </Container>
    );
});

export default DoctorAppointmentPage;