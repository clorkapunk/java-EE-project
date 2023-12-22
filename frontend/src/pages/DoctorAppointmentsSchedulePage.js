import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup, Tab, Tabs} from "react-bootstrap";
import BillsList from "../components/BillsList";
import DoctorCalendar from "../components/DoctorCalendar";
import {$authHost} from "../userAPI";
import {useCol} from "react-bootstrap/Col";
import {Context} from "../index";

const DoctorAppointmentsSchedulePage = observer(() => {
    const {user} = useContext(Context)
    const [tab, setTab] = useState("all")
    const testDataMini = [
        {
            date: '1992-02-02',
            schedule: [
                {
                    time: '08:00-08:20',
                    appointment: null
                }
            ]
        },
        {
            date: '1992-02-03',
            schedule: [
                {
                    time: '08:00-08:20',
                    appointment: null
                }
            ]
        },
        {
            date: '1992-02-04',
            schedule: [
                {
                    time: '08:00-08:20',
                    appointment: null
                }
            ]
        },
        {
            date: '1992-02-05',
            schedule: [
                {
                    time: '08:00-08:20',
                    appointment: null
                }
            ]
        },
        {
            date: '1992-02-06',
            schedule: [
                {
                    time: '08:00-08:20',
                    appointment: null
                }
            ]
        },
        {
            date: '1992-02-07',
            schedule: [
                {
                    time: '08:00-08:20',
                    appointment: null
                }
            ]
        }
    ]
    const testData = [
        testDataMini,
        testDataMini,
        testDataMini,
        testDataMini
    ]

    const [data, setData] = useState(testData)
    const [weekPage, setWeekPage] = useState(0)

    useEffect(() => {
        $authHost.get('/api/v1/doctor/schedule/' + user.user.id).then(data => { 
            setData(data.data)
        })
    }, [])

    return (
        <Container style={{minHeight: "90vh"}}>
            <h2 className="mb-4 mt-4 text-center">Schedule of future appointments</h2>

            <Tabs
                onSelect={(e) => setTab(e)}
                defaultActiveKey="calendar"
                id="fill-tab-example"
                className="mb-3 bills-tabs justify-content-center border-0"
            >
                <Tab eventKey="calendar" title="Сalendar">
                    <div className='mb-3'
                         style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Button variant='secondary'
                                onClick={() => {
                                    if (weekPage === 0) return
                                    setWeekPage(prevState => {
                                        return prevState - 1
                                    })
                                }}
                        >
                            Prev. Week
                        </Button>
                        <p style={{margin: 0}}>{
                            new Date(data[weekPage].at(0).date).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})
                            + " — " +
                            new Date(data[weekPage].at(-1).date).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})
                            }</p>
                        <Button variant='secondary'
                                onClick={() => {
                                    if (weekPage === 3) return
                                    setWeekPage(prevState => {
                                        return prevState + 1
                                    })
                                }}
                        >
                            Next week
                        </Button>
                    </div>
                    <DoctorCalendar week={data[weekPage]}/>
                </Tab>
                <Tab eventKey="list" title="List">

                </Tab>
            </Tabs>
        </Container>
    );
});

export default DoctorAppointmentsSchedulePage;