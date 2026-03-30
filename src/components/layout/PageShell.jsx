import Header from "./Header";
import Footer from "./Footer";
import LabBackground from "../background/LabBakckground";

export default function PageShell({ children }) {
  return (
    <div className="site-shell relative min-h-screen overflow-hidden transition-colors duration-300">
      <LabBackground />

      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}