import React from 'react';
import {Button, Carousel, Modal} from "react-bootstrap";
import {useAsync} from "@umijs/hooks";
import {NewsListI} from "./NewsList";
import {ClockLoader} from "react-spinners";

export const getNew = (userId: string, token: any, id: string): Promise<NewsListI> => {
    return fetch(`http://backend/BackEnd/news/detail.php?ID=${id}&TOKEN=${token}&PAGEN=1&USER_ID=${userId}`).then(res => res.json());
};

const DetailNewModal = ({show, handleClose,userId, token, header,text, id, previewPicture}) => {
    const { data, loading } = useAsync<any>(() => getNew(userId, token,id) , []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data?.NAME}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading ? <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ClockLoader color={'#283593'} loading={loading} />
                    </div> : <div>
                                <Carousel >
                                    {
                                        data?.ADD_PICTURES?.map(el => <Carousel.Item key={el?.VALUE}>
                                                <img
                                                    className="d-block w-100"
                                                    src={el?.VALUE?.replace('W:/domains/', 'http://')}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                        )
                                    }
                                </Carousel>
                                <div style={{background: 'rgb(235, 237, 240)', marginTop: 10, padding: 10, borderRadius: 18}}>
                                    {data?.DETAIL_TEXT}
                                </div>
                        </div>
                }
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
