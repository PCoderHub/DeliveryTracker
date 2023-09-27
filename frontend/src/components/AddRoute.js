import { Button, Card, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../axiosConfig";
import './AddRoute.css';
import AddTeam from "./AddTeam";

const AddRoute = () => {

    const [fromL, setFromL] = useState('');
    const [toL, setToL] = useState('');
    const [routes, setRoutes] = useState();
    const [open, setOpen] = useState(false);
    const regex = /^[A-Za-z]+$/;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const getRoutes = () => {
        const response = axios.get('/routes').then((res) => setRoutes(res.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        getRoutes();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if (regex.test(fromL) && regex.test(toL)) {
            let routeName = {
                fromL: fromL,
                toL: toL
            }
            const response = axios.post('/routes',routeName).then((res) => {
                console.log(res);
                getRoutes();
                setFromL('');
                setToL('');
            }).catch((err) => console.log(err));
        } else {
            alert('Input should not contain spaces, numbers or special characters');
        }
    }

    const handleDelete = (id) => {
        const response = axios.delete(`/routes/${id}`).then((res) => {
            console.log(res);
            getRoutes();
        }).catch((err) => console.log(err));
    }

    return <>
    <Card className="add_route">
        <h1 className="heading">Add new route</h1>
        <form className="route_form" onSubmit={handleClick}>
            <TextField className="loc_field" label="Depot" variant="standard" value={fromL} onChange={(e) => setFromL(e.target.value)} required></TextField>
            <TextField className="loc_field" label="Destination" variant="standard" value={toL} onChange={(e) => setToL(e.target.value)} required></TextField>
            <Button sx={{margin: '10px', width: 200}} variant="contained" color="primary" type="submit">Add Route</Button>
            <Button sx={{margin: '10px', width: 200}} variant="contained" color="primary" onClick={handleClickOpen}>View Routes</Button>
            <Dialog fullWidth open={open} onClose={handleClickClose}>
                <DialogTitle>Routes Added</DialogTitle>
                <DialogContent>
                {routes?.length > 0 && routes.map((route) => {
                return (
                    <div className="dialog_flex">
                        <p>{route.route}</p>
                        <Button onClick={() => handleDelete(route.id)}>Delete</Button>
                    </div>
                );
                })}
                </DialogContent>
            </Dialog>
        </form>
    </Card>
    <AddTeam routes={routes}/>
    </>
}

export default AddRoute;