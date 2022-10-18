import { Button, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
// import { Link } from "react-router-dom";


const MainPageSale = () => {

    const goToAddSale = () => {
        window.location = "addSale";
    }

    const allSale = () => {
        window.location = "saleList";
    }

    const saleReport = () => {
        window.location = "sale-report";
    }

    return(
        <div>
            <Stack sx={{ width: "100%", textAlign: "center", height: "400px", mt: "8%", bgcolor: "#e6e3e3" }}>
                <Grid sx={{mt: "40px" }}>
                    <Box>
                        <Button onClick={goToAddSale} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                            Add Sale
                        </Button>
                    </Box>
                </Grid>

            

                <Grid>
                    <Button onClick={allSale} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                    All Sales
                    </Button>
                </Grid>

                <Grid>
                    <Button onClick={saleReport} sx={{ width: "500px", px: 6, py: 2, my: 1 }} variant="contained">
                    Generate Report
                        </Button>
                </Grid>
            </Stack>
        </div>
    )
}

export default MainPageSale;