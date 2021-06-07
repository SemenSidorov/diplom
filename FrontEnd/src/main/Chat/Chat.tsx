import React, {useMemo} from 'react';
import {Col, Container} from "react-bootstrap";
import ChatItem from "./ChatItem";
import NavPanel from "../Navigation";
import Footer from "../Footer/Footer";


const Chat = () => {
    const socket = new WebSocket('ws://127.0.0.1:9000');
    socket.onmessage = (message) => {
        console.log(message.data)
    };

    const currentComponent = useMemo(() => {

    }, []);

    return (
        <Container style={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <NavPanel />
            <div style={{height: "100%", width: "100%",  overflow: "auto"}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Col xs={12} style={{textAlign: 'center', height: 100}}>Список диалогов</Col>
                    <ChatItem socket={socket}/>
                    <ChatItem socket={socket}/>
                    <ChatItem socket={socket}/>

                </div>
            </div>
            <Footer isMobile={false}/>
        </Container>
    );
};

export default Chat;
