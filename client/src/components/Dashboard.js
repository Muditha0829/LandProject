import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "./Logout";
import MyProfile from "./MyProfile";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteProfile";

const Dashboard=()=>{
    const [username, setusername] = useState([]);

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("username");
        // const loggedInUserId = localStorage.getItem("userId");

        if (!loggedInUser){
        window.location = "/signin"
        }else{
            const username = (JSON.parse(loggedInUser));
            setusername(username);
        }

    },[])

    return(


        <div style={{ backgroundImage: `url("http://www.webdesignhot.com/wp-content/uploads/2016/10/Gradient-Blue-Color-and-Triangle-Polygon-Pattern-Background.jpg")`,backgroundSize: 'cover',backgroundRepeat:'no-repeat',
        width: '100vw',
        height: '100vh'}} >
        <NavBar name={username}/>
            {/* <h1>Dashboard</h1> */}

            <Routes>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/myprofile" element={<MyProfile />}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/updateprofile" element={<UpdateProfile/>}/>
                <Route path="/deleteprofile" element={<DeleteProfile/>}/>

                {/* <Route path="/logout" element={<Logout />} /> */}
                {/* <Route path="/editprofile" element={<EditProfile/>}/> */}

            </Routes>
        <Footer/>
        </div>
    )
}

export default Dashboard;