import React, {useEffect, useState} from 'react';
import {Card, Modal} from "react-bootstrap";
import axios from "axios";
import PutForm from "./PutForm";
import {$authHost} from "../userAPI";

const CustomerItem = ({item, tab, update}) => {
    const [style, setStyle] = useState({width: '15rem', margin: 10, cursor: ""})
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (tab === 'delete' || tab === 'put') setStyle({
            width: '15rem',
            margin: 10,
            cursor: "pointer",
            transition: "all ease 0.3ns",
            borderColor: "black"
        })
        else if (tab === 'get') setStyle({
            width: '15rem',
            margin: 10,
            cursor: "",
            borderColor: "black"
        })
    }, [tab])

    const onHoverOn = (e) => {
        const {type} = e
        if (type === "mouseenter") {
            if (tab === 'delete') setStyle(prevState => {
                return {
                    ...prevState,
                    background: "#bb2d3b",
                    borderColor: "white",
                    color: "white"
                }
            })
            if (tab === 'put') setStyle(prevState => {
                return {
                    ...prevState,
                    background: "#31d2f2"
                }
            })
        }
        if (type === 'mouseleave') {
            if (tab === 'delete' || tab === 'put') setStyle(prevState => {
                return {
                    ...prevState,
                    background: "white",
                    borderColor: "black",
                    color: "black"
                }
            })
        }
    }

    const updateAndHide = () => {
        update()
        handleClose()
    }


    const editItem = () => {
        if (tab === 'delete') {
            $authHost.delete('api/v1/admin/' + item.id)
                .then(r => {
                    update()
                })
        } else if (tab === 'put') {
            handleShow()
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <PutForm cutomerId={{id: item.id, able: true}} update={updateAndHide}/>
            </Modal>

            <Card style={style} onClick={tab === 'delete' || tab === 'put' ? editItem : undefined}
                  onMouseEnter={event => onHoverOn(event)}
                  onMouseLeave={event => onHoverOn(event)}
            >
                <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <Card.Title className="d-flex justify-content-between">
                        <div>
                            {item.name}
                        </div>
                    </Card.Title>
                    <Card.Subtitle className="mb-2">{item.email}</Card.Subtitle>
                    <Card.Text>
                        {item.firstname} {item.lastname}
                        <br/>
                        id: {item.id}, role: {item.role}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default CustomerItem;