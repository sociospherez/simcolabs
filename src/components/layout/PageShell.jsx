import Header from "./Header";
import Footer from "./Footer";
import LabBackground from "../background/LabBakckground";
import useThemeMode from "../../hooks/useThemeMode";

export default function PageShell({ children }) {
  const isNight = useThemeMode();

  return (
    <div
      className={`site-shell relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isNight ? "theme-text-primary" : "text-slate-900"
      }`}
    >
      <LabBackground />

      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}