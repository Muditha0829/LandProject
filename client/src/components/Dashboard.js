import NavBar from "./NavBar";
import { useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "./Logout";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import DeleteProfile from "./DeleteProfile";
import AddRental from "./rental-management/AddRental";
import ViewRentals from "./rental-management/ViewRentals";
import UpdateRental from "./rental-management/UpdateRental";
import SingleRental from "./rental-management/SingleRental";
import MainPageRental from "./rental-management/MainPageRental";
import HomePage from "./rental-management/HomePage";
import SingleUserRentals from "./rental-management/SingleUserRentals";

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

                <Route path="/home-page" element={<HomePage/>}/>
                <Route path="/single-rental" element={<SingleUserRentals/>}/>
                <Route path="/add-rental" element={<AddRental/>}/>
                <Route path="/all-rental" element={<ViewRentals/>}/>
                <Route path="/update-rental/:id" element={<UpdateRental/>}/>
                <Route path="/single-rental/:id" element={<SingleRental/>}/>
                <Route path="/Rental-Menu" element={<MainPageRental/>}/>

                {/* <Route path="/logout" element={<Logout />} /> */}
                {/* <Route path="/editprofile" element={<EditProfile/>}/> */}

            </Routes>

        </div>
    )
}

export default Dashboard;