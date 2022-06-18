import React from 'react';
import {Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import UsersScreen from "./Components/Users/UsersScreen";


const Root = () => {
    return (
        <Router basename={"/"}>
            <Routes>
                <Route exact path="/" element={<Navigate to={"/users"}/>}></Route>
                <Route path="/users/*" element={<UsersScreen/>}></Route>
                <Route path="*" element={<Navigate to="/"/>}></Route>
            </Routes>
        </Router>
    );
};

export default Root;