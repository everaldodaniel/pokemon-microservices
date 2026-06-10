import { Button, Chip, IconButton, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Dumbbell, Heart, Ruler, UserRound, X } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../../components/feedback/EmptyState";
import { ErrorPanel } from "../../../components/feedback/ErrorPanel";
import { getApiErrorMessage } from "../../../lib/axios/apiClient";
import { formatEnumLabel, formatMeasure } from "../../../lib/utils/format";
import { getTypeColor, TypeBadge } from "../components/TypeBadge";
import { pokemonCatalogService } from "../services/pokemonCatalogService";

export function PokemonDetailsPage() {
  const { pokemonId } = useParams();

  const query = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => pokemonCatalogService.findById(pokemonId ?? ""),
    enabled: Boolean(pokemonId),
  });

  if (!pokemonId) {
    return (
      <EmptyState
        title="Identificador ausente"
        description="Volte ao catálogo e selecione um Pokémon para abrir os detalhes."
      />
    );
  }

  return (
    <section className="page-stack">
      <Button component={Link} to="/catalogo" variant="text" startIcon={<ArrowLeft size={16} />}>
        Voltar ao catálogo
      </Button>

      {query.isLoading ? <LinearProgress /> : null}

      {query.isError ? (
        <ErrorPanel message={getApiErrorMessage(query.error)} onRetry={() => void query.refetch()} />
      ) : null}

      {query.isSuccess ? (
        <article className="pokemon-profile">
          <IconButton component={Link} to="/catalogo" className="profile-close" aria-label="Fechar detalhes">
            <X size={20} />
          </IconButton>

          <section className="profile-art-panel">
            <Link to="/" className="pokemon-logo" aria-label="Voltar ao início">
              Pokémon
            </Link>
            <div className="profile-art-shape" />
            <img src={query.data.imgUrl} alt={query.data.name} />
          </section>

          <section className="profile-info-panel">
            <span className="profile-number">#{query.data.detail?.pokedexId ?? "---"}</span>
            <h1>{query.data.name}</h1>
            <div className="badge-row">
              {query.data.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>

            {query.data.detail ? (
              <>
                <div className="profile-stat-grid">
                  <ProfileStat icon={<Ruler size={18} />} label="Altura" value={formatMeasure(query.data.detail.height, "m")} />
                  <ProfileStat icon={<Dumbbell size={18} />} label="Peso" value={formatMeasure(query.data.detail.weight, "kg")} />
                  <ProfileStat icon={<UserRound size={18} />} label="Gênero" value={query.data.detail.gender} />
                  <ProfileStat icon={<Heart size={18} />} label="Categoria" value={query.data.detail.category} />
                </div>

                <ProfileTokenGroup title="Habilidades" values={query.data.detail.abilities} />
                <ProfileTokenGroup title="Fraquezas" values={query.data.detail.weaknesses.map(formatEnumLabel)} />
              </>
            ) : (
              <div className="profile-empty">
                <h2>Detalhes indisponíveis</h2>
                <p>Não há informações extras para este Pokémon no momento.</p>
              </div>
            )}
          </section>
        </article>
      ) : null}
    </section>
  );
}

function ProfileStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="profile-stat">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProfileTokenGroup({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="profile-token-group">
      <h2>{title}</h2>
      <div className="token-row">
        {values.map((value) => {
          const typeColor = getTypeColor(value);

          return (
            <Chip
              key={value}
              label={value}
              sx={{
                backgroundColor: typeColor ?? "rgba(214, 231, 255, 0.18)",
                color: typeColor ? "#081113" : "#f8fbff",
                fontWeight: 900,
              }}
            />
          );
        })}
        {values.length === 0 ? (
          <Chip
            label="Não informado"
            sx={{
              backgroundColor: "rgba(214, 231, 255, 0.18)",
              color: "#f8fbff",
              fontWeight: 900,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
