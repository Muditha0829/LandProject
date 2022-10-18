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
{ field: '_id', headerName: 'Sale ID', width: 200 },
  { field: 'heading', headerName: 'heading', width: 260 },
  { field: 'street', headerName: 'Street', width: 170 },
  { field: 'city', headerName: 'City', width: 170 },
  { field: 'telephoneNumber', headerName: 'Tel Number', width: 170 },
  { field: 'price', headerName: 'Price', width: 170 },
  {
    headerName:"Update sale",
    field: "Edit",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <div>
            <Link to={`update-sale/${cellValues.row._id}`}>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            updateUpUser(event, cellValues.row.role,cellValues.row._id);
            console.log(cellValues.row._id)
          }}>
              Update
        </Button></Link>
        </div>

      );
    }
  },{
    headerName:"Delete sale",
    field: "Delete",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            axios.delete(`http://localhost:4500/sale/delete/${cellValues.row._id}`).then((res)=>{
              alert("Deleted");
              window.location = "/dashboard/saleList";
            }).catch((err)=>{
                alert(err.message)
            })
          }}
        >
          Delete
        </Button>
      );
    }
  }

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
          
          <center><h3>Sale Table</h3></center>
      
    <div style={{ height: 450, width: '95%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // customToolbarSelect
      />
    </div>
    </div>
  );
}

export default Salelist;