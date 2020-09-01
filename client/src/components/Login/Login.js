import React from 'react';
import 'materialize-css';
import { useRouts } from '../../routes';
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "../../hooks/auth.hook";
import {AuthContext} from "../../context/AuthContext";
import {Navbar} from "../NavBar/Navbar";
import {Loader} from "../Loader/Loader";

export const Login = () => {
    const {token, login , logout, userId, ready} = useAuth();
    const isAuthenticated = !!token
    const routes = useRouts(isAuthenticated);

    if(!ready){
        return <Loader />
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}