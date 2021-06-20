import React, {useState} from 'react';
import {NewI} from "./NewsList";
import {SelectButton} from "../Events/EventsPosts";
import DetailNewModal from "./DetailNewModal";

const New = ({NAME, ID,userId, token, PREVIEW_TEXT, PREVIEW_PICTURE}: NewI) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div style={{backgroundColor: "#FFF",width: '100%',marginTop: 20, borderRadius: 20, padding: '0px 10px 30px 10px'}}>
            <div>
                <div style={{display: 'flex', textAlign: "left", padding: 10, alignItems: 'center'}}>
                    {NAME}
                    <SelectButton onClick={() => handleShow()} style={{ margin: '12px 12px 12px auto',width: 140, color: '#fff', height: 30, padding: 2 }}>
                        Посмотреть
                    </SelectButton>
                </div>
                <div style={{padding: 10}}>
                    {PREVIEW_TEXT}
                </div>
            </div>
            <div style={{display: "flex",justifyContent: 'center',width: "100%"}}>
                <img
                    className="d-block w-100"
                    src={PREVIEW_PICTURE.replace('C:/OpenServer/domains/', 'http://')} //todo src на картинки
                    alt="First slide"
                />
            </div>
            {
                show && <DetailNewModal text={PREVIEW_TEXT}
                                        header={NAME}
                                        id={ID}
                                        userId={userId}
                                        token={token}
                                        previewPicture={PREVIEW_PICTURE.replace('C:/OpenServer/domains/', 'http://')}
                                        show={show}
                                        handleClose={handleClose}
                />
            }
        </div>
    );
};

export default New;
