import React, {useState} from 'react'
import { useGlobalContext } from '../../utils/globalContext';
import { useMutation} from '@apollo/client'; 
import {ADD_COLLECTION} from '../../utils/mutations';
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';

import {
  HIDE_COLLECTION_MODAL,
  ADD_NEW_COLLECTION,
} from '../../utils/actions'

export default function CollectionInfo(props) {
  const [collectionName, setCollectionName] = useState("")
  const [state, dispatch] = useGlobalContext(); 
  const [addCollection] = useMutation(ADD_COLLECTION);
  const navigate = useNavigate();
  
  const {collectionModal, imgInfo} = state;
  const hideModal = ()=>{
    dispatch({
      type: HIDE_COLLECTION_MODAL
    })
  }

  const addNewCollection = async(e) =>{
    try{
      const {data} = await addCollection({
        variables:{
          name: collectionName,
          images: [imgInfo.id]
        }
      })
      dispatch({
        type: ADD_NEW_COLLECTION,
        payload: data.addCollection
      })
      setCollectionName("")
      dispatch({
        type: HIDE_COLLECTION_MODAL
      })
      // dispatch({
      //   type: HIDE_COLLECTION_MODAL
      // })
      //navigate('/')
    }catch(e){
      console.error(e)
    }
  }

  return (
    <div>
      <Modal show={collectionModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div  className='row justify-content-center'>
            <img src={imgInfo.src} className="my-3" style={{width:"300px"}}></img>
          </div>
          <input 
            autoFocus
            name='collectionName' 
            value={collectionName}
            onChange={(e)=>{setCollectionName(e.target.value)}}
            type="text" style={{borderRadius: '20px'}} className="form-control my-1" placeholder='Collection Name' id="inputCollectionName">  
          </input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal} >
            Cancel
          </Button>
          <Button variant="dark" onClick={addNewCollection}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}
