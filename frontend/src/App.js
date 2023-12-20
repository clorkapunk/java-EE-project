import {Tab, Tabs} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import CustomersList from "./admin/CustomersList";
import PostMenu from "./admin/PostMenu";
import PutMenu from "./admin/PutMenu";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import {check} from "./userAPI";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = observer(() => {
    const {user} = useContext(Context)

    useEffect(() => {
        if(localStorage.getItem("token") !== null) {
            check().then(data => {
                user.setUser({id: data.id, email: data.sub, role: data.role})
                user.setIsAuth(true)
            })
                .catch(e => {})
        }
    }, [])

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    );
})

export default App;
