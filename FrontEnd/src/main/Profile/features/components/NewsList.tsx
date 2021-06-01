import React from 'react';
import New from "./New";
import {Col, Container} from "react-bootstrap";
import { useAsync } from "@umijs/hooks";

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
const getNews = (): Promise<NewsListI> => {
    return fetch(`http://backend/BackEnd/news/news.php?PAGEN=1&USER_ID=13`).then(res => res.json());
};


const NewsList = () => {
    const { data, loading, timer, run } = useAsync<NewsListI>(() => getNews() , []);

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
                    !loading && data?.values.map((el) => <New NAME={el.NAME}
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
