import { Button, Card, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "../axiosConfig";
import { useDispatch } from "react-redux";
import { addTokenInfo } from "../tokenSlicer";
import {useNavigate} from "react-router-dom";
import './Login.css';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        let userdata = {
            username: userName,
            password: password
        }
        console.log(document.cookie);
        const response = axios.post('/login', userdata).then((res) => {
            const role = res.data.role;
            const username = res.data.username;
            dispatch(addTokenInfo({role, username}));
            if(role=='admin') {
                navigate('/home');
            } else {
                navigate('/teamview');
            }
        }).catch((err) => alert(err.response.data.error));
    }

    return <div>
        <Card className="container">
            <h2>Welcome!</h2>
            <form className="form" onSubmit={handleClick}>
                <TextField className="field" label="Username" variant="standard" value={userName} onChange={(e) => setUserName(e.target.value)} required></TextField>
                <TextField className="field" label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required></TextField>
                <Button className="field" variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </Card>
    </div>
}

export default Login;