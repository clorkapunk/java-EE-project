import React, {useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import axios from "axios";
import {fi} from "@faker-js/faker";

import {$authHost} from "../userAPI";

const PutForm = ({update, cutomerId}) => {
    const [firstname, setFirstname] = useState({
        firstnameString: "",
        isKeep: false
    })
    const [lastname, setLastname] = useState({
        lastnameString: "",
        isKeep: false
    })
    const [email, setEmail] = useState({
        emailString: "",
        isKeep: false
    })
    const [role, setRole] = useState({
        roleString: "",
        isKeep: false
    })
    const [id, setId] = useState(cutomerId.id)

    const changeHandle = (e) => {
        const {name, value} = e.target
        if (name === "firstname") setFirstname({
            firstnameString: value,
            isKeep: false
        })
        else if (name === "lastname") setLastname({
            lastnameString: value,
            isKeep: false
        })
        else if (name === "email") setEmail({
            emailString: value,
            isKeep: false
        })
        else if (name === "role") setRole({
            roleString: value,
            isKeep: false
        })
        else if(name === "id") setId(value)
    }
    const isKeep = (e) => {
        const {id, checked} = e.target
        if (id === "firstname") setFirstname({
            firstnameString: "",
            isKeep: checked
        })
        else if (id === "lastname") setLastname({
            lastnameString: "",
            isKeep: checked
        })
        else if (id === 'email') setEmail({
            emailString: "",
            isKeep: checked
        })
        else if (id === 'role') setRole({
            roleString: "",
            isKeep: checked
        })
    }

    const submitForm = () => {
        if ((firstname.firstnameString === "" && firstname.isKeep === false)
            || (lastname.lastnameString === "" && lastname.isKeep === false)
            || (email.emailString === "" && email.isKeep === false)
            || (role.roleString === "" && role.isKeep === false)
            || id === "") return

        $authHost.put('api/v1/admin/' + id, {
            firstname: firstname.firstnameString === "" ? null : firstname.firstnameString,
            lastname: lastname.lastnameString === "" ? null : lastname.lastnameString,
            email: email.emailString === "" ? null : email.emailString,
            role: role.roleString === "" ? null : role.roleString,
            password: ""
        })
            .catch(error => {
                if (error.response.status === 500) alert("No such user")
            })
            .then(r => {
                setFirstname({
                    firstnameString: "",
                    isKeep: false
                })
                setLastname({
                    lastnameString: "",
                    isKeep: false
                })
                setEmail({
                    emailString: "",
                    isKeep: false
                })
                setRole({
                    roleString: "",
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
                                  placeholder="Id of customer" value={id} name="id"
                                  onChange={changeHandle}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Name</Form.Label>
                    <InputGroup className="border-danger d-flex justify-content-center align-items-center">
                        <Form.Control disabled={firstname.isKeep} className="border-dark mb-1" rows={3}
                                      placeholder="New name"
                                      value={firstname.firstnameString} name="firstname" onChange={changeHandle}/>
                        <Form.Check className="border-dark mx-2" type="switch" id="firstname" label="Keep"
                                    onChange={e => isKeep(e)} checked={firstname.isKeep}/>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Surname</Form.Label>
                    <InputGroup className="border-danger d-flex justify-content-center align-items-center">
                        <Form.Control disabled={lastname.isKeep} className="border-dark" rows={3} placeholder="New age"
                                      value={lastname.lastnameString} name="lastname" onChange={changeHandle}/>
                        <Form.Check className="border-dark mx-2" type="switch" id="lastname" label="Keep"
                                    onChange={e => isKeep(e)} checked={lastname.isKeep}/>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup className="border-danger d-flex justify-content-center align-items-center">
                        <Form.Control disabled={email.isKeep} className="border-dark" type="email"
                                      placeholder="New email, example: name@example.com" value={email.emailString}
                                      name="email" onChange={changeHandle}/>
                        <Form.Check className="border-dark mx-2" type="switch" id="email" label="Keep"
                                    onChange={e => isKeep(e)} checked={email.isKeep}/>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Role</Form.Label>
                    <InputGroup className="border-danger d-flex justify-content-center align-items-center">
                        <Form.Select disabled={role.isKeep} className="border-dark" aria-label="Default select example" value={role.roleString} onChange={changeHandle} name="role">
                            <option>Open this select menu</option>
                            <option value="ADMIN">Admin</option>
                            <option value="MANAGER">Manager</option>
                        </Form.Select>
                        <Form.Check className="border-dark mx-2" type="switch" id="role" label="Keep"
                                    onChange={e => isKeep(e)} checked={role.isKeep}/>
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

export default PutForm;