import React, {useContext} from 'react';
import {Col, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const BillItem = observer(({item}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const createdAt = new Date(item.createdAt).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})

    return (
        <Col className='mb-2'>
            <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between", background: "white", border: "1px solid #D2D2D2"}}>
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: "10%", textAlign: "center"}}>
                    {item.id}
                </ListGroup.Item>
                {
                    user.user.role === "DOCTOR" &&
                    <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2" }}>
                        {item.patient.firstname + " " + item.patient.lastname}
                    </ListGroup.Item>
                }
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: "20%" }}>
                    {createdAt}
                </ListGroup.Item>
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: "30%"}}>
                    {item.description}
                </ListGroup.Item>
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: "10%"}}>
                    {
                        item.status === "PAID" && "Paid"
                    }
                    {
                        item.status === "NOTPAID" && "Not paid"
                    }
                </ListGroup.Item>
                <ListGroup.Item variant="light" style={{background: 'white', textAlign: "center", border: 0, borderRight: "1px solid #D2D2D2", width: "10%"}}>
                    {item.total}
                </ListGroup.Item>
                <ListGroup.Item variant="light"

                                style={{textDecoration: "underline", color: "#6a83b8", background: "white", border: 0, width: "20%"}}>
                    <p onClick={() => navigate('/bill/' + item.id)}
                        style={{margin: 0, cursor: "pointer", width: "auto"}}>
                        {(item.status === "NOTPAID" && user.user.role === "USER") ?
                            "see more details and PAY"
                            :
                            "see more details"
                        }
                    </p>

                </ListGroup.Item>

            </ListGroup>
        </Col>
    );
});

export default BillItem;