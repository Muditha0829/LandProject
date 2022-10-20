import { Box, Button, Card, CardMedia, Grid, InputLabel, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';

export default function ViewMyProfile() {

    let history = useHistory();
    const { id } = useParams();

    const [profile, setProfile] = useState({
        firstName: "", 
        lastName: "",
        homeAddress: "",
        mobile:"",
        email: "",
        personType: "",
        imgURL: "",
    });

    const { firstName, lastName, homeAddress, mobile, email, personType, imgURL } = profile;

    const onInputChange = e => {
        setProfile({...profile, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        loadHeader();
      }, []);
  
    const loadHeader = async () => {
        const result = await axios.get("http://localhost:5000/profileweb/get/" + id);
        setProfile(result.data);
    }  

    return(
        
        <>
            <div style={{ backgroundColor: 'lightblue' }}>
            <div class="product-include" style={{ maxWidth: 800, margin: "auto" }}>
            
                <form >

                    <div className="form-group">
                    <Box sx={{ py: 2 }} style={{ backgroundColor: 'lightblue' }}> 
                        <center>
                        <h6 style={{ textAlign: "center" , fontSize: "30px" , color: 'blue' }}>My Profile</h6>

                        <Card sx={{ mt: 2 , height: "150px" , width: "150px", textAlign: "center", display: 'flex', justifyContent: 'center' }}>
                            <CardMedia
                                sx={{ textAlign: "center" }}
                                component="img"
                                height="150px"
                                image={ imgURL }/>
                        </Card>
                        </center>
                        </Box>
                    </div>

                    <div className="form-group">
                        <h6 style={{ textAlign: "center" , fontSize: "25px" , color: 'blue' }}>Hello, { firstName!= "" && firstName } { lastName!= "" && lastName } !</h6>
                        <Box >
                            
                        </Box>
                        
                    </div>

                    <div className="form-group">
                        <h5>Your Personal Details...</h5>
                        <Box sx={{ py: 2 }}>
                            
                            <TextField label="First Name" type="text" name="firstName" fullWidth required value={firstName}/>
                                                      
                            <TextField sx={{ mt: 4 }} label="Last Name" type="text" name="lastName" fullWidth required value={lastName}/>     
                                                                            
                            <TextField sx={{ mt: 4 }} label="Home Address" type="text" name="homeAddress" fullWidth required value={homeAddress}/>
                                                                           
                            <TextField sx={{ mt: 4 }} label="Contact Number" type="text" name="mobile" fullWidth required value={mobile}/> 

                            <TextField sx={{ mt: 4 }} label="Email" type="text" name="email" fullWidth required value={email}/> 

                            <TextField sx={{ mt: 4 }} label="Person Type" type="text" name="personType" fullWidth required value={personType}/> 

                        </Box>
                        
                    </div>
                    
                    <>
                        <table>
                            <tr>
                                <td>
                                    <Link to={`/wantedList`}><Button variant="contained" sx={{ mb: 2}}>Back To Store</Button></Link>
                                </td>
                            </tr>
                        </table>
                    </> 
                </form>
            </div>
            </div>
        </>
    );
}