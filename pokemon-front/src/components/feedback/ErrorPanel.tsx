import { Alert, Button } from "@mui/material";
import { TriangleAlert } from "lucide-react";

type ErrorPanelProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorPanel({ title = "Falha de comunicação", message, onRetry }: ErrorPanelProps) {
  return (
    <Alert
      severity="error"
      icon={<TriangleAlert size={22} />}
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            Recarregar
          </Button>
        ) : undefined
      }
      className="error-panel"
    >
      <strong>{title}</strong>
      <span>{message}</span>
    </Alert>
  );
}
