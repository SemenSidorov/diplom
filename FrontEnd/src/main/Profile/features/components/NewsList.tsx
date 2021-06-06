import React from 'react';
import New from "./New";
import {Col, Container} from "react-bootstrap";
import { useAsync } from "@umijs/hooks";
import {UserTypes} from "../../../Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "../../../Auth/Login";

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
    const { data, loading } = useAsync<NewsListI>(() => getNews(userId, token) , []);

    return (
        <div style={{backgroundColor: '#ebedf0', height: "100%", width: "100%",  overflow: "auto"}}>
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <Col xl={10} xs={12}>
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
        </div>
    );
};

export default NewsList;
