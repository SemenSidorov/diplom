import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {getCookieByName} from "../Auth/Login";
import {subscribeEvent} from "../Requests";

const DetailEventsModal = ({userId, text,image, header, show, handleClose }) => {
    const token = getCookieByName('access_token');
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{margin: 'auto', width: '50%', float: 'left', marginRight: 15, borderRadius: 25}} src={image} alt=""/>
                <div>{text}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="success" onClick={async () => {
                    await subscribeEvent(token, userId)
                    handleClose()
                }}>
                    Записаться
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailEventsModal;
