import React from 'react';
import { useState } from 'react';
import '../styles/searchbar.css';

export function Searchbar (props){
  const [search,setSearch] = useState("");
  const {onSearch} = props

  const handleChangeSearch = (e) =>{
    setSearch(e.target.value)
    if(e.target.value.lenght === 0){
      onSearch(undefined)
    }  
  }
  const handleButtonClick = () =>{
    // console.log("clique busca",search)
    onSearch(search)
  }

  
  return(

  <div className="searchbar-container">
    <div className="searchbar">
      <input placeholder='Buscar pokemon' onChange={handleChangeSearch}/>
    </div>
    <div className="searchbar-btn">
      <button onClick={handleButtonClick}>Buscar</button>
    </div>
    
  </div>
);
}

export default Searchbar;