import React, {useContext, useEffect, useState} from 'react';
import BookItem from "./BookItem";
import {Row} from "react-bootstrap";
import {$authHost} from "../userAPI";

const BooksList = ({tab, updateList}) => {
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(true)

    useEffect(() => {
        setTimeout(() => {
                $authHost.get('api/v1/management').then(data => setData(data.data))
            }
            , 50);
    }, [tab, update, updateList])


    const updateList2 = () => {
        setUpdate(prevState => !prevState)
    }


    return (
        <Row className="d-flex my-3 justify-content-center" style={{maxWidth: "100vw"}}>
            {data.sort((a, b) => {
                return a.id - b.id
            }).map(item =>
                <BookItem item={item} key={item.id} tab={tab} update={updateList2}/>
            )}
        </Row>
    );
};

export default BooksList;