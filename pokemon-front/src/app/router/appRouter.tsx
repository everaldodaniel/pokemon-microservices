import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import { PokemonCatalogPage } from "../../features/pokemon/pages/PokemonCatalogPage";
import { PokemonDetailsPage } from "../../features/pokemon/pages/PokemonDetailsPage";
import { HomePage } from "../../features/pokemon/pages/HomePage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalogo", element: <PokemonCatalogPage /> },
      { path: "catalogo/:pokemonId", element: <PokemonDetailsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
