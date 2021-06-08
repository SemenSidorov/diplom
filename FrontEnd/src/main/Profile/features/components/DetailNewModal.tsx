import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useAsync} from "@umijs/hooks";
import {NewsListI} from "./NewsList";

const getNew = (userId: string, token: any, id: string): Promise<NewsListI> => {
    return fetch(`http://backend/BackEnd/news/detail.php?ID=${id}&TOKEN=${token}&PAGEN=1&USER_ID=${userId}`).then(res => res.json());
};

const DetailNewModal = ({show, handleClose,userId, token, header,text, id, previewPicture}) => {
    const { data, loading, run } = useAsync<any>(() => getNew(userId, token,id) , []);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data?.NAME}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{margin: 'auto', width: '50%', float: 'left', marginRight: 15, borderRadius: 25}} src={previewPicture}/>
                {data?.DETAIL_TEXT}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailNewModal;
