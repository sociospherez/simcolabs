import Header from "./Header";
import Footer from "./Footer";
import LabBackground from "../background/LabBakckground";

export default function PageShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-white">
      <LabBackground />

      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}