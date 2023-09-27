import React, { useEffect, useRef } from "react";
import AddRoute from "./AddRoute";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const tokenLog = useSelector(
        (state) => state?.token.token
    ); 
    const navigate = useNavigate();

    return <div>
        {(tokenLog?.role == 'admin') ? <>
            <Header title="View Assigned" />
            <AddRoute/>
            </> : <>
                <h1>Page not found!!!!</h1>
                </>}
                </div>
}

export default Home;