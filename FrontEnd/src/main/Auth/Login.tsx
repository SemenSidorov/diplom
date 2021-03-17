import React from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <Container fluid style={{padding:'0px'}}>
            <Form className={'main__register-form'} style={{marginTop: 125}}>
                <Col md={6} xl={2}>
                    <Form.Group className={'input-text'} controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Введите email" />
                    </Form.Group>
                </Col>
                <Col md={6} xl={2}>
                    <Form.Group className={'input-text'} controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Введите пароль" />
                    </Form.Group>
                </Col>
                <Col md={3} xs ={5} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                    <Link to={'/profile/2748167/2'}>
                        <Button variant="primary" type="submit" className={'submit-btn'}>
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
