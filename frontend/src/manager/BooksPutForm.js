import React, {useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import {fi} from "@faker-js/faker";

import {$authHost} from "../userAPI";

const BooksPutForm = ({update, cutomerId}) => {
    const [isbn, setIsbn] = useState({
        isbnString: "",
        isKeep: false
    })
    const [author, setAuthor] = useState({
        authorString: "",
        isKeep: false
    })
    const [id, setId] = useState(cutomerId.id)

    const changeHandle = (e) => {
        const {name, value} = e.target
        if (name === "author") setAuthor({
            authorString: value,
            isKeep: false
        })
        else if (name === "isbn") setIsbn({
            isbnString: value,
            isKeep: false
        })
        else if(name === "id") setId(value)
    }
    const isKeep = (e) => {
        const {id, checked} = e.target
        if (id === "author") setAuthor({
            authorString: "",
            isKeep: checked
        })
        else if (id === "isbn") setIsbn({
            isbnString: "",
            isKeep: checked
        })
    }

    const submitForm = () => {
        if ((author.authorString === "" && author.isKeep === false)
            || (isbn.isbnString === "" && isbn.isKeep === false)
            || id === "") return

        $authHost.put('api/v1/management/' + id, {
            author: author.authorString === "" ? null : author.authorString,
            isbn: isbn.isbnString === "" ? null : isbn.isbnString
        })
            .catch(error => {
                if (error.response.status === 500) alert("No such book")
            })
            .then(r => {
                setIsbn({
                    isbnString: "",
                    isKeep: false
                })
                setAuthor({
                    authorString: "",
                    isKeep: false
                })
                setId("")
                update()
            })
    }


    return (
        <>
            <Form className="m-0 bg-white"
                  style={{width: 600, border: "1px solid black", borderRadius: 5, padding: 20, margin: "auto"}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Id</Form.Label>
                    <Form.Control disabled={cutomerId.able} className="border-dark" rows={3}
                                  placeholder="Id of book" value={id} name="id"
                                  onChange={changeHandle}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Author's fullname</Form.Label>
                    <InputGroup className="border-danger d-flex justify-content-center align-items-center">
                        <Form.Control disabled={author.isKeep} className="border-dark mb-1" rows={3}
                                      placeholder="New fullname"
                                      value={author.authorString} name="author" onChange={changeHandle}/>
                        <Form.Check className="border-dark mx-2" type="switch" id="author" label="Keep"
                                    onChange={e => isKeep(e)} checked={author.isKeep}/>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>International Standard Book Number</Form.Label>
                    <InputGroup className="border-danger d-flex justify-content-center align-items-center">
                        <Form.Control disabled={isbn.isKeep} className="border-dark" rows={3} placeholder="New ISBN code"
                                      value={isbn.isbnString} name="isbn" onChange={changeHandle}/>
                        <Form.Check className="border-dark mx-2" type="switch" id="isbn" label="Keep"
                                    onChange={e => isKeep(e)} checked={isbn.isKeep}/>
                    </InputGroup>
                </Form.Group>

                <Form.Group style={{display: "flex", justifyContent: "right"}}>
                    <Button
                        onClick={submitForm}
                    >
                        Update
                    </Button>
                </Form.Group>
            </Form>

        </>
    );
};

export default BooksPutForm;