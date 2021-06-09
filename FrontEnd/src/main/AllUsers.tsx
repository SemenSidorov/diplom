import React, {useEffect} from 'react';
import {Col} from "react-bootstrap";
import {UserTypes} from "./Constants";
import {useParams} from "react-router-dom";
import {getCookieByName} from "./Auth/Login";
import {useAsync} from "@umijs/hooks";
import {getAllUsers} from "./Requests";
import {NewsListI} from "./News/NewsList";

const AllUsers = () => {
    const { userId } : UserTypes = useParams();
    const token = getCookieByName('access_token');
    const isAdmin = getCookieByName('is_admin');

    const { data, loading, run } = useAsync<NewsListI>(() => getAllUsers(userId, token) , []);
    console.log(data)
    return (
        <Col md={9}>

        </Col>
    );
};

export default AllUsers;
