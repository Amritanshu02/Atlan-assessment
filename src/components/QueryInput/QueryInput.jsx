import React, { useState } from 'react';
import "./QueryInput.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import DemoTable from '../DemoTable/DemoTable';
import { rows } from "../../data";
import QueryResult from '../QueryResult/QueryResult';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

function QueryInput() {

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

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
                    <label>Unsure about your query? Select from our predefined Queries!</label>

                    <Accordion className="accordion" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Predefine Query 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <p className="demo-query"><b>Query:</b> INSERT INTO Employee VALUES(1111,'Dipak','Bera','dipakbera@gmail.com','1994-11-22');</p>
                                <DemoTable />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="accordion" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Predefine Query 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <p className="demo-query"><b>Query:</b> SELECT * FROM Employee;</p>
                                <DemoTable />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="accordion" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Predefine Query 3</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <p className="demo-query"><b>Query:</b> SELECT * FROM Account ORDER BY CurBal;</p>
                                <DemoTable />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>


                <QueryResult data={tableData} />


            </div>
        </div>
    );
}

export default QueryInput;