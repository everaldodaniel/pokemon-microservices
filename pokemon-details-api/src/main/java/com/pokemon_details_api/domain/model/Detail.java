package com.pokemon_details_api.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "pokedex_id", nullable = false, unique = true)
    private String pokedexId;

    @Column(name = "height",  nullable = false)
    private float height;

    @Column(name = "weight", nullable = false)
    private float weight;

    @Column(name = "gender",  nullable = false, length = 1)
    private String gender;

    @Column(name = "category", nullable = false)
    private String category;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "detail_abilities",
            joinColumns = @JoinColumn(name = "detail_id")
    )
    @Column(name = "ability", nullable = false)
    private List<String> abilities = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "detail_weaknesses",
            joinColumns = @JoinColumn(name = "detail_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "weakness", nullable = false)
    private List<WeaknessType> weaknesses = new ArrayList<>();

}
