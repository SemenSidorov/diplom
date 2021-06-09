import React, {useMemo} from 'react';
import {Col} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {UserTypes} from "./Constants";
import {getCookieByName} from "./Auth/Login";

const linkStyles = {
    fontSize: 15,
    padding: '3px 0px',
    color: 'black',
}

const NavPanel = () => {
    const isMobile = useMemo(() => window.screen.width < 1025, []);
    const userId : string | undefined = getCookieByName('user_id')
    return (
        !isMobile ? <Col md={3}>
            <div>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                    <Link style={linkStyles} to={`/profile/${userId}/3`}>
                        Моя страница
                    </Link>
                    <Link style={linkStyles} to={`/profile/${userId}/1`}>
                        Новости
                    </Link>
                    <Link style={linkStyles} to={`/profile/${userId}/5`}>
                        Все пользователи
                    </Link>
                    <Link style={linkStyles} to={`/profile/${userId}/2`}>
                        Все мероприятия
                    </Link>
                </div>
            </div>
    </Col> : <div></div>
    );
};

export default NavPanel;
