import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router'

const Login = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const getCookie = (cookie_name: string) => {
        const results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        return !!results;
    };

    const [isAuth, setIsAuth] = useState<boolean>(getCookie('access_token'));

    const auth = useCallback(async () => {
        const result = await fetch(`http://backend/BackEnd/personal/autoresize.php?LOGIN=${login}&PASSWORD=${password}`);
        const res: {LOGIN: string, TOKEN: string} = await result.json();
        if (res.TOKEN) {
            document.cookie = `access_token=${res.TOKEN}`;
            setIsAuth(true)
        }
    }, [login, password]);

    return (
        <Container fluid style={{padding:'0px'}}>
            {
                isAuth ?  <Redirect to="/profile/23/3"/> : ''
            }
            <Form className={'main__register-form'} style={{marginTop: 125}}>
                <Col md={6} xl={2}>
                    <Form.Group className={'input-text'} controlId="formBasicEmail">
                        <Form.Control type="email" value={login} onChange={(e) => setLogin(e.target.value) } placeholder="Введите email" />
                    </Form.Group>
                </Col>
                <Col md={6} xl={2}>
                    <Form.Group className={'input-text'} controlId="formBasicPassword">
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" />
                    </Form.Group>
                </Col>
                <Col md={3} xs ={5} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                    <Button variant="primary" onClick={auth} className={'submit-btn'}>
                        Войти
                    </Button>
                </Col>
                <Form.Text className="text-muted" style={{marginTop:'30px', textAlign:'center'}}>
                    Еще не зарегестрированы ?
                </Form.Text>
                <Col md={6} xs ={8} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                    <Link to={'/register'}>
                        <Button style={{width:'100%', marginTop: '15px'}} variant="success" className={'submit-btn'}>
                          Зарегистрироваться
                        </Button>
                    </Link>
                </Col>
            </Form>
        </Container>
    );
};

export default Login;
