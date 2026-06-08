package com.poke_catalog_api.infra.client;

import com.poke_catalog_api.api.dto.PokemonDetailDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "pokemon-details-api",
        url = "${clients.pokemon-details.url}"
)
public interface PokemonDetailClient {

    @RequestMapping(method = RequestMethod.GET, value = "api/pokemon/details")
    PokemonDetailDto getPokemonDetails(@RequestParam String pokedexId);

}
