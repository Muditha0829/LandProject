import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';




// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const updateUpUser= (event,userId) =>{
    console.log("Pressed Up")
}

// const updateDownUser= (event,userId) =>{
// console.log("Pressed Down")
// }

const columns = [
  { field: 'heading', headerName: 'heading', width: 260 },
  { field: 'street', headerName: 'Street', width: 170 },
  { field: 'city', headerName: 'City', width: 170 },
  { field: 'telephoneNumber', headerName: 'Tel Number', width: 170 },
  { field: 'price', headerName: 'Price', width: 170 }

];

function Salelist() {
    

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    loadCart();
  },[])

  const loadCart =() =>{
    axios.get("http://localhost:4500/sale/").then((res) => 
    setTableData((res.data)))

  }




    

  return (
      <div>
        <div style={{ height: 10, width: '95%' }}></div>
        <div>

          <Button variant="contained" color="success" onclick={ window.print()}>

          <Button variant="contained" color="success" onClick={ window.print()}>

            Report
          </Button>
          
        </div>
          
          <center><h3>Sale Table</h3></center>
      
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        // customToolbarSelect
      />
    </div>
    </div>
  );
}

export default Salelist;