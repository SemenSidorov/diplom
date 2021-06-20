import React from 'react';
import {Button, Col, Container} from "react-bootstrap";
import homeIcon from '../../images/home.png'
import {Link, useParams} from "react-router-dom";
import {UserTypes} from "../Constants";
import { userInfo } from 'os';

type FooterT = {
    isMobile?: boolean
}

const Footer = ({isMobile}: FooterT): React.ReactElement => {
    const { userId } : UserTypes = useParams();
    if (!isMobile) {
        return <div></div>
    }
    return (
        <Container style={{ position: 'fixed', bottom: 0, left: 0, boxShadow: '0 0 10px rgba(0,0,0,0.5)',background: '#fff', zIndex: 2 }}>
           <div className="footer" >
               <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                   <Link to={`/profile/${userId}/1/${userId}`}>
                       <Col className='footer__item' xs={4} md={6} xl={2} style={{textAlign: 'center'}}>
                           <img src={homeIcon} alt=""/>
                       </Col>
                   </Link>
                   <Link to={`/profile/${userId}/2/${userId}`}>
                       <Col className='footer__item' xs={4} md={6} xl={2} style={{textAlign: 'center'}}>
                           <img src={homeIcon} alt=""/>
                       </Col>
                   </Link>
                   <Link to={`/profile/${userId}/3/${userId}`}>
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
