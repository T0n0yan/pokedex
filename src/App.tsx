import React, { FC } from 'react';
import Home from './pages/home/home';
import { Route, Routes } from 'react-router-dom';
import PokemonItem from 'pages/pokemon_item';

const App: FC = () => {

  return (<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path='/pokemon/:id' element={<PokemonItem />} />
  </Routes>
  )
}

export default App;
