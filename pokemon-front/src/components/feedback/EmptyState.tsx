import { Button } from "@mui/material";
import { SearchX } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <SearchX size={42} aria-hidden />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </section>
  );
}

export function ReloadButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="contained" color="secondary" onClick={onClick}>
      Tentar novamente
    </Button>
  );
}
