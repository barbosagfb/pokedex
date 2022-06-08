import React from 'react';
import '../styles/pokedex.css';
import PokemonList from '../components/PokemonList';
import Pagination from './Pagination';

export function Pokedex(props) {
  const { pokemons, loading ,page , totalPages ,setPage} = props;
  const handlePreviousPage = (e) =>{
    if (page > 0) {
      setPage(page-1)
    }
  }
  const handleNextPage = (e) =>{
    if(page+1 !== totalPages){
      setPage(page+1)
    }
  }
  return (
    <div>
      <div className="pokedex-header">
        <h1 className="pokedex-title">Pokédex</h1>
        <Pagination
        page={page+1}
        totalPages={totalPages}
        previousPage={handlePreviousPage}
        nextPage={handleNextPage}
        />
      </div>
      {loading ? 
       (<div className="loading">Carregando...</div>) : 
       (<div className="pokedex-grid">
                   {pokemons && pokemons.map((pokemon,index) => {   
                     return (
                     <PokemonList key={index} pokemon={pokemon}/>
                     );
                   })} 
                  </div>
                  )}
    </div>
  );
}

export default Pokedex;