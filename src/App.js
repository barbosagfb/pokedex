import React, {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import './App.css';
import Pokedex from './components/Pokedex';
import {GetPokedex, GetPokedexData, searchPokemon} from './api';
import {FavoriteProvider} from './contexts/favoritesContext';


const favoritesKey = "f"

function App() {
  const [page, setPage] =  useState(0)
  const [totalPages, setTotalPages] =  useState(0)
  const [loading, setLoading] =  useState(false)
  const [pokemons, setPokemons] =  useState([])
  const [favorites, setFavorites] =  useState([]) 
  const [notFound, setNotFound] =  useState(false) 
  
  
  const pokemonsPerPage = 30
  const fetchPokemons = async () =>{
    try {
      setLoading(true);
      setNotFound(false);
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
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(()=>{
    loadFavoritePokemons();
  },[])
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
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites)) 
    setFavorites(updatedFavorites)
  }

  const handleSearchPokemon = async(pokemon) =>{
    if(!pokemon){
      fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)

    const result = await searchPokemon(pokemon)
      if(!result){
        setLoading(false)
        setNotFound(true)
      } else {
        setPokemons([result])
        setPage(0)
        setTotalPages(1)
      }
      setLoading(false)
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
      <Searchbar onSearch={handleSearchPokemon}/>
      {notFound ? (
      <div className="not-found-text" > Pokemon não encontrado!!</div> 
       ) :
      (<Pokedex 
      pokemons={pokemons}
      loading={loading}
      page={page}
      totalPages={totalPages}
      setPage={setPage}
      />)}
      </div>
      </FavoriteProvider>
  );
}

export default App;
