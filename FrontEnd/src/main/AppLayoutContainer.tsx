import React from 'react';
import Header from "./Header/Header";
import Preview from "./Preview/Preview";
import Footer from "./Footer/Footer";
import {Container} from "react-bootstrap";


const AppLayoutContainer = () => {
    return (
        <Container fluid style={{padding:'0px'}}>
            <Header isAuth={false}/>
            <Preview/>
            <Footer/>
        </Container>
    );
};

export default AppLayoutContainer;
