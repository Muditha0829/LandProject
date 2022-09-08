import NavBar from "./NavBar";
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
            const username = (JSON.parse(loggedInUser)).toUpperCase();
            setusername(username);
        }

    },[])

    return(


        <div style={{ backgroundImage: `url("https://wallpaperaccess.com/full/1831078.jpg")`,backgroundSize: 'cover',backgroundRepeat:'no-repeat',
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

        </div>
    )
}

export default Dashboard;