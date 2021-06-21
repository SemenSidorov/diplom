import React, {useCallback, useEffect, useState} from 'react';
import {NewI} from "./NewsList";
import {SelectButton} from "../Events/EventsPosts";
import DetailNewModal, { getNew } from "./DetailNewModal";
import AddNewOrEvent from '../AddNewOrEvent';
import { addNewInitialModel } from '../Constants';
import { useAsync } from '@umijs/hooks';
import { updateNews } from '../Requests';



const New = ({NAME, ID,userId, token, PREVIEW_TEXT, PREVIEW_PICTURE, run}: NewI) => {
    const { data, loading } = useAsync<any>(() => getNew(userId, token, ID) , []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEditModal, setShowEditModal] = useState(false);


    const [fields, setFields] = useState(addNewInitialModel);
    useEffect(() => {
        if(data) {
            setFields(addNewInitialModel.map(el => ({...el, value: (el.name !== 'ADD_PICTURES[]' && el.name !== 'PREVIEW_PICTURE') ? data[el?.name] : '' })))   
        }
    }, [data])
    const handleCloseEditModal = () => {
        setShowEditModal(false)
    
    };
    const handleShowEditModal = () => setShowEditModal(true);
    

    const onFieldsChange = useCallback((value, name) => {
        setFields(fields.map(el => el.name === name ? {...el, value: value} : {...el}))
    },[fields]);

    return (
        <div style={{backgroundColor: "#FFF",width: '100%',marginTop: 20, borderRadius: 20, padding: '0px 10px 30px 10px'}}>
            <div>
            <div style={{display: 'flex', textAlign: "left", padding: 10, alignItems: 'center'}}>
                    <SelectButton onClick={() => handleShowEditModal()} style={{ margin: '12px 12px 12px auto',width: 140, color: '#fff', height: 30, padding: 2 }}>
                            Редактировать
                    </SelectButton>
                    <SelectButton onClick={() => handleShow()} style={{ margin: '12px 12px 12px',width: 140, color: '#fff', height: 30, padding: 2 }}>
                        Посмотреть
                    </SelectButton>
                </div>
            <div style={{
                textAlign: 'center',
                padding: 5,
                wordBreak: 'break-all'
            }}>{NAME}</div>
              
                <div style={{padding: 10}}>
                    {PREVIEW_TEXT}
                </div>
            </div>
            <div style={{display: "flex",justifyContent: 'center',width: "100%"}}>
                <img
                    className="d-block w-100"
                    src={PREVIEW_PICTURE.replace('W:/domains/', 'http://')} //todo src на картинки
                    alt="First slide"
                />
            </div>
            {
                show && <DetailNewModal text={PREVIEW_TEXT}
                                        header={NAME}
                                        id={ID}
                                        userId={userId}
                                        token={token}
                                        previewPicture={PREVIEW_PICTURE.replace('W:/domains/', 'http://')}
                                        show={show}
                                        handleClose={handleClose}
                />
            }
            {
                showEditModal && <AddNewOrEvent
                                    newsId={ID}
                                    onSubmit={async (event) => {
                                        event.preventDefault();
                                        const form = event.currentTarget;
                                        const formData = new FormData(form);
                                        await updateNews(formData);
                                        await run();
                                        setShowEditModal(false)
                                    }}
                                    onFieldsChange={onFieldsChange}
                                    fields={fields}
                                    token={token}
                                    header={'Редактирование новости'}
                                    userId={userId}
                                    show={handleShowEditModal}
                                    handleClose={handleCloseEditModal}
                />
            }
        </div>
    );
};

export default New;
