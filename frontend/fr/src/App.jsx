import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login";
import {useQuery} from "@tanstack/react-query"
import Sidebar from "./components/Sidebar";
import "./App.css";


const App = () => {
  
  const {data:authUser}=useQuery({
    
    queryKey:["authUser"],
    queryFn: async()=>{
      try {
        console.log("here 1");
				const {data} = await axios.get("/api/auth/getme");

				if (data.error) return null;
    
				console.log("authUser is here:", data);
				return data;

			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false

    
  })

  return (
    <Router>
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/" element={authUser?<Dashboard />: <Navigate to='/login' />} />
        <Route path="/login" element={!authUser?<Login />:<Navigate to='/' />} />
      </Routes>
      </Router>
  );
};

export default App;
