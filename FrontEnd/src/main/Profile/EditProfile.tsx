import React, {useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";

const EditProfile = () => {
    const [profileFields, setProfileFields] = useState({
        name: '',
        lastName: '',
        middleName: '',
        numberOfGroup: '',
    });
    return (
        <Container style={{display: 'flex', justifyContent: 'center', padding: 0}}>
            <div style={{height: "100%", width: "100%",  overflow: "auto"}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Form className={'main__register-form'} style={{marginTop: 125}}>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} controlId="formBasicEmail">
                                <Form.Control value={profileFields.name} onChange={(e) => {
                                    setProfileFields({...profileFields, name: e.target.value})
                                }} placeholder="Введите Имя" />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} controlId="formBasicPassword">
                                <Form.Control value={profileFields.lastName}
                                              onChange={(e) => setProfileFields({...profileFields, lastName: e.target.value})}
                                              placeholder="Введите фамилию"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} controlId="formBasicPassword">
                                <Form.Control value={profileFields.middleName}
                                              onChange={(e) => setProfileFields({...profileFields, middleName: e.target.value})}
                                              placeholder="Введите отчество"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} controlId="formBasicPassword">
                                <Form.Control value={profileFields.numberOfGroup}
                                              onChange={(e) => setProfileFields({...profileFields, numberOfGroup: e.target.value})}
                                              placeholder="Введите отчество"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xs ={8} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                            <Button variant="success" onClick={() => {
                                console.log('lol')
                            }} className={'submit-btn'}>
                                Сохранить
                            </Button>
                        </Col>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default EditProfile;
