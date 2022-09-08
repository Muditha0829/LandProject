import SignIn from "./components/login/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/login/SignUp";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route path="/dashboard/*" element={<Dashboard/>}/>

      </Routes>
      </BrowserRouter>
  
    
  );
}

export default App;
