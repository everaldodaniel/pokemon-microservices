import { Button } from "@mui/material";
import { ArrowRight, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { env } from "../../../app/config/env";

export function HomePage() {
  return (
    <section className="pokemon-home">
      <div className="pokemon-hero">
        <div className="pokemon-hero-copy">
          <span className="eyebrow">Explore a Pokédex</span>
          <h1>Encontre seus Pokémon favoritos.</h1>
          <p>
            Navegue pelo catálogo, veja tipos, habilidades, medidas e fraquezas em uma experiência
            visual inspirada no universo Pokémon.
          </p>
          <div className="hero-actions">
            <Button component={Link} to="/catalogo" variant="contained" endIcon={<ArrowRight size={16} />}>
              Abrir Pokédex
            </Button>
          </div>
        </div>

        <div className="hero-pokemon-card" aria-hidden>
          <div className="hero-orbit">
            <img
              src={env.homePokemonImageUrl}
              alt=""
            />
          </div>
          <div className="hero-mini-card">
            <Star size={18} />
            <span>#025 Pikachu</span>
          </div>
        </div>
      </div>

      <div className="home-feature-grid">
        <article>
          <span>Tipos</span>
          <strong>Veja as classes de cada Pokémon</strong>
        </article>
        <article>
          <span>Detalhes</span>
          <strong>Altura, peso, genêro e categoria</strong>
        </article>
        <article>
          <span>Batalha</span>
          <strong>Habilidades e fraquezas em destaque</strong>
        </article>
      </div>
    </section>
  );
}
