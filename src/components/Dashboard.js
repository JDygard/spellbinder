import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "../styles/Dashboard.css";
import PVE from "./game/PVE";
import PVP from "./PVP";
import Inventory from "./Inventory";
import TalentTrees from "./TalentTrees";
import CharacterSelect from "./CharacterSelect";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-menu">
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
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
