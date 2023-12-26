import React, {useEffect} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const AppointmentItem = ({item, doctorView}) => {
    const navigate = useNavigate()

    const date = new Date(item.date).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})

    const className = item.status.toLowerCase();
    let style = {}
    if(doctorView) style = {padding: 20, boxShadow: "0px 0px 0px 0px rgba(34, 60, 80, 0.2)"}
    else style = {padding: 20, border: 0}

    return (
        <Col className="mb-4">
            <Card style={style}
                  className={"user-appointment-card " + className}
            >
                <div className='user-appointment-card-status-message'>
                    <h1>{item.status}</h1>
                </div>
                <div>
                    <Card.Title>Appointment: Direct doctor</Card.Title>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Date and time of appointment<br/>
                        {date} {item.time}
                    </Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{
                        marginBottom: 0,
                        fontSize: "0.8rem"
                    }}>{item.doctor.specialization.id} - {item.doctor.specialization.title}</Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>In the clinic
                        <br/>
                        {item.doctor.hospital.title}
                        <br/>
                        {item.doctor.hospital.address}
                    </Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Status<br/>{item.status}</Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Card.Text style={{marginBottom: 0, fontSize: "0.8rem", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>Note<br/>{item.note}&nbsp;</Card.Text>
                    <hr style={{marginBlock: 10}}/>
                    <Button style={{fontSize: "0.8rem", width: '100%'}} variant="outline-info"
                            onClick={() => navigate('/appointment/' + item.id)
                            }
                    >More information</Button>
                </div>
            </Card>
        </Col>
    );
};

export default AppointmentItem;