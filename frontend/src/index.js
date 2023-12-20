import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./UserStore";
import AppRouter from "./AppRouter";
import {BrowserRouter} from "react-router-dom";
import './style.css'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div style={{background: "#F5F5F5"}}>
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <App/>
        </Context.Provider>
    </div>
);

