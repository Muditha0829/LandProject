import { Box, Button, Grid, InputLabel, Paper, TextField, colors, FormGroup, FormControlLabel, Checkbox, Card, CardMedia, CardActions, IconButton, CardContent, Stack } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';



export default function UpdateMyProfile() {

    let history = useHistory();
    const { id } = useParams();

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

    const [loadingFile, setLoadingFile] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);

    useEffect(() => {
        loadHeader();
      }, []);
  
    const loadHeader = async () => {
        const result = await axios.get("http://localhost:5000/profileweb/get/" + id);
        setProfile(result.data);
    }  

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
            return "Mobile Number Invalid."
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
                await axios.put('http://localhost:5000/profileweb/update/' + id, profile).then(() => {
                    alert("My Profile Updated Successfully.");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("");
            }          
            
          }catch(error){
            console.log(error);
          }
        }

    // const onSubmit = async e => {
    //     e.preventDefault();
    //     if(true){
    //         await axios.put('http://localhost:5000/profileweb/update/' + id, profile).then(() => {
    //             alert("My Profile Updated Successfully.");
    //         }).catch((err) => {
    //             alert(err);
    //         })
    //         history.push("");
    //     }                  
    // }

    const search = useLocation().search;
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: '',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

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

    return(
        
        <>
            <div style={{ backgroundColor: 'lightblue' }}>
            <ToastContainer position={"top-center"}/>
            <div class="product-include" style={{ maxWidth: 800, margin: "auto" }}>
            
            <Box sx={{ py: 2 }} style={{ backgroundColor: '#1e88e5' }}>        
                <center><label style={{ fontSize: "40px" }}>Update My Profile</label></center>
            </Box>

                <form onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <Box >
                                <TextField label="First Name" type="text" name="firstName" fullWidth  value={firstName}
                                onChange={ e => onInputChange(e)} />
                                                      
                                <TextField sx={{ mt: 4 }} label="Last Name" type="text" name="lastName" fullWidth  value={lastName}
                                onChange={ e => onInputChange(e)} />     
                                                      
                                <TextField sx={{ mt: 4 }} label="Home Address" type="text" name="homeAddress" fullWidth  value={homeAddress}
                                onChange={ e => onInputChange(e)} />  
                                                       
                                <TextField sx={{ mt: 4 }} label="Contact Number" type="text" name="mobile" fullWidth  value={mobile}
                                onChange={ e => onInputChange(e)} />     
                                                     
                                <TextField sx={{ mt: 4 }} label="Email" type="text" name="email" fullWidth  value={email}
                                onChange={ e => onInputChange(e)} /> 
                                                      
                                <TextField sx={{ mt: 4 }} label="Person Type" type="text" name="personType" fullWidth  value={personType}
                                onChange={ e => onInputChange(e)} /> 
                        </Box>
                        
                    </div>

                    

                    
                    <div className="form-group">
                        <h6>Update Profile Picture Here</h6>
                        
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
                        
                        <Card sx={{ mt: 2 , height: "150px" , width: "150px" }}>
                            <CardMedia
                                component="img"
                                height="150px"
                                image={ imgURL }/>

                        </Card>
                        
                        

                    </div>

                    <>
                        <table>
                            <tr>
                                <td>
                                <Stack direction="row" spacing={2}>
                                    <Button type = "submit" variant="contained" onclick="" >Update My Profile</Button>
                                    

                                </Stack>
                                </td>
                            </tr>
                        
                        </table>
                    </> 
                </form>
            </div>
            </div>
        </>
    );
}