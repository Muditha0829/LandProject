import {  Button, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';

import {FormControl,FormLabel,RadioGroup,Radio,FormControlLabel,InputLabel,Select,MenuItem} from '@mui/material';


const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
const textStyle={margin:'0px 0px 20px 0px'};
const btnStyle={margin:'8px 0'};
const bottomText={margin:'10px 0px 10px 0px'};
const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                  backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
                };

const UpdateProfile=()=>{

    const loggedInUserId = localStorage.getItem("userId");
    const userId = JSON.parse(loggedInUserId);

    useEffect(()=>{

             axios.get(`http://localhost:4500/user/${userId}`).then((res)=>{
                let user = res.data;
                setCredentials(user)


            }).catch((err)=>{
                    alert(err.message)
            })
 
    },[]
 )



  const navigate = useNavigate();

  const [credentials,setCredentials] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    cpassword:'',
    gender:'',
    city:'',
    province:''
  });

  const [error,setError] = useState("")
  
  const handleChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value});}

  const handleSubmit = async (e) =>{
    e.preventDefault();

    // if(!(credentials.password===credentials.cpassword)){
    //   alert("Error in password");
    // }else{
      try{
        const user = {
            "firstName":credentials.firstName,
            "lastName":credentials.lastName,
          "email":credentials.email,
          "gender":credentials.gender,
          "city":credentials.city,
          "province":credentials.province
        }
        console.log(user);

        await axios.put(`http://localhost:4500/user/editprofile/${userId}`,user).then(() => {
          alert("User Updated");
          navigate('/dashboard/myprofile');
        })
        
        
      }catch(error){
        console.log(error)
        if(
          error.response &&
          error.response.status >=400 &&
          error.response.status <=500
        ){
          setError(error.response.data.message);
        }
      }
    // }
  }


  return(
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
            
          <h2>Update Profile </h2>
        </Grid>
        <form onSubmit={handleSubmit}>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0 ,mt: 1 ,mr:1,mb: 1.9, width: '24ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        {/* {user} */}
        <TextField label="Enter Your First Name" name="firstName" fullWidth required  value={credentials.firstName} onChange={handleChange} />
        <TextField label="Enter Your Last Name" name="lastName" fullWidth required  value={credentials.lastName} onChange={handleChange} />
        </div>
        </Box>
       
       <FormControl >
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Male" name="gender" value={credentials.gender} onChange={handleChange}>
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
       
       <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" name = "city" style={textStyle} value={credentials.city} label="City" onChange={handleChange}>
                    <MenuItem value={"Giriulla"}>Giriulla</MenuItem>
                    <MenuItem value={"Jaffna"}>Jaffna</MenuItem>
                    <MenuItem value={"Colombo"}>Colombo</MenuItem>
                </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" name = "province" style={textStyle} value={credentials.province} label="Province" onChange={handleChange}>
                    <MenuItem value={"North Western Province"}>North Western Province</MenuItem>
                    <MenuItem value={"Western Province"}>Western Province</MenuItem>
                    <MenuItem value={"Sabaragamuwa Province"}>Sabaragamuwa Province</MenuItem>
                </Select>
        </FormControl>

        {error && <div style={errorMsg}>{error}</div>}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Update Profile</Button>
        <Link to='/dashboard/deleteprofile' style={{textDecoration:'none'}}> <Button color="error" variant="contained" fullWidth style={btnStyle} >Delete Account</Button></Link>
        </form>
        <div align='center' style={bottomText}>
        </div>
      </Paper>
    </Grid>
  );
}


export default UpdateProfile;