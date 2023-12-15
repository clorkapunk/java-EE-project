import React, {useState} from 'react';
import {Accordion} from "react-bootstrap";
import CustomersList from "./CustomersList";
import PutForm from "./PutForm";

const PutMenu = ({tab}) => {
    const [update, setUpdate] = useState(false)
    const updateList = () => {
        setUpdate(prevState => !prevState)
    }

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" className="border-dark">
                <Accordion.Header>Update customer by id</Accordion.Header>
                <Accordion.Body className="my-3 p-0 d-flex justify-content-center">
                    <PutForm update={updateList} cutomerId={{id: "", able: false}}/>
                </Accordion.Body>

            </Accordion.Item>
            <Accordion.Item eventKey="1" className="border-dark">
                <Accordion.Header>Update customer by card</Accordion.Header>
                <Accordion.Body className="p-0">
                    <CustomersList tab={tab} updateList={update}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    );
};

export default PutMenu;