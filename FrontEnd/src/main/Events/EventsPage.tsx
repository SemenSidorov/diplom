import React from 'react';
import EventsPosts from "./EventsPosts";
import Col from "react-bootstrap/Col";

const EventsPage = () => {
    return (
        <Col md={9}>
            <EventsPosts />
        </Col>
    );
};

export default EventsPage;
