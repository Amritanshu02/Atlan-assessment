import React, { useState } from 'react';
import "./QueryInput.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { rows } from "../../data";
import QueryResult from '../QueryResult/QueryResult';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function QueryInput() {
    const [demoQuery, setdemoQuery] = React.useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [tableData, setTableData] = useState([
        {
            id: 1,
            name: "Pizza",
            calories: 229,
            fat: 16.0,
            carbs: 30,
            protein: 4.0
        },
        {
            id: 2,
            name: "Burger",
            calories: 300,
            fat: 20.0,
            carbs: 27,
            protein: 6.0
        },
    ]);

    const addRandomData = () => {
        const randomIndex = Math.floor(Math.random() * rows.length);
        const randomItem = rows[randomIndex];
        setTableData([...tableData, randomItem]);

        // Show the alert
        setShowAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    return (
        <div className="container">
            <div className="main-container">


                {showAlert && <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Query ran successfully!
                    </Alert>
                </Snackbar>}


                <h1 className="title">Welcome to Query Analyzer</h1>


                <Box className="box">
                    <TextField id="outlined-basic" label="Enter your query here" variant="outlined" />
                    <Button variant="contained" onClick={addRandomData}>Analyze</Button>
                </Box>


                <div className="predefined-data-section">
                    <p>Unsure about your query? Select from our predefined Queries!</p>

                    <Box className="dropdown-menu">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Predefined Queries</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={demoQuery}
                                label="Predefined Queries"
                                onChange={addRandomData}
                            >
                                <MenuItem value={10}>INSERT INTO Employee VALUES(1111,'Dipak','Bera','dipakbera@gmail.com','1994-11-22');</MenuItem>
                                <MenuItem value={20}>SELECT * FROM Account ORDER BY CurBal DESC;</MenuItem>
                                <MenuItem value={30}>SELECT COUNT(AType) FROM Account GROUP BY AType;</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>


                <QueryResult data={tableData} />


            </div>
        </div>
    );
}

export default QueryInput;