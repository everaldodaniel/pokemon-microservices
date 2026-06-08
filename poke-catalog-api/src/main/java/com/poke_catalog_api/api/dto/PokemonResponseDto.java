package com.poke_catalog_api.api.dto;

import com.poke_catalog_api.domain.model.PokemonType;

import java.util.Set;
import java.util.UUID;

public record PokemonResponseDto (
        UUID id,
        String name,
        String imgUrl,
        Set<PokemonType> types,
        PokemonDetailDto detail
) {
}
