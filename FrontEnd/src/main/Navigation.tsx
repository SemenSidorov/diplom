import React, {useMemo} from 'react';
import {Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const linkStyles = {
    fontSize: 15,
    padding: '3px 0px',
    color: 'black',
}

const NavPanel = () => {
    const isMobile = useMemo(() => window.screen.width < 1025, []);
    return (
        !isMobile ? <Col md={3}>
            <div>
                <div style={{display: 'flex', flexDirection: 'column', marginTop: 10}}>
                    <Link style={linkStyles} to={'/profile/2748167/3'}>
                        Моя страница
                    </Link>
                    <Link style={linkStyles} to={'/profile/2748167/1'}>
                        Новости
                    </Link>
                    {/*<div>*/}
                    {/*    Сообщения*/}
                    {/*</div>*/}
                    <Link style={linkStyles} to={'/profile/2748167/2'}>
                        Все мероприятия
                    </Link>
                </div>
            </div>
    </Col> : <div></div>
    );
};

export default NavPanel;
