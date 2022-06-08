import React from 'react';
import '../styles/navbar.css'
import LogoImg from '../assets/Pokemon-Logo.png';
import {Searchbar} from '../components/Searchbar.js'

const Navbar  = () => {
 // const LogoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
return (
  <nav>
    <div>
      <img
      alt="pokemon-logo"
      src={LogoImg}
      className="navbar-img"/>
    </div>
    <div><h1>Home</h1></div>
    <div>Favoritos ❤</div>
    <div><Searchbar/></div>
  </nav>
);
};

export default Navbar;