import React from 'react';
import {Button, Col, Container} from "react-bootstrap";
import homeIcon from '../../images/home.png'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <Container style={{ position: 'fixed', bottom: 0, left: 0, boxShadow: '0 0 10px rgba(0,0,0,0.5)',background: '#fff', zIndex: 2 }}>
            <div className="footer" >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <Link to={'/profile/2748167/1'}>
                        <Col className='footer__item' xs={4} md={6} xl={2} style={{textAlign: 'center'}}>
                            <img src={homeIcon} alt=""/>
                        </Col>
                    </Link>
                    <Link to={'/profile/2748167/2'}>
                        <Col className='footer__item' xs={4} md={6} xl={2} style={{textAlign: 'center'}}>
                            <img src={homeIcon} alt=""/>
                        </Col>
                    </Link>
                    <Link to={'/profile/2748167/3'}>
                        <Col className='footer__item' xs={4} md={6} xl={2} style={{textAlign: 'center'}}>
                            <img src={homeIcon} alt=""/>
                        </Col>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Footer;
