import React from 'react';
import {DATE_FILTER_VALUES, timeTabs} from "./Constants";
import styled from "styled-components";
import {SelectButton} from "./EventsPosts";

const DatePicker = ({setActiveDateTab, activeDateTab, currentDatePickerContainerWidth, onPrevDateClick, currentDateInterval, onNextDateClick}) => {
    return (
        <div>
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
        </div>
    );
};

export default DatePicker;

export const DatePickerContainer = styled.div`
     ${(props) => `display: flex;
     width: ${props.currentWidth}px;
     height: 35px; 
     margin: auto;
     border: 1px solid #D9D9D9;
     border-radius: 10px; 
     justify-content: space-between;
     margin-top: 10px;`}
`;

export const DatePickerClickBoxes = styled.div`
 ${(props) => `
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


