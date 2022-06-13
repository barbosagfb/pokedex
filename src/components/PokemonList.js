import React, {useContext} from "react";
import '../styles/pokemonlist.css';
import FavoriteContext from '../contexts/favoritesContext';
// import { type } from "@testing-library/user-event/dist/type";

export function PokemonList (props){
  const {pokemon} = props;
  const {favoritePokemons,updateFavoritePokemons}= useContext(FavoriteContext);
  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name)
  }
const heartImg = favoritePokemons.includes(pokemon.name)? "💖" : "🖤"  ;
// const heartImg = "❤";


return (<div className="pokecard">
  <div className="pokeimg-container">
    <img className="pokeimg" alt={pokemon.name} src={pokemon.sprites.other.dream_world.front_default}/>
  </div>
  <div className="card-body">
  <div className="card-top">
    <h3 className="poke-name">{pokemon.name}</h3>
    <div className="poke-status">
      <p>Altura:{pokemon.height / 10}m</p>
      <p>Peso{pokemon.weight /10 }kg</p>
    </div>
    <div className="pokemon-id">Nº{pokemon.id}</div>
      </div>
      <div className="card-bottom">
      <div className="pokemon-type">
        <div className="pokemon-types">Tipo:{pokemon.types.map((type,index)=>{
          return ( 
          <div key={index} className={`pokemon-type-text ${type.type.name}`}>{type.type.name}</div>
          )
        })}
        </div>
      </div>
        <button className="pokemon-heart-btn" onClick={onHeartClick}>
        {heartImg}
          </button>
      </div>
    </div>
  </div>
);
}


export default PokemonList;