import React, {useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {


    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem("token")
        navigate('/')
    }
    return (
        <header
            style={{
                background: "#FBFBFB",
            }}
        >
            <Container className="w-75"
                       style={{
                           background: "#FBFBFB",
                           color: "black",
                           height: "5vh",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: 'space-between',
                       }}>
                <p style={{margin: 0, cursor: "pointer"}}
                    onClick={() => navigate('/')}
                >Java EE Spring Boot, Frontend</p>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{margin: 0}}>{user._user.email || ""}</p>
                    <Button
                        variant="outline-success" style={{marginLeft: 30}}
                        onClick={() => user._isAuth ? logOut() : navigate('/login')}
                    >
                        {user._isAuth ? "Log out" : "Log in"}
                    </Button>
                </div>
            </Container>
        </header>
    );
});

export default NavBar;