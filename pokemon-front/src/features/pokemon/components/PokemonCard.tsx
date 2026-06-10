import { Link } from "react-router-dom";
import type { PokemonSummary } from "../types/pokemonTypes";
import { TypeBadge } from "./TypeBadge";

export function PokemonCard({ pokemon }: { pokemon: PokemonSummary }) {
  return (
    <Link to={`/catalogo/${pokemon.id}`} className="pokemon-card" aria-label={`Abrir ${pokemon.name}`}>
      <div className="pokemon-card-image">
        <img src={pokemon.imgUrl} alt={pokemon.name} loading="lazy" />
      </div>
      <div className="pokemon-card-body">
        <span className="pokedex-number">#{pokemon.pokedexId}</span>
        <h2>{pokemon.name}</h2>
        <div className="badge-row">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  );
}
