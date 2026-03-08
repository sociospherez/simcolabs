import Header from './Header';
import Footer from './Footer';

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
