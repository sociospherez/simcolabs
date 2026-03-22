import LabBackground from "../components/background/LabBakckground";
import Hero from "../components/home/Hero";
import FeaturedExperiments from "../components/home/FeaturedExperiments";
import ExplorationAreas from "../components/home/ExplorationAreas";
import JoinLab from "../components/home/JoinLab";

export default function Home() {
  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050b16]/20 text-white">

      <Hero />

      <FeaturedExperiments />
      <ExplorationAreas />
      <JoinLab />

<LabBackground/>
    </div>

  );
}