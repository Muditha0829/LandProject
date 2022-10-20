import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MyWantedAdStore = () => {

    const [wanted, setWanted] = useState([]);

    useEffect(() => {
        loadHeader();
    }, []);

    const loadHeader = async () => {
        const result = await axios.get("http://localhost:5000/web/");
        setWanted(result.data);
        console.log(result.data)
    } 

    const deleteAd = async id => {
        alert("Are you sure you want to delete this Ad?");
        await axios.delete("http://localhost:5000/web/delete/" + id);
        loadHeader();
    }

    const [searchText, setSearchText] = useState('');




    const handlesearchArea = value => {
        setSearchText(value);
           
    }


    
    return (
        <div>

            <Box sx={{ py: 2 }} style={{ backgroundColor: 'lightblue' }}>        
                <center><label style={{ fontSize: "40px" }}>My Wanted Ad Store</label></center>
            </Box>

            {
                wanted.map((wtd, key) => {
                    return(
                        <>
        
                            <Stack sx={{mr: 4}}>

                            <Card sx={{ width: "100%", bgcolor: "#cad5e8", height: "auto", m:2, p: 2 }} >

                                <Stack direction="colomn" justifyContent="space-between" >  

                                    <Grid xs={6}>

                                        <Typography variant="h5">Heading - {wtd.adHeading}</Typography>

                                        <Typography variant="h5">Town/City/Street - {wtd.town}</Typography>

                                        <Typography variant="h5">Location(s) - {wtd.location}</Typography>

                                        <Typography variant="h5">Description - {wtd.description}</Typography>

                                    </Grid>

                                    <Grid  xs={6}>

                                        <Link to={`/specific-ad/${wtd._id}`}><Button variant="contained" sx={{ mb: 2}}>Show</Button></Link>

                                    </Grid>    

                                </Stack>

                                <Stack sx={{ mt: 3 }} >

                                    <Box display="flex" justifyContent="flex-end" >
                                        <Grid sx={{ mx: 1 }}>
                                            
                                            <Link to={`/edit-header/${wtd._id}`}><Button  variant="outlined" startIcon={<EditIcon />} sx={{ mb: 2}} >Edit</Button></Link>
                                        </Grid>

                                        <Grid sx={{ mx: 1 }}>
                                            <Button  variant="outlined" startIcon={<DeleteIcon />} sx={{ mb: 2}} onClick={() => deleteAd(wtd._id)}>Delete</Button>
                                        </Grid>
                                        

                                    </Box>

                                </Stack>

                                </Card>

                            </Stack>


      
                        </>
                    )
                })
            }
                        </div>
                    )
                } 

export default MyWantedAdStore;

