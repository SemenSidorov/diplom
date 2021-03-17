import React from 'react';
import first from "../../../../images/first.png";

const New = () => {
    return (
        <div style={{backgroundColor: "#FFF",width: '100%',marginTop: 5}}>
            <div style={{textAlign: "left", padding: 10}}>
                Байден считает Путина убийцей и надеется, что он ответит за вмешательство в выборы президента США!
                Байден, только не мсти в российских подъездах, пожалуйста 🥺
            </div>
            <div style={{display: "flex",justifyContent: 'center',width: "100%"}}>
                <img
                    className="d-block w-100"
                    src={first}
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
