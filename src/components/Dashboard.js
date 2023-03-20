import React, { useEffect, useState } from 'react';
import { getSocket, useSocket } from '../utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../slices/authSlice';
import '../styles/Dashboard.css';
import PVE from './PVE';
import PVP from './PVP';
import Inventory from './Inventory';
import TalentTrees from './TalentTrees';

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('pve');
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const dispatch = useDispatch();
  
    useSocket((data) => {
      // Handle socket data
    });
  
    useEffect(() => {
      if (loggedIn) {
        const token = localStorage.getItem('token');
        if (token) {
          dispatch(setInitialState({
            loggedIn: true,
            token: token
          }));
        }
      }
    }, [loggedIn, dispatch]);

    useEffect(() => {
        const socket = getSocket();
        socket.emit('requestPlayerData');
    }, []);

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'pve':
                return <PVE />;
            case 'pvp':
                return <PVP />;
            case 'inventory':
                return <Inventory />;
            case 'talents':
                return <TalentTrees />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-menu">
                <button onClick={() => setActiveComponent('pve')}>PVE</button>
                <button onClick={() => setActiveComponent('pvp')}>PVP</button>
                <button onClick={() => setActiveComponent('inventory')}>Inventory</button>
                <button onClick={() => setActiveComponent('talents')}>Talent Trees</button>
            </div>
            <div className="active-component">
                {renderActiveComponent()}
            </div>
            <div className="profile">
                <img src="path/to/avatar" alt="Avatar" className="avatar" />
                <button className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
