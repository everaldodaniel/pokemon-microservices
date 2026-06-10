import { z } from "zod";

export const pokemonTypeSchema = z.enum([
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
]);

export const pokemonSummarySchema = z.object({
  id: z.string().uuid(),
  pokedexId: z.string(),
  name: z.string(),
  imgUrl: z.string().url(),
  types: z.array(pokemonTypeSchema).or(z.set(pokemonTypeSchema)).transform((types) => Array.from(types)),
});

export const pokemonDetailSchema = z.object({
  id: z.string().uuid(),
  pokedexId: z.string(),
  height: z.number(),
  weight: z.number(),
  gender: z.string(),
  category: z.string(),
  abilities: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  fromCache: z.boolean().optional(),
  fallback: z.boolean().optional(),
  source: z.string().optional(),
});

export const pokemonWithDetailSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  imgUrl: z.string().url(),
  types: z.array(pokemonTypeSchema).or(z.set(pokemonTypeSchema)).transform((types) => Array.from(types)),
  detail: pokemonDetailSchema.nullable(),
});

export const pokemonPageSchema = z.object({
  content: z.array(pokemonSummarySchema),
  totalElements: z.number(),
  totalPages: z.number(),
  size: z.number(),
  number: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  numberOfElements: z.number(),
  empty: z.boolean(),
});
