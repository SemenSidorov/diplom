import React from 'react';
import Header from "./Header/Header";
import Preview from "./Preview/Preview";
import Footer from "./Footer/Footer";
import {Container} from "react-bootstrap";


const AppLayoutContainer = () => {

    const isMobile =  window.screen.width < 1025;

    return (
        <Container fluid style={{padding:'0px'}}>
            <Header isAuth={false}/>
            <Preview/>
            <Footer isMobile={isMobile}/>
        </Container>
    );
};

export default AppLayoutContainer;
