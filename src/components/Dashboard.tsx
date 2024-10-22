import React, { useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useSocket } from "../utils/SocketContext";
import "../styles/Dashboard.css";
import PVE from "./game/PVE";
import PVP from "./PVP";
import Inventory from "./Inventory";
import TalentTrees from "./TalentTrees";
import CharacterSelect from "./CharacterSelect";

const Dashboard = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Notify the backend about the logout?
      // await fetch('http://localhost:3001/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // Clear all stored tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Disconnect socket if needed
      if (socket) {
        socket.disconnect();
      }
      
      // Update Redux state
      dispatch(logout());
      
      // Redirect to login page
      navigate('/');
      
    } catch (error) {
      console.error('Error during logout:', error);
      // Still perform local logout even if server request fails
      localStorage.clear();
      dispatch(logout());
      navigate('/');
    }
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard-menu">
        <Link to="/dashboard/characterSelect">
          <button>Character Select</button>
        </Link>
        <Link to="/dashboard/pve">
          <button>PVE</button>
        </Link>
        <Link to="/dashboard/pvp">
          <button>PVP</button>
        </Link>
        <Link to="/dashboard/inventory">
          <button>Inventory</button>
        </Link>
        <Link to="/dashboard/talents">
          <button>Talent Trees</button>
        </Link>
      </div>
      <div className="active-component">
        <Routes>
          <Route path="/dashboard/characterSelect" element={<CharacterSelect />} />
          <Route path="/dashboard/pve" element={<PVE />} />
          <Route path="/dashboard/pvp" element={<PVP />} />
          <Route path="/dashboard/inventory" element={<Inventory />} />
          <Route path="/dashboard/talents" element={<TalentTrees />} />
          <Route path="/dashboard" element={<div>Select an option from the menu</div>} />
        </Routes>
      </div>
      <div className="profile">
        <img src="path/to/avatar" alt="Avatar" className="avatar" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
