import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName:"",
    email: "",
    password: ""
  })
  const [addUser] = useMutation(ADD_USER);
  
  const getForm = (e) =>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }


  const signup = async (e) =>{
    e.preventDefault();
    console.log(form,'form info')
    const res = await addUser({
      variables: {
        firstName:form.firstName,
        lastName: form.lastName,
        email: form.email,
        password:form.password
      }
    });
    const token = res.data.addUser.token;
    Auth.login(token);
    navigate("/");
  }


  return (
    <div>
      <div className='container' style={{marginTop: '30vh'}}>
        <div className='row justify-content-center'>
          <div className='col-4' style={{minWidth: '300px'}}>
            <div className="card shadow-sm">
              <h1 className="h3 mt-5 d-flex justify-content-center">Welcome to Moody</h1>
              <form 
                onSubmit={signup}
                className="row g-1 p-3 mx-3">
                <input 
                name='firstName' onChange={getForm}
                type="text" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='First Name' id="inputFirst"></input>
                <input 
                name='lastName' onChange={getForm}
                type="text" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Last Name' id="inputLast"></input>
                <input 
                name='email' onChange={getForm}
                type="email" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Email' id="inputEmail"></input>
                <input 
                name='password' onChange={getForm}
                type="password" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Create a password' id="inputPass"></input>
                <button type="submit" style={{borderRadius: '20px'}} className="btn btn-dark my-3">Login</button>
              </form>
            </div>
            <div className='d-flex justify-content-center'>
              <p className="my-auto mx-3 d-flex justify-content-center">Already have an account?</p>
              <Link to='/login'  style={{borderRadius: '20px'}} className="btn btn-light border-dark my-3 d-flex justify-content-center">Log in</Link>
            </div>
          </div>
        </div>
      </div>
      
      
      
    </div>
  );
}
