import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardTitle, Container, OverlayTrigger, PageItem, Pagination, Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faLock, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {$authHost} from "../userAPI";
import DistrictDoctorPagenation from "../components/DistrictDoctorPagenation";

const DistrictDoctorPage = observer(() => {
    const [data, setData] = useState({
        firstname: 'sample',
        lastname: 'sample',
        email: 'sample',
        number: 'sample',
        hospital: {
            title: 'sample'
        },
        address: 'sample',
        iin: 'sample',
        dob: '1999-01-01',
        gender: 'sample',
        verified: false
    })
    const [appointData, setAppointData] = useState('')

    const navigate = useNavigate()

    const {user} = useContext(Context)

    useEffect(() => {
        $authHost.get('/api/v1/patient/' + user.user.id).then(data => {
            setData(data.data)
            console.log(data.data)
            $authHost.get('/api/v1/appointments/available/' + data.data.hospital.districtDoctor.id).then(data => {
                setAppointData(data.data)
                console.log(data.data)
            })
        })
    }, [])


    return (
        <Container className='w-50 mb-5' style={{minHeight: '90vh', paddingInline: 100}}>
            <Card className='mt-5' style={{
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
                    <p style={{margin: 0, fontSize: '0.9em'}}>Appointment to the district doctor</p>
                </CardTitle>
                <Card.Body style={{padding: 30, display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", width: '100%', justifyContent: "space-between"}}>
                        <p style={{width: '30%', color: "gray"}}>Clinic</p>
                        <p style={{width: '70%'}}>
                            title
                            <br/>
                            address
                            <br/>
                            District: doctor
                        </p>
                    </div>
                    <div style={{display: "flex", width: '100%', justifyContent: "space-between"}}>
                        <p style={{width: '30%', color: "gray"}}>Work schedule</p>
                        <p style={{width: '70%'}}>
                            Appointment
                            <br/>
                            Doctor, cab
                            <br/>
                            schedule
                        </p>
                    </div>
                </Card.Body>
            </Card>
            <Card className='mt-3' style={{
                borderRadius: 0,
                border: 0,
                height: '100%',
                boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)"
            }}>
                <DistrictDoctorPagenation  />
            </Card>
        </Container>
    );
});

export default DistrictDoctorPage;