import React from 'react';
import {mainProfileContainerInterface} from "../MainProfileContainer";
import {Col} from "react-bootstrap";
import EventsPosts, { SelectButton } from "../../../Events/EventsPosts";
import {useAsync} from "@umijs/hooks";
import {getCookieByName} from "../../../Auth/Login";
import {UserTypes} from "../../../Constants";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {ClockLoader} from "react-spinners";
import { getUserFields } from '../../../Requests';


const MainProfile = ({otherUserID} : {otherUserID?: string}) => {
    const { userId } : UserTypes = useParams();
    const { data, loading } = useAsync(() => getUserFields(userId, otherUserID ? otherUserID : userId) , []);
    const isAdmin = getCookieByName('is_admin') === "1";
    return (
        <div style={{ padding: 10, width: '100%' }}>
            <Col style={{
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 15
            }}>
                {
                    loading ? <div style={{height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ClockLoader color={'#283593'} loading={loading} />
                </div> : <div> 
                        <div style={{width: 76, display: 'flex'}}>
                    <img width={'100%'} height={'100%'} src={data?.PREVIEW_PICTURE?.replace('W:/domains/', 'http://')} alt=""/>
                    <div style={{marginLeft: 15, alignSelf: 'center'}}>
                        <div style={{width: 200, height: 19, fontWeight: 500}}>
                            {`${data?.NAME} ${data?.LAST_NAME}`}
                        </div>
                        <div style={{width: 300}}>
                            <span style={{color: 'gray'}}>Последний раз в сети: </span> {moment.unix(Number(data?.LAST_AUTH)).format("YYYY-MM-DD HH:mm")}
                        </div>
                        {
                            data?.GROUP_NUMBER && <div>
                                <span style={{color: 'gray'}}>Номер группы: </span> {data?.GROUP_NUMBER}
                            </div>
                        }
                        {
                            data?.CREDIT_BOOK_NUMBER && <div>
                                <span style={{color: 'gray'}}>Номер зачетной книжки: </span> {data?.CREDIT_BOOK_NUMBER}
                            </div>
                        }
                        {
                            data?.PHONE_NUMBER && <div>
                                <span style={{color: 'gray'}}>Номер телефона: </span> {data?.PHONE_NUMBER}
                            </div>
                        }
                    </div>
                </div>
                    <Link to={`/profile/${userId}/4/${otherUserID || userId}`}>
                    <div style={{
                        backgroundColor: 'rgba(227, 227, 227, 0.8)',
                        padding: 10, textAlign: 'center',
                        borderRadius: '15px',
                        marginTop: 20,
                        fontSize: 15,
                        fontWeight: 500
                    }}>
                        Редактировать страницу
                    </div>
                </Link>
                {
                    !otherUserID && 
                    <div>
                        <div style={{fontWeight: 600, fontSize: 16, textAlign: 'center', marginTop: 25 }}>
                        Мои мероприятия
                    </div>
                    <EventsPosts isMyEvents/>
                    </div>
                }
                    </div>
                }
            
              
            </Col>
        </div>
    );
};

export default MainProfile;
