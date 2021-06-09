import React, {useCallback, useState} from 'react';
import New from "./New";
import {Col, Container, Form} from "react-bootstrap";
import { useAsync } from "@umijs/hooks";
import {addNewInitialModel, UserTypes} from "../Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "../Auth/Login";
import {SelectButton} from "../Events/EventsPosts";
import {ClockLoader} from "react-spinners";
import AddNewOrEvent from "../AddNewOrEvent";
import {addNew, getNews} from "../Requests";

export interface NewI {
    ID: string
    NAME: string
    PREVIEW_PICTURE: string
    PREVIEW_TEXT: string
    userId: string
    token?: string
}

export interface NewsListI {
    count_news_all: string
    this_page: number
    values: Array<NewI>
}


const NewsList = () => {
    const { userId } : UserTypes = useParams();
    const token = getCookieByName('access_token');
    const isAdmin = getCookieByName('is_admin');

    const { data, loading, run } = useAsync<NewsListI>(() => getNews(userId, token) , []);
    const [showModal, setShowModal] = useState(false);

    const [fields, setFields] = useState(addNewInitialModel);

    const onFieldsChange = useCallback((value, name) => {
        setFields(fields.map(el => el.name === name ? {...el, value: value} : {...el}))
    },[fields]);

    const handleClose = useCallback(() => {
        setShowModal(false)
    }, []);

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        await addNew(formData);
        await run();
        setShowModal(false)
    }, []);


    return (
        <div style={{backgroundColor: '#ebedf0', height: "100%", width: "100%",  overflow: "auto"}}>
            <Container style={{display: 'flex', padding: 0, justifyContent: 'center'}}>
                <Col xl={12} xs={12}>
                    {
                        isAdmin && <SelectButton style={{ margin: '12px auto',width: 250, color: '#fff' }} onClick={() => {
                            setShowModal(true)
                        }}>
                            Добавить новость
                        </SelectButton>
                    }
                    {
                        data?.values?.length === 0 && <div style={{height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{display: 'flex', justifyContent: 'center', fontSize: 20, color: '#000', background: '#fff', width: '100%', height: 120, borderRadius: 10, alignItems: 'center' }}>
                                Новостей нет
                            </div>
                        </div>
                    }
                    {
                        loading && <div style={{height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <ClockLoader color={'#283593'} loading={loading} />
                        </div>
                    }
                    {
                    !loading && data?.values?.map((el) => <New
                                                              NAME={el.NAME}
                                                              ID={el.ID}
                                                              userId={userId}
                                                              token={token}
                                                              PREVIEW_PICTURE={el.PREVIEW_PICTURE}
                                                              PREVIEW_TEXT={el.PREVIEW_TEXT}/> )
                    }
                </Col>
            </Container>
            {
                showModal && <AddNewOrEvent onSubmit={onSubmit}
                                            onFieldsChange={onFieldsChange}
                                            fields={fields}
                                            token={token}
                                            header={'Добавление новости'}
                                            userId={userId}
                                            show={showModal}
                                            handleClose={handleClose}
                />
            }
        </div>
    );
};

export default NewsList;
