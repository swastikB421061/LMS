import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import {useQuery} from "@tanstack/react-query"
import Sidebar from "./components/Sidebar";
import "./App.css";
import History from "./components/History";

const App = () => {
  
  const {data:authUser}=useQuery({
    queryKey:["authUser"],
    queryFn: async()=>{
      try {
				const res = await fetch("/api/auth/getme");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
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
      {authUser &&<Sidebar />}
      <Routes>
        <Route path="/" element={authUser?<Dashboard />: <Navigate to='/login' />} />
        <Route path="/login" element={!authUser?<Login />:<Navigate to='/' />} />
        <Route path="/history" element={authUser?<History />:<Navigate to='/login' />} />

      </Routes>
      </Router>
  );
};

export default App;
