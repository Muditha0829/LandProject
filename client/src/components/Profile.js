import { useEffect,useState } from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import jsPDF from "jspdf";
// import 'jspdf-autotable';

function Profile(){
    
    const [user, setUser] = useState([]);

    const loggedInUser = (JSON.parse(localStorage.getItem("username"))).toUpperCase();
    
    const userDetails = {margin:"20px",float:"left"};
    const dataContainer = {display:"flex",marginLeft:"50px",marginRight:"50px",justifyContent:"center"};


   const exportPdf=()=>{
    const unit = "pt";
        const size = "A4"; 
        const orientation = "potrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Email: " + user.email;
    
        const data = "Data";
    
        let content = {
          startY: 50,
          body: data
        };
    
        doc.text(data,marginLeft, 40);
        // doc.autoTable(content);
        doc.save("Report.pdf")
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
            <h4 ><center>My Profile</center></h4>
            <hr/>

            <div style={dataContainer}>
                </div>


                <div style={userDetails}>
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
                    <Button variant="text" onClick={exportPdf}> Generate User Report </Button>
                </div>

            </div>
    )
}

export default Profile;