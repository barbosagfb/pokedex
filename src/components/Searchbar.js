import React from 'react';
import { useState } from 'react';
import {searchPokemon} from '../api.js';
import '../styles/searchbar.css';

export function Searchbar (){
  const [search,setSearch] = useState("ditto");
  const [pokemon,setPokemon] =  useState();

  const handleChangeSearch = (e) =>{
    console.log("pokemon",e.target.value)
    setSearch(e.target.value)
  }
  const handleButtonClick = () =>{
    console.log("clique busca",search)
    handleSearchPokemon(search)
  }

  const handleSearchPokemon = async (pokemon) => {
    const result = await searchPokemon(pokemon)
    setPokemon(result)
  }

  return(

  <div className="searchbar-container">
    <div className="searchbar">
      <input placeholder='Buscar pokemon' onChange={handleChangeSearch}/>
    </div>
    <div className="searchbar-btn">
      <button onClick={handleButtonClick}>Buscar</button>
    </div>
    {pokemon ? (
      <div >
        <div>Id: {pokemon.id}</div>
        <div>Nome: {pokemon.name}</div>
        <div>Peso: {pokemon.weight}</div>
        <img className="searchbar-image" src={pokemon.sprites.other.dream_world.front_default} alt={`${pokemon.name}${".png"}`}/>
      </div>
    ): null }
  </div>
);
}

export default Searchbar;