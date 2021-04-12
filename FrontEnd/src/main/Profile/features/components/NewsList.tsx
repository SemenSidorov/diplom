import React from 'react';
import New from "./New";
import {Col, Container} from "react-bootstrap";
const NewsList = () => {
    return (
        <div style={{backgroundColor: '#ebedf0', height: "100%", width: "100%",  overflow: "auto"}}>
            <Container style={{display: 'flex'}}>
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
