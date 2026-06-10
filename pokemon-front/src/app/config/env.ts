export const env = {
  catalogApiUrl: import.meta.env.VITE_CATALOG_API_URL,
  catalogPageSize: Number(import.meta.env.VITE_CATALOG_PAGE_SIZE ?? 12),
  catalogSuggestionSize: Number(import.meta.env.VITE_CATALOG_SUGGESTION_SIZE ?? 6),
  catalogSort: import.meta.env.VITE_CATALOG_SORT ?? "pokedexId,asc",
  homePokemonImageUrl: import.meta.env.VITE_HOME_POKEMON_IMAGE_URL,
};
