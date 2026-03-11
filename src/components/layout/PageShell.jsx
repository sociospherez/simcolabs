import Header from "./Header";
import Footer from "./Footer";
import LabBackground from "../../components/background/LabBakckground";
export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#050b16]/20 text-white">

      <Header />
      <main>{children}</main>
        <Footer />
<LabBackground/>
    </div>
  );
}