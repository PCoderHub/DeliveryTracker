import { Button, Card, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import './ViewAssigned.css';
import Header from "./Header";
import { useSelector } from "react-redux";

const ViewAssigned = () => {

    const [deliveries, setDeliveries] = useState();
    const [open, setOpen] = useState(false);
    const [deli, setDeli] = useState();
    const [team, setTeam] = useState('');
    const userdata = useSelector(
        (state) => state?.token.token
    );

    const handleClickOpen = (del) => {
        setOpen(true);
        setDeli(del);
        setTeam(del.team)
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const getDeliveries = () => {
        const response = axios.get('/delivery').then((res) => setDeliveries(res.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        getDeliveries();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        let data = {
            team: team
        }
        const response = axios.put(`/delivery/${deli.id}`, data).then((res) => {
            handleClickClose();
            getDeliveries();
        }).catch((err) => console.log(err));

    }

    const handleDelete = (del) => {
        const response = axios.delete(`/delivery/${del.id}`).then((res) => getDeliveries()).catch((err) => console.log(err));
    }

    return <div>
        {userdata.role == 'admin' ? <>
        <Header />
        <h1 className="view_heading">Delivery Status</h1>
        {deliveries?.length>0 && deliveries.map((del) => {
            return (
                <Card className="view_card">
                    <p className="para">Route : {del.route}</p>
                    <p className="para">Vehicle : {del.vehicle}</p>
                    <p className="para">Status : {del.status}</p>
                    <p className="para">Security Team : {del.team}</p>
                    <Button onClick={() => {handleClickOpen(del)}}>Edit</Button>
                    <Dialog fullWidth open={open} onClose={handleClickClose}>
                        <DialogTitle>Edit Delivery</DialogTitle>
                        <DialogContent>
                        <form className="assign_form" onSubmit={handleSave}>
                            <FormControl sx={{margin: '10px', width: 250}}>
                                <InputLabel id="team">Security Team</InputLabel>
                                <Select labelId="team" id="teamname" value={team} onChange={(e) => setTeam(e.target.value)}>
                                    <MenuItem value="dismiss"><em>Dismiss</em></MenuItem>
                                    <MenuItem value='Security Team 01'>Security Team 01</MenuItem>
                                    <MenuItem value='Security Team 02'>Security Team 02</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{width:200, margin: '10px'}} type="submit">save</Button>
                        </form>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={() => handleDelete(del)}>Delete</Button>
                </Card>
            );
        })}
        </> : <>
        <h1>Page not found!!!!</h1></>}
    </div>
}

export default ViewAssigned;