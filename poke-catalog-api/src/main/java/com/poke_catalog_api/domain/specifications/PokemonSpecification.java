package com.poke_catalog_api.domain.specifications;

import com.poke_catalog_api.api.dto.PokemonFilter;
import com.poke_catalog_api.domain.model.Pokemon;
import com.poke_catalog_api.domain.model.PokemonType;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

public final class PokemonSpecification {

    private PokemonSpecification() {}

    public static Specification<Pokemon> withFilters(PokemonFilter filter) {
        return Specification.allOf(
                nameContains(filter.name()),
                typeContains(filter.types())
        );
    }

    public static Specification<Pokemon> nameContains(String name) {
        return ((root, query, criteriaBuilder) -> {

            if(name == null || name.isBlank()){
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        });
    }

    public static Specification<Pokemon> typeContains(Set<PokemonType> types) {
        return (((root, query, criteriaBuilder) -> {

            if(types == null || types.isEmpty()){
                return criteriaBuilder.conjunction();
            }

            query.distinct(true);

            Join<Pokemon, PokemonType> join = root.join("types");

            return join.in(types);
        }));
    }
}
