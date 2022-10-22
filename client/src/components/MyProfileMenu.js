import { Box, Button, Grid, InputLabel, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';


export default function MyProfileMenu() {


    return(
        
        <>
            <div style={{ backgroundColor: 'lightblue' }}>
            <div class="product-include" style={{ maxWidth: 800, margin: "auto", height: 710 }}>
            
                <form >

                <div className="form-group">
                    <Box sx={{ py: 2 }} style={{ backgroundColor: 'lightblue' }}>        
                        <center><label style={{ fontSize: "35px" }}>My Profile Menu</label></center>
                    </Box>
                </div>

                    <div className="form-group" style={{ textAlign: "center" }}>
                        
                        <Box sx={{ py: 3 }}>
                            
                            <Link to={`/add-prifilePic`}><Button variant="contained" sx={{ mb: 2 ,width: "400px" , height: "50px"}}>Create My Profile</Button></Link>

                        </Box>
                        
                    </div>

                    <div className="form-group" style={{ textAlign: "center" }}>
                        
                        <Box sx={{ py: 3 }}>
                            
                        <Link to={`/specific-Profile/634a6cc9edae92acd4860462`}><Button variant="contained" sx={{ mb: 2 ,width: "400px" , height: "50px"}}>View My Profile</Button></Link>
                            

                        </Box>
                    </div>

                    <div className="form-group" style={{ textAlign: "center" }}>

                        <Box sx={{ py: 3 }}>
                            
                            <Link to={`/edit-profile/634a6cc9edae92acd4860462`}><Button sx={{ width: "400px" , height: "50px" }} variant="contained">Update My Profile</Button></Link>

                        </Box>

                    </div>

                    <div className="form-group" style={{ textAlign: "center" }}>

                        <Box sx={{ py: 3 }}>
                            
                            <Link to={`/wantedAdMenu`}><Button variant="contained" sx={{ mb: 2 ,width: "400px" , height: "50px"}}>Go Back To Wanted-ads Menu</Button></Link>

                        </Box>

                    </div>

                </form>
            </div>
            </div> 
        </>

    );
}