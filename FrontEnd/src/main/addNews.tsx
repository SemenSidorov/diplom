import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const initialNewData = {
    title: '',
    description: '',
    files: [],
}

const AddNews = ({userId,onAdd, header, show, handleClose, token }) => {

    const [newData, setNewData] = useState(initialNewData);

    return (
        <Modal show={show} onHide={() => {
            setNewData(initialNewData);
            handleClose()
        }} size='lg' style={{marginTop: '15%'}} >
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: 'rgb(235, 237, 240)'}}>
                <Form>
                        <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                            <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Название новости</div>
                            <Form.Group className={'input-text'} style={{margin: 0}} controlId="formBasicEmail">
                                <Form.Control type="email" value={newData.title} onChange={(e) => setNewData({...newData, title: e.target.value}) } placeholder="Введите название новости" />
                            </Form.Group>
                        </Col>
                        <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                            <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Описание</div>
                            <Form.Group className={'input-text'} style={{margin: 0, height: 'auto'}} controlId="formBasicEmail">
                                <Form.Control type="email" as="textarea" rows={4} value={newData.description} onChange={(e) => setNewData({...newData, description: e.target.value}) } placeholder="Введите название новости" />
                            </Form.Group>
                        </Col>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setNewData(initialNewData);
                    handleClose();
                }}>
                    Закрыть
                </Button>
                <Button variant="success" onClick={async () => {
                    const data = fetch(`http://backend/BackEnd/admin/add_news.php?USER_ID=${userId}&TOKEN=${token}&NAME=${newData.title}&PREVIEW_TEXT=${newData.description}&DETAIL_TEXT=${newData.description}`);
                    setNewData(initialNewData);
                    onAdd()
                    handleClose();
                }}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNews;
