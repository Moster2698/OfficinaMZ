import React from "react";
import {Modal} from "react-bootstrap"; 
function ModalConferma(props){

    return(
        <Modal show={props.vista} onHide={props.setFalse}>
            <Modal.Body>
               Ordine effettuato
            </Modal.Body>
        </Modal>
    )
}
export default ModalConferma;