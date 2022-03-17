import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../utils/globalContext';
import {
  PRESENT_IMAGES
} from '../../utils/actions'

const axios = require('axios');

export default function SearchBar() {
  
  const [state, dispatch] = useGlobalContext();
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  const getImg = async(e) => {
    if(e.key === 'Enter') {
      let searchResult;
      try {
        let res = await axios.get(`https://api.pexels.com/v1/search?query=${search}`, {
          headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
        })
        searchResult = res.data.photos
      } catch(err) {
        console.error(err)
      }
      dispatch({
        type: PRESENT_IMAGES,
        payload: searchResult
      });
      setSearch('')
      navigate("/searchresult");
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
