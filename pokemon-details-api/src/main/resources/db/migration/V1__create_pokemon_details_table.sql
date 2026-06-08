CREATE TABLE details (
    id UUID PRIMARY KEY,
    pokedex_id VARCHAR(50) NOT NULL,
    height FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    gender VARCHAR(1) check ( gender IN ('M', 'F') ) NOT NULL ,
    category VARCHAR(100) NOT NULL,
    UNIQUE (pokedex_id)
);

CREATE TABLE detail_abilities (
    detail_id UUID NOT NULL,
    ability VARCHAR(50) NOT NULL,

    CONSTRAINT fk_detail_abilities_detail
                               FOREIGN KEY (detail_id)
                               REFERENCES details(id)
                               ON DELETE CASCADE,
    CONSTRAINT uk_detail_abilities_detail_ability
                              UNIQUE (detail_id, ability)
);

CREATE TABLE detail_weaknesses (
    detail_id UUID NOT NULL,
    weakness VARCHAR(50) NOT NULL,

    CONSTRAINT fk_detail_weaknesses_detail
                               FOREIGN KEY (detail_id)
                               REFERENCES details(id)
                               ON DELETE CASCADE,
    CONSTRAINT uk_detail_weaknesses_detail_weakness
                               UNIQUE (detail_id, weakness)
);