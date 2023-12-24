import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {login, registration} from "../userAPI";

const Login = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === '/login'
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const click = async () => {

            login(email, password).then(data => {
                user.setUser({id: data.id, email: data.sub, role: data.role})
                user.setIsAuth(true)
                navigate('/main')
                }).catch(e => {})


    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form className="d-flex flex-column align-items-center">
                    <Form.Control
                        className="mt-3"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="on"
                    />
                    <Form.Control
                        type="password"
                        className="mt-2"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="on"
                    />
                    <div className="mt-3 d-flex justify-content-between align-items-center px-3"
                         style={{width: "100%"}}>
                        <div>
                            No account? <NavLink to={'/registration'}>Sign up now</NavLink>
                        </div>
                        <Button style={{paddingInline: 20}} variant="outline-success" onClick={click}>
                            Log in
                        </Button>
                    </div>
                </Form>
            </Card>

        </Container>
    );
});

export default Login;