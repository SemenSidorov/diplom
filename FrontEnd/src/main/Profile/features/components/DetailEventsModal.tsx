import React from 'react';
import {Button, Modal} from "react-bootstrap";
import Avatar from '../../../../images/first.png';
import {getCookieByName} from "../../../Auth/Login";

const DetailEventsModal = ({ header, show, handleClose }) => {
    const token = getCookieByName('access_token');
    console.log(token)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{margin: 'auto', width: '50%', float: 'left', marginRight: 15, borderRadius: 25}} src={Avatar} alt=""/>
                Среди исследователей природы Николай Михайлович Пржевальский занимает особое место. В нем сочетались и первопроходец, открывавший неведомые земли, и географ-исследователь, всесторонне изучавший посещенные территории, и талантливый писатель, создававший увлекательные книги о своих путешествиях. Он был первым исследователем Центральной Азии, совершив с 1870 по 1885 гг. четыре экспедиции в этот труднодоступный регион.

                На выставке представлены книги и журнальные публикации о жизни и деятельности Н. М. Пржевальского. Среди них — биографический очерк 1890 года издания, составленный Н. Ф. Дубровиным, поэтическая хроника М. А. Энгельгардта «Николай Пржевальский: его жизнь и путешествия», вышедшая впервые в свет в 1891 г., и книга «В азиатских просторах», автор которой П. К. Козлов был учеником и другом Пржевальского.

                Также в экспозицию вошли труды Н. М. Пржевальского: «Монголия и страна тангутов», «От Кульджи за Тянь-Шань и на Лобнор», «Из Зайсана через Хами в Тибет», «От Кяхты на истоки Желтой реки».
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="success" onClick={async () => {
                    const data = fetch(`http://backend/BackEnd/events/subscribe.php?TOKEN=${token}&USER_ID=13&EVENT_ID=1`);
                    handleClose()
                }}>
                    Записаться
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailEventsModal;
