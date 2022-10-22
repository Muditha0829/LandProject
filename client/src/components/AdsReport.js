import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable'

// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const updateUpUser= (event,userId) =>{
    console.log("Pressed Up")
}

const updateDownUser= (event,userId) =>{
console.log("Pressed Down")
}

//  //pdf generating
//  const jsPdfGenerator = () => {

//   //new document in jspdf
//   var doc = new jsPdf('p','pt');

//   doc.text(210,30,"Wanted_Ads_Report")
//   doc.autoTable({  html:'#my-pdf' })

//   doc.autoTable({
//     columnStyles: { europe: { halign: 'center' } }, 
//     margin: { top: 10 },
//   })

//   //save the pdf
//   doc.save("Wanted_Ads_Report.pdf");
// }

const columns = [
  { field: 'adtype', headerName: 'Ad-Type', width: 180 },
  { field: 'town', headerName: 'Town', width: 140 },
  { field: 'location', headerName: 'Location', width: 140 },
  { field: 'adHeading', headerName: 'Ad-Heading', width: 240 },
  { field: 'name', headerName: 'Name', width: 190 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 200 }
  // {
  //   headerName:"Update Movie",
  //   field: "Edit",
  //   width: 150,
  //   renderCell: (cellValues) => {
  //     return (
  //       <div>
  //           <Link to={`update-movie/${cellValues.row._id}`}>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={(event) => {
  //           updateUpUser(event, cellValues.row.role,cellValues.row._id);
  //           console.log(cellValues.row._id)
  //         }}>
  //             Update
  //       </Button></Link>
  //       </div>

  //     );
  //   }
  // },{
  //   headerName:"Delete Movie",
  //   field: "Delete",
  //   width: 120,
  //   renderCell: (cellValues) => {
  //     return (
  //       <Button
  //         variant="contained"
  //         color="error"
  //         onClick={(event) => {
  //           axios.delete(`http://localhost:5000/movie/delete/${cellValues.row._id}`).then((res)=>{
  //             alert("Deleted");
  //             window.location = ("/dashboard/movie-list");
  //           }).catch((err)=>{
  //               alert(err.message)
  //           })
  //         }}
          
  //       >
  //         Delete
  //       </Button>
  //     );
  //   }
  // }

];

function AdsReport() {
    

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    loadMovie();
  },[])

  const loadMovie = async() =>{
   await axios.get("http://localhost:5000/web/").then((res) => 
    setTableData((res.data)))

  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 20;
    const doc = new jsPdf(orientation, unit, size);

    doc.setFontSize(12);

    const title = "Wanted Ads Report";
    const headers = [["adtype", "Town", "location", "adHeading", "name", "email", "mobile"]];

    const data = tableData.map(data=> [ 
                    data.adtype, 
                    data.town, 
                    data.location, 
                    data.adHeading,
                    data.name,
                    data.email,
                    data.mobile
                ]);

    let content = {
      startY: 90,
      head: headers,
      body: data,
    };
    
    doc.text(title, marginLeft, 50);
    doc.autoTable(content);
    doc.save("Wanted_Ads_Report.pdf");
  }

  return (
    <div style={{ backgroundColor: "lightblue" }}>
          <center><h3>Wanted-Ads Report</h3></center>
          <Button onClick={() => exportPDF()} sx={{ width: "150px" , height: "50px", ml: 4, mb: 3 }} variant="contained">Generate PDF</Button>
          
      <center>
        
    <div style={{ height: 565, width: '95%' }}>
      <DataGrid
        
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // customToolbarSelect
      />
      
    </div></center>
    
    </div>
  );
}

export default AdsReport;