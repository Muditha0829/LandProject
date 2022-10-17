import { Button, Grid, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainPageRental = () => {

    const goToAddRental = () => {
        window.location = "add-rental";
    }

    const allRental = () => {
        window.location = "all-rental";
    }

    const goToHomePage = () => {
        window.location = "home-page";
    }

    const goSingleRental = () => {
        window.location = "single-rental";
    }
    const goRentalReport = () => {
        window.location = "rental-report";
    }


    return(
        <div>
            <ToastContainer position={"top-center"}/>
            <Stack sx={{ width: "100%", textAlign: "center", height: "450px", mt: "8%", bgcolor: "#e6e3e3" }}>
            <Grid sx={{mt: "40px" }}>
                    <Box>
                        <Button onClick={goToHomePage} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                            Home Page
                        </Button>
                    </Box>
                </Grid>

                <Grid>
                    <Box>
                        <Button onClick={goToAddRental} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                            Add Rental
                        </Button>
                    </Box>
                </Grid>

                <Grid>
                    <Button onClick={goSingleRental} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                        My Rental
                    </Button>
                </Grid>

                <Grid>
                    <Button onClick={allRental} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                        All User Rentals
                    </Button>
                </Grid>

                <Grid>
                    <Button onClick={goRentalReport} sx={{ width: "500px", px: 6, py: 2, my: 1  }} variant="contained">
                    Generate Report
                        </Button>
                </Grid>                
            </Stack>
        </div>
    )
}

export default MainPageRental;