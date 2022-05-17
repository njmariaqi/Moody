import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../utils/globalContext';
import {
  PRESENT_IMAGES,
  IMAGE_QUERY,
  CLEAR_IMG_HISTORY
} from '../../utils/actions'

const axios = require('axios');

export default function SearchBar() {
  
  const [state, dispatch] = useGlobalContext();
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const getImg = (e)=>{
    if(e.key === "Enter"){
      dispatch({
            type:CLEAR_IMG_HISTORY
          })
      dispatch({
        type: IMAGE_QUERY,
        payload: search
      })
      setSearch("");
      navigate("/searchresult")
    }
  }


  return (
    <div className='col-6 mx-auto'>
      <div className="container">
        <input type='text' className="form-control" style={{borderRadius: '20px'}} placeholder="Type to search..."
        value = {search}
        onChange={(e) =>{
          setSearch(e.target.value)
        }}
        onKeyDown={getImg} 
        ></input>
      </div>
    </div>
  );
}
