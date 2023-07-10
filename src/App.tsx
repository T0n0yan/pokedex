import React, { FC } from 'react';
import Home from './pages/home/home';

const App: FC = () => {
  function getPokemonData() {
    const page = 1; // Specify the page number
    const limit = 1; // Specify the number of Pokémon per page

  }

  getPokemonData();

  return <Home />
}

export default App;
