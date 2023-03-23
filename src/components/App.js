import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshTokens } from '../slices/authSlice';
import Dashboard from './Dashboard';
import Login from './Login';
import '../styles/App.css';
import { SocketProvider } from '../utils/SocketContext';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [isLoading, setIsLoading] = useState(true);

  const handleVerifyToken = async () => {
    const response = await fetch('http://localhost:3001/verify-token', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        console.log('Token refreshing');
        const response = await fetch('http://localhost:3001/refresh-token', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }), // Make sure you send the refresh token as a JSON object
        });

        if (response.status === 200) {
          const data = await response.json(); // Parse the JSON response
          const token = data.accessToken;
          const refreshToken = data.refreshToken;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch(refreshTokens({ token, refreshToken }));
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      handleVerifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SocketProvider>
      <div className="App">
        {loggedIn ? (
          <Dashboard />
        ) : (
          <Login />
        )}
      </div>
    </SocketProvider>
  );
}

export default App;



/*
character: {
  id: characterId,
  name: 'character name',
  level: 1,
  experience: 0,
  class: 'warrior',
  talentPoints: 0,
  talents: {
    class: {
    },
    generic: {
    },
  },
  inventory: [
  { weapon: itemId },
  { armor: itemId },
  { trinket: itemId },
  { helmet: itemId },
  { inventory: [itemId, itemId, itemId, itemId, itemId, itemId, itemId, itemId, itemId, itemId]}
  ]
}

item: {
  id: itemId,
  name: 'item name',
  type: 'weapon',
  stats: {
    strength: 1,
    agility: 1,
    intellect: 1,
  },
  keywords: ['keyword1', 'keyword2'],
  combos: [{}];
}

  "keywords" is a list of words that share a theme with the item name. For example, a sword might have the keywords "sword", "blade", "weapon", "metal", "sharp", etc. The keywords, when used in the word game, gain more powerful effects
  "combos" will remain a placeholder empty object for now. It will be used to store the word length combinations possible.
*/