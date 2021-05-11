import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";

const Register = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const register = useCallback(async () => {
        const result = await fetch(`http://backend/BackEnd/personal/registration.php?LOGIN=${login}&PASSWORD=${password}`);
        return result.json()
    }, [login, password]);


    return (
        <Container fluid style={{padding:'0px'}}>
            <Form className={'main__register-form'}>
                <div style={{textAlign: 'center', fontSize: '25px', fontWeight: 400, marginBottom: 10}}>РЕГИСТРАЦИЯ</div>
                <Col md={6} xl={2} style={{margin: 'auto'}}>
                    <Form.Group className={'input-text'} controlId="formBasicEmail">
                        <Form.Control type="email" value={login} onChange={(e) => setLogin(e.target.value) } placeholder="Введите email" />
                    </Form.Group>
                </Col>
                <Col md={6} xl={2} style={{margin: 'auto'}}>
                    <Form.Group className={'input-text'} controlId="formBasicPassword">
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" />
                    </Form.Group>
                </Col>
                <Col md={3} xs ={8} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                    <Button style={{width:'100%', marginTop: '15px'}}
                            onClick={register}
                            variant="success"
                            className={'submit-btn'}>
                        Зарегистрироваться
                    </Button>
                </Col>
            </Form>
        </Container>
    );
};

export default Register;
