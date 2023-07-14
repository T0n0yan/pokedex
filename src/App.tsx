import { Route, Routes } from 'react-router-dom';
import PokemonItem from 'pages/pokemon_item';
import Home from './pages/home';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonItem />} />
    </Routes>
  );
}

export default App;
