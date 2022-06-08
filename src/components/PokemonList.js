import React from "react";
import '../styles/pokemonlist.css';

export function PokemonList (props){
  const {pokemon} = props;
  const onHeartClick = () => {
    console.log("favoritar")
  }
const heartImg = "❤";
// const heartImg = "❤";

return (<div className="pokecard">
  <div className="pokeimg-container">
    <img className="pokeimg" alt={pokemon.name} src={pokemon.sprites.other.dream_world.front_default}/>
  </div>
  <div className="card-body">
  <div className="card-top">
    <h3 className="poke-name">{pokemon.name}</h3>
    <div>#{pokemon.id}</div>
      </div>
      <div className="card-bottom">
      <div className="pokemon-type">
        <div className="pokemon-types">{pokemon.types.map((type,index)=>{
          return ( 
          <div key={index} className="pokemon-type-text">{type.type.name}</div>
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