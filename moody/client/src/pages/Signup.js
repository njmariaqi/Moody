import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div>
      <div className='container' style={{marginTop: '30vh'}}>
        <div className='row justify-content-center'>
          <div className='col-4' style={{minWidth: '300px'}}>
            <div className="card shadow-sm">
              <h1 className="h3 mt-5 d-flex justify-content-center">Welcome to Moody</h1>
              <form className="row g-1 p-3 mx-3">
                <input type="text" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='First Name' id="inputFirst"></input>
                <input type="text" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Last Name' id="inputLast"></input>
                <input type="email" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Email' id="inputEmail"></input>
                <input type="password" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Create a password' id="inputPass"></input>
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
