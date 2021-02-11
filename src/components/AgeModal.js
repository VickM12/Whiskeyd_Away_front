import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap/'
export default function AgeModal(props){
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleClose2=(event)=>{
    window.location.href="https://www.addictioncenter.com/teenage-drug-abuse/underage-drinking/"
    return null
  }

  return(
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop={true}
        keyboard={false}
        // autoFocus={true}
        centered={true}
        className="modal"
      >
        <Modal.Header>
          <Modal.Title>Verify Your Age</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You Must Be At Least 21 To Use This Site.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}