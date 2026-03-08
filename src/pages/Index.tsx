import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChaptersSection from "@/components/ChaptersSection";
import TerpenesSection from "@/components/TerpenesSection";
import HighModeSection from "@/components/HighModeSection";
import HighcoonVoiceAgent from "@/components/HighcoonVoiceAgent";
import MoleculeParticles from "@/components/MoleculeParticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <MoleculeParticles />
      <Navbar />
      <HeroSection />
      <ChaptersSection />
      <TerpenesSection />
      <HighModeSection />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 text-center">
        <p className="font-display text-xs tracking-widest text-muted-foreground uppercase mb-2">
          Highcoon Against STIGMA: Full Spectrum
        </p>
        <p className="text-sm text-muted-foreground">
          🍃 Keep up the high vibes 🍃
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
          <a href="https://www.thcgrouppr.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            thcgrouppr.com
          </a>
          <a href="https://www.spatial.io/@highvibes" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Spatial.IO
          </a>
          <span>@Highcoonvibes</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
