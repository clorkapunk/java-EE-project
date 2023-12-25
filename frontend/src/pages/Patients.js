import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {observer} from "mobx-react-lite";
import {$authHost} from "../userAPI";
import {Context} from "../index";
import {forEach} from "react-bootstrap/ElementChildren";
import {useNavigate} from "react-router-dom";


const Patients = observer(() => {
    const {user} = useContext(Context)
    const [iinFilter, setIinFilter] = useState('')
    const products = [
        {
            id: 1, name: "Ordinarycoders course 1",
            surname: "sample",
            iin: 'sample',
            address: 'sample',
            number: 'sample',
            gender: "sample",
            dob: "sample",
            link: <Button onClick={() => console.log(1)}></Button>
        }
    ];
    const [data, setData] = useState(products)
    const navigate = useNavigate()

    useEffect(() => {
        $authHost.get('/api/v1/doctor/patients').then(data => {
            let dataTemp = [];
            data.data.forEach(item => {
                dataTemp.push({
                    id: item.id,
                    name: item.firstname,
                    surname: item.lastname,
                    iin: item.iin,
                    address: item.address,
                    gender: item.gender,
                    number: item.number,
                    dob: new Date(item.dob).toLocaleDateString("en-US", {year: 'numeric',day: 'numeric', month: 'long'}),
                    link: <Button
                        onClick={() => navigate('/patient-profile/' + item.id)}
                        variant='link' style={{color: "#6a83b8"}}
                    >
                        see profile page
                    </Button>
                })
            })
            setData(dataTemp)
        })
    }, [])


    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true
        },
        {
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            dataField: "surname",
            text: "Surname",
            sort: true
        },
        {
            dataField: "iin",
            text: "IIN",
            sort: true
        },
        {
            dataField: "number",
            text: "Phone number"
        },
        {
            dataField: "gender",
            text: "Gender",
            sort: true
        },
        {
            dataField: 'dob',
            text: "Date of birth",
            sort: true
        },
        {
            dataField: "link",
            text: ""
        }
    ];

    const sizePerPageList = [{
        text: '10', value: 10
    }, {
        text: '15', value: 15
    }, {
        text: '20', value: 20
    }, {
        text: '25', value: 25
    }]


    return (
        <Container style={{minHeight: '90vh'}} className='pt-3'>
            <h2 className="mb-3 mt-0 text-center">
                {
                    (user.user.role === "DOCTOR") ?
                        "Patients database"
                        :
                        "Issued invoices"
                }
            </h2>

            <div style={{display: "flex", justifyContent: "center"}}>
                <Form.Control type="number" className='mb-2' placeholder="Find by IIN"
                              value={iinFilter}
                              onChange={(e) => setIinFilter(e.target.value)}
                              style={{width: '20%'}}/>
            </div>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={data.filter(x => {return x.iin.startsWith(iinFilter)})}
                columns={columns}
                pagination={paginationFactory({sizePerPage: 10, sizePerPageList: sizePerPageList})}
            />
        </Container>
    );
});

export default Patients;