import { NavLink } from "react-router-dom";
import navigation from "../../data/navigation";
import ThemeToggle from "../ui/ThemeToggle";
import useThemeMode from "../../hooks/useThemeMode";

export default function Header() {
  const isNight = useThemeMode();

  return (
    <header className="site-header fixed z-50 w-full py-4 px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 no-underline">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/35 bg-blue-500/10 shadow-glow">
            <div className="absolute inset-2 rounded-xl border border-cyan-300/20" />
            <div className="h-3 w-3 rotate-45 bg-gradient-to-br from-cyan-300 to-blue-500" />
          </div>

          <div className="site-title text-lg font-semibold tracking-tight">SimCo Labs</div>
          <div className="site-subtitle text-[11px] uppercase tracking-[0.18em]"></div>
        </NavLink>

        <nav className="hidden gap-6 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `site-nav-link text-sm no-underline transition ${isActive ? 'is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}