import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import BooksList from "./BooksList";
import BooksPutForm from "./BooksPutForm";

const BooksPutMenu = ({tab}) => {
    const [update, setUpdate] = useState(false)
    const updateList = () => {
        setUpdate(prevState => !prevState)
    }

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="border-dark">
                <Accordion.Header>Update customer by id</Accordion.Header>
                <Accordion.Body className="my-3 p-0 d-flex justify-content-center">
                    <BooksPutForm update={updateList} cutomerId={{id: "", able: false}}/>
                </Accordion.Body>

            </Accordion.Item>
            <Accordion.Item eventKey="1" className="border-dark">
                <Accordion.Header>Update customer by card</Accordion.Header>
                <Accordion.Body className="p-0">
                    <BooksList tab={tab} updateList={update}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    );
};

export default BooksPutMenu;