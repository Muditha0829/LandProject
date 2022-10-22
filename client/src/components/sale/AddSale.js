import React, { useEffect,useState } from "react";
import {  Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
// import Background from './../../images/Group/group_background_image.png';
// import { Link, useNavigate } from 'react-router-dom';

const paperStyle={backgroundColor: "#bbd9f7", padding:50, height:'auto', width:700, margin:'30px auto'};
// const textStyle={ height:35, width:500};
const btnStyle={margin:'20px 0'};
// const text={fontFamily: "Cursive"};
const fromun = {margin:'30px auto'};

 function AddSale(){

    const [heading, setheading] = useState("");
    const [houseNumber, sethouseNumber] = useState("");
    const [street, setstreet] = useState("");
    const [city, setcity] = useState("");
    const [telephoneNumber, settelephoneNumber] = useState("");
    const [mobileNumber, setmobileNumber] = useState("");
    const [Description, setDescription] = useState("");
    const [price, setprice] = useState("");

    
    const [userId, setuserId] = useState([]);

    function sendData(e){
        e.preventDefault();

        
        const newsale ={
            
            heading,
            houseNumber, 
            street,
            city,
            telephoneNumber,
            mobileNumber,
            Description,
            price
        }
        
        axios.post("http://localhost:4500/sale/add",newsale).then(()=>{
        alert("Sale Added")
        window.location = "/dashboard/main-page";
        
    }).catch((err)=>{
        alert(err)
    })
        
    }


    
    useEffect(()=>{
        // const loggedInUser = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");

        if (!userId){
        window.location = "/signin"
        }else{
            const username = (JSON.parse(userId));
            console.log(username);
            setuserId(username);
            console.log(userId);

        }

        
    },[])



    return(
        <Grid >
            {/* <Link to={`/dashboard/Group`} style={{ textDecoration: 'none'}}><Button class="btn btn-outline-success" style={{margin:'50px 0px 0px 50px'}} size="small" color="primary">
            registered groups
            </Button></Link> */}
      <Paper sx={{ mt: 4 }} elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Add For Sale</h2>
        </Grid>
        <div>
            <form onSubmit={sendData}>
                        
                <div style={fromun}>
                
                <TextField fullWidth label="Heading" id="heading" required className="form-control"
                    onChange={(e)=>{

                        setheading(e.target.value);
                        // setuserId(localStorage.getItem("userId"));
                        // console.log("userId")


                    }}/>
                
                
                    {/* <label style={text} for="name" >Heading :------</label>  

                    <input style={textStyle} type="text"  id="heading"  placeholder="Enter hear..."   required className="form-control"
                    onChange={(e)=>{

                        setheading(e.target.value);

                    }}/> */}
                
                </div>
            
                    {/* <TextField fullWidth label="fullWidth" id="fullWidth" /> */}

                <div style={fromun}>
                    <TextField fullWidth label="House Number" id="houseNumber" required className="form-control"
                    onChange={(e)=>{

                        sethouseNumber(e.target.value);

                    }}/>

                    {/* <label style={text} for="name">House Number </label>
                    <input style={textStyle} type="text"  id="houseNumber"  placeholder="No. ###"   required className="form-control"
                    onChange={(e)=>{

                        sethouseNumber(e.target.value);

                    }}/> */}
                    
                </div>
            
            
                <div style={fromun}>
                    <TextField fullWidth label="Street" id="street" required className="form-control"
                    onChange={(e)=>{

                        setstreet(e.target.value);

                    }}/>

                    {/* <label style={text} for="name">Street :--------</label>
                    <input  type="text" style={textStyle} id="street"  placeholder="Enter hear..."   required className="form-control"
                    onChange={(e)=>{

                        setstreet(e.target.value);

                    }}/> */}
                    
                </div>      
            
            
            <div style={fromun}>
                    <TextField fullWidth label="City" id="city" required className="form-control"
                onChange={(e)=>{

                    setcity(e.target.value);

                }}/>

                {/* <label style={text} for="name">City  :-----------</label>
                <input style={textStyle} type="text"  id="city"  placeholder="Enter hear..."   required className="form-control"
                onChange={(e)=>{

                    setcity(e.target.value);

                }}/> */}
                
            </div>      


                <div style={fromun}>
                    <TextField fullWidth label="Telephone Number" id="telephoneNumber"  inputProps={{ maxLength: 10 }} placeholder="eg:-0112345678"   required className="form-control"
                    onChange={(e)=>{

                        settelephoneNumber(e.target.value);

                    }}/>
                    
                </div>
            
            
                <div style={fromun}>
                    <TextField fullWidth label="Mobile Number" id="mobileNumber" inputProps={{ maxLength: 10 }}placeholder="eg:-0712345678"   required className="form-control"
                    onChange={(e)=>{

                        setmobileNumber(e.target.value);

                    }} />

                    {/* <label style={text} for="name">Mobile Number :</label>
                    <input style={textStyle} type="text"  id="mobileNumber" maxlength="10" placeholder="eg:-0712345678"   required className="form-control"
                    onChange={(e)=>{

                        setmobileNumber(e.target.value);

                    }}/> */}
                    
                </div>           
            
            
                <div style={fromun}>
                        <TextField fullWidth label="Description" id="Description" required className="form-control"
                    onChange={(e)=>{

                        setDescription(e.target.value);

                    }}/>
                        
                    {/* <label style={text} for="name">Description   :----</label>
                    <input style={textStyle} type="text"  id="Description"  placeholder="Enter hear..."   required className="form-control"
                    onChange={(e)=>{

                        setDescription(e.target.value);

                    }}/> */}
                    
                </div>           
            
            
            <div style={fromun}>
                    <TextField fullWidth label="Price" id="price" placeholder="Rs."   required className="form-control"
                onChange={(e)=>{

                    setprice(e.target.value);

                }}/>
                    
                {/* <label style={text} for="name">Price  :-----------</label>
                <input style={textStyle} type="text"  id="price"  placeholder="Rs."   required className="form-control"
                onChange={(e)=>{

                    setprice(e.target.value);

                }}/> */}
                
            </div>           
               
                <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Submit</Button>
            
            </form>
        </div>
        </Paper>
    </Grid>

    )


}

export default AddSale;