import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';
import { grey, red } from '@mui/material/colors';
import { Link, useLocation } from 'react-router-dom';
import { blueGrey, lightBlue } from '@material-ui/core/colors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCourse = () => {
    const [check, setCheck] = useState(false);
    
    const [fileIN, setFileIN] = useState(false);
    const [thumbIN, setThumbIN] = useState(false);
    const [videoIN, setVideoIN] = useState(false);

    const [type, setType] = useState();

    const [course, setCourse] = useState({
        adtype: "", 
        town: "",
        location: "",
        adHeading:"",
        description: "",
        name: "",
        email: "",
        mobile: "",
        imgURL: "",
        iName: ""
    });

    const { adtype, town, location, adHeading, description, name, email, mobile, imgURL, iName } = course;

    const onInputChange = e => {
        setCourse({...course, [e.target.name]: e.target.value});
    }

    const search = useLocation().search;
    const [selected, setSelected] = useState();

    useEffect(() => {
    })

    const [loadingFile, setLoadingFile] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);

    const uploadCloud = async (type)  => {

        let formData = new FormData();

        setType(type);

        Array.from(files).forEach(image => {
            formData.append("file", image);
        });

        formData.append("upload_preset", "Chat-App");
        formData.append("cloud_name", "dbnnylzao");

        if(type === "file"){
            setLoadingFile(true);
            setThumbIN(false);
            setFileIN(true);
            await axios.post('https://api.cloudinary.com/v1_1/dbnnylzao/auto/upload', formData)
            .then((res) => {
                course.fUrl = res.data.url;
                setLoadingFile(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });
        }else if(type === "image") {
            setLoadingImg(true);
            setThumbIN(true);
            await axios.post('https://api.cloudinary.com/v1_1/dbnnylzao/image/upload', formData)
            .then((res) => {
                course.imgURL = res.data.url;
                setLoadingImg(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });

        }else if(type === "video") {
            setLoadingVideo(true);
            setThumbIN(false);
            setVideoIN(true);
            await axios.post('https://api.cloudinary.com/v1_1/dbnnylzao/video/upload', formData)
            .then((res) => {
                course.vUrl = res.data.url;
                setLoadingVideo(false);
                setCheck(true);
            })
            .catch((err) => {
                alert(err);
            });
            
        }            
    }

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: '',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    alt="img"
                />
            </div>
        </div>
    ));

    const formValidation = (data) =>{
        const { adtype, town, location, adHeading, description, name, email, mobile, imgURL, iName } = course;

        if (data.adtype === ""){
            return "Ad-Type cannot be Null";
        }
        if (data.town === ""){
            return "Town cannot be Null";
        }
        if (data.location === ""){
            return "Location cannot be Null";
        }
        if (data.adHeading === ""){
            return "Ad-Heading cannot be Null";
        }
        if (data.description === ""){
            return "Description cannot be Null";
        }
        if (data.name === ""){
            return "Name cannot be Null";
        }
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)){
            return "Email Is Invalid."
        } 
        if(data.mobile == "" || !/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(data.mobile)){
            return "Mobile Number Is Invalid."
        }  
        if (data.iName === ""){
            return "Image name cannot be Null";
        }
        // else if(!orderID.match(/^([A-Z]{2,2})([0-9]{4,4})$/)){
        //     alert("Order ID is Invalid.")
        //   }   
        return "clear"   
        
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        try{    
            if("clear" != formValidation(course)){
                toast.error(formValidation(course));
            }else{
                await axios.post('http://localhost:5000/web/add/', course).then(() => {
                    alert("Wanted Ad Added Successfully");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("/mywanted");
            }          
            
          }catch(error){
            console.log(error);
          }
        }


    return(
        <div style={{ backgroundColor: 'lightblue' }}>
            <ToastContainer position={"top-center"}/>
            <div style={{ maxWidth: 800, margin: "auto" }}>
            <Box sx={{ py: 2 }} style={{ backgroundColor: '#1e88e5' }}>        
                <center><label style={{ fontSize: "40px" }}>Create a New Wanted Ad</label></center>
            </Box>
                
                <form onSubmit={e => onSubmit(e)}> 

                    <div className="form-group">
                        <Box >

                        <label>Ad-Type</label> 
                        <FormControl sx={{ mt: 2 }} fullWidth>

                            <InputLabel  id="demo-simple-select-label">Ad-Type</InputLabel>

                                <Select labelId="demo-simple-select-label" id="demo-simple-select" name = "adtype" value={adtype} label="City" onChange={onInputChange}>

                                    <MenuItem value={"House"}>House</MenuItem>

                                    <MenuItem value={"Room"}>Room</MenuItem>

                                    <MenuItem value={"Land"}>Land</MenuItem>

                                    <MenuItem value={"Apartment"}>Apartment</MenuItem>

                                </Select>

                            </FormControl>
                        
                            {/* <label></label>
                                <TextField sx={{ mt: 2 }} label="Ad-Type" type="text" name="adtype" fullWidth required value={adtype}
                                onChange={onInputChange} /> */}

                            <label>Town/City/Street</label>                      
                                <TextField sx={{ mt: 2 }} label="Town/City/Street" type="text" name="town" fullWidth value={town}
                                onChange={onInputChange} />     

                            <label>Location(s)</label>                   
                                <TextField sx={{ mt: 2 }} label="Location" type="text" name="location" fullWidth value={location}
                                onChange={onInputChange} />  

                            <label>Ad-Header</label>                  
                                <TextField sx={{ mt: 2 }} label="Ad-Header" type="text" name="adHeading" fullWidth value={adHeading}
                                onChange={onInputChange} />     

                            <label>Description</label>                 
                                <TextField sx={{ mt: 2 }} label="Description" type="text" name="description" fullWidth value={description}
                                onChange={onInputChange} /> 

                            <label>Conatct Name</label>          
                                <TextField sx={{ mt: 2 }} label="Contact Name" type="text" name="name" fullWidth value={name}
                                onChange={onInputChange} />  

                            <label>Contact Email</label>         
                                <TextField sx={{ mt: 2 }} label="Contact Email" type="text" name="email" fullWidth value={email}
                                onChange={onInputChange}/> 

                            <label>Contact Number</label>             
                                <TextField sx={{ mt: 2 }} label="Contact Number" type="text" name="mobile" fullWidth value={mobile}
                                onChange={onInputChange} /> 
                        </Box>
                        
                    </div>

                    {/* ----------------- Image Upload -----------------  */}

                    
                    <div className="form-group">
                        <h6>Images Related Ad</h6>
                        <Box sx={{ py: 2 }}>
                        <label>Image Name</label>
                            <TextField sx={{ mt: 2 }} label="Enter Image Name" type="text" name="iName" fullWidth value={iName}
                                onChange={onInputChange} />
                        </Box>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()}/>
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">Drop images here or click to upload.</h5>                                                    
                            </div>
                        </div>

                        <Box sx={{ width: '100%' }}>
                            { loadingImg && <LinearProgress/>}
                        </Box> 

                        {thumbIN &&
                            <aside className="thumbsContainer">
                            {thumbs}
                        </aside>}

                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => uploadCloud("image")}>Upload</Button>
                        
                    </div>

                                       
                    <table >

                    <FormGroup>
                        
                        <FormControlLabel control={<Checkbox />} required label="I confirm that all the information contained in here is true." />
                    </FormGroup>

                        <tr>
                            <td>
                               <Button sx={{ mb: 5 }} variant="contained" type='submit'>Post Ad</Button>
                            </td>
                        </tr>
                    </table>                     
                </form>
            </div>
        </div>
    )
}

export default AddCourse;