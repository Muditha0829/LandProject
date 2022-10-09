import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const updateUpUser= (event,userRole,userId) =>{
  // console.log(userRole)

  if(userRole==="admin"){
    alert('Cannot promote more')
  }else if(userRole==="user"){
    const updatedRole ='SystemUser'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
    
  }else{
    const updatedRole ='admin'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
  }
}

const updateDownUser= (event,userRole,userId) =>{

  if(userRole==="admin"){
    const updatedRole ='SystemUser'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
  }else if(userRole==="SystemUser"){
    const updatedRole ='user'
    const updatedUser = {
      role:updatedRole
    }

    axios.put(`http://localhost:4500/user/edit/${userId}`, updatedUser).then(()=>{
    }).catch((err)=>{
      alert(err)
    })
  }else{
    alert('Cannot demote more')
  }
}

const columns = [
  { field: '_id', headerName: 'UserID',width:240},
  { field: 'firstName', headerName: 'FirstName'},
  { field: 'lastName', headerName: 'LastName'},
  { field: 'city', headerName: 'City'},
  { field: 'province', headerName: 'Province', width: 180},
  { field: 'email', headerName: 'Email', width: 240 },
  { field: 'role', headerName: 'Role' },
  {
    headerName:"Change Role",
    field: "Edit",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
        <Button
          variant="text"
          color="primary"
          onClick={(event) => {
            updateUpUser(event, cellValues.row.role,cellValues.row._id);
            // console.log(cellValues.row._id)
          }}>
          <ArrowUpwardIcon/>
        </Button>

        <Button
        variant="text"
        color="primary"
        onClick={(event) => {
          updateDownUser(event, cellValues.row.role,cellValues.row._id);
          // console.log(cellValues.row._id)
        }}
        >
        <ArrowDownwardIcon/>
        </Button>
        </div>

      );
    }
  },{
    headerName:"Delete User",
    field: "Delete",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            axios.delete(`http://localhost:4500/user/delete/${cellValues.row._id}`).then((res)=>{
              alert("Deleted");
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

function AdminSettings() {

  const [tableData, setTableData] = useState([])

    axios.get("http://localhost:4500/user").then((res) => 
    setTableData((res.data)))

    

  return (
      <div>
          
          <center><h3>User Table</h3></center>
      
    <div style={{ height: 500, width: "auto" }}>

      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        // customToolbarSelect
      />
    </div>
    </div>
  );
}

export default AdminSettings;