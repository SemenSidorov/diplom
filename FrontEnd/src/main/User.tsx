import React from 'react';
import {Modal} from "react-bootstrap";
import {UserTypes} from "./Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "./Auth/Login";
import ModalContainer from './ModalContainer';
import MainProfile from './Profile/features/components/MainProfile';
import EditProfile from './Profile/EditProfile';

const User = ({show, handleClose, otherUserID}) => {
    const { userId } : UserTypes = useParams();
    const token = getCookieByName('access_token');
    
    return (
        <ModalContainer header={'Пользователь'} show={show} handleClose={handleClose}>
            <Modal.Body style={{background: 'rgb(235, 237, 240)'}}>
                <MainProfile otherUserID={otherUserID} />
            </Modal.Body>
        </ModalContainer>
    );
};

export default User;
