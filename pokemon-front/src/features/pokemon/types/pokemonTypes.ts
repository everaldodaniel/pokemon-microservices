import { z } from "zod";
import {
  pokemonDetailSchema,
  pokemonPageSchema,
  pokemonSummarySchema,
  pokemonTypeSchema,
  pokemonWithDetailSchema,
} from "../schemas/pokemonSchemas";

export type PokemonType = z.infer<typeof pokemonTypeSchema>;
export type PokemonSummary = z.infer<typeof pokemonSummarySchema>;
export type PokemonDetail = z.infer<typeof pokemonDetailSchema>;
export type PokemonWithDetail = z.infer<typeof pokemonWithDetailSchema>;
export type PokemonPage = z.infer<typeof pokemonPageSchema>;
