CREATE TABLE pokemons (
    id UUID PRIMARY KEY,
    pokedex_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    img_url VARCHAR(2048),
    UNIQUE (pokedex_id, name)
);

CREATE TABLE pokemon_types (
    pokemon_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,

    CONSTRAINT fk_pokemon_types_pokemon
        FOREIGN KEY (pokemon_id)
            REFERENCES pokemons(id)
            ON DELETE CASCADE,
    CONSTRAINT uk_pokemon_types_pokemon_type
        UNIQUE (pokemon_id, type)
);