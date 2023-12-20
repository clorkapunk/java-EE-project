import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AppointmentItem from "../components/AppointmentItem";
import {observer} from "mobx-react-lite";
import {$authHost} from "../userAPI";
import {Context} from "../index";

const Appointments = observer(() => {
    const {user} = useContext(Context)
    const [filters, setFilters] = useState({
        from: '',
        to: '',
        status: ''
    })

    const radioInputs = [
        'Sent', 'Approved', 'Rejected', 'Completed', 'Cancelled'
    ]

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        $authHost.get('/api/v1/appointments/patient/' + user.user.id).then(data => {
            setAppointments(data.data)
        })
    }, [])

    function filterHandler(event) {
        const {name, value} = event.target
        if (name === 'date-from') setFilters(prevState => {
            return {...prevState, from: value}
        })
        else if (name === 'date-to') setFilters(prevState => {
            return {...prevState, to: value}
        })
        else if (name === 'status-group') setFilters(prevState => {
            return {...prevState, status: value}
        })
    }


    return (
        <div>
            <Row className="mt-3" style={{marginInline: 20}}>
                <Col md={3}>
                    <Card style={{
                        padding: 20,
                        minHeight: "90vh",
                        height: "100%",
                        borderRadius: "10px 10px 0 0 ",
                        border: 0,
                        background: "white"
                    }}>
                        <Card.Title> Date</Card.Title>
                        <hr/>
                        <Form>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Form.Label style={{margin: 0, padding: 0}}>From:</Form.Label>
                                <Form.Control
                                    type="date"
                                    style={{marginBlock: 10, width: "80%"}}
                                    name="date-from"
                                    value={filters.from}
                                    onChange={filterHandler}
                                />
                            </div>

                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Form.Label style={{margin: 0, padding: 0}}>To:</Form.Label>
                                <Form.Control
                                    type="date"
                                    style={{marginBlock: 10, width: "80%"}}
                                    name="date-to"
                                    value={filters.to}
                                    onChange={filterHandler}
                                />
                            </div>
                        </Form>
                        <Card.Title className="mt-5">Status</Card.Title>
                        <hr/>
                        <Form>
                            {radioInputs.map(item =>
                                <Form.Check
                                    key={item}
                                    label={item}
                                    value={item}
                                    name="status-group"
                                    type="radio"
                                    checked={filters.status === item}
                                    onChange={filterHandler}
                                />
                            )}
                        </Form>
                        <hr/>
                        <Button variant="outline-dark" onClick={() => setFilters({
                            from: '',
                            to: '',
                            status: ''
                        })}>RESET</Button>
                    </Card>
                </Col>
                <Col md={9} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <h2 className="mb-3">Appointments</h2>
                    <Row xxl={3} xl={2} style={{width: "100%"}}>
                        {
                            appointments
                                .filter(date => {
                                    if (filters.from === '' || filters.to === '') return true
                                    const date2 = new Date(date.date)
                                    console.log(date2)
                                    return date2 >= new Date(filters.from) && date2 <= new Date(filters.to)
                                })
                                .filter(status => {
                                    if (filters.status === '') return true
                                    return status.status.toLowerCase() === filters.status.toLowerCase()
                                })
                                .map(item =>
                                    <AppointmentItem key={item.id} item={item}/>
                                )
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
});

export default Appointments;