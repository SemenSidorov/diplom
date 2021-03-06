import React from 'react';
import {Col, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import settings from '../../images/settings.png'
import {HeaderTypes} from "../Constants";
import logo from '../../images/logo.png'
import {SelectButton} from "../Events/EventsPosts";


const Header = ({title,isAuth = false, isMain = false}: HeaderTypes) => {
    return (
            <div style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                <Container style={{ display:'flex', justifyContent: 'space-between',padding: '8px'}}>
                    <Link to={'/'} style={{alignSelf: 'center', fontWeight: 500, color: '#000', fontSize: 20}}>
                        {title}
                        {!isAuth ? <img width={100} src={logo} alt=""/>: ''}
                    </Link>
                    {
                        isAuth ? <div>
                            <img src={settings} style={{width: 32, marginTop: 4, cursor: 'pointer'}} alt=""/>
                        </div>: ''
                    }
                    {
                        !isAuth && isMain && <Link to={'/login'}>
                            <SelectButton style={{ margin: '12px auto',width: 150, height: 40, color: '#fff' }}>
                                Войти
                            </SelectButton>
                        </Link>
                    }
                </Container>
            </div>
    );
};

export default Header;
