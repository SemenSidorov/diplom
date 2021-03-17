import React from 'react';
import New from "./New";
import {Col, Container} from "react-bootstrap";
const NewsList = () => {
    return (
        <div style={{backgroundColor: '#DCDCDC', height: "100%", width: "100%",  overflow: "auto"}}>
            <Col md={12} style={{display: 'flex'}}>
                <Col md={4}>
                    lol
                </Col>
                <Col md={8}>
                    <Col >
                        <New />
                    </Col>
                    <Col >
                        <New />
                    </Col>
                    <Col>
                        <New />
                    </Col>
                    <Col >
                        <New />
                    </Col>
                    <Col >
                        <New />
                    </Col>

                </Col>
            </Col>
        </div>
    );
};

export default NewsList;
