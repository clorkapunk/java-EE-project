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
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    const click = async () => {

        let data;
        data = await registration(firstname, lastname, email, password, 'MANAGER')
        user.setUser({id: null, email: data.sub, role: data.role})
        user.setIsAuth(true)
        navigate('/main')

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
                        value={firstname}
                        onChange={e => setFirstname(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Surname"
                        value={lastname}
                        onChange={e => setLastname(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        className="mt-2"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
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
});

export default Auth;