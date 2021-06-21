import { useAsync } from '@umijs/hooks';
import React, {useState} from 'react';
import { useEffect } from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import { getCookieByName } from '../Auth/Login';
import { useParams } from "react-router-dom";
import { UserTypes } from '../Constants';
import { editProfile, getUserFields } from '../Requests';
import { debug } from 'console';

const EditProfile = () => {
    const [profileFields, setProfileFields] = useState({
        name: '',
        lastName: '',
        middleName: '',
        numberOfGroup: '',
        creditBookNumber: '',
        phoneNumber: '',
        email: '',
        avatar: '',
        isAdmin: false
    });
    const userId = getCookieByName('user_id');
    const isAdmin = getCookieByName('is_admin') === "1";
    const token = getCookieByName('access_token');
    const { otherUserId } : UserTypes = useParams();

    const { data, loading, run } = useAsync<any>(() => getUserFields(userId, otherUserId) , []);
    useEffect(() => {
        if(data) {
            setProfileFields({
                ...profileFields,
                name: data?.NAME || '',
                lastName: data.LAST_NAME || '',
                middleName: data?.MIDDLE_NAME || '',
                numberOfGroup: data?.GROUP_NUMBER || '',
                creditBookNumber: data?.CREDIT_BOOK_NUMBER,
                email: data?.EMAIL,
                phoneNumber: data?.PHONE_NUMBER,
                avatar: data?.PREVIEW_PICTURE?.replace('W:/domains/', 'http://'),
                isAdmin: data?.IS_ADMIN
            })
        }
    }, [data])

    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const result = editProfile(formData, userId === otherUserId ? false : true)
        alert('Успешно')
    }

    return (
        <Container style={{display: 'flex', justifyContent: 'center', paddingBottom: 100}}>
            <div style={{height: "100%", width: "100%",  overflow: "auto"}}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <Form onSubmit={onSubmit} className={'main__register-form'} style={{marginTop: 15}}>
                        <Col md={6} xl={8} style={{margin: '20px auto',}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}} controlId="formBasicEmail">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control name='NAME' value={profileFields.name} onChange={(e) => {
                                    setProfileFields({...profileFields, name: e.target.value})
                                }} placeholder="Введите Имя" />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: '10px auto'}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}} controlId="formBasicPassword">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control name='LAST_NAME' value={profileFields.lastName}
                                              onChange={(e) => setProfileFields({...profileFields, lastName: e.target.value})}
                                              placeholder="Введите фамилию"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}} controlId="formBasicPassword">
                            <Form.Label>Отчество</Form.Label>
                                <Form.Control name='MIDDLE_NAME' value={profileFields.middleName}
                                              onChange={(e) => setProfileFields({...profileFields, middleName: e.target.value})}
                                              placeholder="Введите отчество"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}} controlId="formBasicPassword">
                            <Form.Label>Номер зачётеной книжки</Form.Label>
                                <Form.Control type={'number'} name='CREDIT_BOOK_NUMBER' value={profileFields.creditBookNumber}
                                              onChange={(e) => setProfileFields({...profileFields, creditBookNumber: e.target.value})}
                                              placeholder="Введите номер зачетной книжки"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}} controlId="formBasicPassword">
                                <Form.Label>Номер группы</Form.Label>
                                <Form.Control type={'number'} name='GROUP_NUMBER' value={profileFields.numberOfGroup}
                                              onChange={(e) => setProfileFields({...profileFields, numberOfGroup: e.target.value})}
                                              placeholder="Введите номер группы"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}} controlId="formBasicPassword">
                            <Form.Label>Номер телефона</Form.Label>
                                <Form.Control name='PHONE_NUMBER' value={profileFields.phoneNumber}
                                              onChange={(e) => setProfileFields({...profileFields, phoneNumber: e.target.value})}
                                              placeholder="Введите номер телефона"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                            <Form.Group className={'input-text'} style={{height: '100%'}}  controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                                <Form.Control name='EMAIL' value={profileFields.email}
                                              onChange={(e) => setProfileFields({...profileFields, email: e.target.value})}
                                              placeholder="Введите email"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xl={8} style={{margin: 'auto'}}>
                        <Form.File
                            style={{height: '100%'}}
                            type="file"
                            label={'Аватар'}
                            name={'PREVIEW_PICTURE'}
                            id={'inputGroupFile01'}
                            data-browse="Выбрать файл"
                            onChange={(e) => {
                                alert('Аватар загружен')
                            }}
                            custom
                        />
                        </Col>
                        {
                            userId !== otherUserId && <Col md={6} xl={8} style={{margin: '20px auto'}}>
                            <Form.Group className={'input-text'} style={{margin: 0}} controlId="title">
                                <Form.Check
                                    type="checkbox"
                                    label={'Является администратором'}
                                    name={'IS_ADMIN'}
                                    checked={profileFields?.isAdmin}
                                    onChange={() => setProfileFields({...profileFields, isAdmin: !profileFields.isAdmin})}
                                />
                            </Form.Group>
                        </Col>
                        }
                        <Form.Group className={'input-text'} style={{margin: 0}} controlId="title">
                            <Form.Control name='TOKEN' value={token} type='hidden' />
                            <Form.Control name='USER_ID' value={otherUserId} type='hidden' />
                            {otherUserId && <Form.Control name='ADMIN_ID' value={userId} type='hidden' />}
                        </Form.Group>
                        <Col md={6} xs ={8} style={{display:'flex',margin:'auto',justifyContent: 'center'}}>
                            <Button variant="success" type='submit' className={'submit-btn'}>
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
