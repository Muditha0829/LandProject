import NavBar from "./NavBar";
import { useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "./Logout";
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
            const username = (JSON.parse(loggedInUser)).toUpperCase();
            setusername(username);
        }

    },[])

    return(
        <div>
        <NavBar name={username}/>
            {/* <h1>Dashboard</h1> */}

            <Routes>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/updateprofile" element={<UpdateProfile/>}/>
                <Route path="/deleteprofile" element={<DeleteProfile/>}/>

                {/* <Route path="/logout" element={<Logout />} /> */}
                {/* <Route path="/editprofile" element={<EditProfile/>}/> */}

            </Routes>

        </div>
    )
}

export default Dashboard;