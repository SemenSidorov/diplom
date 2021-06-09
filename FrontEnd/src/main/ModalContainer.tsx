import React from 'react';
import {Modal} from "react-bootstrap";

const ModalContainer = ({show, handleClose, header, children}) => {
    return (
        <Modal show={show} onHide={() => {
            handleClose()
        }} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            {children}
        </Modal>
    );
};

export default ModalContainer;
