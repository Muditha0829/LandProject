import { Box, Button, Card, CardMedia, Grid, InputLabel, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';

export default function SpecificAd() {

    let history = useHistory();
    const { id } = useParams();

    const [web, setWeb] = useState({
        adtype: "", 
        town: "",
        location: "",
        adHeading:"",
        description: "",
        name: "",
        email: "",
        mobile: "",
        imgURL: "",
        iName: ""
    });

    const { adtype, town, location, adHeading, description, name, email, mobile, imgURL, iName } = web;

    const onInputChange = e => {
        setWeb({...web, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        loadHeader();
      }, []);
  
    const loadHeader = async () => {
        const result = await axios.get("http://localhost:5000/web/get/" + id);
        setWeb(result.data);
    }  

    return(
        
        <>
            <div style={{ backgroundColor: 'lightblue' }}>
            <div class="product-include" style={{ maxWidth: 800, margin: "auto" }}>
            
                <form >
                    <div className="form-group">
                        <h6 style={{ textAlign: "center" , fontSize: "25px" , color: 'blue' }}>{ adHeading!= "" && adHeading }</h6>
                        <Box >
                            
                        </Box>
                        
                    </div>

                    <div className="form-group">
                        <h6>Information of This Property </h6>
                        <Box sx={{ py: 2 }}>
                            <TextField label="Ad-Type" type="text" name="adtype" fullWidth required value={adtype}/>
                                                      
                            <TextField sx={{ mt: 4 }} label="Town/City/Street" type="text" name="town" fullWidth required value={town}/>     
                                                                            
                            <TextField sx={{ mt: 4 }} label="Location" type="text" name="location" fullWidth required value={location}/>
                                                                           
                            <TextField sx={{ mt: 4 }} label="Description" type="text" name="description" fullWidth required value={description}/> 
                        </Box>
                        
                    </div>

                    <div className="form-group">
                        <h6>Contact Information</h6>
                        <Box sx={{ py: 2 }}>
                            <TextField sx={{ mt: 4 }} label="Contact Name" type="text" name="name" fullWidth required value={name}/>  
                                                      
                            <TextField sx={{ mt: 4 }} label="Contact Email" type="text" name="email" fullWidth required value={email}/> 
                                                                              
                            <TextField sx={{ mt: 4 }} label="Contact Number" type="text" name="mobile" fullWidth required value={mobile}/>
                        </Box>
                        
                    </div>

                    <div className="form-group">
                        <h6>Images Related Ad</h6>
                        <Box sx={{ py: 2 }}>
                            <TextField  label="Enter Image Name" type="text" name="iName" fullWidth required value={iName}/>
                        </Box>

                        <Card sx={{ mt: 2 , height: "150px" , width: "150px" }}>
                            <CardMedia
                                component="img"
                                height="150px"
                                image={ imgURL }/>
                        </Card>
                        
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