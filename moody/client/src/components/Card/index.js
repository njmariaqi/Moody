import React, {useState, useEffect} from 'react';
import { useMutation, useQuery} from '@apollo/client'; 
import { useGlobalContext } from '../../utils/globalContext';
import {ADD_IMAGE, GET_COLLECTION_LIST} from '../../utils/mutations';
import {UPDATE_COLLECTION_LIST} from '../../utils/actions'

export default function Card(props) {
  const [state, dispatch] = useGlobalContext();
  const {collectionList} = state;
  const [addImage, {error}] = useMutation(ADD_IMAGE)
  
  // useEffect(()=>{console.log('test useEffect')})

  const addImageToCollection = async (e) =>{
    console.log(e.target, 'target')
    try{
      const {data} = await addImage({
        variables: {collectionId: e.target.id, imageId: props.imgId} 
      })
      dispatch({
        type: UPDATE_COLLECTION_LIST,
        payload: data.addImage
      })
    }catch(error){
      console.error(error)
    }
  }


  return (
      <div className="col-3 my-3">
        <div className="card shadow-sm">
          <img src={props.imgSrc} alt='testing img'></img>
          <div className="dropup hiddenCollection">
            <button className="btn dropdown-toggle" 
            type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-collection" viewBox="0 0 16 16">
                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
              </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {collectionList.map((e)=>{return <li><a className="dropdown-item" id={e._id} href="#" key={e._id}
              onClick={addImageToCollection}>{e.name}</a></li>})}
            </ul>
          </div>
          <div className="dropup">
            <button className='btn hiddenFav dropdown-toggle' data-bs-toggle="dropdown" style={{backgroundColor: 'transparent'}} aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href="#" key="copyLink">copy link</a></li>
              <li><a className="dropdown-item" href="#" key="sendViaEmail">send via email</a></li>
            </ul>
          </div>
      </div>
    </div>
    
  );
}
