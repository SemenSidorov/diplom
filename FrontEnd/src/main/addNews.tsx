import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const initialNewData = {
    title: '',
    description: '',
    previewText: '',
    files: [],
}

const AddNews = ({userId,onAdd, header, show, handleClose, token }) => {

    const [newData, setNewData] = useState(initialNewData);
    const [fileName, setFileName] = useState("Загрузите файл...");
    const [fileNames, setFileNames] = useState('');

    return (
        <Modal show={show} onHide={() => {
            setNewData(initialNewData);
            handleClose()
        }} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Form id={'form'} onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const formData = new FormData(form);
                await fetch('http://backend/BackEnd/admin/add_news.php', {
                        body: formData,
                        method: "post",
                    }
                )
                handleClose()
            }} >
                <Modal.Body style={{background: 'rgb(235, 237, 240)'}}>
                            <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                                <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Название новости</div>
                                <Form.Group className={'input-text'} style={{margin: 0}} controlId="title">
                                    <Form.Control name='NAME' value={newData.title} onChange={(e) => setNewData({...newData, title: e.target.value}) } placeholder="Введите название новости" />
                                    <Form.Control name='TOKEN' value={token} type='hidden' />
                                    <Form.Control name='USER_ID' value={userId} type='hidden' />
                                </Form.Group>
                            </Col>
                            <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                                <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Краткое описание новости</div>
                                <Form.Group className={'input-text'} style={{margin: 0, height: 'auto'}} controlId="formBasicEmail">
                                    <Form.Control as="textarea"
                                                  name='PREVIEW_TEXT'
                                                  rows={4}
                                                  value={newData.previewText}
                                                  onChange={(e) => setNewData({...newData, previewText: e.target.value}) }
                                                  placeholder="Введите краткое описание новости"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                                <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Детальное описание новости</div>
                                <Form.Group className={'input-text'} style={{margin: 0, height: 'auto'}} controlId="formBasicEmail">
                                    <Form.Control as="textarea"
                                                  name='DETAIL_TEXT'
                                                  rows={4}
                                                  value={newData.description}
                                                  onChange={(e) => setNewData({...newData, description: e.target.value}) }
                                                  placeholder="Введите название новости"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                                <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Картинка для отображения в ленте</div>
                                <Form.Group>
                                    <Form.File
                                        type="file"
                                        name='PREVIEW_PICTURE'
                                        id="inputGroupFile01"
                                        label={fileName}
                                        data-browse="Выбрать файл"
                                        onChange={(e) => {
                                            setFileName(e.target.files[0].name)
                                        } }
                                        custom
                                    />
                                </Form.Group>
                            </Col>
                    <Col md={12} xl={12} style={{margin: 'auto', background: '#fff', padding: 9, marginBottom: 5, borderRadius: 5}}>
                        <div style={{textAlign: 'left', fontWeight: 400, marginBottom: 10}}>Картинки для детального отображения</div>
                        <Form.Group>
                            <Form.File
                                type="file"
                                name='ADD_PICTURES[]'
                                id="inputGroupFile01"
                                label={fileNames}
                                data-browse="Перетащите или выберите файлы"
                                multiple
                                onChange={(e) => {
                                    // @ts-ignore
                                    setFileNames(Object.values(e.target.files).map(el => el.name).join(', '))
                                } }
                                custom
                            />
                        </Form.Group>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setNewData(initialNewData);
                        handleClose();
                    }}>
                        Закрыть
                    </Button>
                    <Button variant="success" type="submit">
                        Добавить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddNews;
