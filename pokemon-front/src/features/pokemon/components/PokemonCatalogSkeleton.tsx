import { Skeleton } from "@mui/material";

export function PokemonCatalogSkeleton() {
  return (
    <div className="pokemon-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="pokemon-card skeleton-card" key={index}>
          <Skeleton variant="rounded" width={88} height={88} />
          <div className="pokemon-card-body">
            <Skeleton width={72} />
            <Skeleton width={140} height={32} />
            <Skeleton width={160} />
          </div>
        </div>
      ))}
    </div>
  );
}
