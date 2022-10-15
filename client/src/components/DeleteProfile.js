import  {useState,useEffect} from 'react';
import {  Button, Grid, Paper, Typography } from "@mui/material";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
const btnStyle={margin:'8px 0'};
const bottomText={margin:'10px 0px 10px 0px'};

const DeleteProfile=()=>{

    const navigate = useNavigate();

    const [user, setUser] = useState([]);
    const loggedInUserId = localStorage.getItem("userId");
    const userId = JSON.parse(loggedInUserId);

    useEffect(()=>{
            
             axios.get(`http://localhost:4500/user/${userId}`).then((res)=>{
                let user = res.data;
                setUser(user);

            }).catch((err)=>{
                    alert(err.message)
            })
 
    },[]
 )

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            axios.delete(`http://localhost:4500/user/delete/${userId}`).then((res)=>{
                alert("Account deleted Succefully");
                localStorage.clear("username");
                navigate("/signin");

            }).catch((err)=>{
                    alert(err.message)
            })
          
        }catch(error){
          console.log(error)
        }
      }

    return(
        <div>
            <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Delete User</h2>
        </Grid>

        <form onSubmit={handleSubmit}>

        <div align='center'style={bottomText}>
        <Typography>Are you sure want to delete {user.email}
        </Typography>
        </div>
        <Button type="submit" color="error" variant="contained" fullWidth style={btnStyle}>Delete Account</Button>
        <Link to='/dashboard/myprofile' style={{textDecoration:'none'}}> <Button  color="primary" variant="contained" fullWidth style={btnStyle}>Go Back</Button></Link>
        </form>
        
      </Paper>
        </div>
    )
}

export default DeleteProfile;