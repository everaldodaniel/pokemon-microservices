package com.poke_catalog_api.infra.repository;

import com.poke_catalog_api.domain.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PokemonRepository extends JpaRepository<Pokemon, UUID> {
    Optional<Pokemon> findByName(String name);
    Optional<Pokemon> findByPokedexId(String pokedexId);
}
