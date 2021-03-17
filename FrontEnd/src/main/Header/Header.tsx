import React from 'react';
import {Col, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import settings from '../../images/settings.png'
import {HeaderTypes} from "../Constants";
import logo from '../../images/logo.png'


const Header = ({title,isAuth = false}: HeaderTypes) => {
    return (
            <div style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                <div style={{ display:'flex', justifyContent: 'space-between',padding: '8px'}}>
                    <Link to={'/'} style={{alignSelf: 'center', fontWeight: 500, color: '#000', fontSize: 20}}>
                        {title}
                        {!isAuth ? <img width={100} src={logo} alt=""/>: ''}
                    </Link>
                    {
                        isAuth ? <div>
                            <img src={settings} style={{width: 32, marginTop: 4, cursor: 'pointer'}} alt=""/>
                        </div>: ''
                    }
                </div>
            </div>
    );
};

export default Header;
