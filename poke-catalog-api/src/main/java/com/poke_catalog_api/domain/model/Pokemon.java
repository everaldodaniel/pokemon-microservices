package com.poke_catalog_api.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "pokemons")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "pokedex_id", nullable = false,  unique = true)
    private String pokedexId;

    @Column(name = "name", nullable = false,  unique = true)
    private String name;

    @Column(name = "img_url", nullable = false)
    private String imgUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "pokemon_types",
            joinColumns = @JoinColumn(name = "pokemon_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Set<PokemonType> types = new HashSet<>();
}
