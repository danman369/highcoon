import { Leaf } from "lucide-react";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-display text-sm font-bold tracking-wider text-primary">HIGHCOON</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Story", id: "chapters" },
            { label: "Terpenes", id: "terpenes" },
            { label: "High Mode", id: "highmode" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-display text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-muted-foreground font-body">
          Keep up the high vibes 🍃
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
