import React, { useEffect,useState } from "react";
import {  Button, Grid, Paper, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
// import Background from './../../images/Group/group_background_image.png';
// import { Link, useNavigate } from 'react-router-dom';

const paperStyle={backgroundColor: "#bbd9f7", padding:50, height:'auto', width:700, margin:'30px auto'};
const textStyle={ height:35, width:500};
const btnStyle={margin:'20px 0'};
// const text={fontFamily: "Cursive"};
const fromun = {margin:'30px auto'};

 function UpdateSale(){

    let history = useNavigate();
    const { id } = useParams();


    useEffect(()=>{


        console.log(id+"update")

        axios.get(`http://localhost:4500/sale/${id}`).then((res)=>{
      
           let sales = res.data;
      
           setSale(sales)
      
           console.log(res.data)
      
      
      
      
      }).catch((err)=>{
      
               alert(err.message)
      
      })
      
      
      
      },[]
      
      )



      const [sale, setSale] = useState({
        heading: "",
        city: "",
        telephoneNumber: "",
        mobileNumber: "",
        Description: "",
        price: ""
    });

    const { heading, city, telephoneNumber, mobileNumber, Description, price} = sale;


    const onInputChange = e => {
        setSale({...sale, [e.target.name]: e.target.value});
    }


    const onSubmit = async e => {
        e.preventDefault();        
        // const valid = formValidation();
        if(true){
            await axios.put(`http://localhost:4500/sale/update/${id}`, ).then(() => {
                alert("Sale Updated Successfully");
                window.location = "/dashboard/saleList";
            }).catch((err) => {
                alert(err);
            })
            history.push("/saleList");  
        }              
    }






    // const [heading, setheading] = useState("");
    // const [houseNumber, sethouseNumber] = useState("");
    // const [street, setstreet] = useState("");
    // const [city, setcity] = useState("");
    // const [telephoneNumber, settelephoneNumber] = useState("");
    // const [mobileNumber, setmobileNumber] = useState("");
    // const [Description, setDescription] = useState("");
    // const [price, setprice] = useState("");

    
    // const [userId, setuserId] = useState([]);

    // function sendData(e){
    //     e.preventDefault();

        
    //     const newsale ={
            
    //         heading,
    //         houseNumber, 
    //         street,
    //         city,
    //         telephoneNumber,
    //         mobileNumber,
    //         Description,
    //         price
    //     }
        
    //     axios.post("http://localhost:4500/sale/add",newsale).then(()=>{
    //     alert("Sale Added")
    //     window.location = "/dashboard/main-page";
        
    // }).catch((err)=>{
    //     alert(err)
    // })
        
    // }


    
    // useEffect(()=>{
    //     // const loggedInUser = localStorage.getItem("username");
    //     const userId = localStorage.getItem("userId");

    //     if (!userId){
    //     window.location = "/signin"
    //     }else{
    //         const username = (JSON.parse(userId));
    //         console.log(username);
    //         setuserId(username);
    //         console.log(userId);

    //     }

        
    // },[])



    return(
        <Grid >
      <Paper sx={{ mt: 4 }} elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Update Sale</h2>
        </Grid>
        <div>
            <form onSubmit={onSubmit}>
                        
                <div style={fromun}>
                
                <TextField fullWidth label="Heading" id="heading"  className="form-control" style={textStyle} value={heading}/>
                
                
                </div>
            
            
            <div style={fromun}>
                    <TextField fullWidth label="City" id="city"  className="form-control" style={textStyle} value={city}/>
            </div>      


                <div style={fromun}>
                    <TextField fullWidth label="Telephone Number" id="telephoneNumber" maxlength="10" placeholder="eg:-0112345678"    className="form-control" style={textStyle} value={telephoneNumber}/>
                    
                </div>
            
            
                <div style={fromun}>
                    <TextField fullWidth label="Mobile Number" id="mobileNumber" maxlength="10" placeholder="eg:-0712345678"    className="form-control" style={textStyle} value={mobileNumber} />
                    
                </div>           
            
            
                <div style={fromun}>
                        <TextField fullWidth label="Description" id="Description"  className="form-control" style={textStyle} value={Description}/>
                        
                    
                </div>           
            
            
            <div style={fromun}>
                    <TextField fullWidth label="Price" id="price" placeholder="Rs."    className="form-control" style={textStyle} value={price}/>
                
            </div>           
               
                <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Confirm</Button>
            
            </form>
        </div>
        </Paper>
    </Grid>

    )


}

export default UpdateSale;