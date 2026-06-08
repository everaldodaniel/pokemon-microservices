package com.pokemon_details_api.domain.service;

import com.pokemon_details_api.domain.exception.ResourceNotFoundException;
import com.pokemon_details_api.domain.model.Detail;
import com.pokemon_details_api.infra.repository.DetailRepository;
import org.springframework.stereotype.Service;

@Service
public class DetailsService {

    private final DetailRepository detailRepository;

    public DetailsService(DetailRepository detailRepository) {
        this.detailRepository = detailRepository;
    }

    public Detail findByPokedexId(String pokedexId) {
        return detailRepository.findByPokedexId(pokedexId)
                .orElseThrow(() -> new ResourceNotFoundException("Detail Not Found"));
    }

}
