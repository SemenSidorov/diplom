import React from 'react';
import first from "../../../../images/first.png";
import {NewI} from "./NewsList";

const New = ({NAME, ID, PREVIEW_TEXT, PREVIEW_PICTURE}: NewI) => {
    return (
        <div style={{backgroundColor: "#FFF",width: '100%',marginTop: 5}}>
            <div style={{textAlign: "left", padding: 10}}>
                {NAME}
                <br/>
                {PREVIEW_TEXT}
            </div>
            <div style={{display: "flex",justifyContent: 'center',width: "100%"}}>
                <img
                    className="d-block w-100"
                    src={first} //todo src на картинки
                    alt="First slide"
                />
            </div>
            <div style={{height: 45, padding: 10}}>
                Лайки
            </div>
        </div>
    );
};

export default New;
