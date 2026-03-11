import Header from "./Header";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}