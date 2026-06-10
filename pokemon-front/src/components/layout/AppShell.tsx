import { Grid3X3, Home } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/catalogo", label: "Pokédex", icon: Grid3X3 },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Pokémon Pokédex">
          <span>
            <strong>Pokémon</strong>
            <small>Pokédex</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <item.icon size={18} aria-hidden />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </header>

      <div className="content-frame">
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
