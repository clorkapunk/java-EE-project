import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Button, Tab, Tabs} from "react-bootstrap";
import CustomersList from "./admin/CustomersList";
import PostMenu from "./admin/PostMenu";
import PutMenu from "./admin/PutMenu";
import {useNavigate} from "react-router-dom";
import BooksList from "./manager/BooksList"
import BooksPostMenu from "./manager/BooksPostMenu";
import BooksPutMenu from "./manager/BooksPutMenu";

const MainTabs = observer(() => {
    const [tab, setTab] = useState("get")
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        sessionStorage.removeItem("basket")
        navigate('/')
    }

    return (
        <>
            <div style={{minHeight: "90vh"}}>
                <Tabs
                    defaultActiveKey={tab}
                    id="justify-tab-example"
                    className="mb-3 bg-dark"
                    onSelect={key => setTab(key)}
                    justify
                >
                    <Tab eventKey="get" title="Get" style={{}}>
                        {user._user.role === "ADMIN" && <CustomersList tab={tab} updateList={false}/>}
                        {user._user.role === "MANAGER" && <BooksList tab={tab} updateList={false}/>}
                    </Tab>
                    <Tab eventKey="post" title="Post">
                        {user._user.role === "ADMIN" && <PostMenu tab={tab} updateList={false}/>}
                        {user._user.role === "MANAGER" && <BooksPostMenu tab={tab} updateList={false}/>}
                    </Tab>
                    <Tab eventKey="put" title="Put">
                        {user._user.role === "ADMIN" && <PutMenu tab={tab} updateList={false}/>}
                        {user._user.role === "MANAGER" && <BooksPutMenu tab={tab} updateList={false}/>}
                    </Tab>
                    <Tab eventKey="delete" title="Delete">
                        {user._user.role === "ADMIN" && <CustomersList tab={tab} updateList={false}/>}
                        {user._user.role === "MANAGER" && <BooksList tab={tab} updateList={false}/>}
                    </Tab>
                </Tabs>
            </div>
            <footer style={{background: "#212529",
                color: "wheat",
                height: "10vh",
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
                justifyContent: 'space-between',
                paddingRight: 20
            }}
            >
                <p style={{margin: 0}}>Java EE Spring Boot, Frontend</p>
                <div style={{display: "flex", flexDirection: "row",alignItems: "center"}}>
                    <p style={{margin: 0}}>{user._user.email || "nothing"}</p>
                    <Button
                        variant="outline-light" style={{marginLeft: 30}}
                        onClick={logOut}
                    >
                        {user._isAuth ? "Log out" : "Log in"}
                    </Button>
                </div>
            </footer>
        </>
    );
})

export default MainTabs;