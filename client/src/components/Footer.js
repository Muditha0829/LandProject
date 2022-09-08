 import {Typography,Box,Paper,Container} from "@mui/material";

export default function Footer() {
    return (
      <Paper sx={{marginTop: 'calc(10% + 60px)',
      width: '100%',
      backgroundColor:'#1976d2',
      position: 'fixed',
      bottom: 0,
      width: '100%'
      }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my:1
            }}
          >
          </Box>
  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="white">
              Copyright ©2022. &reg; Limited
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }