import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {$authHost} from "../userAPI";


const BooksPostMenu = () => {
    const [isbn, setIsbn] = useState("")
    const [author, setAuthor] = useState("")


    const changeHandle = (e) => {
        const {name, value} = e.target
        if (name === "author") setAuthor(value)
        else if (name === "isbn") setIsbn(value)
    }

    const submitForm = () => {
        if (isbn === "" || author === "") return
        $authHost.post('api/v1/management', {
            isbn: isbn,
            author: author,
        })
            .then(r => {
                setIsbn("")
                setAuthor("")
            })

    }


    return (
        <div>

            <Form className="my-3 "
                  style={{width: 600, border: "1px solid black", borderRadius: 5, padding: 20, margin: "auto"}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Author name</Form.Label>
                    <Form.Control className="border-dark" rows={3} placeholder="Author's fullname" value={author} name="author"
                                  onChange={changeHandle}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>International Standard Book Number</Form.Label>
                    <Form.Control className="border-dark" rows={3} placeholder="International Standard Book Number" value={isbn} name="isbn"
                                  onChange={changeHandle}/>
                </Form.Group>
                <Form.Group style={{display: "flex", justifyContent: "right"}}>
                    <Button
                        onClick={submitForm}
                    >
                        Submit
                    </Button>
                </Form.Group>

            </Form>
        </div>
    );
};

export default BooksPostMenu;