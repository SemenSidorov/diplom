import React from 'react';
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const ChatItem = ({socket}) => {
    const lol = () => {
        socket.send('hui')
    };
    return (
        <div onClick={lol}>
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
                    <div style={{marginTop: 7, marginBottom: 3}}>Анастасия Проскурина</div>
                    <div style={{display: 'flex'}}>
                        <img style={{width: 25, height: 25, borderRadius: 30}} src="https://sun1.megafon-nn.userapi.com/s/v1/ig1/0fKfxWlATfSL6372IuEIbVbDF8_UuLplT9oF0HLly_FpQb1U0jB5I6XPvkgBGboMzd5jTYlk.jpg?size=50x0&quality=96&crop=0,184,595,595&ava=1" alt=""/>
                        <div> Текст сообщения </div>

                    </div>
                </div>
            </Col>
        </div>
    );
};

export default ChatItem;
