import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {$authHost} from "../userAPI";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const DoctorAppointmenList = observer(({tab}) => {
    const {user} = useContext(Context)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [cancelledVilible, setCancelledVilible] = useState(true)
    const [approvedVilible, setApprovedVilible] = useState(true)
    const [completedVilible, setCompletedVilible] = useState(true)

    useEffect(() => {
        $authHost.get('/api/v1/doctor/appointments/' + user.user.id).then(data => {
            setData(data.data.appointments)
        })
    }, [tab])

    return (
        <>
            <Form className="doctor-schedule-list-hide-check-switch mb-2"
                  style={{display: "flex", justifyContent: "end", flexDirection: "column"}}>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={"Cancelled"}
                    reverse
                    checked={cancelledVilible}
                    onChange={(e) => setCancelledVilible(e.target.checked)}
                />
                <Form.Check
                    type="switch"
                    label={"Approved"}
                    reverse
                    checked={approvedVilible}
                    onChange={(e) => setApprovedVilible(e.target.checked)}
                />
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={"Completed"}
                    reverse
                    checked={completedVilible}
                    onChange={(e) => setCompletedVilible(e.target.checked)}
                />
            </Form>

            <Row xs={1}>
                {data
                    .filter(x => {
                        if (cancelledVilible && x.status === "CANCELLED") {
                            return true
                        } else if (completedVilible && x.status === "COMPLETED") {
                            return true
                        } else if (approvedVilible && x.status === "APPROVED") {
                            return true
                        } else return false
                    }).length !== 0 ?

                    data
                        .filter(x => {
                            if (cancelledVilible && x.status === "CANCELLED") {
                                return true
                            } else if (completedVilible && x.status === "COMPLETED") {
                                return true
                            } else if (approvedVilible && x.status === "APPROVED") {
                                return true
                            } else return false
                        })
                        .map(item =>
                            <Col className='mb-2'>
                                <Card.Text
                                    onClick={() => {
                                        item !== null && navigate('/doctor-appointment/' + item.id)
                                    }}
                                    style={{
                                        display: "flex",
                                        margin: 0,
                                        paddingBlock: 10,
                                        justifyContent: "start",
                                        alignItems: "center",
                                        width: '100%',
                                        cursor: 'pointer',
                                        background: "white",
                                        boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)"
                                    }}


                                >

                                    <div
                                        style={{
                                            paddingBlock: 5, paddingInline: 10, borderRadius: 0, color: "white",
                                            fontWeight: "bold", width: '10%', marginLeft: 10, textAlign: "center"
                                        }}
                                        className={item !== null ?
                                            (item.status === "APPROVED" ?
                                                    "doctor-calendar-appointment approved list"
                                                    :
                                                    (item.status === "COMPLETED" ?
                                                            "doctor-calendar-appointment completed list"
                                                            :
                                                            (item.status === "CANCELLED") &&
                                                            "doctor-calendar-appointment cancelled list"

                                                    )
                                            )
                                            :
                                            "doctor-calendar-appointment list"
                                        }
                                    >
                                        {item.status}
                                    </div>
                                    <p style={{
                                        margin: 0,
                                        color: '#4D4D4D',
                                        width: '25%',
                                        textAlign: "center"
                                    }}
                                    >
                                        {new Date(item.date).toLocaleDateString("en-US", {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) + " " + item.time}
                                    </p>
                                    <p style={{margin: 0, width: '70%'}}>{item.note}</p>
                                </Card.Text>
                            </Col>
                        )
                :
                    <Col className='mb-1'>
                        <Card.Text
                            style={{
                                display: "flex",
                                margin: 0,
                                paddingBlock: 20,
                                justifyContent: "start",
                                alignItems: "center",
                                width: '100%',
                                background: "white",
                                boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)"
                            }}


                        >

                            <p style={{margin: 0, width: '100%', textAlign: "center", fontSize: '1.1em'}}>No appointments according to these criteria.</p>
                        </Card.Text>
                    </Col>
                }
            </Row>
        </>
    );
});

export default DoctorAppointmenList;