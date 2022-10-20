


// import { Grid, Paper } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import ApexCharts from "react-apexcharts";
// //import Footer from "../Footer";

// const WantedAdsReport = () => {

//     const [rentalData, setRentalData] = useState([]);

//     useEffect(()=>{
//         loadData();
//     },[]);

//     const loadData = async () => {
//         await axios.get('http://localhost:4500/rental/').then((res) => {
//             setRentalData(res.data);    
//             if(res.data){
//                 calculateTypes(res.data);
//             }
//         }).catch((err) => {
//             alert(err);
//         })
//     }

//     const [itm1, setItm1] = useState(0);
//     const [itm2, setItm2] = useState(0);
//     const [itm3, setItm3] = useState(0);
//     const [itm4, setItm4] = useState(0);
//     const [itm5, setItm5] = useState(0);
//     const [itm6, setItm6] = useState(0);
//     const [itm7, setItm7] = useState(0);
//     const [itm8, setItm8] = useState(0);

//     const calculateTypes = (data) => {
//         data.forEach((data) => {
//             switch(data.type){
//                 case 'House':
//                     setItm1(itm1 + 1);
//                     break;
//                 case 'Apartment':
//                     setItm2(itm2 + 1);
//                     break;
//                 case 'Land':
//                     setItm3(itm3 + 1);
//                     break;
//                 case 'Commercial':
//                     setItm4(itm4 + 1);
//                     break;
//                 case 'Bungalow':
//                     setItm5(itm5 + 1);
//                     break;
//                 case 'Vlla':
//                     setItm6(itm6 + 1);
//                     break;
//                 case 'Annexe':
//                     setItm7(itm7 + 1);
//                     break;
//                 case 'Rooms':
//                     setItm8(itm8 + 1);
//                     break;
//             } 
//         })
//     }

//     return(
//         <div>
//             <h1>Rental Report</h1>
//             <Paper sx={{ mt: 4, mr: 4, ml: 4,  p: 2, bgcolor: "#e1e6f5" }}>
//                 <Grid container spacing={1}>
//                     <Grid item>
//                         <ApexCharts 
//                             type="pie"
//                             width={1349}
//                             height={550}
//                             series={[ itm1, itm2, itm3, itm4, itm5, itm6, itm7, itm8 ]}
//                             options={{
//                                 title: {text: "All Rental Report"},
//                                 noData: {text: "No Data to Fill Pie Chart"},
//                                 labels: ['House', 'Apartment', 'Land', 'Commercial', 'Bungalow', 'Vlla', 'Annexe', 'Rooms']
//                             }}
//                         >
//                         </ApexCharts>
//                     </Grid>
//                 </Grid>
//             </Paper>
//         </div>
//     )

// }

// export default WantedAdsReport;