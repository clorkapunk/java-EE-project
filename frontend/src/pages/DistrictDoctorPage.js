import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardTitle, Container, OverlayTrigger, PageItem, Pagination, Popover} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faLock, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {$authHost} from "../userAPI";
import DistrictDoctorPagenation from "../components/DistrictDoctorPagenation";
import {da} from "@faker-js/faker";
import Login from "./Login";

const DistrictDoctorPage = observer(() => {
    const [data, setData] = useState({
        firstname: 'sample',
        lastname: 'sample',
        email: 'sample',
        number: 'sample',
        hospital: {
            title: 'sample',
            address: 'sample',
            districtDoctor: {
                firstname: 'sample',
                lastname: 'sample',
                specialization: {
                    id: 'sample',
                    title: 'sample'
                },
                schedule: 'sample',
                office: 'sample'
            }
        },
        address: 'sample',
        iin: 'sample',
        dob: '1999-01-01',
        gender: 'sample',
        verified: false
    })
    const [appointData, setAppointData] = useState('')
    const [loadNewData, setLoadNewData] = useState(false)

    const navigate = useNavigate()

    const {user} = useContext(Context)

    function postAppointment(date, time, note) {
        $authHost.post('/api/v1/patient/appointment', {
            date: date, time: time, patientId: user.user.id, doctorId: data.hospital.districtDoctor.id, note: note
        }).then(data => {

                navigate('/appointment/' + data.data)
                // setLoadNewData(prevState => {
                //     return !prevState
                // })
            }
        ).catch(
            e => console.log(e)
        )

    }


    useEffect(() => {
        $authHost.get('/api/v1/patient/' + user.user.id).then(data => {
            setData(data.data)
            $authHost.get('/api/v1/appointments/available/' + data.data.hospital.districtDoctor.id).then(data => {
                setAppointData(data.data)
            })
        })
    }, [loadNewData])

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
        .replace(' ', ': ')
        .replaceAll('-', ' - ')
        .replaceAll(/(?:^|(?<= ))(MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?= )|$)/g, function (match) {
        return replace_map[match];
    })


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
                            {data.hospital.title}
                            <br/>
                            {data.hospital.address}
                            <br/>
                            District: {data.hospital.districtDoctor.specialization.id + " " + data.hospital.districtDoctor.specialization.title}
                        </p>
                    </div>
                    <div style={{display: "flex", width: '100%', justifyContent: "space-between"}}>
                        <p style={{width: '30%', color: "gray"}}>Work schedule</p>
                        <p style={{width: '70%'}}>
                            Doctor: {data.hospital.districtDoctor.firstname + ' ' + data.hospital.districtDoctor.lastname},
                            office №{data.hospital.districtDoctor.office}
                            <br/>
                            {schedule}
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
                <DistrictDoctorPagenation items={appointData} post={postAppointment}/>
            </Card>
        </Container>
    );
});

export default DistrictDoctorPage;