import React, {useEffect, useState} from 'react';
import {Card, Modal} from "react-bootstrap";
import axios from "axios";
import BooksPutForm from "./BooksPutForm";
import {$authHost} from "../userAPI";

const BookItem = ({item, tab, update}) => {
    const [style, setStyle] = useState({width: '18rem', margin: 10, cursor: ""})
    const [showModal, setShowModal] = useState(false)
    const [createdBy, setCreatedBy] = useState(null)
    const [lastModifiedBy, setLastModifiedBy] = useState(null)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        $authHost.get('api/v1/management/userById/' + item.createdBy).then(data => {
            setCreatedBy(data.data.email)
        })
        if(item.lastModifiedBy !== null){
            $authHost.get('api/v1/management/userById/' + item.lastModifiedBy).then(data => {
                setLastModifiedBy(data.data.email)
            })
        }
    }, [item])


    useEffect(() => {
        if (tab === 'delete' || tab === 'put') setStyle({
            width: '18rem',
            margin: 10,
            cursor: "pointer",
            transition: "all ease 0.3ns",
            borderColor: "black"
        })
        else if (tab === 'get') setStyle({
            width: '18rem',
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
            $authHost.delete('api/v1/management/' + item.id)
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
                <BooksPutForm cutomerId={{id: item.id, able: true}} update={updateAndHide}/>
            </Modal>

            <Card style={style} onClick={tab === 'delete' || tab === 'put' ? editItem : undefined}
                  onMouseEnter={event => onHoverOn(event)}
                  onMouseLeave={event => onHoverOn(event)}
            >
                <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                    <Card.Title className="d-flex justify-content-between">
                        <div>
                            {item.author}
                        </div>
                    </Card.Title>
                    <Card.Subtitle className="mb-2">{item.email}</Card.Subtitle>
                    <Card.Text>
                        cd: {item.createDate}
                        <br/>
                        lM: {item.lastModified === null ? "Not modified" : item.lastModified}
                        <br/>
                        cB: {createdBy}
                        <br/>
                        lMB: {item.lastModifiedBy === null ? "Not modified" : lastModifiedBy}
                        <br/>
                        id: {item.id}, isbn: {item.isbn}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default BookItem;