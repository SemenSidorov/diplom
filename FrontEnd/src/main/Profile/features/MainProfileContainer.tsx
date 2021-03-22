import React, {useMemo} from 'react';
import MainProfile from "./components/MainProfile";
import Footer from "../../Footer/Footer";
import {menuTabs} from "../../Constants";
import NewsList from "./components/NewsList";
import EventsPage from "./components/EventsPage";
import {Container} from "react-bootstrap";

export interface mainProfileContainerInterface {
    currentTab: number
}

const MainProfileContainer = ({currentTab}: mainProfileContainerInterface) => {

    const currentMainComponent = useMemo(() => {
        switch (Number(currentTab)) {
            case menuTabs.NEWS:
                return <NewsList />
            case menuTabs.EVENTS:
                return <EventsPage />
            case menuTabs.PROFILE:
                return  <MainProfile currentTab={currentTab}/>
            default:
                return <NewsList />
        }
    }, [currentTab])

    return (
        <div>
            {currentMainComponent}
            <Footer/>
        </div>
    );
};

export default MainProfileContainer;
