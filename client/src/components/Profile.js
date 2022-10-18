import {  Button, Grid, Paper } from "@mui/material";
import { Link } from 'react-router-dom';

const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
const btnStyle={margin:'8px 0'};



const Profile=()=>{

    // const navigate = useNavigate();

    return(
        <div>
            <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Profile</h2>
        </Grid>


        <Link to='/dashboard/myprofile' style={{textDecoration:'none'}}> <Button  color="primary" variant="contained" fullWidth style={btnStyle}>My Profile</Button></Link>
        <Link to='/dashboard/myrentals' style={{textDecoration:'none'}}> <Button href={"myrentals"} color="primary" variant="contained" fullWidth style={btnStyle}>My Rentals</Button></Link>
        <Link to='/dashboard/sale-page' style={{textDecoration:'none'}}> <Button href={"sale-page"} color="primary" variant="contained" fullWidth style={btnStyle}>Sales</Button></Link>
        <Link to='/dashboard' style={{textDecoration:'none'}}> <Button href={"/dashboard"} color="primary" variant="outlined" fullWidth style={btnStyle}>Go Back</Button></Link>
        
      </Paper>
        </div>
    )
}

export default Profile;