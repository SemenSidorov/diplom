import React from 'react';
import {mainProfileContainerInterface} from "../MainProfileContainer";
import {Col} from "react-bootstrap";
import Avatar from '../../../../images/first.png';
import EventsPosts from "../../../EventsPosts";

const MainProfile = ({currentTab}: mainProfileContainerInterface) => {

    return (
        <div style={{ padding: 10, width: '100%' }}>
            <Col style={{
                padding: 15,
                borderRadius: 15
            }}>
                <div style={{width: 76, height: 75, display: 'flex'}}>
                    <img width={'100%'} height={'100%'} style={{borderRadius: 45}} src={Avatar} alt=""/>
                    <div style={{marginLeft: 15, alignSelf: 'center'}}>
                        <div style={{width: 200, height: 19, fontWeight: 500}}>
                            Герман Слаутин
                        </div>
                        <div>
                            Статус...
                        </div>
                    </div>
                </div>
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
                <div style={{fontWeight: 600, fontSize: 16, textAlign: 'center', marginTop: 25 }}>
                    Мои мероприятия
                </div>
                <EventsPosts isMyEvents/>
            </Col>
        </div>
    );
};

export default MainProfile;
