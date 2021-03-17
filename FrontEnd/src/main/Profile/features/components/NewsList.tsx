import React from 'react';
import New from "./New";
import {Col, Container} from "react-bootstrap";
const NewsList = () => {
    return (
        <div style={{backgroundColor: '#ebedf0', height: "100%", width: "100%",  overflow: "auto"}}>
            <Container style={{display: 'flex'}}>
                {
                    window.screen.width > 1025 && <Col md={2}>
                        <div>
                            <div>
                                Моя страница
                            </div>
                            <div>
                                Новости
                            </div>
                            <div>
                               Сообщеия
                            </div>
                            <div>
                                Меропрития
                            </div>
                            <div>
                                Настройки
                            </div>
                        </div>
                    </Col>
                }
                <Col xl={10} xs={12}>
                    <New />
                    <New />
                    <New />
                    <New />
                </Col>

            </Container>
        </div>
    );
};

export default NewsList;
