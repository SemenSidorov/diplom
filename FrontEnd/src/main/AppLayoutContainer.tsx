import React from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {Container} from "react-bootstrap";
import NewsList from "./News/NewsList";


const AppLayoutContainer = () => {

    const isMobile =  window.screen.width < 1025;

    return (
        <Container fluid style={{padding:'0px'}}>
            <Header isMain={true} isAuth={false}/>
            <NewsList />
            <Footer isMobile={isMobile}/>
        </Container>
    );
};

export default AppLayoutContainer;
