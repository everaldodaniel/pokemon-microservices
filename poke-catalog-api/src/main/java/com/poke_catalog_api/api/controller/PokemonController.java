package com.poke_catalog_api.api.controller;

import com.poke_catalog_api.api.dto.PokemonResponseDto;
import com.poke_catalog_api.domain.model.Pokemon;
import com.poke_catalog_api.domain.service.PokemonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/pokemons")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    @GetMapping
    public ResponseEntity<List<Pokemon>> findAll() {
        return ResponseEntity.ok(pokemonService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<PokemonResponseDto> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(pokemonService.findPokemonWithDetail(id));
    }
}
