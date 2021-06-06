import React, {useState} from 'react';
import New from "./New";
import {Col, Container} from "react-bootstrap";
import { useAsync } from "@umijs/hooks";
import {UserTypes} from "../../../Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "../../../Auth/Login";
import {SelectButton, SelectButtonContainer} from "../../../EventsPosts";
import AddNews from "../../../addNews";

export interface NewI {
    ID: string
    NAME: string
    PREVIEW_PICTURE: string
    PREVIEW_TEXT: string
}

interface NewsListI {
    count_news_all: string
    this_page: number
    values: Array<NewI>
}
//todo перенести в папку с методами
const getNews = (userId: string, token: any): Promise<NewsListI> => {
    console.log(userId)
    return fetch(`http://backend/BackEnd/news/news.php?TOKEN=${token}&PAGEN=1&USER_ID=${userId}`).then(res => res.json());
};


const NewsList = () => {
    const { userId } : UserTypes = useParams();
    const token = getCookieByName('access_token')
    const { data, loading, run } = useAsync<NewsListI>(() => getNews(userId, token) , []);
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{backgroundColor: '#ebedf0', height: "100%", width: "100%",  overflow: "auto"}}>
            <Container style={{display: 'flex', padding: 0, justifyContent: 'center'}}>
                <Col xl={10} xs={12}>
                    <SelectButton style={{ margin: '12px auto',width: 250, color: '#fff' }} onClick={() => {
                        setShowModal(true)
                    }}>
                        Добавить новость
                    </SelectButton>
                    {
                        loading && <div>
                            Загрузка...
                        </div>
                    }
                    {
                    !loading && data?.values?.map((el) => <New NAME={el.NAME}
                                                              ID={el.ID}
                                                              PREVIEW_PICTURE={el.PREVIEW_PICTURE}
                                                              PREVIEW_TEXT={el.PREVIEW_TEXT}/> )
                    }
                </Col>

            </Container>
            <AddNews onAdd={() => run()} token={token} header={'Добавление новости'} userId={userId} show={showModal} handleClose={() => {
                setShowModal(false)
            }}/>
        </div>
    );
};

export default NewsList;
