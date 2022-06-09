import React, {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
// import Searchbar from './components/Searchbar';
import './App.css';
import Pokedex from './components/Pokedex';
import {GetPokedex, GetPokedexData} from './api';
import {FavoriteProvider} from './contexts/favoritesContext';

function App() {
  const [page, setPage] =  useState(0)
  const [totalPages, setTotalPages] =  useState(0)
  const [loading, setLoading] =  useState(false)
  const [pokemons, setPokemons] =  useState([])
  const [favorites, setFavorites] =  useState([]) 
  
  
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


  const updateFavoritePokemons = (name) =>{
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0){
      updatedFavorites.slice(favoriteIndex,1);
    }else{
      updatedFavorites.push(name);
    }
    setFavorites(updatedFavorites)
  }


  return (
      <FavoriteProvider
      value={{
        favoritePokemons:favorites,
        updateFavoritePokemons:updateFavoritePokemons,
      }}
        >
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
      </FavoriteProvider>
  );
}

export default App;
