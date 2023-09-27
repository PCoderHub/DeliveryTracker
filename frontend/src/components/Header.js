import React from "react";
import './Header.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTokenInfo } from "../tokenSlicer";

const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (title) => {
        if (title == 'View Assigned') {
            navigate('/assigned');
        }
    }
    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(addTokenInfo({}));
        navigate('/');
    }

    return <div className="header">
    <div className="header-left">
        <h3>QWE Logistics</h3>
    </div>
    <div className="header-right">
        {(props?.title) && <Button className="button" variant="contained" color="secondary" onClick={() => handleClick(props.title)} >{props.title}</Button>}
        <Button className="button" variant="contained" color="secondary" onClick={handleLogout} >Logout</Button>
    </div>     
</div>
}

 export default Header;