package com.poke_catalog_api.domain.service;

import com.poke_catalog_api.api.dto.PokemonDetailDto;
import com.poke_catalog_api.api.dto.PokemonResponseDto;
import com.poke_catalog_api.domain.exception.ResourceNotFoundException;
import com.poke_catalog_api.domain.model.Pokemon;
import com.poke_catalog_api.infra.client.PokemonDetailClient;
import com.poke_catalog_api.infra.repository.PokemonRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.EnumSet;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final PokemonDetailClient pokemonDetailClient;
    private final RedisTemplate<String, Object> redisTemplate;

    public PokemonService(PokemonRepository pokemonRepository, PokemonDetailClient pokemonDetailClient, RedisTemplate<String, Object> redisTemplate) {
        this.pokemonRepository = pokemonRepository;
        this.pokemonDetailClient = pokemonDetailClient;
        this.redisTemplate = redisTemplate;
    }

    public List<Pokemon> findAll() {
        return pokemonRepository.findAll();
    }


    @CircuitBreaker(name = "pokemonDetails", fallbackMethod = "findPokemonWithDetailCache")
    public PokemonResponseDto findPokemonWithDetail(UUID id) {
        Pokemon pokemon = pokemonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pokemon not found"));

        PokemonDetailDto pokemonDetailDto = pokemonDetailClient.getPokemonDetails(pokemon.getPokedexId());

        String cacheKey = "pokemon-details:" + pokemonDetailDto.pokedexId();
        redisTemplate.opsForValue().set(cacheKey, pokemonDetailDto, Duration.ofMinutes(15));

        return new PokemonResponseDto(
                pokemon.getId(),
                pokemon.getName(),
                pokemon.getImgUrl(),
                EnumSet.copyOf(pokemon.getTypes()),
                pokemonDetailDto
        );
    }

    public PokemonResponseDto findPokemonWithDetailCache(UUID id, Throwable e) {
        Pokemon pokemon = pokemonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pokemon not found"));

        String cacheKey = "pokemon-details:" + pokemon.getPokedexId();
        PokemonDetailDto pokemonDetailDto = (PokemonDetailDto) redisTemplate.opsForValue().get(cacheKey);

        return new PokemonResponseDto(
                pokemon.getId(),
                pokemon.getName(),
                pokemon.getImgUrl(),
                EnumSet.copyOf(pokemon.getTypes()),
                pokemonDetailDto
        );
    }

}
