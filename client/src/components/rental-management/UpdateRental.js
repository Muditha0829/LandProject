import {
    Button,
    Divider,
    Grid,
    Paper,
    TextareaAutosize,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import Box from "@mui/material/Box";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
import { checkValidation } from "./Validation";

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
  
  const UpdateRental = () => {
    const navigate = useNavigate();

    const allRental = () => {
      window.location = "/dashboard/all-rental";
    }
  
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
      availability: ""
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
      owner
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
      if("clear" != checkValidation(rental)){
        toast.error(checkValidation(rental));
      }else{
        await axios.put('http://localhost:4500/rental/' + id, rental).then(() => {
          toast.success("Rental Ad successfully Updated.");
          alert("Rental Updated successfully");
          navigate("/dashboard/all-rental");
      }).catch((err) => {
          alert(err);
      })   
      }                     
    }
  
    return (
      <Paper sx={{ mt: 4, mx: 4, p: 2, bgcolor: "#e1e6f5" }}>
        <ToastContainer position={"top-center"}/>
        <form onSubmit={e => onSubmit(e)}>
          <Grid>
            <Typography textAlign="center" sx={{ mb: 4 }} variant="h3">
              Update Rental Post
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
                  required
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
                  required
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
                      required
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
                      required
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
                      required
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
                  required
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
                  required
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
                    required
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
                  required
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
                  required
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
                  required
                  value={number}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
  
          <Grid direction="row">
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button sx={{ mx: 3 }} variant="contained" type="submit">Update</Button>
              <Button onClick={allRental} sx={{ mx: 3 }} variant="contained">Cancel</Button>
            </Box>
          </Grid>
        </form>
      </Paper>
    );
  };
  
  export default UpdateRental;
  