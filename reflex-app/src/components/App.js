import React, { useState } from "react";

// Train Reflex v1.0

import Game from "./game";


const TrainReflex = () => {
  const [gameId, setGameId] = useState(1);
  // After completing game, program resets to new state with new gameId
  return <Game key={gameId} reset={() => setGameId(gameId + 1)} />;
}


function App() {
  return (
    <TrainReflex />
  );
}

export default App;