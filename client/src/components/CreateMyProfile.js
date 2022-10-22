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


const CreateMyProfile = () => {
    const [check, setCheck] = useState(false);
    
    const [fileIN, setFileIN] = useState(false);
    const [thumbIN, setThumbIN] = useState(false);
    const [videoIN, setVideoIN] = useState(false);

    const [type, setType] = useState();

    const [profile, setProfile] = useState({
        firstName: "", 
        lastName: "",
        homeAddress: "",
        mobile:"",
        email: "",
        personType: "",
        imgURL: "",
    });

    const { firstName, lastName, homeAddress, mobile, email, personType, imgURL } = profile;

    const onInputChange = e => {
        setProfile({...profile, [e.target.name]: e.target.value});
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
                profile.fUrl = res.data.url;
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
                profile.imgURL = res.data.url;
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
                profile.vUrl = res.data.url;
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
        const { firstName, lastName, homeAddress, mobile, email, personType, imgURL } = profile;

        if (data.firstName === ""){
            return "First Name cannot be Null";
        }
        if (data.lastName === ""){
            return "Last Name cannot be Null";
        }
        if (data.homeAddress === ""){
            return "Home Address cannot be Null";
        }
        if(data.mobile == "" || !/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i.test(data.mobile)){
            return "Mobile Number Is Invalid."
        } 
        
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)){
            return "Email Is Invalid."
        }  
        if (data.personType === ""){
            return "Person Type cannot be Null";
        }  
        return "clear"   
        
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try{    
            if("clear" != formValidation(profile)){
                toast.error(formValidation(profile));
            }else{
                await axios.post('http://localhost:5000/profileweb/add/', profile).then(() => {
                    alert("Profile Created Successfully");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("");
            }          
            
          }catch(error){
            console.log(error);
          }
        }

    // const onSubmit = async (e) => {
    //     e.preventDefault();

    //     try{    
    //         if(true){
    //             await axios.post('http://localhost:5000/profileweb/add/', profile).then(() => {
    //                 alert("Profile Created Successfully");
    //             }).catch((err) => {
    //                 alert(err);
    //             })
    //             window.location = (``);
    //         }             
            
    //       }catch(error){
    //         console.log(error)
    //       }
    //     }


    return(
        <div style={{ backgroundColor: 'lightblue' }}>
            <ToastContainer position={"top-center"}/>
            <div style={{ maxWidth: 800, margin: "auto" }}>
            <Box sx={{ py: 2 }} style={{ backgroundColor: '#1e88e5' }}>        
                <center><label style={{ fontSize: "40px" }}>Create Your Own Profile Here</label></center>
            </Box>
                
                <form onSubmit={e => onSubmit(e)}> 

                    <div className="form-group">
                        <Box >

                        <label>First Name</label>                     
                                <TextField sx={{ mt: 2 }} label="Enter Your First Name Here" type="text" name="firstName" fullWidth  value={firstName}
                                onChange={onInputChange} /> 

                            <label>Last Name</label>                      
                                <TextField sx={{ mt: 2 }} label="Enter Your Last Name Here" type="text" name="lastName" fullWidth  value={lastName}
                                onChange={onInputChange} />     

                            <label>Home Address</label>                   
                                <TextField sx={{ mt: 2 }} label="Enter Your Home Address Here" type="text" name="homeAddress" fullWidth  value={homeAddress}
                                onChange={onInputChange} />  

                            <label>Contact Number</label>                  
                                <TextField sx={{ mt: 2 }} label="Enter Your Contact Number Here" type="text" name="mobile" fullWidth  value={mobile}
                                onChange={onInputChange} />     

                            <label>Contact Email</label>                 
                                <TextField sx={{ mt: 2 }} label="Enter Your Email Here" type="text" name="email" fullWidth  value={email}
                                onChange={onInputChange} /> 

                            <label>Person Type</label>          
                                <TextField sx={{ mt: 2 }} label="Enter Person Type Here" type="text" name="personType" fullWidth  value={personType}
                                onChange={onInputChange} />
                        </Box>
                    </div>

                    {/* ----------------- Image Upload -----------------  */}

                    
                    <div className="form-group">
                        {/* <h6>Images Related Ad</h6>
                        <Box sx={{ py: 2 }}>
                        <label>Image Name</label>
                            <TextField sx={{ mt: 2 }} label="Enter Image Name" type="text" name="iName" fullWidth required value={iName}
                                onChange={onInputChange} />
                        </Box> */}
                        <h6>Add Profile Picture Here</h6>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()}/>
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">Drop profile picture here or click to upload.</h5>                                                    
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

                        <tr>
                            <td>
                               <Button sx={{ mb: 5 }} variant="contained" type='submit'>Create My Profile</Button>
                            </td>
                        </tr>
                    </table>                     
                </form>
            </div>
        </div>
    )
}

export default CreateMyProfile;