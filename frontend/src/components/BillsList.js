import React, {useContext, useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {$authHost} from "../userAPI";
import {Context} from "../index";
import BillItem from "./BillItem";
import {observer} from "mobx-react-lite";

const BillsList = observer(({status, updateList}) => {
    const {user} = useContext(Context)
    const [bills, setBills] = useState([])

    useEffect(() => {
        if(user.user.role === "USER"){
            $authHost.get('/api/v1/bills/patient/' + user.user.id).then(data => {
                setBills(data.data)
            })
        }
        else if (user.user.role === "DOCTOR"){
            $authHost.get('/api/v1/doctor/bills/' + user.user.id).then(data => {
                setBills(data.data.bills)
            })
        }


    }, [updateList])


    return (
        <Row xs={1}>
            {
                bills
                    .filter(item => {
                        if(status === "ALL") return true
                        return item.status === status
                    })
                    .sort((x, y) => {
                        if(x.id > y.id) return 1;
                        else if(x.id < y.id) return -1;
                        else return 0;
                    })
                    .map(item =>
                    <BillItem key={item.id} item={item}/>
                )
            }

        </Row>
    );
});

export default BillsList;