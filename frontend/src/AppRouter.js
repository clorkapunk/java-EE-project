import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {publicRoutes} from "./routes";
import {Context} from "./index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                    <Route exact path={path} key={path} element={Component}/>
            )}
            <Route path="*" element={<Navigate replace to={'/login'} />} />
        </Routes>
    );
};

export default AppRouter;