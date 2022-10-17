import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import './styles.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import "jspdf-autotable";

function ViewRentals() {
    const [tableData, setTableData] = useState([]);
    const [rentalID, setRentalID] = useState();

    useEffect(()=>{
        loadData();
    },[])

    const loadData = async () => {
        await axios.get('http://localhost:4500/rental/').then((res) => {
            setTableData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    const [open, setOpen] = useState(false); 

    const handleClickOpen = (id) => {
        setOpen(true);
        setRentalID(id);
    }

    const onCancel = () => {
        setOpen(false);
    };

    const deleteDeliver = async () => {
        await axios.delete("http://localhost:4500/rental/" + rentalID);
        loadData();
        setOpen(false);
    }

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
    
        const marginLeft = 20;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(12);
    
        const title = "Rental Data Report";
        const headers = [["Type", "Town", "Number", "Availability", "Owner"]];
    
        const data = tableData.map(data=> [ 
                        data.type, 
                        data.town, 
                        data.number, 
                        data.availability,
                        data.owner
                    ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Rental_data_report.pdf")
      }

  return (
      <div>
        <ToastContainer position={"top-center"}/>

        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Please confirm Here
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button sx={{ bgcolor: "#e6eded" }} onClick={onCancel}>Cancel</Button>
            <Button sx={{ bgcolor: "#e6eded" ,color: "red" }} onClick={() => deleteDeliver()} autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>

        <table id="table" style={{ marginTop: "20px" }}>
        <button onClick={() => exportPDF()}>pdf</button>
            <thead>
                <tr>
                    <th scope="col">heading</th>
                    <th scope="col">type</th>
                    <th scope="col">town</th>
                    <th scope="col">number</th>
                    <th scope="col">availability</th>
                    <th scope="col">Update</th>                
                    <th scope="col">Delete</th>
                </tr>
            </thead>
        <tbody>
        {
            tableData.map((rental, index) => (
                <tr>
                    <td style={{ fontSize: "13px" }}><center><Link to={`/dashboard/single-rental/${rental._id}`}>{rental.heading}</Link></center></td>   
                    <td style={{ fontSize: "13px" }}><center>{rental.type}</center></td>
                    <td style={{ fontSize: "13px" }}><center>{rental.town}</center></td>
                    <td style={{ fontSize: "13px" }}><center>{rental.number}</center></td> 
                    <td style={{ fontSize: "13px" }}><center>{rental.availability}</center></td>   
                    <td style={{ fontSize: "13px" }} scope="col">
                        <center>
                            <Button size='small' sx={{ textDecoration: "none" }} variant='contained'><Link style={{ textDecoration: 'none', color: 'white' }} to={`/dashboard/update-rental/${rental._id}`}>Update</Link></Button>
                        </center>
                    </td>        
                    <td style={{ fontSize: "13px" }} scope="col">
                        <center>
                            <Button size='small' sx={{ bgcolor: "red" }} variant='contained' onClick={() => {handleClickOpen(rental._id)}}>Delete</Button>
                        </center>
                    </td>
                </tr> 
            ))
        }
        </tbody>
        </table>
      </div>
    );
}

export default ViewRentals;