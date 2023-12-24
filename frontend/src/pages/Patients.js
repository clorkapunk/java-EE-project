import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
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
    const products = [
        {
            id: 1, name: "Ordinarycoders course 1",
            surname: "sample",
            iin: 'sample',
            address: 'sample',
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
                    dob: new Date(item.dob).toLocaleDateString("en-US", {year: 'numeric',day: 'numeric', month: 'numeric'}),
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
            dataField: "address",
            text: "Address",
            sort: true
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
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={data}
                columns={columns}
                pagination={paginationFactory({sizePerPage: 10, sizePerPageList: sizePerPageList})}
            />
        </Container>
    );
});

export default Patients;