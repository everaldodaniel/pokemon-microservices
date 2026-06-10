import axios, { AxiosError } from "axios";
import { env } from "../../app/config/env";

export const catalogApi = axios.create({
  baseURL: env.catalogApiUrl,
  timeout: 9000,
});

export function getApiErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return "Não foi possível conectar com a API. Verifique se o serviço está rodando e tente novamente.";
    }

    const status = error.response.status;
    if (status === 404) return "Pokémon não encontrado.";
    if (status >= 500) return "O serviço retornou uma falha interna. Tente novamente em alguns instantes.";
  }

  return "Algo inesperado aconteceu durante a comunicação com a API.";
}
