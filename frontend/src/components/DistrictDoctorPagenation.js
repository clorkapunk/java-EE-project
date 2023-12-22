import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, CardBody, CardText, CardTitle, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

const DistrictDoctorPagenation = observer(({items, post}) => {
    const navigate = useNavigate()

    const testData =    [
        [
            {
                date: '1992-02-02',
                availableTime: []
            },
            {
                date: '1992-02-03',
                availableTime: []
            },
            {
                date: '1992-02-04',
                availableTime: []
            },
            {
                date: '1992-02-05',
                availableTime: []
            },
            {
                date: '1992-02-06',
                availableTime: []
            }
        ],
        [{
            date: '1992-02-02',
            availableTime: []
        },
            {
                date: '1992-02-03',
                availableTime: []
            },
            {
                date: '1992-02-04',
                availableTime: []
            },
            {
                date: '1992-02-05',
                availableTime: []
            },
            {
                date: '1992-02-06',
                availableTime: []
            }],
        [{
            date: '1992-02-02',
            availableTime: []
        },
            {
                date: '1992-02-03',
                availableTime: []
            },
            {
                date: '1992-02-04',
                availableTime: []
            },
            {
                date: '1992-02-05',
                availableTime: []
            },
            {
                date: '1992-02-06',
                availableTime: []
            }],
        [{
            date: '1992-02-02',
            availableTime: []
        },
            {
                date: '1992-02-03',
                availableTime: []
            },
            {
                date: '1992-02-04',
                availableTime: []
            },
            {
                date: '1992-02-05',
                availableTime: []
            },
            {
                date: '1992-02-06',
                availableTime: []
            }]
    ]
    const [cards, setCards] = useState(testData)
    const [page, setPage] = useState(0)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [note, setNote] = useState("")


    useEffect(() => {

        if (items[page] === undefined) return
        setDate(items[page][0].date)
        setCards(items)
        setTime('')


    }, [items])

    return (
        <>
            {(time === '') ?
                <Card.Body style={{padding: 30, display: "flex", flexDirection: "column"}}>
                    <p className='mb-5' style={{margin: 0, fontWeight: "bold"}}>Choose date</p>
                    <div className='mb-5' style={{display: "flex", justifyContent: "space-between"}}>
                        {
                            page !== 0
                            &&
                            <Button
                                name="back"
                                id="back"
                                onClick={() => {
                                    if (page === 0) return
                                    setPage(prevState => {
                                        setDate(cards[prevState - 1][0].date)
                                        return prevState - 1
                                    })
                                }}
                                style={{border: 0, background: "transparent", color: "black", fontSize: '1.3em'}}
                            >
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </Button>
                        }

                        {
                            cards[page].map(item =>
                                <Card key={item.date}
                                      onClick={() => setDate(item.date)}
                                      style={{width: 110, height: 100, marginInline: 2, cursor: "pointer"}}
                                      className={date === item.date ?
                                          (
                                              "district-doctor-page-date-card active"
                                          )

                                          :
                                          "district-doctor-page-date-card"
                                      }
                                >
                                    <CardBody style={{textAlign: "center", padding: 10}}>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '0.9em'
                                        }}>{new Date(item.date).toLocaleDateString("en-US", {weekday: 'short'})}</p>
                                        <b style={{fontSize: '1.5em'}}>{new Date(item.date).toLocaleDateString("en-US", {day: 'numeric'})}</b>
                                        <br/>
                                        {new Date(item.date).toLocaleDateString("en-US", {month: 'long'})}

                                    </CardBody>
                                </Card>
                            )
                        }
                        {
                            page !== 3
                            &&
                            <Button
                                name="next"
                                id="next"
                                onClick={() => {
                                    if (page === 3) return
                                    setPage(prevState => {
                                        setDate(cards[prevState + 1][0].date)
                                        return prevState + 1
                                    })
                                }}
                                style={{border: 0, background: "transparent", color: "black", fontSize: '1.3em'}}
                            >
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </Button>
                        }

                    </div>

                    <p className='mb-4' style={{margin: 0, fontWeight: "bold"}}>Choose time</p>
                    <Row xxl={6} xs={6} className='mb-5'>
                        {cards[page].find(item => item.date === date) !== undefined &&
                            (cards[page].find(item => item.date === date).availableTime.length === 0
                                ?
                                <div style={{
                                    background: '#F9FAFB',
                                    paddingInline: 60,
                                    paddingBlock: 15,
                                    borderRadius: 10,
                                    width: '100%'
                                }}>
                                    <p style={{margin: 0, opacity: 0.9, fontSize: '0.9em', textAlign: "center"}}>There
                                        is no free time for an appointment or appointment on the selected date is
                                        prohibited, select another date</p>
                                </div>
                                :
                                cards[page].find(item => item.date === date).availableTime.map(item =>
                                    <Button
                                        key={item}
                                        className="district-doctor-page-time-card"
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #D2D2D2',
                                            background: "white",
                                            color: "black",
                                            margin: 5
                                        }}
                                        onClick={() => setTime(item)}
                                    >
                                        {item}
                                    </Button>
                                ))
                        }
                    </Row>
                    <div className='mb-2'>
                        <Button className="district-doctor-page-back-btn" style={{
                            width: "auto", paddingInline: 50, paddingBlock: 10, background: "#F5F5F5"
                        }}
                                onClick={() => navigate('/')}
                        >

                            Back
                        </Button>
                    </div>
                </Card.Body>
                :
                <>
                    <CardText style={{
                        display: "flex",
                        background: "#F7F7F7",
                        margin: 0,
                        padding: "10px 30px 10px 30px",
                        alignItems: "center"
                    }}>
                        <p style={{margin: 0, fontSize: '1em', fontWeight: 'light'}}>
                            Come to medical organization&nbsp;
                        </p>
                        <p style={{margin: 0, fontWeight: "bolder"}}>
                            {new Date(date).toLocaleDateString("en-US", {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}&nbsp;
                        </p>
                        <p style={{margin: 0, fontWeight: "bolder"}}>
                            {time.substring(0, time.indexOf('-'))}
                        </p>
                    </CardText>
                    <Card.Body style={{padding: 30, display: "flex", flexDirection: "column"}}>
                        <Form>
                            <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{color: 'black', opacity: 0.7, fontSize: '0.9em'}}>Reason for
                                    visit</Form.Label>
                                <Form.Control as="textarea" rows={3} value={note}
                                              onChange={(e) => setNote(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <div className='mb-2' style={{display: "flex", justifyContent: "space-between"}}>
                            <Button className="district-doctor-page-back-btn" style={{
                                width: "auto", paddingInline: 50, paddingBlock: 10, background: "#F5F5F5"
                            }}
                                    onClick={() => setTime('')}
                            >

                                Back
                            </Button>
                            <Button variant='success' style={{paddingBlock: 10, paddingInline: 30}}
                                    onClick={() => post(date, time, note)}
                            >

                                Sign up
                            </Button>
                        </div>
                    </Card.Body>


                </>

            }

        </>

    )
        ;
});

export default DistrictDoctorPagenation;