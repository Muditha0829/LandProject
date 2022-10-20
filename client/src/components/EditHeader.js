import { Box, Button, Grid, InputLabel, Paper, TextField, colors, FormGroup, FormControlLabel, Checkbox, Card, CardMedia, CardActions, IconButton, CardContent, Stack } from '@mui/material';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import './course.css';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditHeader() {

    let history = useHistory();
    const { id } = useParams();

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

    const [loadingFile, setLoadingFile] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);

    useEffect(() => {
        loadHeader();
      }, []);
  
    const loadHeader = async () => {
        const result = await axios.get("http://localhost:5000/web/get/" + id);
        setCourse(result.data);
    }  

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
            return "Mobile Number Invalid."
        }  
        if (data.iName === ""){
            return "Image name cannot be Null";
        }   
        return "clear"   
        
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try{    
            if("clear" != formValidation(course)){
                toast.error(formValidation(course));
            }else{
                await axios.put('http://localhost:5000/web/update/' + id, course).then(() => {
                    alert("Wanted Ad updated Successfully");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("/mywanted");
            }          
            
          }catch(error){
            console.log(error);
          }
        }

    // const onSubmit = async e => {
    //     e.preventDefault();
    //     if(true){
    //         await axios.put('http://localhost:5000/web/update/' + id, course).then(() => {
    //             alert("Wanted Ad Updated Successfully.");
    //         }).catch((err) => {
    //             alert(err);
    //         })
    //         history.push("/mywanted");
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
                <center><label style={{ fontSize: "40px" }}>Update This Wanted Ad</label></center>
            </Box>

                <form onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <Box >
                                <TextField label="Add Type" type="text" name="adtype" fullWidth  value={adtype}
                                onChange={ e => onInputChange(e)} />
                                                      
                                <TextField sx={{ mt: 4 }} label="Town/City/Street" type="text" name="town" fullWidth  value={town}
                                onChange={ e => onInputChange(e)} />     
                                                      
                                <TextField sx={{ mt: 4 }} label="Location" type="text" name="location" fullWidth  value={location}
                                onChange={ e => onInputChange(e)} />  
                                                       
                                <TextField sx={{ mt: 4 }} label="Ad Header" type="text" name="adHeading" fullWidth  value={adHeading}
                                onChange={ e => onInputChange(e)} />     
                                                     
                                <TextField sx={{ mt: 4 }} label="Description" type="text" name="description" fullWidth  value={description}
                                onChange={ e => onInputChange(e)} /> 
                                                      
                                <TextField sx={{ mt: 4 }} label="Contact Name" type="text" name="name" fullWidth  value={name}
                                onChange={ e => onInputChange(e)} />  
                                                      
                                <TextField sx={{ mt: 4 }} label="Contact Email" type="text" name="email" fullWidth  value={email}
                                onChange={ e => onInputChange(e)}/> 
                                                        
                                <TextField sx={{ mt: 4 }} label="Contact Number" type="text" name="mobile" fullWidth  value={mobile}
                                onChange={ e => onInputChange(e)} />
                        </Box>
                        
                    </div>

                    

                    
                    <div className="form-group">
                        <h6>Images Related Ad</h6>
                        <Box sx={{ py: 2 }}>
                            <TextField  label="Enter Image Name" type="text" name="iName" fullWidth  value={iName}
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
                        
                        <Card sx={{ mt: 2 , height: "120px" , width: "150px" }}>
                            <CardMedia
                                component="img"
                                height="120px"
                                image={ imgURL }/>
                            
                        {/* <CardActions sx={{ mt: 1 }}>
                                <Button>Delete</Button>
                        </CardActions> */}

                        </Card>
                        
                        

                    </div>

                    <FormGroup>
                        
                        <FormControlLabel control={<Checkbox />} label="I confirm that all the information contained in here is true." />
                    </FormGroup> 

                    <>
                        <table>
                            <tr>
                                <td>
                                <Stack direction="row" spacing={2}>
                                    <Button type = "submit" variant="contained" onclick="" >Update Ad</Button>
                                    

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