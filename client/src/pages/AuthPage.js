import React, {useState, useEffect, useContext} from 'react';
import './AuthPage.module.css';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {AuthContext} from "../context/AuthContext";


export const AuthPage = ()=> {
    const auth = useContext(AuthContext)
    const message = useMessage();
    //importing our hooks from {http.hook.js}
    const {loading,request,error,clearError} = useHttp();

  //here we use hooks - useState - do not forget  [ import {useState} from 'react'; ] 
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
      try {
          const data = await  request('/api/auth/login', 'POST', {...form})
          auth.login(data.token, data.userId)
      }catch (e) {

      }
  }

  return (
    <div className="row">
      <div className="card #00897b teal darken-1 white-text">
        <h1>Welcome to TyDiet</h1>
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
        </div>
        <div className="input-field ">
          <input 
          placeholder="Enter Your Email..."
          id="email" 
          type="text"
          name="email" 
          className="yellow-input"
          value={form.email}
          onChange={changeHandler}
           />
          <label htmlFor="email">Email</label>
      </div>
      <div className="input-field ">
          <input 
          placeholder="Enter Your Password..."
          id="password" 
          type="password"
          name="password" 
          className="yellow-input"
          value={form.password}
          onChange={changeHandler}
           />
          <label htmlFor="password">Password</label>
      </div>
        <div className="card-action">
          <button
           className="btn yellow darken-4"
           disabled={loading}
           onClick={loginHandler}
           >
             Login
             </button>
          <button
           className="btn grey lighten-1 black-text"
           onClick={registerHandler}
           disabled={loading}
           >
             Register
           </button>
        </div>
      </div>
    </div>
  );
}

