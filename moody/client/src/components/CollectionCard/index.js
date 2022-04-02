import React from 'react';
import { useNavigate } from "react-router-dom";
import CollectionResult from '../../pages/CollectionResult'
import { useGlobalContext } from '../../utils/globalContext';
import { PRESENT_ONE_COLLECTION, CLEAR_COLLECTION_HISTORY } from '../../utils/actions';

const axios = require('axios');

export default function CollectionCard(props) {
  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();
  const viewCollection = (e) =>{
    dispatch({
      type: CLEAR_COLLECTION_HISTORY,
    })
    props.images.map(async (id)=>{
      try{
        let res = await axios.get(`https://api.pexels.com/v1/photos/${id}
        `, 
        {
          headers: {'Authorization': '563492ad6f917000010000015cf5ff7c412542d980a62beb2d41dc62'}
        })
        dispatch({
          type: PRESENT_ONE_COLLECTION,
          payload: res.data
        });
      }catch(e){
        console.error(e)
      }
    })
    navigate("/collectionresult");
  }

  
    return (
        <div className="col-3 my-3" onClick={viewCollection}>
          <div className="card shadow-sm">
            <img style={{height: '240px', objectFit:'cover'}} src={props.coverSrc} alt="nahnah"/>
            
            
          </div>
          <h3 className="text-center pt-2">{props.collectionName}</h3>
          <p className="text-center">{props.images.length} images</p>
        </div>
    );
  }

