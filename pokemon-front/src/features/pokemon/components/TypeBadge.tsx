import { Chip } from "@mui/material";
import { formatEnumLabel } from "../../../lib/utils/format";
import type { PokemonType } from "../types/pokemonTypes";

export const typeColors: Record<PokemonType, string> = {
  NORMAL: "#a8a77a",
  FIRE: "#ee8130",
  WATER: "#6390f0",
  ELECTRIC: "#f7d02c",
  GRASS: "#7ac74c",
  ICE: "#96d9d6",
  FIGHTING: "#c22e28",
  POISON: "#a33ea1",
  GROUND: "#e2bf65",
  FLYING: "#a98ff3",
  PSYCHIC: "#f95587",
  BUG: "#a6b91a",
  ROCK: "#b6a136",
  GHOST: "#735797",
  DRAGON: "#6f35fc",
  DARK: "#705746",
  STEEL: "#b7b7ce",
  FAIRY: "#d685ad",
};

export function getTypeColor(value: string) {
  const normalizedType = value.trim().replace(/\s+/g, "_").toUpperCase() as PokemonType;
  return typeColors[normalizedType];
}

export function TypeBadge({ type }: { type: PokemonType }) {
  return (
    <Chip
      label={formatEnumLabel(type)}
      size="small"
      sx={{
        backgroundColor: getTypeColor(type),
        color: "#081113",
      }}
    />
  );
}
