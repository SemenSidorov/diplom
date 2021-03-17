import React, {useMemo} from 'react';
import Register from "./Register";
import Login from "./Login";
import { useParams } from 'react-router-dom'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export interface AuthInterFace {
    isRegister?: string
}

const AuthContainer = () => {

    const { isRegister } : AuthInterFace = useParams()

    const formControlUi = useMemo(() => {
        if (isRegister === 'register') {
            return <Register/>
        }

        return <Login/>
    }, [isRegister])

    return (
        <div>
            <Header isAuth={false}/>
            {formControlUi}
            {/*<Footer/>*/}
        </div>
    );
};

export default AuthContainer;
