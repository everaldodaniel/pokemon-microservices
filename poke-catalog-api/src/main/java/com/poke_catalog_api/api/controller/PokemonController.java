package com.poke_catalog_api.api.controller;

import com.poke_catalog_api.api.dto.PokemonFilter;
import com.poke_catalog_api.api.dto.PokemonResponseDto;
import com.poke_catalog_api.domain.model.Pokemon;
import com.poke_catalog_api.domain.model.PokemonType;
import com.poke_catalog_api.domain.service.PokemonService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("api/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public ResponseEntity<Page<Pokemon>> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Set<PokemonType> types,
            Pageable pageable) {
        PokemonFilter filter = new PokemonFilter(name,  types);
        return ResponseEntity.ok(pokemonService.findAll(filter, pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<PokemonResponseDto> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(pokemonService.findPokemonWithDetail(id));
    }
}
