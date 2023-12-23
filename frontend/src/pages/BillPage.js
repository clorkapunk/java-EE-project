import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image} from "react-bootstrap";
import {faHandHoldingMedical, faHospital} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react-lite";
import {$authHost} from "../userAPI";
import {Context} from "../index";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const BillPage = observer(() => {
    const {user} = useContext(Context)
    const {id} = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const [bill, setBill] = useState({
        id: 'sample',
        createdAt: '1992-01-01',
        paidAt: '1992-01-01',
        doctor: {
            firstname: 'sample',
            lastname: 'sample',
            specialization: {
                id: 0,
                title: 'sample'
            },
            hospital: {
                title: 'sample',
                address: 'sample'
            }
        },
        patient: {
            firstname: 'sample',
            lastname: 'sample',
            number: 'sample',
            address: 'sample',
            iin: 'sample'
        },
        total: 'sample',
        deadline: '1992-01-01'
    })
    const [update, setUpdate] = useState(true)

    function payTheBill(){
        $authHost.put('/api/v1/bills/pay/' + user.user.id + '/' + id).then(data => {
            setUpdate(prevState => {return !prevState})
        })
    }

    useEffect(() => {
        $authHost.get('/api/v1/bills/patient/' + user.user.id + "/" + id).then(data => {
            setBill(data.data)
        })

    }, [update])

    const createdAt = new Date(bill.createdAt).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})
    const deadline = new Date(bill.deadline).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})

    return (
        <Container className="w-50" style={{minHeight: '90vh'}}>
            <div className="mt-5 mb-5" style={{boxShadow: "0px 0px 8px 0px rgba(34, 60, 80, 0.2)"}}>
                <div  style={{background: "white", paddingBlock: 40, paddingInline: 40}}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 style={{fontSize: "5em"}}>INVOICE</h1>
                        <FontAwesomeIcon style={{height: 100}} icon={faHandHoldingMedical}/>
                    </div>
                    <div className="mt-1" style={{display: "flex", width: "50%"}}>
                        <p style={{width: "40%"}}><b>Invoice Number</b><br/>{bill.id.toString().padStart(6, "0")}</p>
                        <p style={{width: "50%", marginLeft: '10%'}}><b>Date of issue</b><br/>
                            {createdAt}
                        </p>
                    </div>
                    <div className="mt-2" style={{display: "flex", width: "50%"}}>
                        <p style={{width: "40%", margin: 0}}><b>Billed to</b>
                            <br/>
                            {bill.patient.firstname + " " + bill.patient.lastname}
                            <br/>
                            {bill.patient.address}
                            <br/>
                            {bill.patient.iin}
                            <br/>
                            {bill.patient.number.replace("8",'+7')}
                        </p>
                        <p style={{width: "50%", margin: 0, marginLeft: "10%"}}><b>From</b>
                            <br/>
                            {bill.doctor.hospital.title}
                            <br/>
                            {bill.doctor.hospital.address}
                            <br/>
                            {bill.doctor.firstname + ' ' + bill.doctor.lastname}
                        </p>
                    </div>
                </div>
                <div style={{background: '#EDF7EF', paddingInline: 40, paddingBlock: 20}}>
                    <div style={{fontWeight: "bolder", display: "flex", justifyContent: "space-between"}}>
                        <p>Description</p>
                        <div style={{display: "flex", width: '50%'}}>
                            <p style={{width: "30%", textAlign: "start"}}>Unit cost</p>
                            <p style={{width: "40%", textAlign: "center"}}>Qty / Hr rate</p>
                            <p style={{width: "30%", textAlign: "end"}}>Amount</p>
                        </div>
                    </div>
                    <hr style={{margin: 0, height: 2, background: "black", opacity: 1}}/>

                    <div className='mt-2'>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p style={{width: '40%'}}>Description</p>
                            <div style={{display: "flex", width: '50%'}}>
                                <p style={{width: "30%", textAlign: "start"}}>${bill.total}</p>
                                <p style={{width: "40%", textAlign: "center"}}>1</p>
                                <p style={{width: "30%", textAlign: "end"}}>${bill.total}</p>
                            </div>
                        </div>
                    </div>
                    <hr style={{margin: 0, height: 2, background: "black", opacity: 1}}/>
                    <div className='mt-4' style={{display: "flex", width: "20%", marginLeft: "auto"}}>
                        <p style={{textAlign: "start", width: '50%', margin: 0}}><b>
                            Subtotal
                            <br/>
                            Discount
                            <br/>
                            (Tax rate)
                            <br/>
                            Tax
                        </b></p>
                        <p style={{textAlign: "end", width: '50%', margin: 0}}>
                            ${bill.total}
                            <br/>
                            $0
                            <br/>
                            0%
                            <br/>
                            $0
                        </p>
                    </div>
                </div>
                <div style={{background: "white", paddingInline: 40, paddingBlock: 20, display: "flex", flexDirection: "column",alignItems: "end"}}>
                    <div style={{display:"flex",
                        width: "fit-content",
                        background: "#666666",
                        paddingBlock: 5,
                        paddingInline: 20,
                        color: "white",
                        alignItems: "center"}}>
                        <p style={{margin: 0, marginRight: 30}}>Invoice total</p>
                        <p style={{margin: 0, fontSize: "1.8em"}}>${bill.total}</p>
                    </div>
                    {bill.status === "NOTPAID" ?
                        <Button className="mt-2" variant='success' style={{width: 'auto', borderRadius: 0}}
                                onClick={() => payTheBill()}
                        >Pay the bill</Button>
                        :
                        <p className="mt-2" style={{margin: 0, textAlign: "left"}}>Date of payment: <br/>{new Date(bill.paidAt).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: "numeric"})}</p>
                    }
                </div>
                <div style={{background: "white", paddingInline: 40, paddingTop: 20, paddingBottom: 20}}>
                    <p style={{fontSize: '0.9em'}}>
                        <b>Terms</b>
                        <br/>
                        E.g Please pay invoice by {deadline}
                    </p>
                </div>
            </div>

        </Container>
    );
});

export default BillPage;