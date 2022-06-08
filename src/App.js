import React, {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
// import Searchbar from './components/Searchbar';
import './App.css';
import Pokedex from './components/Pokedex';
import {GetPokedex, GetPokedexData} from './api';

function App() {
  const [page, setPage] =  useState(0)
  const [totalPages, setTotalPages] =  useState(0)
  const [loading, setLoading] =  useState(false)
  const [pokemons, setPokemons] =  useState([])
  
  const pokemonsPerPage = 30
  const fetchPokemons = async () =>{
    try {
      setLoading(true);
      const data = await GetPokedex(pokemonsPerPage, pokemonsPerPage * page);
      const promises = data.results.map(async (pokemon) =>{
        return await GetPokedexData(pokemon.url)
      });

      const results = await Promise.all(promises);
      setPokemons(results)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / pokemonsPerPage))
    } catch (error) {
      console.log("fetchPokemons error:",error)
    }
  }
  useEffect(()=>{
    console.log("carregou")
    fetchPokemons();
  },[page])


  return (
      <div>
        <Navbar/>
      {/* <Searchbar/> */}
      <Pokedex 
      pokemons={pokemons}
      loading={loading}
      page={page}
      totalPages={totalPages}
      setPage={setPage}
      />
      </div>
  );
}

export default App;
