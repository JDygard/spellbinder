import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../slices/authSlice";
import { setCharacter, setCharacters } from "../slices/gameSlice";
import "../styles/Dashboard.css";
import PVE from "./PVE";
import PVP from "./PVP";
import Inventory from "./Inventory";
import TalentTrees from "./TalentTrees";
import CharacterSelect from "./CharacterSelect";
import { useSocketActions } from "../hooks/useSocketActions";
import { useSocket } from "../utils/SocketContext";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const characters = useSelector((state) => state.game.characters);
  const character = useSelector((state) => state.game.character);
  const dispatch = useDispatch();

  const handlePlayerData = (data) => {
    switch (data.event) {
      case "playerData":
        dispatch(setCharacters(data.playerData));
        setActiveComponent("characterSelect");
        break;
      default:
        break;
    }
  };
  useSocketActions(handlePlayerData);

  useEffect(() => {
    if (character) {
      setActiveComponent("default");
    }
  }, [character]);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(
          setInitialState({
            loggedIn: true,
            token: token,
          })
        );
      }
    }
  }, [loggedIn, dispatch]);

  const socket = useSocket();
  
  useEffect(() => {
    if (socket) {
      socket.emit("requestPlayerData");
    }
  }, [socket]);

  const renderActiveComponent = () => {
    if (activeComponent === "characterSelect" && characters.length === 0) {
      return <div>Loading...</div>;
    }

    switch (activeComponent) {
      case "characterSelect":
        return <CharacterSelect characters={characters} />;
      case "pve":
        return <PVE />;
      case "pvp":
        return <PVP />;
      case "inventory":
        return <Inventory />;
      case "talents":
        return <TalentTrees />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-menu">
        <button onClick={() => setActiveComponent("pve")}>PVE</button>
        <button onClick={() => setActiveComponent("pvp")}>PVP</button>
        <button onClick={() => setActiveComponent("inventory")}>
          Inventory
        </button>
        <button onClick={() => setActiveComponent("talents")}>
          Talent Trees
        </button>
      </div>
      <div className="active-component">{renderActiveComponent()}</div>
      <div className="profile">
        <img src="path/to/avatar" alt="Avatar" className="avatar" />
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
