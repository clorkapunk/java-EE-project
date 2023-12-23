import React, {useContext} from 'react';
import {Button, Container, Nav} from "react-bootstrap";
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHospital} from "@fortawesome/free-solid-svg-icons";


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
                <p style={{margin: 0, cursor: "pointer", display: "flex", alignItems: "center"}}
                    onClick={() => navigate('/')}
                >
                    <FontAwesomeIcon style={{height: 30, marginRight: 15}} className='link-success' icon={faHospital} />
                    <p style={{margin: 0,  fontWeight: "bold", fontSize: '1.5em'}}>JavaMed</p>
                </p>
                <Nav className="auto">
                    <NavLink className='navbar-nav-link' to={'/'} style={{marginInline: 20, textDecoration: "none"}}>
                        <p style={{margin: 0, marginBottom: 5}}>Home</p>
                        <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                    </NavLink>
                    <NavLink className='navbar-nav-link' to={'/profile'} style={{marginInline: 20, textDecoration: "none"}}>
                        <p style={{margin: 0, marginBottom: 5}}>Profile</p>
                        <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                    </NavLink>
                    {
                        (user.user.role === "USER" || user.user.role === "ADMIN" || !user.isAuth) &&
                        <>
                            <NavLink className='navbar-nav-link' to={'/appointments'} style={{marginInline: 20, textDecoration: "none"}}>
                                <p style={{margin: 0, marginBottom: 5}}>Appontments</p>
                                <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                            </NavLink>

                            <NavLink className='navbar-nav-link' to={'/bills'} style={{marginInline: 20, textDecoration: "none"}}>
                                <p style={{margin: 0, marginBottom: 5}}>Bills</p>
                                <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                            </NavLink>
                        </>
                    }
                    {
                        (user.user.role === "DOCTOR" || user.user.role === "ADMIN") &&
                        <>
                            <NavLink className='navbar-nav-link' to={'/appointment-schedule'} style={{marginInline: 20, textDecoration: "none"}}>
                                <p style={{margin: 0, marginBottom: 5}}>Schedule</p>
                                <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                            </NavLink>
                            <NavLink className='navbar-nav-link' to={'/doctor-bills'} style={{marginInline: 20, textDecoration: "none"}}>
                                <p style={{margin: 0, marginBottom: 5}}>Bills</p>
                                <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                            </NavLink>
                            <NavLink className='navbar-nav-link' to={'/patients'} style={{marginInline: 20, textDecoration: "none"}}>
                                <p style={{margin: 0, marginBottom: 5}}>Patients</p>
                                <hr style={{margin: 0, background: "black", opacity: 0, height: 2, border: 0}}/>
                            </NavLink>
                        </>
                    }

                </Nav>
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