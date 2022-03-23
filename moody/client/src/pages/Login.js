import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
//import { QUERY_ONE_COLLECTION } from '../utils/queries';
import Auth from '../utils/auth'
import { useGlobalContext } from '../utils/globalContext';
import {GET_COLLECTION_LIST, PRESENT_IMAGES, GET_USER_INFO} from '../utils/actions';
import { useNavigate } from "react-router-dom";

const axios = require('axios');

export default function Login() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [login, {error}] = useMutation(LOGIN)
  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    

    e.preventDefault();
    try {
      const { data } = await login({
        variables: {email: email, password:password}
      });
      
      const collection = data.login.user.collections;
      collection.map(async (e) => {
        let res = await axios.get(`https://api.pexels.com/v1/photos/${e.images[0]}`, 
        {
          headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
        })
        console.log(res.data,'res')
        e.cover = res.data
      })

      dispatch({
        type:GET_COLLECTION_LIST,
        payload: collection
      });
      const username = {
        firstName: data.login.user.firstName,
        lastName: data.login.user.lastName,
        email: data.login.user.email,
      }
      dispatch({
        type:GET_USER_INFO,
        payload: username
      });
      
      console.log(state)

      Auth.login(data.login.token);
      navigate("/");

    } catch (e) {
      console.error(e);
    }
    setEmail('');
    setPassword('')
    
  };
  

  return (
    <div>
      <div className='container' style={{marginTop: '30vh'}}>
        <div className='row justify-content-center'>
          <div className='col-4' style={{minWidth: '300px'}}>
            <div className="card shadow-sm">
              <h1 className="h3 mt-5 d-flex justify-content-center">Welcome to Moody</h1>
              <form className="row g-1 p-3 mx-3" 
              onSubmit={loginSubmit}
              >
                <input type="email" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} id="inputEmail"></input>
                <input type="password" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} id="inputPass"></input>
                <button type="submit" style={{borderRadius: '20px'}} className="btn btn-dark my-3">Login</button>
              </form>
            </div>
            <div className='d-flex justify-content-center'>
              <p className="my-auto mx-3 d-flex justify-content-center">New to Moody?</p>
              <Link to='/signup'  style={{borderRadius: '20px'}} className="btn btn-light border-dark my-3 d-flex justify-content-center">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      
      
      
    </div>
  );
}
