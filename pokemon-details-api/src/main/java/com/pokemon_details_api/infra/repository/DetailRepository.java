package com.pokemon_details_api.infra.repository;

import com.pokemon_details_api.domain.model.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DetailRepository extends JpaRepository<Detail, UUID> {
    Optional<Detail> findByPokedexId(String pokedexId);
}
