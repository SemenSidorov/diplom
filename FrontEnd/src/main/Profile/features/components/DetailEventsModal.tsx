import React from 'react';
import {Button, Modal} from "react-bootstrap";
import Avatar from '../../../../images/first.png';
import {getCookieByName} from "../../../Auth/Login";

const DetailEventsModal = ({userId, text, header, show, handleClose }) => {
    const token = getCookieByName('access_token');
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{margin: 'auto', width: '50%', float: 'left', marginRight: 15, borderRadius: 25}} src={Avatar} alt=""/>
                {text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="success" onClick={async () => {
                    const data = fetch(`http://backend/BackEnd/events/subscribe.php?TOKEN=${token}&USER_ID=${userId}`);
                    handleClose()
                }}>
                    Записаться
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailEventsModal;
