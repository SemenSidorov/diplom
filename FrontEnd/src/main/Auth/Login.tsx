import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const Login = () => {

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const auth = useCallback(async () => {
        const result = await fetch(`http://backend/BackEnd/personal/autoresize.php?LOGIN=${login}&PASSWORD=${password}`);
        const res: {LOGIN: string, TOKEN: string} = await result.json();
        document.cookie = `access_token=${res.TOKEN}`
    }, [login, password]);

    return (
        <Container fluid style={{padding:'0px'}}>
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
                    <Link to={'/profile/2748167/2'}>
                        <Button variant="primary" onClick={auth} className={'submit-btn'}>
                            Войти
                        </Button>
                    </Link>
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
