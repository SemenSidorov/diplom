import React, {useCallback, useMemo} from 'react';
import {Button, Col, Form, Modal} from "react-bootstrap";
import ModalContainer from "./ModalContainer";
import moment from "moment";

const AddNewOrEvent = ({onFieldsChange, userId,fields, header, show, handleClose, token, onSubmit, newsId } : any) => {

    return (
            <ModalContainer header={header} show={show} handleClose={handleClose}>
                <Form id={'form'} onSubmit={onSubmit} >
                    <Modal.Body style={{background: 'rgb(235, 237, 240)'}}>
                        {
                            fields.map(el => (
                                <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                                    <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>{el.title}</div>
                                    {
                                        el.type === 'input' || el.type === 'textarea' ? <Form.Group className={'input-text'} style={{margin: 0, height: 'auto'}} controlId="title">
                                            <Form.Control name={el.name}
                                                          as={el.type}
                                                          type={el.type}
                                                          value={el.value}
                                                          onChange={(e) => {
                                                              onFieldsChange(e.target.value, el.name)
                                                          }}
                                                          placeholder="Введите название новости"
                                            />
                                        </Form.Group> : el.type === 'date' ?  <Form.Group className={'input-text'} style={{margin: 0}} controlId="title">
                                                <Form.Control onChange={(e) => {
                                                                    onFieldsChange(e.target.value, el.name)
                                                                }}
                                                              name={el.name}
                                                              value={moment(el.value).format("YYYY-MM-DD")}
                                                              type='date' />
                                        </Form.Group>:   <Form.Group>
                                            <Form.File
                                                type="file"
                                                name={el.name}
                                                id={'inputGroupFile01'}
                                                label={el.value}
                                                multiple={el.multiple}
                                                data-browse="Выбрать файл"
                                                onChange={(e) => {
                                                    // @ts-ignore
                                                    const value = el.multiple ? Object.values(e.target.files).map(el => el.name).join(', ') : e.target.files[0].name;
                                                    onFieldsChange(value, el.name)
                                                }}
                                                custom
                                            />
                                        </Form.Group>
                                    }
                                </Col>

                            ) )
                        }
                    </Modal.Body>
                    <Form.Group className={'input-text'} style={{margin: 0}} controlId="title">
                        <Form.Control name='TOKEN' value={token} type='hidden' />
                        <Form.Control name='USER_ID' value={userId} type='hidden' />
                        { newsId &&<Form.Control name='NEWS_ID' value={newsId} type='hidden' /> }
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            handleClose();
                        }}>
                            Закрыть
                        </Button>
                        <Button variant="success" type="submit">
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Form>
            </ModalContainer>
    );
};

export default AddNewOrEvent;
