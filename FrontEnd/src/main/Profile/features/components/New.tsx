import React, {useState} from 'react';
import {NewI} from "./NewsList";
import {SelectButton} from "../../../EventsPosts";
import DetailNewModal from "./DetailNewModal";

const New = ({NAME, ID, PREVIEW_TEXT, PREVIEW_PICTURE}: NewI) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div style={{backgroundColor: "#FFF",width: '100%',marginTop: 5}}>
            <div style={{display: 'flex'}}>
                <div style={{textAlign: "left", padding: 10}}>
                    {NAME}
                    <br/>
                    {PREVIEW_TEXT}
                </div>
                <SelectButton onClick={() => handleShow()} style={{ margin: '12px 12px 12px auto',width: 140, color: '#fff', height: 30, padding: 2 }}>
                    Посмотреть
                </SelectButton>
            </div>
            <div style={{display: "flex",justifyContent: 'center',width: "100%"}}>
                <img
                    className="d-block w-100"
                    src={PREVIEW_PICTURE.replace('C:/OpenServer/domains/', 'http://')} //todo src на картинки
                    alt="First slide"
                />
            </div>
            <DetailNewModal text={PREVIEW_TEXT}
                            header={NAME}
                            previewPicture={PREVIEW_PICTURE.replace('C:/OpenServer/domains/', 'http://')}
                            show={show}
                            handleClose={handleClose}
            />
        </div>
    );
};

export default New;
