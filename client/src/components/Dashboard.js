import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "./Logout";
import MyProfile from "./MyProfile";
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

import AddSale from "./sale/AddSale";
import SaleList from "./sale/SaleList";
import MainPageSale from "./sale/main";
import AdminSettings from "./AdminSettings";

import GenerateReport from "./rental-management/GenerateReport";

import SaleReport from "./sale/saleReport";
import UpdateSale from "./sale/updateSale";





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
                <Route path="/Admin%20Settings" element={<AdminSettings/>}/>

                
                <Route path="/addSale" element={<AddSale/>}/>
                <Route path="/saleList" element={<SaleList/>}/>
                <Route path="/sale-page" element={<MainPageSale/>}/>
                <Route path="/sale-report" element={<SaleReport/>}/>
                <Route path="/saleList/update-sale/:id" element={<UpdateSale/>}/>

                <Route path="/home-page" element={<HomePage/>}/>
                <Route path="/single-rental" element={<SingleUserRentals/>}/>
                <Route path="/add-rental" element={<AddRental/>}/>
                <Route path="/all-rental" element={<ViewRentals/>}/>
                <Route path="/update-rental/:id" element={<UpdateRental/>}/>
                <Route path="/single-rental/:id" element={<SingleRental/>}/>
                <Route path="/Rentals" element={<MainPageRental/>}/>
                <Route path="/rental-report" element={<GenerateReport/>}/>

                {/* <Route path="/logout" element={<Logout />} /> */}
                {/* <Route path="/editprofile" element={<EditProfile/>}/> */}

            </Routes>
        {/* <Footer/> */}
        </div>
    )
}

export default Dashboard;