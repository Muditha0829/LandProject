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
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  // import Logo from './../../images/SignIn&SignUp/sliit_logo.png';
  import axios from "axios";
  // import LoginNav from './LoginNav/LoginNav';
  import Box from "@mui/material/Box";
  
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
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  // const paperStyle={padding:20, height:'auto', width:"80%", margin:'50px auto'};
  // const textStyle={margin:'0px 0px 20px 0px'};
  // const btnStyle={margin:'8px 0'};
  // const bottomText={margin:'10px 0px 10px 0px'};
  // const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
  //                   backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
  //                 };
  
  const SingleRental = () => {
    const navigate = useNavigate();

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
      userID: ""
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

    const { id } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const result = await axios.get("http://localhost:4500/rental/" + id);
        setRental(result.data);
    };
  
    const handleChange = (e) => {
      setRental({ ...rental, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async e => {
      e.preventDefault();
      // const valid = formValidation();    
      await axios.put('http://localhost:4500/rental/' + id, rental).then(() => {
          alert("Rental Updated successfully");
      }).catch((err) => {
          alert(err);
      })                   
    }
  
    return (
      <Paper sx={{ mt: 4, mx: 4, p: 2, bgcolor: "#e1e6f5" }}>
        <ToastContainer position={"top-center"}/>
        <form onSubmit={e => onSubmit(e)}>
          <Grid>
            <Typography textAlign="center" sx={{ mb: 4 }} variant="h3">
              View Rental Post
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
                  required
                  value={town}
                  
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
                  required
                  value={street}
                  
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
                  required
                  value={heading}
                  
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
                      required
                      value={floorArea}
                      
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
                      required
                      value={nearBus}
                      
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
                      required
                      value={nearTrain}
                      
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
                  required
                  value={minTerm}
                  
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
                  required
                  value={PriceRS}
                  
                />
              </Grid>
  
              <Grid xs={12} sm={5} md={5} sx={{ px: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>No Of Days</InputLabel>
                  <Select
                    name="noOfDay"
                    value={noOfDay}
                    label="No Of Days"
                    
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
                    required
                    value={priceForeign}
                    
                  />
              </Grid>
  
              <Grid sx={{ px: 2 }} xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Per Month</InputLabel>
                  <Select
                    name="perMonth"
                    value={perMonth}
                    label="Per Month"
                    
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
                <RadioGroup name="owner" value={owner}  row>
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
                  required
                  value={name}
                  
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
                  required
                  value={email}
                  
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
                  required
                  value={number}
                  
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  };
  
  export default SingleRental;
  