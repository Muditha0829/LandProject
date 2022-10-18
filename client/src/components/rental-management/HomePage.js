import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img1 from "./Untitled.jpg";
import { Container } from "@mui/system";
import { Divider, Grid, Pagination } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {

    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4500/rental").then((res) => {
            setRentals(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <Container maxWidth="xl" sx={{ justifyContent: "center" }}>
            <ToastContainer position={"top-center"}/>

            <center>
                <Typography sx={{ pt: 4, color: "darkblue" }} variant="h4" component="h2">Rental Home Page</Typography>

                <Pagination sx={{ float: "right", pt: 3 }} count={10} variant="outlined" shape="rounded" />

                <Grid container spacing={1} sx={{ pt: 2 }}>
                    {
                        rentals.map((rental, i) => {
                            return(
                                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                    <Card  sx={{ maxWidth: 350 }}>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image={img1}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom align="justify" variant="body2" component="h5">
                                                {rental.heading.length < 30 ? rental.heading : rental.heading.substring(0, 30) + "..."}
                                            </Typography>
                                            <Typography gutterBottom align="justify" variant="body2" component="h5">
                                                {rental.type}  
                                            </Typography>
                                            <Typography gutterBottom align="justify" variant="body2" component="h5">
                                                {rental.PriceRS}  
                                            </Typography>
                                            <Divider/>
                                            <Typography sx={{ height: 70, pt: 2 }} variant="body2" color="text.secondary" align="justify">
                                            {rental.description.length < 150 ? rental.description : rental.description.substring(0, 150) + "..."}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            {/* <Button size="small">Rent</Button> */}
                                            <Button size="small">More Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </center>
        </Container>     
    )
}

export default HomePage;