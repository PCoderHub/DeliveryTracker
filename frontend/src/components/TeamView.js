import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axiosConfig";
import Header from "./Header";
import { Button, Card, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TeamView = () => {

    const tokenLog = useSelector(
        (state) => state?.token.token
    );
    const [deliveries, setDeliveries] = useState();
    const [open, setOpen] = useState(false);
    const [deli, setDeli] = useState();
    const [stat, setStat] = useState('');
    const teams = {
        steam01: 'Security Team 01',
        steam02: 'Security Team 02'
    }

    const handleClickOpen = (del) => {
        setOpen(true);
        setDeli(del);
        setStat(del.status);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const team = Object.keys(teams).filter((tea) => tea == tokenLog.username);
    const steam = teams[team[0]];

    const getDeliveries = () => {
        const response = axios.get('/deliverystatus', {
            params : {team: steam}
        }).then((res) => setDeliveries(res.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        getDeliveries();
    }, [])

    const handleSave = (e) => {
        e.preventDefault();
        let data = {
            stat: stat
        }
        const response = axios.put(`/deliverystatus/${deli.id}`, data).then((res) => {
            handleClickClose();
            getDeliveries();
        }).catch((err) => console.log(err));
    }

    return <div>
        {tokenLog.role == 'steam' ? <>
        <Header />
        <h1 className="view_heading">Delivery Status</h1>
        {deliveries?.length>0 && deliveries.map((del) => {
            return (
                <Card className="view_card">
                    <p className="para">Route : {del.route}</p>
                    <p className="para">Vehicle : {del.vehicle}</p>
                    <p className="para">Status : {del.status}</p>
                    <Button onClick={() => {handleClickOpen(del)}}>Edit</Button>
                    <Dialog fullWidth open={open} onClose={handleClickClose}>
                        <DialogTitle>Update Status</DialogTitle>
                        <DialogContent>
                        <form className="assign_form" onSubmit={handleSave}>
                            <FormControl sx={{margin: '10px', width: 250}} required>
                                <InputLabel id="team">Status</InputLabel>
                                <Select labelId="team" id="teamname" value={stat} onChange={(e) => setStat(e.target.value)}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value='not reached depot'>not reached depot</MenuItem>
                                    <MenuItem value='reached depot'>reached depot</MenuItem>
                                    <MenuItem value='out of depot'>out of depot</MenuItem>
                                    <MenuItem value='on the route'>on the route</MenuItem>
                                    <MenuItem value='out of service'>out of service</MenuItem>
                                    <MenuItem value='on destination'>on destination</MenuItem>
                                </Select>
                            </FormControl>
                            <Button sx={{width:200, margin: '10px'}} type="submit">save</Button>
                        </form>
                        </DialogContent>
                    </Dialog>
                </Card>
            );
        })}
        </> : <>
                <h1>Page not found!!!!</h1>
                </>}
    </div>
}

export default TeamView;