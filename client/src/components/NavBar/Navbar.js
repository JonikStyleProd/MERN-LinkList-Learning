import React, {useContext} from "react";
import {NavLink , useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import logo from '../../img/jsp-logo.png'
import './Navbar.module.css'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper #00897b teal darken-1 z-depth-2">
                <a href="/" className="brand-logo right"><img src={logo} alt="headerPhoto" /></a>
                <ul id="nav-mobile" className="left ">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li className="#1de9b6 teal accent-3 pulse"><a className="black-text text-accent-4" href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}