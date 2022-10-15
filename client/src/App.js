import SignIn from "./components/login/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/login/SignUp";
import Dashboard from "./components/Dashboard";
import AddRental from "./components/rental-management/AddRental";
import Test from "./components/rental-management/Test";
import ViewRentals from "./components/rental-management/ViewRentals";
import UpdateRental from "./components/rental-management/UpdateRental";
import SingleRental from "./components/rental-management/SingleRental";
import MainPageRental from "./components/rental-management/MainPageRental";


function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      
      {/* <Route path="/test" element={<Test/>}/> */}

      <Route path="/dashboard/*" element={<Dashboard/>}/>

      </Routes>
      </BrowserRouter>
  
    
  );
}

export default App;
