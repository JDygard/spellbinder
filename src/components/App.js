import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Login from './Login';
import '../styles/App.css';

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
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