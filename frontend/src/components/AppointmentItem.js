import React, {useEffect} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const AppointmentItem = ({item}) => {
    const navigate = useNavigate()

    const date = new Date(item.date).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})

    return (
        <Col className="mb-4">
            <Card style={{padding: 20, border: 0}}>
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
                <Card.Text style={{marginBottom: 0, fontSize: "0.8rem"}}>Note<br/>{item.note}&nbsp;</Card.Text>
                <hr style={{marginBlock: 10}}/>
                <Button style={{fontSize: "0.8rem"}} variant="outline-info"
                        onClick={() => navigate('/appointment/' + item.id)
                        }
                >More information</Button>
            </Card>
        </Col>
    );
};

export default AppointmentItem;