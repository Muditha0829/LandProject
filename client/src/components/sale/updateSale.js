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

    const { id } = useParams();

  const [error,setError] = useState("")


    useEffect(()=>{
        console.log(id)
        axios.get(`http://localhost:4500/sale/${id}`).then((res)=>{
      
           let sales = res.data;
           setSale(sales)
           console.log(sale)
      }).catch((err)=>{
               alert(err.message)
      })
      },[] )



      const [sale, setSale] = useState({
        heading: "",
        city: "",
        telephoneNumber: "",
        mobileNumber: "",
        Description: "",
        price: ""
    });

    // const { heading, city, telephoneNumber, mobileNumber, Description, price} = sale;


    const onInputChange = e => {
        setSale({...sale, [e.target.name]: e.target.value});
    }


    const onSubmit = async e => {
        e.preventDefault();        
        // const valid = formValidation();

        try{
            const updateSale = {
                "heading": sale.heading,
                "city": sale.city,
                "telephoneNumber": sale.telephoneNumber,
                "mobileNumber": sale.mobileNumber,
                "Description": sale.Description,
                "price": sale.price
            }
            console.log(updateSale);
    
            await axios.put(`http://localhost:4500/sale/update/${id}`, updateSale).then(() => {
                alert("Sale Updated Successfully");
                window.location = "/dashboard/saleList";
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
    }

    return(
        <Grid >
      <Paper sx={{ mt: 4 }} elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Update Sale</h2>
        </Grid>
        <div>
            <form onSubmit={onSubmit}>
                        
                <div style={fromun}>
                
                <TextField fullWidth label="Heading" name="heading"  className="form-control" style={textStyle} value={sale.heading} onChange={onInputChange} />
                
                
                </div>
            
            
            <div style={fromun}>
                    <TextField fullWidth label="City" name="city"  className="form-control" style={textStyle} value={sale.city} onChange={onInputChange} />
            </div>      


                <div style={fromun}>
                    <TextField fullWidth label="Telephone Number" name="telephoneNumber" maxlength="10" placeholder="eg:-0112345678"    className="form-control" style={textStyle} value={sale.telephoneNumber} onChange={onInputChange} />
                    
                </div>
            
            
                <div style={fromun}>
                    <TextField fullWidth label="Mobile Number" name="mobileNumber" maxlength="10" placeholder="eg:-0712345678"    className="form-control" style={textStyle} value={sale.mobileNumber} onChange={onInputChange}  />
                    
                </div>           
            
            
                <div style={fromun}>
                        <TextField fullWidth label="Description" name="Description"  className="form-control" style={textStyle} value={sale.Description} onChange={onInputChange} />
                        
                    
                </div>           
            
            
            <div style={fromun}>
                    <TextField fullWidth label="Price" name="price" placeholder="Rs."    className="form-control" style={textStyle} value={sale.price} onChange={onInputChange} />
                
            </div>           
               
                <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Confirm</Button>
            
            </form>
        </div>
        </Paper>
    </Grid>

    )


}

export default UpdateSale;