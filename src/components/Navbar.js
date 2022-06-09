import React,{useContext} from 'react';
import '../styles/navbar.css'
import LogoImg from '../assets/Pokemon-Logo.png';
import {Searchbar} from '../components/Searchbar.js'
import FavoriteContext from '../contexts/favoritesContext';

const Navbar  = () => {
  const {favoritePokemons}= useContext(FavoriteContext)

 // const LogoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
return (
  <nav>
    <div>
      <img
      alt="pokemon-logo"
      src={LogoImg}
      className="navbar-img"/>
    </div>
    {/* <div><h1>Home</h1></div> */}
    <div className ="favorites"> 💖 {favoritePokemons.length}</div>
    <div><Searchbar/></div>
  </nav>
);
};

export default Navbar;