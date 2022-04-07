import React from 'react'
import { Button, Modal} from 'react-bootstrap';
import { useGlobalContext } from '../../utils/globalContext';
import { HIDE_ALERT, SHOW_ALERT } from '../../utils/actions';

export default function Alert() {
  const [state, dispatch] = useGlobalContext(); 
  const { alertModal } = state;
  const hideAlertModal = () =>{
    dispatch({
      type: HIDE_ALERT
    })
  }

  return (
    <>
      <Modal centered show={alertModal.show} onHide={hideAlertModal}>
        
        <Modal.Body>{alertModal.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideAlertModal}>
            OK
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}
