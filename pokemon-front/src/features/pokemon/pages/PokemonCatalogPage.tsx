import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { env } from "../../../app/config/env";
import { EmptyState, ReloadButton } from "../../../components/feedback/EmptyState";
import { ErrorPanel } from "../../../components/feedback/ErrorPanel";
import { getApiErrorMessage } from "../../../lib/axios/apiClient";
import { useDebouncedValue } from "../../../lib/hooks/useDebouncedValue";
import { formatEnumLabel } from "../../../lib/utils/format";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonCatalogSkeleton } from "../components/PokemonCatalogSkeleton";
import { getTypeColor } from "../components/TypeBadge";
import { pokemonTypeSchema } from "../schemas/pokemonSchemas";
import { pokemonCatalogService } from "../services/pokemonCatalogService";
import type { PokemonSummary, PokemonType } from "../types/pokemonTypes";

const pokemonTypes = pokemonTypeSchema.options;

export function PokemonCatalogPage() {
  const [draftName, setDraftName] = useState("");
  const [draftTypes, setDraftTypes] = useState<PokemonType[]>([]);
  const [appliedName, setAppliedName] = useState("");
  const [appliedTypes, setAppliedTypes] = useState<PokemonType[]>([]);
  const [page, setPage] = useState(0);
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
  const debouncedSuggestionName = useDebouncedValue(draftName.trim(), 300);

  const query = useQuery({
    queryKey: ["pokemons", { appliedName, appliedTypes, page }],
    queryFn: () =>
      pokemonCatalogService.findAll({
        name: appliedName,
        types: appliedTypes,
        page,
        size: env.catalogPageSize,
        sort: env.catalogSort,
      }),
  });

  const suggestionsQuery = useQuery({
    queryKey: ["pokemon-name-suggestions", debouncedSuggestionName],
    queryFn: () =>
      pokemonCatalogService.findAll({
        name: debouncedSuggestionName,
        page: 0,
        size: env.catalogSuggestionSize,
        sort: env.catalogSort,
      }),
    enabled: debouncedSuggestionName.length >= 2,
  });

  const pokemonPage = query.data;
  const suggestions = suggestionsQuery.data?.content ?? [];
  const hasAppliedFilters = Boolean(appliedName.trim()) || appliedTypes.length > 0;
  const hasPendingSearch =
    draftName.trim() !== appliedName.trim() || draftTypes.join("|") !== appliedTypes.join("|");

  function applyFilters() {
    setAppliedName(draftName.trim());
    setAppliedTypes(draftTypes);
    setPage(0);
  }

  function resetFilters() {
    setDraftName("");
    setDraftTypes([]);
    setAppliedName("");
    setAppliedTypes([]);
    setPage(0);
  }

  function applyTypeFilter(types: PokemonType[]) {
    setDraftTypes(types);
    setAppliedTypes(types);
    setPage(0);
    setIsTypeSelectOpen(false);
  }

  function applySuggestion(pokemon: PokemonSummary | string | null) {
    if (!pokemon) return;

    const pokemonName = typeof pokemon === "string" ? pokemon : pokemon.name;
    setDraftName(pokemonName);
    setAppliedName(pokemonName.trim());
    setAppliedTypes(draftTypes);
    setPage(0);
  }

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Pokédex</span>
          <h2>Catálogo de Pokémon</h2>
          <p>Escolha um Pokémon para abrir sua ficha completa.</p>
        </div>
      </div>

      <div className="catalog-filters">
        <Autocomplete<PokemonSummary, false, false, true>
          freeSolo
          options={suggestions}
          inputValue={draftName}
          loading={suggestionsQuery.isFetching}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
          onInputChange={(_, value, reason) => {
            if (reason === "input" || reason === "clear") {
              setDraftName(value);
            }
          }}
          onChange={(_, value) => applySuggestion(value)}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <span className="suggestion-option">
                <img src={option.imgUrl} alt="" />
                <strong>{option.name}</strong>
                <small>#{option.pokedexId}</small>
              </span>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar por nome"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  applyFilters();
                }
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {suggestionsQuery.isFetching ? <CircularProgress color="inherit" size={18} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          noOptionsText={
            debouncedSuggestionName.length < 2
              ? "Digite pelo menos 2 letras"
              : "Nenhum Pokémon encontrado"
          }
        />

        <FormControl fullWidth>
          <InputLabel id="pokemon-type-filter-label">Tipos</InputLabel>
          <Select
            labelId="pokemon-type-filter-label"
            multiple
            open={isTypeSelectOpen}
            onOpen={() => setIsTypeSelectOpen(true)}
            onClose={() => setIsTypeSelectOpen(false)}
            value={draftTypes}
            input={<OutlinedInput label="Tipos" />}
            onChange={(event) => applyTypeFilter(event.target.value as PokemonType[])}
            renderValue={(selected) => (
              <div className="filter-chip-row">
                {selected.map((type) => (
                  <Chip
                    key={type}
                    label={formatEnumLabel(type)}
                    size="small"
                    sx={{
                      backgroundColor: getTypeColor(type),
                      color: "#081113",
                      fontWeight: 900,
                    }}
                  />
                ))}
              </div>
            )}
          >
            {pokemonTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <Chip
                  label={formatEnumLabel(type)}
                  size="small"
                  sx={{
                    backgroundColor: getTypeColor(type),
                    color: "#081113",
                    fontWeight: 900,
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<Search size={16} />}
          onClick={applyFilters}
          disabled={!hasPendingSearch}
        >
          Buscar
        </Button>

        <Button variant="outlined" onClick={resetFilters} disabled={!hasAppliedFilters && !hasPendingSearch}>
          Limpar filtros
        </Button>
      </div>

      {query.isLoading ? <PokemonCatalogSkeleton /> : null}

      {query.isError ? (
        <ErrorPanel message={getApiErrorMessage(query.error)} onRetry={() => void query.refetch()} />
      ) : null}

      {query.isSuccess && pokemonPage && pokemonPage.empty ? (
        <EmptyState
          title="Nenhum Pokémon encontrado"
          description="Nenhum resultado apareceu para os filtros selecionados."
          action={<ReloadButton onClick={() => void query.refetch()} />}
        />
      ) : null}

      {query.isSuccess && pokemonPage && !pokemonPage.empty ? (
        <>
          <div className="catalog-summary">
            <span>{pokemonPage.totalElements} Pokémon encontrados</span>
            <span>
              Página {pokemonPage.number + 1} de {pokemonPage.totalPages}
            </span>
          </div>

          <div className="pokemon-grid">
            {pokemonPage.content.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <Pagination
            count={pokemonPage.totalPages}
            page={pokemonPage.number + 1}
            onChange={(_, nextPage) => setPage(nextPage - 1)}
            color="primary"
            className="catalog-pagination"
          />
        </>
      ) : null}
    </section>
  );
}
