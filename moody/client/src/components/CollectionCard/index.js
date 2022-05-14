import React from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation} from '@apollo/client'; 
import CollectionResult from '../../pages/CollectionResult'
import { useGlobalContext } from '../../utils/globalContext';
import { PRESENT_ONE_COLLECTION, CLEAR_COLLECTION_HISTORY } from '../../utils/actions';
import { REMOVE_COLLECTION } from '../../utils/mutations';

const axios = require('axios');

export default function CollectionCard(props) {
  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();
  const [removeCollection, {error}] = useMutation(REMOVE_COLLECTION)

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

  const deleteCollection = async(e)=>{
    try {
      const {data} = await removeCollection({
        variables: {collectionId: e.target.dataset.id}
      })
      navigate("/collection")
      // dispatch({
      //   type: 
      // })

    } catch(error){
      console.error(error)
    }
  }

  
    return (
        <div className="col-3 my-3" >
          <div className="card shadow-sm">
            <img style={{height: '240px', objectFit:'cover'}} 
            onClick={viewCollection} 
            src={props.coverSrc} alt="nahnah"/>
            <div className="dropup">
            <button className='btn hiddenFav dropdown-toggle' data-bs-toggle="dropdown" style={{backgroundColor: 'transparent'}} aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a 
              onClick={deleteCollection}
              data-id={props.id} 
              className="dropdown-item" href="#" key="copyLink">delete collection</a></li>
              {/* <li><a className="dropdown-item" 
              href="#" key="sendViaEmail">rename collection</a></li> */}
            </ul>
          </div>
          </div>
          <h3 onClick={viewCollection} role="button" className="text-center pt-2">{props.collectionName}</h3>
          <p className="text-center">{props.images.length} images</p>
        </div>
    );
  }

