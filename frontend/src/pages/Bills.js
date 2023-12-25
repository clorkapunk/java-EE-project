import React, {useContext, useState} from 'react';
import {Container, ListGroup, Tab, Tabs} from "react-bootstrap";
import BillsList from "../components/BillsList";
import BillItem from "../components/BillItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Bills = observer(() => {
    const {user} = useContext(Context)
    const [tab, setTab] = useState("all")

    let widths = [];
    if(user.user.role === "DOCTOR") widths = ['7%', '15%', '20%', '8%', '10%', '20%']
    else if(user.user.role === "USER") widths = ['10%', '20%', '30%', '10%', '10%', '20%']

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
                <Tab eventKey="all" title="All" style={{fontSize: '1em'}}>
                    <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between"}}
                               className="mb-1">
                        <ListGroup.Item
                            variant="light" className="bills-table-header" style={{width: widths[0], paddingInline: 5}}>
                            Order NO.
                        </ListGroup.Item>
                        {user.user.role === "DOCTOR" &&
                            <ListGroup.Item variant="light" className="bills-table-header" style={{width: '20%', paddingInline: 5}}>
                                Patient's name
                            </ListGroup.Item>
                        }
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[1], paddingInline: 5}}>
                            Date of creation
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[2], paddingInline: 5}}>
                            Description
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[3], paddingInline: 5}}>
                            Status
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[4], paddingInline: 5}}>
                            Total amount
                        </ListGroup.Item>
                        <ListGroup.Item variant="light"
                                        className="bills-table-header"
                                        style={{
                                            width: widths[5]
                                        }}>
                        </ListGroup.Item>
                    </ListGroup>
                    <BillsList status="ALL" updateList={tab}/>
                </Tab>
                <Tab eventKey="paid" title="Paid">
                    <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between"}}
                               className="mb-1">
                        <ListGroup.Item
                            variant="light" className="bills-table-header" style={{width: widths[0], paddingInline: 5}}>
                            Order NO.
                        </ListGroup.Item>
                        {user.user.role === "DOCTOR" &&
                            <ListGroup.Item variant="light" className="bills-table-header" style={{width: '20%', paddingInline: 5}}>
                                Patient's name
                            </ListGroup.Item>
                        }
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[1], paddingInline: 5}}>
                            Date of creation
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[2], paddingInline: 5}}>
                            Description
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[3], paddingInline: 5}}>
                            Status
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[4], paddingInline: 5}}>
                            Total amount
                        </ListGroup.Item>
                        <ListGroup.Item variant="light"
                                        className="bills-table-header"
                                        style={{
                                            width: widths[5]
                                        }}>
                        </ListGroup.Item>
                    </ListGroup>
                    <BillsList status="PAID" updateList={tab}/>
                </Tab>
                <Tab eventKey="notpaid" title="Not paid">
                    <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between"}}
                               className="mb-1">
                        <ListGroup.Item
                            variant="light" className="bills-table-header" style={{width: widths[0], paddingInline: 5}}>
                            Order NO.
                        </ListGroup.Item>
                        {user.user.role === "DOCTOR" &&
                            <ListGroup.Item variant="light" className="bills-table-header" style={{width: '20%', paddingInline: 5}}>
                                Patient's name
                            </ListGroup.Item>
                        }
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[1], paddingInline: 5}}>
                            Date of creation
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[2], paddingInline: 5}}>
                            Description
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[3], paddingInline: 5}}>
                            Status
                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="bills-table-header" style={{width: widths[4], paddingInline: 5}}>
                            Total amount
                        </ListGroup.Item>
                        <ListGroup.Item variant="light"
                                        className="bills-table-header"
                                        style={{
                                            width: widths[5]
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