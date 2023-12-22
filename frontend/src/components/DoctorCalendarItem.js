import React, {useEffect, useState} from 'react';
import {Button, Card, CardTitle, Col, OverlayTrigger, Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faGear, faLock, faPenToSquare, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const DoctorCalendarItem = observer(({item}) => {
    const navigate = useNavigate()
    const testData = {
        date: '1992-02-02',
        schedule: [
            {
                time: '08:00-08:20',
                appointment: null
            },
            {
                time: '09:00-09:20',
                appointment:
                    null
            }
            ,
            {
                time: '10:00-10:20',
                appointment:
                    null
            }
            ,
            {
                time: '11:00-11:20',
                appointment:
                    null
            }
            ,
            {
                time: '12:00-12:20',
                appointment:
                    null
            }
        ]
    }
    const [data, setData] = useState(testData)

    useEffect(() => {
        if (item === undefined || item === null) return
        setData(item)
    }, [item])

    return (
        <Col className='mb-4'>
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
                    <p style={{margin: 0}}>{new Date(data.date).toLocaleDateString("en-US", {weekday: 'long'})}</p>
                </CardTitle>
                <Card.Body style={{padding: 30, paddingTop: 20}}>
                    {
                        data.schedule.map(item =>
                            <div key={item.time}>
                                <Card.Text
                                    onClick={() => {
                                        item.appointment !== null && navigate('/doctor-appointment/' + item.appointment.id)
                                    }}
                                    className={item.appointment !== null ?
                                        (item.appointment.status === "APPROVED" ?
                                                "doctor-calendar-appointment approved active"
                                                :
                                                (item.appointment.status === "COMPLETED" ?
                                                        "doctor-calendar-appointment completed active"
                                                        :
                                                        (item.appointment.status === "CANCELLED") &&
                                                        "doctor-calendar-appointment cancelled active "

                                                )
                                        )
                                        :
                                        "doctor-calendar-appointment"
                                    }
                                    style={{
                                        display: "flex",
                                        margin: 0,
                                        paddingBlock: 10,
                                        justifyContent: "start",
                                        alignItems: "center",
                                        width: '100%'
                                    }}>
                                    <p style={{
                                        margin: 0,
                                        color: '#4D4D4D',
                                        width: '20%',
                                        textAlign: "center",
                                        marginRight: '5%'
                                    }}>{item.time}</p>
                                    <p style={{margin: 0, width: '70%'}}>{item.appointment !== null && item.appointment.note}</p>
                                </Card.Text>
                                <hr style={{marginBlock: 0}}/>
                            </div>
                        )
                    }
                </Card.Body>
            </Card>
        </Col>
    );
});

export default DoctorCalendarItem;