package com.pokemon_details_api.api.controller;

import com.pokemon_details_api.domain.model.Detail;
import com.pokemon_details_api.domain.service.DetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/pokemon/details")
public class DetailController {

    private final DetailsService detailService;

    public DetailController(DetailsService detailService) {
        this.detailService = detailService;
    }

    @GetMapping()
    public ResponseEntity<Detail> getDetail(@RequestParam String pokedexId) {
        return ResponseEntity.ok(detailService.findByPokedexId(pokedexId));
    }

}
