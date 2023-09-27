import { Button, Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../axiosConfig";
import './AddTeam.css';

const AddTeam = ({routes}) => {

    const [route, setRoute] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [team, setTeam] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        let delivery = {
            routename: route,
            vehicle: vehicle,
            team: team,
            stat: 'not reached depot'
        }
        const response = axios.post('/delivery', delivery).then((res) => {
            console.log(res);
            setRoute('');
            setVehicle('');
            setTeam('');
        }).catch((err) => console.log(err));
    }

    return <Card className="assign_container">
        <h1 className="assign_heading">Assign delivery</h1>
        <form className="assign_form" onSubmit={handleClick}>
            <FormControl className="form_control" sx={{margin: '10px', width: 250}} required>
                <InputLabel id="route">Route</InputLabel>
                <Select labelId="route" id="routename" value={route} onChange={(e) => setRoute(e.target.value)}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    {routes?.length>0 && routes.map((ro) => {
                        return (
                            <MenuItem value={ro.route}>{ro.route}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl className="form_control" sx={{margin: '10px', width: 250}} required>
                <InputLabel id="vehicle">Vehicle</InputLabel>
                <Select labelId="vehicle" id="vehiclename" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value='Van 1'>Van 1</MenuItem>
                    <MenuItem value='Van 2'>Van 2</MenuItem>
                    <MenuItem value='Van 3'>Van 3</MenuItem>
                    <MenuItem value='Van 4'>Van 4</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="form_control" sx={{margin: '10px', width: 250}} required>
                <InputLabel id="team">Security Team</InputLabel>
                <Select labelId="team" id="teamname" value={team} onChange={(e) => setTeam(e.target.value)}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value='Security Team 01'>Security Team 01</MenuItem>
                    <MenuItem value='Security Team 02'>Security Team 02</MenuItem>
                </Select>
            </FormControl>
            <Button sx={{width:200, margin: '10px'}} variant="contained" color="primary" type="submit">Assign</Button>
        </form>
    </Card>
}

export default AddTeam;