import React, {useState} from 'react'
import { useGlobalContext } from '../../utils/globalContext';
import { useMutation} from '@apollo/client'; 
import {ADD_COLLECTION} from '../../utils/mutations';
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';

import {
  HIDE_IMG_MODAL,
} from '../../utils/actions'

export default function ImgModal() {
  
  const [state, dispatch] = useGlobalContext(); 
  
  const {imgModal, imgInfo} = state;
  const hideModal = ()=>{
    dispatch({
      type: HIDE_IMG_MODAL
    })
  }



  return (
    <div>
      <Modal fullscreen='true' show={imgModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Moody :)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div  className='row justify-content-center'>
            <img src={imgInfo.src} className="my-3" style={{}} ></img>
            <p className='text-center fs-5 fw-bolder '> © {imgInfo.photographer}</p>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={hideModal} >
            Cancel
          </Button>
          <Button variant="dark" onClick={addNewCollection}>
            Create
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );

}
