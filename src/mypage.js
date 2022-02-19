import React, { Fragment } from 'react';
import "./App.css";
import designStructure from "./design-structure.png";
import * as SUPPORT from "./supportfile";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';

import ResponsiveDrawer from './pagesection';
import { Divider, Grid } from '@mui/material';

class mypage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTask: "",
            inputSC: "AABCCC",
            rotationNo: 3,
            Output: "DDEFFF",
            InputCoinValue: "",
            AvailableCoins: [50, 20, 10, 5, 2, 1],
            InputAmount: 58,
            OutputCombinationCoins: []
        }
    }

    componentDidMount() {
        this.processSet(this.state.AvailableCoins, this.state.InputAmount);
    }


    processInput = () => {
        try {

            if (this.state.inputSC === "" || parseInt(this.state.rotationNo) < 0) {
                this.setState({ Output: "NA" });
            } else {
                let output = "";
                for (let letter of this.state.inputSC) {
                    for (let dictionary of SUPPORT.CaesarCipherDictionary) {
                        if (dictionary.key === letter) {
                            let En = (parseInt(dictionary.value) + parseInt(this.state.rotationNo)) % SUPPORT.CaesarCipherDictionary.length;
                            let EnString = En.toString();
                            if (EnString.length < 2) {
                                EnString = "0" + EnString;
                            }
                            for (let d of SUPPORT.CaesarCipherDictionary) {
                                if (d.value === EnString) {
                                    output = output + d.key;
                                }
                            }
                        }
                    }

                }
                this.setState({ Output: output });
            }


        } catch (ex) { }
    }

    processSet(AvailableCoins, amount) {
        var i = 0;
        var coincount = AvailableCoins.map(function () { return 0; }); // set same length Array but initialize 0
        console.log("STEP 1 coincount > ", coincount);
        while (i < AvailableCoins.length) {
            while (AvailableCoins[i] <= amount) {
                amount -= AvailableCoins[i];
                coincount[i]++;
            }
            i++;
        }
        console.log("coincount > ", coincount);
        let output = [];
        let ct = 0;
        for (let coin of coincount) {
            if (coin === 1) {
                output.push(AvailableCoins[ct]);
            }
            ct++;
        }
        console.log("output > ", output);
        this.setState({ OutputCombinationCoins: output });
    }




    render() {

        return (
            <Fragment>
                <ResponsiveDrawer
                    drawer={
                        <Fragment>
                            <List onClick={() => this.setState({ viewTask: "Task1" })}  >
                                <ListItem button key="List-Task-1">
                                    <ListItemIcon>
                                        <DoubleArrowIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Task 1" />
                                </ListItem>
                            </List>
                            <List onClick={() => this.setState({ viewTask: "Task2" })}  >
                                <ListItem button key="List-Task-2">
                                    <ListItemIcon>
                                        <DoubleArrowIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Task 2" />
                                </ListItem>
                            </List>
                            <List onClick={() => this.setState({ viewTask: "Task3" })}  >
                                <ListItem button key="List-Task-3">
                                    <ListItemIcon>
                                        <DoubleArrowIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Task 3" />
                                </ListItem>
                            </List>

                        </Fragment>
                    }
                    content={
                        <Fragment>

                            {this.state.viewTask === "" ? (
                                <Fragment>
                                    <Typography variant="h6" noWrap component="div">
                                        Welcome! Click side Links to start
                                    </Typography>
                                </Fragment>
                            ) : null}

                            {this.state.viewTask === "Task1" ? (
                                <Fragment>
                                    <Typography variant="h4" noWrap component="div">
                                        <b>Task 1 </b>
                                    </Typography>
                                    <br />
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant="h6" noWrap component="div">
                                                Caesar's Cipher Dictionary
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <br />
                                        </Grid>

                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <table>
                                                <tr>
                                                    {SUPPORT.CaesarCipherDictionary.map((item, i) => (
                                                        <td>
                                                            {item.key}
                                                        </td>
                                                    ))}
                                                </tr>
                                                <tr className='green-background'>
                                                    {SUPPORT.CaesarCipherDictionary.map((item, i) => (
                                                        <td>
                                                            {item.value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </table>
                                        </Grid>
                                    </Grid>
                                    <br />


                                    <Typography variant="h6" noWrap component="div" className='formulaCss'>
                                        <b>Encryption Formula :</b> En (x) = (x + n) mod 26
                                    </Typography>

                                    <br />
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={12} lg={12}>

                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    id="input-special-cipher"
                                                    label="Enter Special Cipher"
                                                    variant="outlined"
                                                    value={this.state.inputSC}
                                                    onChange={(e) => {
                                                        this.setState({ inputSC: e.target.value.toUpperCase(), Output: "" });
                                                    }}
                                                />
                                                <TextField
                                                    type="number"
                                                    id="rotation-number"
                                                    label="Enter Rotation Number"
                                                    variant="outlined"
                                                    value={this.state.rotationNo}
                                                    onChange={(e) => {
                                                        this.setState({ rotationNo: e.target.value, Output: "" });
                                                    }}
                                                />
                                            </Box>

                                        </Grid>
                                    </Grid>
                                    <br />


                                    <Grid className='marginLeft10' container spacing={0}>
                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <Stack direction="row" spacing={0}>
                                                <Button
                                                    variant="contained"

                                                    onClick={(e) => {
                                                        this.processInput();
                                                    }}
                                                >
                                                    Process
                                                </Button>
                                                &nbsp;&nbsp;
                                                <Typography variant="h6" noWrap component="div" className='OUTPUTCss'>
                                                    OUTPUT
                                                </Typography>
                                                <Typography variant="h6" noWrap component="div" className='OUTPUTCss'>
                                                    &nbsp;&nbsp;<ArrowForwardIcon />&nbsp;&nbsp;
                                                </Typography>
                                                <Typography variant="h6" noWrap component="div" className='encryptedDataCss'>
                                                    {this.state.Output}
                                                </Typography>
                                                &nbsp;&nbsp;



                                            </Stack>
                                        </Grid>
                                    </Grid>


                                </Fragment>
                            ) : null}

                            {this.state.viewTask === "Task2" ? (
                                <Fragment>
                                    <Typography variant="h4" noWrap component="div">
                                        <b>Task 2 </b>
                                    </Typography>
                                    <br />
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={8} lg={8}>
                                            <Grid container spacing={0}>
                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid xs={12} sm={12} md={12} lg={12}>

                                                            <Box
                                                                component="form"
                                                                sx={{
                                                                    '& > :not(style)': { m: 1, width: '25ch' },
                                                                }}
                                                                noValidate
                                                                autoComplete="off"
                                                            >

                                                                <TextField
                                                                    type="number"
                                                                    id="InputAmount"
                                                                    label="Enter Input Amount"
                                                                    variant="outlined"
                                                                    value={this.state.InputAmount}
                                                                    onChange={(e) => {
                                                                        this.setState({ InputAmount: e.target.value, OutputCombinationCoins: [] }, () => {
                                                                            this.processSet(this.state.AvailableCoins, this.state.InputAmount);
                                                                        });
                                                                    }}
                                                                />
                                                            </Box>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <Typography variant="h6" noWrap component="div">
                                                        Possible Combination
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <br />
                                                </Grid>

                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <Stack direction="row" spacing={1}>
                                                        {this.state.OutputCombinationCoins.length > 0 ? this.state.OutputCombinationCoins.map((item, i) => (
                                                            <Avatar sx={{ bgcolor: '#03a9f4' }}>{item}</Avatar>
                                                        )) : null}
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={4} lg={4}>
                                            <Grid container spacing={0}>
                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <Typography variant="h6" noWrap component="div">
                                                        Usable coins in your wallet
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <Stack direction="row" spacing={1}>
                                                        {this.state.AvailableCoins.length > 0 ? this.state.AvailableCoins.map((item, i) => (
                                                            <Avatar sx={{ bgcolor: '#8bc34a' }}>{item}</Avatar>
                                                        )) : (<span style={{ color: 'green' }}>Add coins below</span>)}
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid xs={12} sm={12} md={12} lg={12}>

                                                            <Box
                                                                component="form"
                                                                sx={{
                                                                    '& > :not(style)': { m: 1, width: '25ch' },
                                                                }}
                                                                noValidate
                                                                autoComplete="off"
                                                            >
                                                                <br />

                                                                <Button
                                                                    startIcon={<DeleteIcon />}
                                                                    variant="contained"
                                                                    color="error"
                                                                    onClick={(e) => {
                                                                        this.setState({ AvailableCoins: [], OutputCombinationCoins: [] }, () => {

                                                                        });
                                                                    }}
                                                                >
                                                                    Empty Coins
                                                                </Button>

                                                                <br /><br /><br /> <br /><br /><br />


                                                                <TextField
                                                                    type="number"
                                                                    id="InputCoinValue"
                                                                    label="Enter Coin Value"
                                                                    variant="outlined"
                                                                    value={this.state.InputCoinValue}
                                                                    onChange={(e) => {
                                                                        this.setState({ InputCoinValue: parseInt(e.target.value) });
                                                                    }}
                                                                />

                                                                <Button
                                                                    variant="contained"
                                                                    onClick={(e) => {
                                                                        if (parseInt(this.state.InputCoinValue) > 0) {
                                                                            let AvailableCoins = this.state.AvailableCoins;
                                                                            AvailableCoins.push(parseInt(this.state.InputCoinValue));
                                                                            this.setState({ AvailableCoins: AvailableCoins, InputCoinValue: "", OutputCombinationCoins: [] }, () => {

                                                                            });
                                                                        }

                                                                    }}
                                                                >
                                                                    Add Coin
                                                                </Button>

                                                            </Box>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>



                                </Fragment>
                            ) : null}

                            {this.state.viewTask === "Task3" ? (
                                <Fragment>
                                    <Typography variant="h4" noWrap component="div">
                                        <b>Task 3 </b>
                                    </Typography>
                                    <br />
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={2} lg={2}>
                                            <Typography variant="h6" noWrap component="div">
                                                Asset View Product
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10}>
                                            <img src={designStructure} className="designStructureCss" alt="design structure" loading="lazy" />
                                        </Grid>
                                    </Grid>
                                </Fragment>
                            ) : null}




                        </Fragment>
                    }
                />
            </Fragment>
        );
    }
}
export default mypage;