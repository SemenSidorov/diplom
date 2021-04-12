import React, {useMemo} from 'react';
import MainProfile from "./components/MainProfile";
import Footer from "../../Footer/Footer";
import {menuTabs} from "../../Constants";
import NewsList from "./components/NewsList";
import EventsPage from "./components/EventsPage";
import {Col, Container} from "react-bootstrap";

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
            case menuTabs.PROFILE:
                return  <MainProfile currentTab={currentTab}/>
            default:
                return <NewsList />
        }
    }, [currentTab]);
    const isMobile =  window.screen.width < 1025;

    return (
        <div style={{display: 'flex'}}>
            {
                window.screen.width > 1025 && <Col md={2}>
                    <div>
                        <div>
                            Моя страница
                        </div>
                        <div>
                            Новости
                        </div>
                        <div>
                            Сообщения
                        </div>
                        <div>
                            Меропрития
                        </div>
                        <div>
                            Настройки
                        </div>
                    </div>
                </Col>
            }
            {currentMainComponent}
            <Footer isMobile={isMobile}/>
        </div>
    );
};

export default MainProfileContainer;
