import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {$authHost} from "../userAPI";


const PostMenu = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")


    const changeHandle = (e) => {
        const {name, value} = e.target
        if (name === "firstname") setFirstname(value)
        else if (name === "email") setEmail(value)
        else if (name === "lastname") setLastname(value)
        else if(name === "password") setPassword(value)
        else if(name === "role") setRole(value)
    }

    const submitForm = () => {
        if (firstname === "" || lastname === "" || email === "" || password === "" || role === "") return
        $authHost.post('api/v1/admin', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role,
            password: password
        })
            .then(r => {
                setRole("")
                setEmail("")
                setLastname("")
                setFirstname("")
                setPassword("")
            })

    }


    return (
        <div>

            <Form className="my-3 "
                  style={{width: 600, border: "1px solid black", borderRadius: 5, padding: 20, margin: "auto"}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="border-dark" rows={3} placeholder="Your name" value={firstname} name="firstname"
                                  onChange={changeHandle}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control className="border-dark" rows={3} placeholder="Your surname" value={lastname} name="lastname"
                                  onChange={changeHandle}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="border-dark" type="email" placeholder="name@example.com" value={email}
                                  name="email" onChange={changeHandle}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="border-dark" rows={3} placeholder="Your password" value={password} name="password"
                                  onChange={changeHandle}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Role</Form.Label>
                    <Form.Select className="border-dark" aria-label="Default select example" value={role} onChange={changeHandle} name="role">
                        <option>Open this select menu</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MANAGER">Manager</option>
                    </Form.Select>
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

export default PostMenu;