import { Box, Button, Grid, InputLabel, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';


export default function WantedAdMenu() {


    return(
        
        <>
            <div style={{ backgroundColor: 'lightblue' }}>
            <div class="product-include" style={{ maxWidth: 800, margin: "auto", height: 657 }}>
            
                <form >

                <div className="form-group">
                    <Box sx={{ py: 2 }} style={{ backgroundColor: 'lightblue' }}>        
                        <center><label style={{ fontSize: "35px" }}>Wanted Ad Menu</label></center>
                    </Box>
                </div>

                    <div className="form-group" style={{ textAlign: "center" }}>
                        
                        <Box sx={{ py: 2 }}>
                            
                            <Link to={`/add-course`}><Button variant="contained" sx={{ mb: 2 ,width: "400px" , height: "50px"}}>Create a New Wanted-Ad</Button></Link>

                        </Box>

                        <Box sx={{ py: 2 }}>
                            
                            <Link to={`/mywanted`}><Button variant="contained" sx={{ mb: 2 ,width: "400px" , height: "50px"}}>View / Edit / Delete Ads</Button></Link>
                            

                        </Box>

                        <Box sx={{ py: 2 }}>
                            
                        <Link to={`/myProfileMenu`}><Button sx={{ width: "400px" , height: "50px" }} variant="contained">Manage My Profile</Button></Link>

                        </Box>
                        
                        <Box sx={{ py: 2 }}>
                            
                            <Link to={`/adsReport`}><Button sx={{ width: "400px" , height: "50px" }} variant="contained">Generate Ad Report</Button></Link>

                        </Box>

                        <Box sx={{ py: 2 }}>
                            
                            <Link to={`/mywanted`}><Button variant="contained" sx={{ mb: 2 ,width: "400px" , height: "50px"}}>Go Back To My Wanted Ads Store</Button></Link>

                        </Box>

                    </div>
                </form>
            </div>
            </div> 
        </>

    );
}