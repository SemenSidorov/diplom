import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components'
import {useParams} from "react-router-dom";
import { useAsync } from "@umijs/hooks";

import {
    addEventInitialModel,
    DATE_FILTER_KEYS,
} from "../Constants";
import useDatePicker from "../useDatePicker";
import DetailEventsModal from "./DetailEventsModal";
import {getCookieByName} from "../Auth/Login";
import AddNewOrEvent from "../AddNewOrEvent";
import {addEvent, getEvents,} from "../Requests";
import DatePicker from "../DatePicker";



const EventsPosts = ({isMyEvents = false}) => {
    const token = getCookieByName('access_token');
    const [activeDateTab, setActiveDateTab] = useState(DATE_FILTER_KEYS.month);
    const [show, setShow] = useState(false);
    const [currentModalData, setCurrentModalData] = useState([]);


    const [dateFrom,
        dateTo,
        onPrevDateClick,
        onNextDateClick] = useDatePicker(activeDateTab, DATE_FILTER_KEYS);

    const [fields, setFields] = useState(addEventInitialModel);

    const handleClose = () => {
        setFields(addEventInitialModel)
        setShow(false)
    };
    const handleShow = () => setShow(true);


    const currentDateInterval = useMemo(() => {
        if (activeDateTab === DATE_FILTER_KEYS.day) {
            return dateFrom.format('DD MMMM YYYY')
        }
        const monthDifference = dateFrom.format(dateTo.format('MM')) - dateFrom.format('MM');
        return `${dateFrom.format(monthDifference > 0 ? 'DD MMM' : 'DD')}—${dateTo.format('DD MMM YYYY')}`
    }, [dateFrom, dateTo, activeDateTab]);


    const currentDatePickerContainerWidth = useMemo(() => (
        currentDateInterval.length < 19 ? 240 : 300
    ), [activeDateTab, currentDateInterval]);

    const { userId } = useParams();
    const isAdmin = getCookieByName('is_admin');
    const [showModal, setShowModal] = useState(false);

    const { data, loading, run } = useAsync(() => getEvents(isMyEvents,
                                                                dateFrom.format('DD-MM-YYYY 00:00:00'),
                                                                dateTo.format('DD-MM-YYYY 23:59:59'),
                                                                userId, token)
        , [dateFrom, dateTo]);

    const onFieldsChange = useCallback((value, name) => {
        setFields(fields.map(el => el.name === name ? {...el, value: value} : {...el}))
    },[fields]);

    const onSubmitAdd = useCallback(async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        await addEvent(formData);
        await run();
        setShowModal(false)
    }, []);
    return (
        <div style={{
            borderRadius: 30,
            textAlign: 'center',
            display: 'flex',
            flexDirection: "column",
            flexWrap: "wrap",
            color: '#fff'
        }}>
            {
                isAdmin && (
                    <SelectButton style={{ margin: '12px auto',width: 250, color: '#fff' }}
                                  onClick={() => {
                                    setShowModal(true)
                                    }}>
                        Добавить мероприятие
                    </SelectButton>
                )
            }
            <DatePicker setActiveDateTab={setActiveDateTab}
                        activeDateTab={activeDateTab}
                        currentDatePickerContainerWidth={currentDatePickerContainerWidth}
                        onPrevDateClick={onPrevDateClick}
                        currentDateInterval={currentDateInterval}
                        onNextDateClick={onNextDateClick}
            />
    {
        data && Object.values(data)?.map(el => {
            return <div style={{
                cursor: 'pointer',
                height: 134,
                borderRadius: 35,
                backgroundImage: `url(${el?.PREVIEW_PICTURE?.replace('C:/OpenServer/domains/', 'http://')})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                marginTop: '10px'
            }}
                        onClick={() => {
                            setCurrentModalData(el);
                            handleShow()}}

            >
                {el.NAME}
            </div>
        })
    }
            {
                showModal &&  <AddNewOrEvent onSubmit={onSubmitAdd}
                                             onFieldsChange={onFieldsChange}
                                             fields={fields}
                                             token={token}
                                             header={'Добавление новости'}
                                             userId={userId}
                                             show={showModal}
                                             handleClose={() => {
                                                 setShowModal(false)
                                             }}
                />
            }
            {show &&  <DetailEventsModal userId={userId}
                                         image={currentModalData.PREVIEW_PICTURE.replace('C:/OpenServer/domains/', 'http://')}
                                         eventId={currentModalData?.ID}
                                         text={currentModalData?.DETAIL_TEXT}
                                         token={token}
                                         header={currentModalData?.NAME}
                                         show={show}
                                         handleClose={handleClose} />}
</div>
    );
};


export const SelectButton = styled.div`
  background-color: #283593;
  font-size: 16px;
  min-width: 55px;
  cursor: pointer;
  font-weight: 500;
  margin: 0px 5px;
  line-height:1.5;
  margin-bottom:10px;
  color: #fff;
  text-align: center;
  padding: 8px;
  border-radius: 100px;
  align-self: center
`;


export default EventsPosts;


