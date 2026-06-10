package com.poke_catalog_api.api.dto;

import com.poke_catalog_api.domain.model.PokemonType;

import java.util.Set;

public record PokemonFilter(
        String name,
        Set<PokemonType> types
) {
}
