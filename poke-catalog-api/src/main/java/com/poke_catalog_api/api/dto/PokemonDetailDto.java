package com.poke_catalog_api.api.dto;

import java.util.List;
import java.util.UUID;

public record PokemonDetailDto(
    UUID id,
    String pokedexId,
    float height,
    float weight,
    String gender,
    String category,
    List<String> abilities,
    List<String> weaknesses
) {
}
