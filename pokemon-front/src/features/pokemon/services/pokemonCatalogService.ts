import { catalogApi } from "../../../lib/axios/apiClient";
import { pokemonPageSchema, pokemonWithDetailSchema } from "../schemas/pokemonSchemas";
import type { PokemonPage, PokemonType, PokemonWithDetail } from "../types/pokemonTypes";

export type PokemonCatalogFilters = {
  name?: string;
  types?: PokemonType[];
  page: number;
  size: number;
  sort: string;
};

export const pokemonCatalogService = {
  async findAll(filters: PokemonCatalogFilters): Promise<PokemonPage> {
    const params = new URLSearchParams();

    if (filters.name?.trim()) {
      params.set("name", filters.name.trim());
    }

    filters.types?.forEach((type) => params.append("types", type));
    params.set("page", String(filters.page));
    params.set("size", String(filters.size));
    params.set("sort", filters.sort);

    const response = await catalogApi.get("/api/pokemons", { params });
    return pokemonPageSchema.parse(response.data);
  },

  async findById(id: string): Promise<PokemonWithDetail> {
    const response = await catalogApi.get(`/api/pokemons/${id}`);
    return pokemonWithDetailSchema.parse(response.data);
  },
};
