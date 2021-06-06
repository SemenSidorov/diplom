import React, {useEffect, useMemo, useState} from 'react';
import Avatar from '../images/first.png';
import styled from 'styled-components'
import {useParams} from "react-router-dom";
import { useAsync } from "@umijs/hooks";

import {DATE_FILTER_KEYS, DATE_FILTER_VALUES, timeTabs, UserTypes} from "./Constants";
import useDatePicker from "./useDatePicker";
import DetailEventsModal from "./Profile/features/components/DetailEventsModal";
import {getCookieByName} from "./Auth/Login";


//todo перенести в папку с методами
const getEvents = (isMyEvents, dateFrom, dateTo ,userId, token) => {
    return fetch(`http://backend/BackEnd/events/all.php?METHOD=${isMyEvents ? 'get_for_user' : ''}&TOKEN=${token}&DATE_START=${dateFrom}&DATE_EXP=${dateTo}&USER_ID=${userId}`).then(res => res.json());
};

const EventsPosts = ({isMyEvents = false}) => {
    const token = getCookieByName('access_token');
    const [activeDateTab, setActiveDateTab] = useState(DATE_FILTER_KEYS.day);
    const [show, setShow] = useState(false);
    const [currentModalData, setCurrentModalData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dateFrom,
        dateTo,
        onPrevDateClick,
        onNextDateClick] = useDatePicker(activeDateTab, DATE_FILTER_KEYS);



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

    const { data, loading } = useAsync(() => getEvents(isMyEvents, dateFrom.format('DD-MM-YYYY'), dateTo.format('DD-MM-YYYY'), userId, token) , [dateFrom, dateTo]);

    return (
        <div style={{
            borderRadius: 30,
            textAlign: 'center',
            display: 'flex',
            flexDirection: "column",
            flexWrap: "wrap",
            color: '#fff'
        }}>
    <SelectButtonContainer>
        {
            timeTabs.map(el => <SelectButton key={el.name}
                                             onClick={() => setActiveDateTab(el.id)}
                                             style={el.name !== DATE_FILTER_VALUES[activeDateTab]
                                                 ? { backgroundColor: '#F0F2F4', color: '#000' }
                                                 : {} }
            >
                {el.name}
            </SelectButton>)
        }
    </SelectButtonContainer>
    <DatePickerContainer currentWidth={currentDatePickerContainerWidth}>
        <DatePickerClickBoxes isLeft onClick={onPrevDateClick}>
            <img src="../../../Icons/webview-back.svg" alt=""/>
        </DatePickerClickBoxes>
        <div style={{
            color: '#000',
            fontWeight: 500,
            padding: '5px 0px',
        }}>
            {currentDateInterval}
        </div>
        <DatePickerClickBoxes onClick={onNextDateClick}>
            {/*<img style={} src/>*/}
        </DatePickerClickBoxes>
    </DatePickerContainer>
    {
        data?.map(el => {
            return <div style={{
                height: 134,
                borderRadius: 35,
                backgroundImage: `url(${Avatar})`,
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
    <DetailEventsModal text={currentModalData?.PREVIEW_TEXT} token={token} header={currentModalData?.NAME} show={show} handleClose={handleClose} />
</div>
    );
};


export const DatePickerContainer = styled.div`
     ${props => `display: flex;
     width: ${props.currentWidth}px;
     height: 35px; 
     margin: auto;
     border: 1px solid #D9D9D9;
     border-radius: 10px; 
     justify-content: space-between;
     margin-top: 10px;`}
`;

export const DatePickerClickBoxes = styled.div`
 ${props => `
    align-self: center;
    color: black;
    font-weight: 500;
    cursor: pointer;
    height: 100%;
    padding: 6px 18.5px;
    border-right: ${props.isLeft ? ' 1px solid #D9D9D9' : ''} ;
    border-left: ${!props.isLeft ? '1px solid #D9D9D9' : ''}
  `}
`;
export const SelectButtonContainer = styled.div`
    align-self: center;
    display: flex;
    justify-content: center;
    margin-top: 15px;
`;

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


