import React from 'react';
import {Col, Container} from "react-bootstrap";
import {UserTypes} from "./Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "./Auth/Login";
import {useAsync} from "@umijs/hooks";
import {getAllUsers} from "./Requests";
import {NewsListI} from "./News/NewsList";

const AllUsers = () => {
    const { userId } : UserTypes = useParams();
    const token = getCookieByName('access_token');
    const isAdmin = getCookieByName('is_admin');

    const { data, loading, run } = useAsync<NewsListI>(() => getAllUsers(userId, token) , []);
    return (
        <Container style={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <div style={{height: "100%", width: "100%",  overflow: "auto"}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Col xs={12} style={{textAlign: 'center', height: 100, padding: 15}}>Список Пользователей</Col>
                    {
                        data?.values?.map(el =>  <div>
                            <Col xs={12} style={{
                                cursor: 'pointer',
                                border: '1px solid #dce1e6',
                                display: 'flex',
                                background: '#fff',
                                marginBottom: 3
                            }}>
                                <div style={{padding:`11px 14px 8px 0px`}}>
                                    <img style={{borderRadius: 30}} src="https://sun1.megafon-nn.userapi.com/s/v1/ig2/sr3WxXtNjITPaFMBvHM9CzCuJkmtMcSDan1H2V4XpQ4WP93q1158bgnEsQUkDEsa4ueA_1NNpi2eC0Ptl8NxB6ZX.jpg?size=50x0&quality=96&crop=191,0,1537,1537&ava=1" alt=""/>
                                </div>
                                <div>
                                    <div style={{marginTop: 7, marginBottom: 3}}>{el.NAME}</div>
                                </div>
                            </Col>
                        </div> )
                    }
                </div>
            </div>
        </Container>
    );
};

export default AllUsers;
