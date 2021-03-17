import React from 'react';
import Header from "../Header/Header";
import {Button, Col, Container, Form} from "react-bootstrap";

const Register = () => {
    return (
        <Container fluid style={{padding:'0px'}}>
            <Form className={'main__register-form'}>
                <Col md={6} xl={2}>
                    <Form.Group className={'input-text'} controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Введите никнэйм" />
                    </Form.Group>
                </Col>
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
                <Col md={3} xs ={8} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                    <Button type="submit" style={{width:'100%', marginTop: '15px'}} variant="success" className={'submit-btn'}>
                        Зарегистрироваться
                    </Button>
                </Col>
            </Form>
        </Container>
    );
};

export default Register;
