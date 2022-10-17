import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Link,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Logo from './../../images/SignIn&SignUp/sliit_logo.png';
import axios from "axios";
// import LoginNav from './LoginNav/LoginNav';
import Box from "@mui/material/Box";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import validation, { checkValidation } from "./Validation";

// const paperStyle={padding:20, height:'auto', width:"80%", margin:'50px auto'};
// const textStyle={margin:'0px 0px 20px 0px'};
// const btnStyle={margin:'8px 0'};
// const bottomText={margin:'10px 0px 10px 0px'};
// const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
//                   backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
//                 };
const rentalType = [
  'House',
  'Apartment',
  'Land',
  'Commercial',
  'Bungalow',
  'Vlla',
  'Annexe',
  'Rooms'
]

const AddRental = () => {
  const navigate = useNavigate();

  const [rental, setRental] = useState({
    type: "",
    town: "",
    street: "",
    heading: "",
    description: "",
    floorArea: "",
    nearBus: "",
    nearTrain: "",
    minTerm: "",
    owner: "",
    name: "",
    email: "",
    number: "",
    PriceRS: "",
    noOfDay: "",
    priceForeign: "",
    perMonth: "",
    availability: "",
    userID: localStorage.getItem('userID')
  });

  const {
    type,
    town,
    street,
    heading,
    description,
    floorArea,
    nearBus,
    nearTrain,
    minTerm,
    name,
    email,
    number,
    PriceRS,
    noOfDay,
    priceForeign,
    perMonth,
    availability,
    owner,
    userID
  } = rental;

  const handleChange = (e) => {
    setRental({ ...rental, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if("clear" != checkValidation(rental)){
      toast.error(checkValidation(rental));
    }else{
      await axios.post('http://localhost:4500/rental/', rental).then(() => {
        console.log("Rental Ad successfully Added.");
        window.location = "all-rental";
      }).catch((err) => {
          alert(err);
      });  
    }                     
  }

  return (
    <Paper sx={{ mt: 4, mx: 4, p: 2, bgcolor: "#e1e6f5" }}>
      <ToastContainer position={"top-center"}/>
      <form onSubmit={e => onSubmit(e)}>
        <Grid>
          <Typography textAlign="center" sx={{ mb: 4 }} variant="h3">
            Add Rental Post
          </Typography>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Type</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={type}
                  label="Type"
                  onChange={handleChange}
                >
                  {
                    rentalType.map((rType) => {
                      return(
                        <MenuItem value={rType} key={rType}>{rType}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Town/City</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextField
                label="Town/City"
                type="text"
                name="town"
                fullWidth
                
                value={town}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Street</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextField
                label="Street"
                type="text"
                name="street"
                fullWidth
                
                value={street}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Heading</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextField
                label="Heading"
                type="text"
                name="heading"
                fullWidth
                
                value={heading}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Description</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={6}
                placeholder="Insert your Description"
                style={{ width: "99%" }}
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider />

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Extra Details</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9} container direction="column">
            <Grid sx={{ my: 1 }} container direction="row">
              <Grid xs={12} sm={6} md={3}>
                <Box>
                  <Typography>Floor Area</Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} md={9}>
                <Box>
                  <TextField
                    label="Floor Area"
                    type="text"
                    name="floorArea"
                    fullWidth
                    
                    value={floorArea}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid sx={{ my: 1 }} container direction="row">
              <Grid xs={12} sm={3} md={3}>
                <Box>
                  <Typography>Distance to nearest Bus Station</Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={9} md={9}>
                <Box>
                  <TextField
                    label="nearest Bus Station"
                    type="text"
                    name="nearBus"
                    fullWidth
                    
                    value={nearBus}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid sx={{ my: 1 }} container direction="row">
              <Grid xs={12} sm={3} md={3}>
                <Box>
                  <Typography>Distance to nearest Train Station</Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={9} md={9}>
                <Box>
                  <TextField
                    label="nearest Train Station"
                    type="text"
                    name="nearTrain"
                    fullWidth
                    
                    value={nearTrain}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Rental Details</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9} container direction="row">
            <Grid xs={12} sm={6} md={3}>
              <Box>
                <Typography>Minimum Term</Typography>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={9}>
              <TextField
                label="Minimum Term"
                type="text"
                name="minTerm"
                fullWidth
                
                value={minTerm}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Price/Rate(Rs)</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9} container direction="row">
            <Grid xs={12} sm={7} md={7} sx={{ px: 2 }}>
              <TextField
                label="Price"
                type="text"
                name="PriceRS"
                fullWidth
                
                value={PriceRS}
                onChange={handleChange}
              />
            </Grid>

            <Grid xs={12} sm={5} md={5} sx={{ px: 2 }}>
              <FormControl fullWidth>
                <InputLabel>No Of Days</InputLabel>
                <Select
                  name="noOfDay"
                  value={noOfDay}
                  label="No Of Days"
                  onChange={handleChange}
                >
                  <MenuItem value={"1 Day"}>1 Day</MenuItem>
                  <MenuItem value={"2 Day"}>2 Day</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Price/Rate</Typography>
            </Box>
          </Grid>

          <Grid sx={{ px: 2 }} xs={12} sm={9} md={9} container direction="row">
            <Grid sx={{ px: 2 }} xs={12} sm={6} md={6}>
              <TextField
                  label="Price in USD"
                  type="text"
                  name="priceForeign"
                  fullWidth
                  
                  value={priceForeign}
                  onChange={handleChange}
                />
            </Grid>

            <Grid sx={{ px: 2 }} xs={12} sm={6} md={6}>
              <FormControl fullWidth>
                <InputLabel>Per Month</InputLabel>
                <Select
                  name="perMonth"
                  value={perMonth}
                  label="Per Month"
                  onChange={handleChange}
                >
                  <MenuItem value={"1 Month"}>1 Month</MenuItem>
                  <MenuItem value={"2 Month"}>2 Month</MenuItem>
                  <MenuItem value={"4 Month"}>4 Month</MenuItem>
                  <MenuItem value={"8 Month"}>8 Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Availability</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9} container direction="row">
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                name="availability"
                value={availability}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value={"Available now"}>Available now</MenuItem>
                <MenuItem value={"Not Available"}>Not Available</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>
                Are you the owner, agent, or developer of this propety?
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9} container direction="row">
            <FormControl>
              {/* <FormLabel>Owner</FormLabel> */}
              <RadioGroup name="owner" value={owner} onChange={handleChange} row>
                <FormControlLabel
                  sx={{ mx: 2 }}
                  value="owner"
                  control={<Radio />}
                  label="Owner"
                />
                <FormControlLabel
                  sx={{ mx: 2 }}
                  value="agent"
                  control={<Radio />}
                  label="Agent"
                />
                <FormControlLabel
                  sx={{ mx: 2 }}
                  value="developer"
                  control={<Radio />}
                  label="Developer"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Divider />

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Contact Name</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextField
                label="Contact Name"
                type="text"
                name="name"
                fullWidth
                
                value={name}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>E-mail</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextField
                label="E-mail"
                type="text"
                name="email"
                fullWidth
                
                value={email}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ my: 3 }} container direction="row">
          <Grid xs={12} sm={3} md={3}>
            <Box>
              <Typography>Contact Number</Typography>
            </Box>
          </Grid>

          <Grid xs={12} sm={9} md={9}>
            <Box>
              <TextField
                label="Contact Number"
                type="text"
                name="number"
                fullWidth
                
                value={number}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid sx={{ ml: 6, mt: 3 }}>
          <FormControlLabel
            control={<Checkbox />}
            label="I confirm that I am the legal owner of this property and understand that providing false information about the ownership is a criminal offence and can lead to prosecution."
          />
        </Grid>

        <Grid>
          <Box textAlign="center" sx={{ mt: 3 }}>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </Grid>
      </form><button onClick={(e) => onSubmit(e)}>test</button>
    </Paper>
    
  );
};

export default AddRental;
