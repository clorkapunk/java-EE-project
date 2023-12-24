import React, {useContext} from 'react';
import {Col, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const BillItem = observer(({item}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const createdAt = new Date(item.createdAt).toLocaleDateString("en-US", {day: 'numeric', month: 'long', year: 'numeric'})

    let widths = [];
    if(user.user.role === "DOCTOR") widths = ['7%', '15%', '20%', '5%', '10%', '20%']
    else if(user.user.role === "USER") widths = ['10%', '20%', '30%', '10%', '10%', '20%']

    return (
        <Col className='mb-2'>
            <ListGroup horizontal={true} style={{display: "flex", justifyContent: "space-between", background: "white", border: "1px solid #D2D2D2"}}>
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: widths[0], textAlign: "center"}}>
                    {item.id}
                </ListGroup.Item>
                {
                    user.user.role === "DOCTOR" &&
                    <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: '23%' }}>
                        {item.patient.firstname + " " + item.patient.lastname}
                    </ListGroup.Item>
                }
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: widths[1]}}>
                    {createdAt}
                </ListGroup.Item>
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: widths[2]}}>
                    {item.description}
                </ListGroup.Item>
                <ListGroup.Item variant="light" style={{background: 'white', border: 0, borderRight: "1px solid #D2D2D2", width: widths[3]}}>
                    {
                        item.status === "PAID" && "Paid"
                    }
                    {
                        item.status === "NOTPAID" && "Not paid"
                    }
                </ListGroup.Item>
                <ListGroup.Item variant="light" style={{background: 'white', textAlign: "center", border: 0, borderRight: "1px solid #D2D2D2", width: widths[4]}}>
                    {item.total}
                </ListGroup.Item>
                <ListGroup.Item variant="light"

                                style={{textDecoration: "underline", color: "#6a83b8", background: "white", border: 0, width: widths[5]}}>
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