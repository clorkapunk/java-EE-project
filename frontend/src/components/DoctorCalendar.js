import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import DoctorCalendarItem from "./DoctorCalendarItem";

const DoctorCalendar = ({week}) => {
    const testData = [
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
    const [data, setData] = useState(testData)

    useEffect(() => {
        if(week === undefined) return
        setData(week)
    }, [week])

    return (
        <Row xs={2} className='d-flex justify-content-center'>
            {data.map(item =>
                <DoctorCalendarItem key={item.date} item={item}/>
            )}
        </Row>
    );
};

export default DoctorCalendar;