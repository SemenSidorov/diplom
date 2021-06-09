import React, {useMemo} from 'react';
import MainProfile from "./components/MainProfile";
import Footer from "../../Footer/Footer";
import {menuTabs} from "../../Constants";
import NewsList from "../../News/NewsList";
import EventsPage from "../../Events/EventsPage";
import {Col, Container} from "react-bootstrap";
import NavPanel from "../../Navigation";
import AllUsers from "../../AllUsers";

export interface mainProfileContainerInterface {
    currentTab: number
}

const MainProfileContainer = ({currentTab}: mainProfileContainerInterface) => {

    const currentMainComponent = useMemo(() => {
        switch (Number(currentTab)) {
            case menuTabs.NEWS:
                return <NewsList />;
            case menuTabs.EVENTS:
                return <EventsPage />;
            case menuTabs.ALL_USERS:
                return <AllUsers />
            case menuTabs.EDIT:
                return <Col md={9}>Редактирование страницы</Col>
            case menuTabs.PROFILE:
                return  <MainProfile currentTab={currentTab}/>
            default:
                return <NewsList />
        }
    }, [currentTab]);

    const isMobile =  window.screen.width < 1025;

    return (
        <Container style={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <NavPanel />
            {currentMainComponent}
            <Footer isMobile={isMobile}/>
        </Container>
    );
};

export default MainProfileContainer;
