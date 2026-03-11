import { NavLink } from 'react-router-dom';
import navigation from '../../data/navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050b16]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3 no-underline">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/35 bg-blue-500/10 shadow-glow">
            <div className="absolute inset-2 rounded-xl border border-cyan-300/20" />
            <div className="h-3 w-3 rotate-45 bg-gradient-to-br from-cyan-300 to-blue-500" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">SimCo Labs</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Simulation • Collaboration • Innovation
            </div>
          </div>
        </NavLink>

        <nav className="hidden gap-6 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm no-underline transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
