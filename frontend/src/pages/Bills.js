import React, {useContext, useState} from 'react';
import {Container, ListGroup, Tab, Tabs} from "react-bootstrap";
import BillsList from "../components/BillsList";
import BillItem from "../components/BillItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Bills = observer(() => {
    const {user} = useContext(Context)
    const [tab, setTab] = useState("all")


    return (
        <Container style={{minHeight: "90vh"}}>
            <h2 className="mb-5 mt-4 text-center">
                {
                    (user.user.role === "USER" || user.user.role === "ADMIN") ?
                        "Bills for payment"
                        :
                        "Issued invoices"
                }
            </h2>

            <Tabs
                onSelect={(e) => setTab(e)}
                defaultActiveKey="all"
                id="fill-tab-example"
                className="mb-3 bills-tabs justify-content-center border-0"
            >
                <Tab eventKey="all" title="All">
                    <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between"}}
                               className="mb-1">
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Order NO.
                        </ListGroup.Item>
                        {user.user.role === "DOCTOR" &&
                            <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                                Patient's full name
                            </ListGroup.Item>
                        }

                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '20%'}}>
                            Date of creation
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '30%'}}>
                            Description
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Status
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Total amount
                        </ListGroup.Item>
                        <ListGroup.Item variant="light"
                                        className="bills-table-header"
                                        style={{
                                            width: '20%'
                                        }}>
                        </ListGroup.Item>
                    </ListGroup>
                    <BillsList status="ALL" updateList={tab}/>
                </Tab>
                <Tab eventKey="paid" title="Paid">
                    <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between"}}
                               className="mb-1">
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Order NO.
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '20%'}}>
                            Date of creation
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '30%'}}>
                            Description
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Status
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Total amount
                        </ListGroup.Item>
                        <ListGroup.Item variant="light"
                                        className="bills-table-header"
                                        style={{
                                            textDecoration: "underline",
                                            color: "#6a83b8",
                                            cursor: 'pointer',
                                            width: '20%'
                                        }}>

                        </ListGroup.Item>
                    </ListGroup>
                    <BillsList status="PAID" updateList={tab}/>
                </Tab>
                <Tab eventKey="notpaid" title="Not paid">
                    <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between"}}
                               className="mb-1">
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Order NO.
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '20%'}}>
                            Date of creation
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '30%'}}>
                            Description
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Status
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: '10%'}}>
                            Total amount
                        </ListGroup.Item>
                        <ListGroup.Item variant="light"
                                        className="bills-table-header"
                                        style={{
                                            textDecoration: "underline",
                                            color: "#6a83b8",
                                            cursor: 'pointer',
                                            width: '20%'
                                        }}>

                        </ListGroup.Item>
                    </ListGroup>
                    <BillsList status="NOTPAID" updateList={tab}/>
                </Tab>
            </Tabs>
        </Container>
    );
});

export default Bills;