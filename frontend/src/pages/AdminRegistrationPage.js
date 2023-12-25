import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, CardTitle, Col, Container, Form, InputGroup, OverlayTrigger, Popover, Row} from "react-bootstrap";
import BooksPostMenu from "../manager/BooksPostMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faGear,
    faLock,
    faPenToSquare,
    faTrashCan,
    faUserDoctor,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {Context} from "../index";
import {$authHost} from "../userAPI";
import {useNavigate} from "react-router-dom";
import Login from "./Login";

const AdminRegistrationPage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [validCards, setValidCards] = useState({
        personal: false,
        prof: false,
        system: false
    })
    const [hospitals, setHospitals] = useState([])
    const [specs, setSpecs] = useState([])

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        iin: '',
        number: '',
        address: '',
        gender: '',
        dob: '',
        office: '',
        schedule: {
            dayFrom: '',
            dayTo: '',
            timeFrom: '',
            timeTo: ''
        },
        hospital: null,
        specialization: null,
        role: "DOCTOR"
    })

    function postUser() {
        if (data.firstname === '' || data.lastname === '' || data.dob === '' || data.gender === '' || data.address === '' || data.iin === '' || data.number === '') {
            setValidCards(prevState => {return {...prevState, personal: true}})
        }
        else setValidCards(prevState => {return {...prevState, personal: false}})
        if (data.office === '' || data.schedule.dayFrom === '' || data.schedule.dayTo === '' || data.schedule.timeFrom === '' || data.schedule.timeTo === ''
            || data.hospital === '' || data.specialization === '') {
            setValidCards(prevState => {return {...prevState, prof: true}})
        }
        else setValidCards(prevState => {return {...prevState, prof: false}})
        if (data.email === '' || data.password === '') {
            setValidCards(prevState => {return {...prevState, system: true}})
        }
        else setValidCards(prevState => {return {...prevState, system: false}})

        if(validCards.prof || validCards.personal || validCards.system) return

        const scheduleStr = data.schedule.dayFrom + "-" + data.schedule.dayTo + " " + data.schedule.timeFrom + "-" + data.schedule.timeTo
        var dataTemp = {
            ...data,
            schedule: scheduleStr,
            hospital: parseInt(data.hospital),
            specialization: parseInt(data.specialization)
        }


        $authHost.post('/api/v1/admin', dataTemp).then(data => {
            setData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                iin: '',
                number: '',
                address: '',
                gender: '',
                dob: '',
                office: '',
                schedule: {
                    dayFrom: '',
                    dayTo: '',
                    timeFrom: '',
                    timeTo: ''
                },
                hospital: null,
                specialization: null
            })
            alert('Doctor profile created.')
        })
        console.log(dataTemp)
    }

    function onChangeHandler(e) {
        const {name, value, checked, id} = e.target
        if (name === "firstname") setData(prevState => {
            return {...prevState, firstname: value}
        })
        else if (name === "lastname") setData(prevState => {
            return {...prevState, lastname: value}
        })
        else if (name === "dob") setData(prevState => {
            return {...prevState, dob: value}
        })
        else if (name === "iin") setData(prevState => {
            return {...prevState, iin: value}
        })
        else if (name === "number") setData(prevState => {
            return {...prevState, number: value}
        })
        else if (name === "address") setData(prevState => {
            return {...prevState, address: value}
        })
        else if (name === "gender") setData(prevState => {
            return {...prevState, gender: id}
        })
        else if (name === "office") setData(prevState => {
            return {...prevState, office: value}
        })
        else if (name === "dayFrom") setData(prevState => {
            return {...prevState, schedule: {...prevState.schedule, dayFrom: value}}
        })
        else if (name === "dayTo") setData(prevState => {
            return {...prevState, schedule: {...prevState.schedule, dayTo: value}}
        })
        else if (name === "timeFrom") setData(prevState => {
            return {...prevState, schedule: {...prevState.schedule, timeFrom: value}}
        })
        else if (name === "timeTo") setData(prevState => {
            return {...prevState, schedule: {...prevState.schedule, timeTo: value}}
        })
        else if (name === "hospital") setData(prevState => {
            return {...prevState, hospital: value}
        })
        else if (name === "specialization") setData(prevState => {
            return {...prevState, specialization: value}
        })
        else if (name === "email") setData(prevState => {
            return {...prevState, email: value}
        })
        else if (name === "password") setData(prevState => {
            return {...prevState, password: value}
        })
    }


    useEffect(() => {

        $authHost.get('/api/v1/specializations').then(data => {
            setSpecs(data.data)
        })

        $authHost.get('/api/v1/hospitals').then(data => {
            setHospitals(data.data.hospitals)
        })

    }, [])


    return (
        <Container className='w-50' style={{minHeight: '90vh'}}>
            <Card
                className='mt-4'
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
                    <p style={{margin: 0}}>Personal Data</p>
                    {
                        validCards.personal &&
                        <p style={{margin: 0, color: "red", fontSize: '0.7em', fontWeight: 'light'}}>*please fill all
                            the fields</p>
                    }
                </CardTitle>
                <Card.Body style={{padding: 30}}>
                    <Row xl={3}>
                        <Col style={{display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: 0}}>
                            <FontAwesomeIcon icon={faUserDoctor} style={{height: 200}}/>
                        </Col>
                        <Col style={{paddingLeft: 0, paddingRight: 40}}>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>First name</Form.Label>
                                    <Form.Control type="text" placeholder="" name='firstname' value={data.firstname}
                                                  onChange={onChangeHandler}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Surname</Form.Label>
                                    <Form.Control type="text" placeholder="" name='lastname' value={data.lastname}
                                                  onChange={onChangeHandler}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Date of birth</Form.Label>
                                    <Form.Control type="date" placeholder="" name='dob' value={data.dob}
                                                  onChange={onChangeHandler}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Gender</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Male"
                                            name="gender"
                                            type='radio'
                                            id='MALE'
                                            checked={data.gender === 'MALE'} onChange={onChangeHandler}
                                        />
                                        <Form.Check
                                            inline
                                            label="Female"
                                            name="gender"
                                            id="FEMALE"
                                            type='radio'
                                            checked={data.gender === 'FEMALE'} onChange={onChangeHandler}
                                        />
                                    </div>

                                </Form.Group>
                            </Form>
                        </Col>
                        <Col style={{paddingLeft: 40, paddingRight: 20}}>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Individual identification
                                        number</Form.Label>
                                    <Form.Control type="number" placeholder="" name='iin' value={data.iin}
                                                  onChange={onChangeHandler}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Phone number</Form.Label>
                                    <Form.Control type="number" placeholder="87776665544" name='number'
                                                  value={data.number} onChange={onChangeHandler}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Address</Form.Label>
                                    <Form.Control as="textarea" placeholder="" style={{maxHeight: 90}} name='address'
                                                  value={data.address} onChange={onChangeHandler}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
            <Card
                className='mt-2'
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
                    <p style={{margin: 0}}>Doctor professional data</p>
                    {
                        validCards.prof &&
                        <p style={{margin: 0, color: "red", fontSize: '0.7em', fontWeight: 'light'}}>*please fill all
                            the fields</p>
                    }
                </CardTitle>
                <Card.Body style={{padding: 30}}>
                    <Row xl={2}>
                        <Col style={{paddingLeft: 20, paddingRight: 40}}>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Office NO.</Form.Label>
                                    <Form.Control type="number" placeholder="" name='office' value={data.office}
                                                  onChange={onChangeHandler}/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Schedule</Form.Label>
                                    <div className='mb-2' style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Days:</Form.Label>
                                        <Form.Select aria-label="Default select example" style={{width: 150}}
                                                     name='dayFrom' value={data.schedule.dayFrom}
                                                     onChange={onChangeHandler}>
                                            <option>Choose day</option>
                                            <option value="MON">Monday</option>
                                            <option value="TUE">Tuesday</option>
                                            <option value="WED">Wednesday</option>
                                            <option value="THU">Thursday</option>
                                            <option value="FRI">Friday</option>
                                        </Form.Select>
                                        -
                                        <Form.Select aria-label="Default select example" style={{width: 150}}
                                                     name='dayTo' value={data.schedule.dayTo}
                                                     onChange={onChangeHandler}>
                                            <option>Choose day</option>
                                            <option value="MON">Monday</option>
                                            <option value="TUE">Tuesday</option>
                                            <option value="WED">Wednesday</option>
                                            <option value="THU">Thursday</option>
                                            <option value="FRI">Friday</option>
                                        </Form.Select>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Time:</Form.Label>
                                        <Form.Control type="text" placeholder="08:00" style={{width: 150}}
                                                      name='timeFrom' value={data.schedule.timeFrom}
                                                      onChange={onChangeHandler}/>
                                        -
                                        <Form.Control type="text" placeholder="18:00" style={{width: 150}} name='timeTo'
                                                      value={data.schedule.timeTo} onChange={onChangeHandler}/>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col style={{paddingLeft: 40, paddingRight: 20}}>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Hospital</Form.Label>
                                    <Form.Select aria-label="Default select example" name='hospital'
                                                 value={data.hospital} onChange={onChangeHandler}>
                                        <option>Choose hospital</option>
                                        {
                                            hospitals.length !== 0 &&
                                            hospitals.map(item =>
                                                <option value={item.id}>{item.title}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Specialization</Form.Label>
                                    <Form.Select aria-label="Default select example" name='specialization'
                                                 value={data.specialization} onChange={onChangeHandler}>
                                        <option>Choose specialization</option>
                                        {
                                            specs.length !== 0 &&
                                            specs.map(item =>
                                                <option value={item.id}>{item.id} - {item.title}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card
                className='mt-2 mb-4'
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
                    <p style={{margin: 0}}>System identification data</p>
                    {
                        validCards.system &&
                        <p style={{margin: 0, color: "red", fontSize: '0.7em', fontWeight: 'light'}}>*please fill all
                            the fields</p>
                    }
                </CardTitle>
                <Card.Body style={{padding: 30}}>
                    <Row xl={2}>
                        <Col style={{paddingLeft: 20, paddingRight: 40}}>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="example@mail.com" name='email'
                                                  value={data.email} onChange={onChangeHandler}/>
                                </Form.Group>

                            </Form>
                        </Col>
                        <Col style={{paddingLeft: 40, paddingRight: 20}}>
                            <Form>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className='mb-1' style={{fontSize: '0.9em'}}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="" name='password' value={data.password}
                                                  onChange={onChangeHandler}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className='mt-3 d-flex justify-content-between'>
                        <Button variant={"secondary"} style={{marginLeft: 20, width: 120}}
                                onClick={() => navigate('/')}
                        >Back</Button>
                        <Button variant={"success"} style={{marginRight: 20, width: 120}}
                                onClick={() => postUser()}
                        >Accept form</Button>
                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
});

export default AdminRegistrationPage;