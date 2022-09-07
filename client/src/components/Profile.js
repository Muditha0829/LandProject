import { useEffect,useState } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import React from "react";
// import jsPDF from "jspdf";
// import 'jspdf-autotable';

import Pdf from "react-to-pdf";

const ref = React.createRef();

function Profile(){
    
    const [user, setUser] = useState([]);

    const loggedInUser = (JSON.parse(localStorage.getItem("username"))).toUpperCase();
    
    const userDetails = {margin:"20px",float:"left"};
    const dataContainer = {display:"flex",marginLeft:"50px",marginRight:"50px",justifyContent:"center"};


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
            <h4 ><center>My Profile</center></h4>
            <hr/>

            <div style={dataContainer}>
                </div>


                <div style={userDetails} ref={ref}>
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


                        {/* <Typography variant="overline" display="block" gutterBottom>
                        {user.email}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Email : {user.email}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Role : {user.role}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Name : {user.username}
                        </Typography> */}


                    </Box>

                    <Button variant="text" href={"updateprofile"}> Update Profile </Button>

                    <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <Button variant="text" onClick={toPdf}> Generate User Report </Button>}
      </Pdf>
                    
                </div>

            </div>
    )
}

export default Profile;