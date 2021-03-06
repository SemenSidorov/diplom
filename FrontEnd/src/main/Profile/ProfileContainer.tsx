import React, {useEffect, useMemo} from 'react';
import {useParams} from "react-router-dom";
import {menuTabs, TabsTypes, UserTypes} from "../Constants";
import Header from "../Header/Header";
import MainProfileContainer from "./features/MainProfileContainer";
import {useAsync} from "@umijs/hooks";
import {getCookieByName} from "../Auth/Login";

const ProfileContainer = () => {

    const { userId } : UserTypes = useParams();
    const { currentTab }: TabsTypes = useParams();



    const getHeaderNameByCurrentTab = useMemo(() => {
        switch (Number(currentTab)) {
            case menuTabs.ALL_USERS:
                return 'Все пользователи';
            case menuTabs.NEWS:
                return 'Новости';
            case menuTabs.EVENTS:
                return 'Все мероприятия';
            case menuTabs.PROFILE:
                return `@${userId}`;
            case menuTabs.EDIT:
                return 'Редактирование профиля'
            default:
                return 'Новости'
        }
    }, [currentTab]);

    return (
        <div>
            <Header title={getHeaderNameByCurrentTab} isAuth/>
            <MainProfileContainer currentTab={Number(currentTab)}/>
        </div>
    );
};

export default ProfileContainer;
