import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleUserRentals = () => {

    const [myRentals, setMyRentals] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get("http://localhost:4500/rental/my/" + localStorage.getItem('userID')).then((res) => {
            setMyRentals(res.data);
        })
    }

    const [open, setOpen] = useState(false); 
    const [rentalID, setRentalID] = useState();

    const handleClickOpen = (id) => {
        setOpen(true);
        setRentalID(id);
    }

    const onCancel = () => {
        setOpen(false);
    };

    const deleteDeliver = async () => {
        await axios.delete("http://localhost:4500/rental/" + rentalID);
        loadData();
        setOpen(false);
    }

    return(
        <div>
            <ToastContainer position={"top-center"}/>
            <Dialog
                open={open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm Here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button sx={{ bgcolor: "#e6eded" }} onClick={onCancel}>Cancel</Button>
                <Button sx={{ bgcolor: "#e6eded" ,color: "red" }} onClick={() => deleteDeliver()} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            <Container sx={{ py: 3 }}>
            <center><Typography sx={{ pt: 4, color: "darkblue" }} variant="h4" component="h2">My Rental Page</Typography></center>
                {
                    myRentals.map((myrent, i) => {
                        return(
                            <Card key={i} sx={{ mt: 2, bgcolor: "#edf2ee" }}>
                                <CardContent>                                    
                                    <Grid container spacing={1} justifyContent="space-between"> 
                                        <Grid item xs={10}> 
                                            <Typography variant="h6">
                                            <b>{i+1}.</b> {myrent.type}
                                            </Typography>
                                            <Typography variant="h6">
                                                <b>Heading:</b> {myrent.heading}
                                            </Typography>
                                            <Typography variant="h6">
                                                <b>Status:</b> Active
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Typography sx={{ float: "right" }}>
                                                <Link to={`/dashboard/single-rental/${myrent._id}`}>
                                                    <MoreVertIcon/>
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                                                        
                                </CardContent>
                                <CardActions>
                                    <Button sx={{ bgcolor: "#41f714", color: "white" }} startIcon={<AutorenewIcon />} variant="success"><Link style={{ textDecoration: 'none', color: 'white' }} to={`/dashboard/update-rental/${myrent._id}`}>Update</Link></Button>
                                    <Button sx={{ bgcolor: "red", color: "white" }} startIcon={<DeleteIcon />} onClick={() => {handleClickOpen(myrent._id)}} variant="success">Delete</Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Container>
        </div>
    )
}

export default SingleUserRentals;