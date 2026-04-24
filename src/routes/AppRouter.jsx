import { Routes, Route } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Home from "../pages/Home";
import Showcase from "../pages/Showcase";
import Research from "../pages/Research";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProjectDetail from "../pages/ProjectDetail";
import LabInterface from "../pages/LabInterface";
import TransformationBrief from "../pages/TransformationBrief";
import RouteInsuranceConcept from "../pages/RouteInsuranceConcept";
import GA2020Dashboard from "../pages/GA2020Dashboard";


export default function AppRouter() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lab-interface" element={<LabInterface />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/transformation-brief" element={<TransformationBrief />} />
        <Route path="/route-insurance" element={<RouteInsuranceConcept />} />
        <Route path="/projects/ga2020-sector-dashboard" element={<GA2020Dashboard />} />

      </Routes>
    </PageShell>
  );
}