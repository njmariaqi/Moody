import React, {useState, useEffect} from 'react';
import { useMutation, useQuery} from '@apollo/client'; 
import { useGlobalContext } from '../../utils/globalContext';
import {ADD_IMAGE, ADD_COLLECTION} from '../../utils/mutations';
import {UPDATE_COLLECTION_LIST} from '../../utils/actions'
import CollectionInfo from '../CollectionInfo/index'

export default function Card(props) {
  const [state, dispatch] = useGlobalContext();
  const {collectionList} = state;
  const [addImage, {error}] = useMutation(ADD_IMAGE)
  const [addCollection] = useMutation(ADD_COLLECTION);
  const [newCollection, setNewCollection] = useState("")
  const [display, setDisplay] = useState("none")
  
  // useEffect(()=>{console.log('test useEffect')})

  const addImageToCollection = async (e) =>{
    try{
      const {data} = await addImage({
        variables: {collectionId: e.target.id, imageId: props.imgId} 
      })
      console.log(data,'add image')
      dispatch({
        type: UPDATE_COLLECTION_LIST,
        payload: {
          collectionId: e.target.id,
          imgId: props.imgId
        }
      })
    }catch(error){
      console.error(error)
    }
  }


  const collectionData = (e) =>{

  }

  // const addNewCollection = async(e) =>{
  //   try {
  //     const {data} = await addCollection({
  //       variables: {name: }
  //     })
  //   }catch(e){
  //     console.error(e)
  //   }
  // }


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
              <li><a 
              // onClick={()=>{setDisplay("block")}}
              className="dropdown-item text-primary" id="addNewCollection" key="addNewCollection">Add New Collection</a></li>
            </ul>
          </div>
          <div className="dropup">
            <button className='btn hiddenFav dropdown-toggle' data-bs-toggle="dropdown" style={{backgroundColor: 'transparent'}} aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href="#" key="copyLink">download</a></li>
              <li><a className="dropdown-item" href="#" key="sendViaEmail">share</a></li>
            </ul>
          </div>
      </div>
      {/* <CollectionInfo display={display} /> */}
    </div>
    
  );
}
