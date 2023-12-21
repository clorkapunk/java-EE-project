import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {login, registration} from "../userAPI";

const Auth = observer(() => {
            const {user} = useContext(Context)
            const location = useLocation()
            const navigate = useNavigate()
            const [formData, setFormData] = useState({
                firstname: "",
                lastname: "",
                password: "",
                iin: "",
                email: "",
                number: "",
                gender: "",
                address: "",
                dob: "",
                office: "",
                schedule: "",
                hospital: ""
            })

            const [validMessage, setValidMessage] = useState({
                visibility: "hidden",
                msg: "please complete all fields"
            })

            const click = async () => {
                if (formData.firstname === "" || formData.lastname === ""
                    || formData.password === "" || formData.iin === ""
                    || formData.email === "" || formData.number === ""
                    || formData.gender === "" || formData.address === ""
                    || formData.dob === ""
                ) {
                    setValidMessage({
                        visibility: "visible",
                        msg: "please complete all fields"
                    })
                    return
                }

                registration(
                    formData.firstname,
                    formData.lastname,
                    formData.email,
                    formData.password,
                    "USER",
                    formData.iin,
                    formData.number,
                    formData.address,
                    formData.gender,
                    formData.dob,
                    "",
                    "",
                    null,
                    null)
                    .then(
                        data => {
                            user.setUser({id: data.id, email: data.sub, role: data.role})
                            user.setIsAuth(true)
                            navigate('/main')
                        }
                    )
                    .catch(e => {

                        setValidMessage({
                            visibility: "visible",
                            msg: e.response.data.message
                        })
                    })


            }

            function onChangeHandler(event) {
                const {name, value} = event.target
                if (name === "firstname") setFormData(prevState => {
                    return {...prevState, firstname: value}
                })
                else if (name === "lastname") setFormData(prevState => {
                    return {...prevState, lastname: value}
                })
                else if (name === "email") setFormData(prevState => {
                    return {...prevState, email: value}
                })
                else if (name === "password") setFormData(prevState => {
                    return {...prevState, password: value}
                })
                else if (name === "number") setFormData(prevState => {
                    return {...prevState, number: value}
                })
                else if (name === "iin") setFormData(prevState => {
                    return {...prevState, iin: value}
                })
                else if (name === "gender") setFormData(prevState => {
                    return {...prevState, gender: value}
                })
                else if (name === "address") setFormData(prevState => {
                    return {...prevState, address: value}
                })
                else if (name === "dob") setFormData(prevState => {
                    return {...prevState, dob: value}
                })
                else if (name === "hospital") setFormData(prevState => {
                    return {...prevState, hospital: value}
                })

            }

            return (
                <Container
                    className="d-flex justify-content-center align-items-center"
                    style={{height: window.innerHeight - 54}}
                >
                    <Card style={{width: 600}} className="p-5">
                        <h2 className="m-auto">Registration</h2>
                        <Form className="d-flex flex-column align-items-center">
                            <Form.Control
                                className="mt-3"
                                placeholder="Name"
                                value={formData.firstname}
                                name="firstname"
                                onChange={onChangeHandler}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Surname"
                                value={formData.lastname}
                                name="lastname"
                                onChange={onChangeHandler}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Email"
                                value={formData.email}
                                name="email"
                                onChange={onChangeHandler}
                                autoComplete="off"
                            />
                            <Form.Control
                                type="password"
                                className="mt-2"
                                placeholder="Password"
                                value={formData.password}
                                name="password"
                                autoComplete="off"
                                onChange={onChangeHandler}
                            />
                            <Form.Control
                                type="number"
                                className="mt-2"
                                placeholder="Number: 87078887766"
                                value={formData.number}
                                name="number"
                                onChange={onChangeHandler}
                            />
                            <Form.Control
                                type="number"
                                className="mt-2"
                                placeholder="IIN"
                                value={formData.iin}
                                name="iin"
                                onChange={onChangeHandler}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Address"
                                value={formData.address}
                                name="address"
                                onChange={onChangeHandler}
                            />
                            <Form.Select
                                className="mt-2"
                                name="gender"
                                onChange={onChangeHandler}
                                aria-label="Select your gender">
                                <option>Select your gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </Form.Select>
                            <Form.Control
                                className="mt-2"
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={onChangeHandler}
                            />

                            <p  className="mt-1" style={{
                                margin: 0,
                                color: "red",
                                fontSize: '0.8rem',
                                textAlign: "end",
                                width: "100%",
                                visibility: validMessage.visibility}}
                            >
                                *{validMessage.msg}
                            </p>

                            <div className="mt-3 d-flex justify-content-between align-items-center px-3"
                                 style={{width: "100%"}}>
                                <div>
                                    Already have an account? <NavLink to={'/login'}>Sign in</NavLink>
                                </div>
                                <Button style={{paddingInline: 20}} variant="outline-success" onClick={click}>
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                    </Card>

                </Container>
            );
        }
    )
;

export default Auth;