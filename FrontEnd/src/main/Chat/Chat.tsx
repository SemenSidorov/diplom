import React, {useMemo, useState} from 'react';
import {Col, Container} from "react-bootstrap";
import ChatItem from "./ChatItem";
import NavPanel from "../Navigation";
import Footer from "../Footer/Footer";

const Chat = () => {


    const currentComponent = useMemo(() => {

    }, []);

    return (
        <Container style={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <NavPanel />
            <div style={{height: "100%", width: "100%",  overflow: "auto"}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Col xs={12} style={{textAlign: 'center', height: 100}}>Список диалогов</Col>
                    <ChatItem />
                    <ChatItem/>
                    <ChatItem/>
                    <ChatItem/>
                </div>
            </div>
            <Footer isMobile={false}/>
        </Container>
    );
};

export default Chat;
