import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { useQuery } from '@apollo/client';
import {QUERY_USER} from '../../utils/queries'
import { useGlobalContext } from '../../utils/globalContext';
import { 
  LOGIN_STATUS,
  LOGOUT_STATUS
} from '../../utils/actions';
import Auth from '../../utils/auth';

const axios = require('axios');

export default function Nav() {
  const navigate = useNavigate();
  const [state, dispatch] = useGlobalContext();
  const {loading, error, data} = useQuery(QUERY_USER)
  
  useEffect(()=>{
    if(data){
      dispatch({
        type: LOGIN_STATUS
      })
    }
  }, [loading])


  const{login} = state;


  // const [state, dispatch] = useGlobalContext();
  // const {loading, error, data} = useQuery(QUERY_USER
  // )
  // const getCollection = ()=>{
  //   if(data){
  //     dispatch({
  //       type: CLEAR_COLLECTION_LIST
  //     })
  //     console.log("data", data)
  //     const collection = data.user.collections
  //     const collections = collection.map(async(e)=>{
  //       let res = await axios.get(`https://api.pexels.com/v1/photos/${e.images[0]}`, 
  //       {
  //         headers: {'Authorization': '563492ad6f917000010000015cf5ff7c412542d980a62beb2d41dc62'}
  //       })
  //       e = {...e, cover:res.data} 
  //       console.log("eee", e)
  //       dispatch({
  //         type: ADD_NEW_COLLECTION,
  //         payload: e
  //       })
  //     })
  //   }
  // }


  return (
    <div>
      <section className="py-3 text-center bg-dark fixed-top">
      <nav className='navbar navbar-expand-md navbar-dark'>
        <div className="container-fluid">
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h4 className='navbar-brand text-light ms-3'>Moody</h4>
          </Link>
            <SearchBar />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end me-2" style={{flexGrow:'0'}} id="navbarText">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' 
                className="nav-link active text-light " aria-current="page" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                </svg>
                  &nbsp; Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/collection'
                // onClick={getCollection}
                className="nav-link active text-light " aria-current="page" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                    <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                  </svg>
                  &nbsp; Collection</Link>
              </li>
              <li className="nav-item">
                <div 
                //to='/login' 
                className="nav-link active text-light mx-5" aria-current="page" href="#">
                  <a role="button"
                  onClick={()=>{
                  if (login){
                    Auth.logout()
                    navigate("/")
                    dispatch({
                      type: LOGOUT_STATUS
                    })
                  } else {
                    navigate("/login")
                  }
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg> &nbsp; 
                  {login? 'logout':'login'}
                  </a>
                  </div>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </section>
    </div>
  );
}
