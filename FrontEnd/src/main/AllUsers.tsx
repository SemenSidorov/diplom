import React, { useState } from 'react';
import {Col, Container, Modal} from "react-bootstrap";
import {UserTypes} from "./Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "./Auth/Login";
import {useAsync} from "@umijs/hooks";
import {getAllUsers} from "./Requests";
import {NewsListI} from "./News/NewsList";
import moment from 'moment'
import ModalContainer from './ModalContainer';
import User from './User';
import { useMemo } from 'react';

const AllUsers = () => {
    const { userId } : UserTypes = useParams();
    const token = getCookieByName('access_token');
    const [userInfo, setUserInfo] = useState<any>(0)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)

    const { data, loading, run } = useAsync<NewsListI>(() => getAllUsers(userId, token) , []);
    const userModal = useMemo(() => show && <User otherUserID={userInfo} show={show} handleClose={handleClose} />, [show] )
    return (
        <Container style={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <div style={{height: "100%", width: "100%",  overflow: "auto"}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Col xs={12} style={{textAlign: 'center', height: 100, padding: 15}}>Список Пользователей</Col>
                    {
                        data?.values?.map(el =>  <div>
                            <Col xs={12} onClick={() => {
                    
                                setUserInfo(el?.ID)
                                setShow(true)
                            }} style={{
                                cursor: 'pointer',
                                border: '1px solid #dce1e6',
                                display: 'flex',
                                background: '#fff',
                                marginBottom: 3
                            }}>
                                <div style={{padding:`11px 14px 8px 0px`}}>
                                    <img style={{width: 76, height: 'auto'}} src={el?.PREVIEW_PICTURE.replace('W:/domains/', 'http://')} alt=""/>
                                </div>
                                <div>
                                    <div style={{marginTop: 10, marginBottom: 3}}>{el?.LAST_NAME} {el?.NAME}</div>
                                    <div style={{marginTop: 10, marginBottom: 3}}>был в сети {moment.unix(Number(el?.LAST_AUTH)).format("YYYY-MM-DD HH:mm")}</div>
                                </div>
                            </Col>
                            {userModal}
                        </div> )
                    }
                </div>
            </div>
        </Container>
    );
};

export default AllUsers;
