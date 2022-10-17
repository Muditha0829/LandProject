import  {useState,useEffect} from 'react';
import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import axios from 'axios';
import LoginNav from './LoginNav/LoginNav';

import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};
const typoStyle={align:'center'};
const bottomText={margin:'10px 0px 10px 0px'};
const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"};;

const SignIn = () =>{

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("username");

    if (loggedInUser){
    window.location = "/dashboard"
    }

    
},[])

  const navigate = useNavigate();

    const [credentials,setCredentials] = useState({
      email:'',
      password:''});

    const [error,setError] = useState("");

    const handleChange = (e) => {
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    // console.log(credentials.email);

    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        const {data:res} = await axios.post("http://localhost:4500/auth",credentials);
        const username = credentials.email.split('@')[0];
        localStorage.setItem('username',JSON.stringify(username));  
        localStorage.setItem('userId',JSON.stringify(res.data)); 
        localStorage.setItem('userRole',JSON.stringify(res.dataRole));
        localStorage.setItem('userID', res.data); 
        navigate('/dashboard',{state:{dataId:res.data}})
      }catch(error){
        if(
          error.response &&
          error.response.status >=400 &&
          error.response.status <=500
        ){
          setError(error.response.data.message);
        }
      }
    }

    return (

      <Grid>
        <LoginNav />

      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <h2>Sign In </h2>
        </Grid>

        <form onSubmit={handleSubmit}>
        <TextField label="Enter Your Email Address" type="text" name="email" fullWidth required style={textStyle} value={credentials.email}
         onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password}
         onChange={handleChange}/>
          {error && <div style={errorMsg}>{error}</div>}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}
        disabled={ !(/^([A-Za-z0-9_\-.])+@(["gmail"])+\.(["com"]{2,})$/.test(credentials.email)) }
        
        >Sign In</Button>
        </form>

        <div align='center' style={bottomText}>
          <div  className={typoStyle}>
        <Typography>
          <Link href="#">
          Forgot Password?
          </Link>
        </Typography>
        </div>
        </div>
        
        <div align='center'style={bottomText}>
        <Typography>Don't you have an account?
          <Link href="/signup">
            Sign Up
          </Link>
        </Typography>
        </div>
        
        
      </Paper>
      <Footer/>
    </Grid>
    )

}

export default SignIn;