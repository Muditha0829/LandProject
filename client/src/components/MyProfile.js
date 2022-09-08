import { useEffect,useState } from "react";
import axios from "axios";
import {  Button, Grid, Paper, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { Link } from "react-router-dom";

function MyProfile(){

    const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
    const btnStyle={margin:'8px 0'};
    
    const [user, setUser] = useState([]);

    const loggedInUser = (JSON.parse(localStorage.getItem("username"))).toUpperCase();
    
    const userDetails = {margin:"20px",float:"left"};
    const dataContainer = {display:"flex",marginLeft:"50px",marginRight:"50px",justifyContent:"center"};


   const exportPdf=()=>{
    const unit = "pt";
        const size = "A4"; 
        const orientation = "potrait";
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
        autoTable(doc, { html: '#my-table' })

        autoTable(doc, {
        head: [['UserID', 'FullName', 'Gender','City',"Province",'Role']],
        body: [
            [user._id, user.firstName+" "+user.lastName, user.gender, user.city, user.province, user.role]
        ],
        })

        doc.save("User Report - "+user._id)
     }

    useEffect(()=>{
        const loggedInUserId = localStorage.getItem("userId");


            const userId = JSON.parse(loggedInUserId);

        
             axios.get(`http://localhost:4500/user/${userId}`).then((res)=>{
                let user = res.data;
                setUser(user);

            }).catch((err)=>{
                    alert(err.message)
            })
 
    },[]
 )

    // if(user.role=='admin'){
    //     const userRole = 
    // }

    return (
        <div>

            <div style={dataContainer}>
                </div>

                <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>My Profile</h2>
        </Grid>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
                        <Typography variant="h5" gutterBottom component="div">
                            {loggedInUser}
                        </Typography>
                        <Typography variant="subtitle1" display="block" gutterBottom>
                            Email
                        </Typography>
                        <Typography variant="h6" display="block" mt={-1} gutterBottom>
                        &nbsp;&nbsp;&nbsp;{user.email}
                        </Typography>

                        <Typography variant="subtitle1" display="block" gutterBottom>
                            Role
                        </Typography>
                        <Typography variant="h6" display="block" mt={-1} gutterBottom>
                        &nbsp;&nbsp;&nbsp;{user.role}
                        </Typography>

                        <Typography variant="subtitle1" display="block" gutterBottom>
                            Name
                        </Typography>
                        <Typography variant="h6" display="block" mt={-1} gutterBottom>
                        &nbsp;&nbsp;&nbsp;{user.firstName + " " +user.lastName}
                        </Typography>

                        <Typography variant="subtitle1" display="block" gutterBottom>
                            Gender
                        </Typography>
                        <Typography variant="h6" display="block" mt={-1} gutterBottom>
                        &nbsp;&nbsp;&nbsp;{user.gender}
                        </Typography>

                        <Typography variant="subtitle1" display="block" gutterBottom>
                            City
                        </Typography>
                        <Typography variant="h6" display="block" mt={-1} gutterBottom>
                        &nbsp;&nbsp;&nbsp;{user.city}
                        </Typography>

                        <Typography variant="subtitle1" display="block" gutterBottom>
                            Province
                        </Typography>
                        <Typography variant="h6" display="block" mt={-1} gutterBottom>
                        &nbsp;&nbsp;&nbsp;{user.province}
                        </Typography>


                    </Box>

                    <Link to='/dashboard/updateprofile' style={{textDecoration:'none'}}> <Button href={"updateprofile"} color="primary" variant="contained" fullWidth style={btnStyle}>Update Profile</Button></Link>
                    <Button color="primary" variant="outlined" fullWidth style={btnStyle} onClick={exportPdf}>Generate User Report </Button>
        
        
      </Paper>

            </div>
    )
}

export default MyProfile;