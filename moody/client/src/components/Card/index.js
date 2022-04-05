import React, {useState, useEffect} from 'react';
import { useMutation, useQuery} from '@apollo/client'; 
import { useGlobalContext } from '../../utils/globalContext';
import {ADD_IMAGE} from '../../utils/mutations';
import {QUERY_USER} from '../../utils/queries'
import {
  UPDATE_COLLECTION_LIST,
  SHOW_COLLECTION_MODAL,
  GET_IMAGE_INFO,
  SHOW_IMG_MODAL,
  GET_COLLECTION_LIST
} from '../../utils/actions'
import { saveAs } from "file-saver";

const Card = React.forwardRef((props, ref)=> {
  const [state, dispatch] = useGlobalContext();
  const {collectionList} = state;
  const [addImage, {error}] = useMutation(ADD_IMAGE)
  const {loading, data} = useQuery(QUERY_USER)
  
  useEffect(()=>{
    if(data){
      dispatch({
        type: GET_COLLECTION_LIST,
        payload: data.user.collections
      })
    }
  }, [data, loading])

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

  const showModal = () =>{
    dispatch({
      type: SHOW_COLLECTION_MODAL
    })
    dispatch({
      type: GET_IMAGE_INFO,
      payload: {
        id: props.id,
        photographer: props.imgInfo.photographer,
        src: props.imgSrc
      }
    })
  }

    const viewLargeImg = (e)=>{
      dispatch({
        type: SHOW_IMG_MODAL
      })
      dispatch({
        type: GET_IMAGE_INFO,
        payload: {
          id: props.imgId,
          photographer: props.imgInfo.photographer,
          src: props.imgSrc
        }
      })
    }

  return (
    
    <div 
      className="mx-2 my-3"
    >
      <div className="card shadow-sm" ref={ref}>
          <img onClick={viewLargeImg}
          src={props.imgSrc} alt='testing img'></img>
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
              onClick={showModal}
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
              <li>
                <a 
                  onClick={()=>{saveAs(props.imgSrc, "moody download")}}
                  className="dropdown-item" key="copyLink">download
                </a>
              </li>
              <li>
                <a 
                  href="mailto:" 

                  className="dropdown-item" key="sendViaEmail">share</a>
              </li>
            </ul>
          </div>
      </div>
    </div>
    
  );
})

export default Card;