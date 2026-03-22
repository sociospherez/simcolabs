import { Link, useLocation } from "react-router-dom";

export default function LabInterfaceTrigger() {
  const location = useLocation();

  if (location.pathname === "/lab-interface") return null;

  const sourceLabel =
    location.pathname === "/"
      ? "Home"
      : location.pathname.replace("/", "").replace(/-/g, " ");

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link
        to="/lab-interface"
        state={{ sourceLabel }}
        className="group inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-[#08111f]/80 px-4 py-3 text-sm text-white shadow-[0_8px_30px_rgba(2,8,23,0.45)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#0b1627]/90"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
          <span className="absolute inset-0 rounded-full border border-sky-300/10 animate-ping opacity-30" />
        </span>

        <span className="hidden sm:block">
          Open <span className="text-sky-300">Lab Interface</span>
        </span>

        <span className="sm:hidden">Lab</span>
      </Link>
    </div>
  );
}