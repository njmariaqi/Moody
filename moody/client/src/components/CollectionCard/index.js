import React from 'react';
import { useNavigate } from "react-router-dom";
import CollectionResult from '../../pages/CollectionResult'
import { useGlobalContext } from '../../utils/globalContext';
import { PRESENT_ONE_COLLECTION, CLEAR_COLLECTION_HISTORY } from '../../utils/actions';

const axios = require('axios');

export default function CollectionCard(props) {
  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();
  console.log('props', props)
  const viewCollection = (e) =>{
    dispatch({
      type: CLEAR_COLLECTION_HISTORY,
    })
    props.images.map(async (id)=>{
      try{
        let res = await axios.get(`https://api.pexels.com/v1/photos/${id}
        `, 
        {
          headers: {'Authorization': '563492ad6f917000010000016c4b56d578274683956ae00d8dcd354a'}
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
            <img style={{height: '240px', objectFit:'cover'}} src={props.coverSrc} />
            
            
          </div>
          <h3 className="text-center pt-2">{props.collectionName}</h3>
          <p className="text-center">{props.images.length} images</p>
        </div>
    );
  }

