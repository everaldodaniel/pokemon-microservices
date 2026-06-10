# Pokémon Pokédex Frontend

Frontend em React, TypeScript e Vite para visualizar Pokémon em uma interface inspirada em Pokédex.

## Como rodar

```bash
npm install
npm run dev
```

Para gerar build de produção:

```bash
npm run build
```

## Variáveis de ambiente

Crie um arquivo `.env` baseado em `.env.example`.

- `VITE_CATALOG_API_URL`: URL base da API de catálogo. Exemplo: `http://localhost:8080`.
- `VITE_CATALOG_PAGE_SIZE`: quantidade de Pokémon por página no catálogo.
- `VITE_CATALOG_SUGGESTION_SIZE`: quantidade de sugestões exibidas no autocomplete.
- `VITE_CATALOG_SORT`: ordenação enviada para o endpoint pageable. Exemplo: `pokedexId,asc`.
- `VITE_HOME_POKEMON_IMAGE_URL`: imagem usada no destaque da página inicial.

## Telas

- Início: apresenta a Pokédex com chamada para explorar o catálogo.
- Catálogo: lista Pokémon com imagem, número, tipos, busca por nome, filtro por tipos e paginação.
- Detalhes: mostra imagem grande, número, nome, tipos, altura, peso, gênero, categoria, habilidades e fraquezas.
