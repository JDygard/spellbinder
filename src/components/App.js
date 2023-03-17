import React from 'react';
import GameBoard from './GameBoard';
import SubmittedWordsList from './SubmittedWordsList';
import PlayerStats from './PlayerStats';
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <PlayerStats />
      <GameBoard />
      <SubmittedWordsList />
    </div>
  );
}

export default App;


/*
    Design data structures and state management:
        Create data structures for representing the player's character, including stats, health, class, talent trees, inventory, and equipment.
        Determine how to manage the state of these data structures, using React's built-in state management or a third-party library such as Redux.

    Implement user interface components:
        Build UI components for displaying and interacting with the RPG elements, such as character stats, health, class selection, talent trees, inventory, and equipment slots.
        Implement interactivity for the UI components, allowing the user to select a class, allocate talent points, equip items, and more.

    Create game logic and mechanics:
        Implement the logic for the RPG mechanics, such as calculating stat bonuses from talents and equipment, applying health changes, and resolving class-specific actions.
        Add the necessary code for handling status effects, including their visual representation, duration, and effect on the game board tiles.

    Backend functionality phase 1:
        Set up socket.io for real-time communication between the client and server.
        Implement server-side code for simulating fights against other players and handling game logic that should be server-side.

    Backend functionality phase 2:
        Implement PvE encounters with challenging enemies, incorporating status effects and rewards.
        Refactor the game code, moving game-sensitive logic from the frontend to the backend, such as generating game board letters, calculating word value, and validating submitted words.
        Integrate MongoDB for storing player data, including character stats, inventory, equipment, and progress.

    Backend functionality phase 3:
        Implement player vs. player combat, including matchmaking, handling combat logic, and reporting results.

    Reach goals:
        Design and implement a combo system that provides abilities based on word length and specific conditions.


We will be building, in this order:
1. The foundation for RPG elements like:
 - Statistics: Strength, dexterity, intelligence
 - Health: Depleted when the player is hit by the enemy
 - Classes: Three classes: Warrior, rogue, sorcerer
 - Talent trees: Three for each class
 - Inventory: Keeping equipment
 - Equipment: Slots for weapon, armor, helmet, accessory
2. Backend functionality phase 1:
 - Setting up socket.io
 - Simulating fights against another player using backend code.
3. Status effects. Status effects will be applied by the opposing player and affect the function of the tiles that the player uses, changing their color and effect. The effect has a duration (usually 1 to 3) that goes down as the player submits words.
 - Poison: Using the tile in a word depletes the player's healthy
 - Stun: Renders a tile unusable
 - Break: Renders a tile's value to zero
4: Backend functionality phase 2:
 - A system of PvE encounters designed to challenge the player and lead to rewards in equipment, using status effects to increase the challenge.
 - Move game-sensitive code from the frontend to the backend, like generating game board letters, calculating word value, double-checking that submitted words are valid given the game board letters, and player inventory/stats/equipment.
 - Implement mongoDB for storage.
5: Backend functionality phase 3:
 - Implement player vs. player combat.
6: Reach goals:
 - Combo system: Implement abilities that are activated based on word length. i.e. a dagger might have a "backstab" ability that is submitting three three letter words in a short timeframe, or a mace might have "Smite" which is two five letter words.
 */