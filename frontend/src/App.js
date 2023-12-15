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

const App = observer(() => {
    const {user} = useContext(Context)

    useEffect(() => {
        if(localStorage.getItem("token") !== null) {
            check().then(data => {
                user.setUser({id: null, email: data.sub, role: data.role})
                user.setIsAuth(true)
            })
        }
    }, [])

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
