import { motion } from "framer-motion";
import { useState } from "react";
import terpenesBg from "@/assets/terpenes-bg.jpg";

const terpenes = [
  {
    name: "Limonene",
    color: "hsl(50, 100%, 55%)",
    category: "Alertness",
    icon: "🍋",
    source: "Lemon",
    gameColor: "Yellow",
    description: "Uplifts mood, enhances alertness and quick reflexes. Boosts speed and responsiveness.",
    goodVibes: ["Mood elevation", "Focus", "Quick reflexes", "Creativity"],
    badVibes: ["Overstimulation", "Restlessness", "Inability to relax"],
    beats: "Myrcene",
    beatsReason: "Counteracts sedative effects with uplifting energy",
    beatenBy: "Beta-Pinene",
    beatenByReason: "Over-enhances alertness leading to restlessness",
  },
  {
    name: "Myrcene",
    color: "hsl(210, 80%, 55%)",
    category: "Calmness",
    icon: "🥭",
    source: "Mango",
    gameColor: "Blue",
    description: "Enhances relaxation and aids in recovery from hunger-related bad vibes. Promotes deep calm.",
    goodVibes: ["Relaxation profunda", "Stress relief", "Recovery"],
    badVibes: ["Drowsiness", "Lethargy", "Lack of motivation"],
    beats: "Caryophyllene",
    beatsReason: "Induces relaxation that mitigates hunger",
    beatenBy: "Limonene",
    beatenByReason: "Uplifting effects overpower the calm",
  },
  {
    name: "Caryophyllene",
    color: "hsl(0, 75%, 50%)",
    category: "Hunger",
    icon: "🌶️",
    source: "Cinnamon",
    gameColor: "Red",
    description: "Único terpeno que actúa como cannabinoide. Controls appetite and aids in alertness recovery.",
    goodVibes: ["Appetite control", "Well-being", "Anti-inflammatory"],
    badVibes: ["Overeating", "Sluggishness", "Distraction by hunger"],
    beats: "Humulene",
    beatsReason: "Stimulates hunger overcoming appetite suppression",
    beatenBy: "Myrcene",
    beatenByReason: "Relaxation reduces focus on hunger",
  },
  {
    name: "Humulene",
    color: "hsl(25, 90%, 55%)",
    category: "Hunger",
    icon: "🍺",
    source: "Clove",
    gameColor: "Orange",
    description: "Regulates appetite and enhances recovery from comfort-related bad vibes. Found in hops.",
    goodVibes: ["Appetite suppression", "Focus", "Anti-tumor"],
    badVibes: ["Decreased energy", "Agitation", "Lack of appetite"],
    beats: "Linalool",
    beatsReason: "Maintains focus against over-relaxation",
    beatenBy: "Caryophyllene",
    beatenByReason: "Hunger-inducing properties overcome suppression",
  },
  {
    name: "Linalool",
    color: "hsl(330, 75%, 65%)",
    category: "Calmness",
    icon: "💜",
    source: "Lavender",
    gameColor: "Pink",
    description: "Linked to calmness. Improves agility, jump height, and endurance. Reduces anxiety.",
    goodVibes: ["Calm", "Anxiety reduction", "Agility boost"],
    badVibes: ["Over-relaxation", "Diminished alertness", "Disengagement"],
    beats: "Alpha-Pinene",
    beatsReason: "Calms down overstimulation",
    beatenBy: "Humulene",
    beatenByReason: "Focus-enhancing effects counteract sedation",
  },
  {
    name: "Alpha-Pinene",
    color: "hsl(175, 70%, 45%)",
    category: "Alertness",
    icon: "🌲",
    source: "Pine Cones",
    gameColor: "Turquoise",
    description: "Sharpens cognitive abilities and aids in recovery from hunger-related bad vibes.",
    goodVibes: ["Mental clarity", "Cognitive focus", "Memory enhancement"],
    badVibes: ["Excessive alertness", "Anxiety", "Nervousness"],
    beats: "Terpinolene",
    beatsReason: "Enhances focus against tranquility",
    beatenBy: "Linalool",
    beatenByReason: "Soothing effects overpower the stimulation",
  },
  {
    name: "Terpinolene",
    color: "hsl(270, 65%, 55%)",
    category: "Calmness",
    icon: "🌸",
    source: "Lilac",
    gameColor: "Purple",
    description: "Induces tranquility and aids in terpene energy recovery. Encourages creative thinking.",
    goodVibes: ["Tranquility", "Creative thinking", "Energy recovery"],
    badVibes: ["Disinterest", "Lack of drive", "Too much tranquility"],
    beats: "Beta-Pinene",
    beatsReason: "Provides tranquil counter to over-clarity",
    beatenBy: "Alpha-Pinene",
    beatenByReason: "Sharper cognitive focus overpowers tranquility",
  },
  {
    name: "Beta-Pinene",
    color: "hsl(120, 70%, 45%)",
    category: "Alertness",
    icon: "🌿",
    source: "Rosemary",
    gameColor: "Green",
    description: "Clarifies thought processes and enhances overall bad vibe recovery. Strategic thinking.",
    goodVibes: ["Mental clarity", "Strategic thinking", "Bad vibe recovery"],
    badVibes: ["Overthinking", "Decision paralysis", "Too much clarity"],
    beats: "Limonene",
    beatsReason: "Provides clear-headedness against overstimulation",
    beatenBy: "Terpinolene",
    beatenByReason: "Tranquility counters excessive alertness",
  },
];

// Circular correlation order (each beats the next)
const circularOrder = [
  "Limonene", "Myrcene", "Caryophyllene", "Humulene",
  "Linalool", "Alpha-Pinene", "Terpinolene", "Beta-Pinene"
];

const boostingPairings = [
  { pair: ["Limonene", "Beta-Pinene"], effect: "Enhances overall alertness and cognitive clarity" },
  { pair: ["Alpha-Pinene", "Caryophyllene"], effect: "Increases focus while managing hunger" },
  { pair: ["Myrcene", "Terpinolene"], effect: "Deepens relaxation for stress relief" },
  { pair: ["Linalool", "Humulene"], effect: "Calm + appetite control for strategic thinking" },
];

const deboostingPairings = [
  { pair: ["Caryophyllene", "Linalool"], effect: "Over-relaxation and lethargy" },
  { pair: ["Myrcene", "Alpha-Pinene"], effect: "Heightened anxiety from conflicting signals" },
  { pair: ["Terpinolene", "Limonene"], effect: "Inability to relax or recover" },
  { pair: ["Beta-Pinene", "Humulene"], effect: "Nervousness and agitation" },
];

const counteractingPairings = [
  { pair: ["Limonene", "Myrcene"] },
  { pair: ["Alpha-Pinene", "Linalool"] },
  { pair: ["Beta-Pinene", "Terpinolene"] },
  { pair: ["Humulene", "Caryophyllene"] },
];

type Tab = "profiles" | "wheel" | "interactions";

const TerpenesSection = () => {
  const [activeTerpene, setActiveTerpene] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("profiles");
  const active = terpenes[activeTerpene];

  return (
    <section id="terpenes" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={terpenesBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-background/90" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
            Full Spectrum Education
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            TERPENE LAB
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Los 8 terpenos del Full Spectrum. Cada uno tiene colores, categorías e interacciones únicas.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {([
            { id: "profiles" as Tab, label: "Terpene Profiles" },
            { id: "wheel" as Tab, label: "Circular Correlation" },
            { id: "interactions" as Tab, label: "Interactions" },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-display text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab.id
                  ? "border-primary bg-primary/10 text-primary shadow-[var(--shadow-neon)]"
                  : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profiles Tab */}
        {activeTab === "profiles" && (
          <div>
            {/* Terpene selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {terpenes.map((t, i) => (
                <motion.button
                  key={t.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTerpene(i)}
                  className={`px-3 py-1.5 rounded-lg font-display text-xs uppercase tracking-wider transition-all duration-300 border ${
                    activeTerpene === i ? "shadow-lg" : "bg-card hover:border-current"
                  }`}
                  style={{
                    color: t.color,
                    borderColor: activeTerpene === i ? t.color : undefined,
                    backgroundColor: activeTerpene === i ? `${t.color}15` : undefined,
                    boxShadow: activeTerpene === i ? `0 0 15px ${t.color}30` : undefined,
                  }}
                >
                  {t.icon} {t.name}
                </motion.button>
              ))}
            </div>

            {/* Active terpene detail */}
            <motion.div
              key={activeTerpene}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto rounded-xl border border-border p-8 bg-card"
              style={{ boxShadow: `0 0 30px ${active.color}15` }}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl">{active.icon}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: active.color }}>
                    {active.name}
                  </h3>
                  <div className="flex gap-3 text-xs font-display tracking-widest text-muted-foreground uppercase">
                    <span>{active.category}</span>
                    <span>•</span>
                    <span style={{ color: active.color }}>{active.gameColor}</span>
                    <span>•</span>
                    <span>Source: {active.source}</span>
                  </div>
                </div>
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed mt-4">{active.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="font-display text-xs tracking-widest text-primary mb-2 uppercase">
                    ✨ Good Vibes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.goodVibes.map((v) => (
                      <span key={v} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="font-display text-xs tracking-widest text-destructive mb-2 uppercase">
                    ⚠️ Bad Vibes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.badVibes.map((v) => (
                      <span key={v} className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Battle info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-primary/20 p-4">
                  <p className="font-display text-[10px] tracking-widest text-primary mb-1 uppercase">⚔️ Beats</p>
                  <p className="text-sm font-semibold text-foreground">{active.beats}</p>
                  <p className="text-xs text-muted-foreground mt-1">{active.beatsReason}</p>
                </div>
                <div className="rounded-lg border border-destructive/20 p-4">
                  <p className="font-display text-[10px] tracking-widest text-destructive mb-1 uppercase">💀 Beaten By</p>
                  <p className="text-sm font-semibold text-foreground">{active.beatenBy}</p>
                  <p className="text-xs text-muted-foreground mt-1">{active.beatenByReason}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Circular Correlation Wheel */}
        {activeTab === "wheel" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-xs text-primary uppercase tracking-widest">Full</p>
                  <p className="font-display text-xs text-primary uppercase tracking-widest">Spectrum</p>
                </div>
              </div>

              {/* Circle outline */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
                <circle cx="240" cy="240" r="180" fill="none" stroke="hsl(120 100% 55% / 0.1)" strokeWidth="1" />
                {/* Arrows between nodes */}
                {circularOrder.map((name, i) => {
                  const next = (i + 1) % circularOrder.length;
                  const angle1 = (i * 360) / 8 - 90;
                  const angle2 = (next * 360) / 8 - 90;
                  const r = 180;
                  const midAngle = ((angle1 + angle2) / 2) * (Math.PI / 180);
                  const x1 = 240 + r * Math.cos(angle1 * Math.PI / 180);
                  const y1 = 240 + r * Math.sin(angle1 * Math.PI / 180);
                  const x2 = 240 + r * Math.cos(angle2 * Math.PI / 180);
                  const y2 = 240 + r * Math.sin(angle2 * Math.PI / 180);
                  const t = terpenes.find(t => t.name === name);
                  return (
                    <line
                      key={`arrow-${i}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={t?.color || "hsl(120,100%,55%)"}
                      strokeWidth="1.5"
                      opacity="0.4"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="hsl(120,100%,55%)" opacity="0.6" />
                  </marker>
                </defs>
              </svg>

              {/* Terpene nodes */}
              {circularOrder.map((name, i) => {
                const angle = (i * 360) / 8 - 90;
                const r = 42; // percentage
                const x = 50 + r * Math.cos(angle * Math.PI / 180);
                const y = 50 + r * Math.sin(angle * Math.PI / 180);
                const t = terpenes.find(t => t.name === name)!;
                return (
                  <motion.button
                    key={name}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => { setActiveTerpene(terpenes.indexOf(t)); setActiveTab("profiles"); }}
                    className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl border-2 transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        borderColor: t.color,
                        backgroundColor: `${t.color}15`,
                        boxShadow: `0 0 12px ${t.color}30`,
                      }}
                    >
                      {t.icon}
                    </div>
                    <span className="font-display text-[9px] md:text-[10px] mt-1 tracking-wider uppercase" style={{ color: t.color }}>
                      {t.name}
                    </span>
                    <span className="text-[8px] text-muted-foreground font-display uppercase">{t.category}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 max-w-md text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cada terpeno <span className="text-primary">vence</span> al siguiente en el círculo y es <span className="text-destructive">vencido</span> por el anterior.
                Haz click en un terpeno para ver su perfil completo.
              </p>
            </div>
          </motion.div>
        )}

        {/* Interactions Tab */}
        {activeTab === "interactions" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-10"
          >
            {/* Boosting */}
            <div>
              <h3 className="font-display text-lg text-primary mb-4 uppercase tracking-wider">
                ⚡ Boosting Pairings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {boostingPairings.map((p, i) => {
                  const t1 = terpenes.find(t => t.name === p.pair[0])!;
                  const t2 = terpenes.find(t => t.name === p.pair[1])!;
                  return (
                    <div key={i} className="rounded-lg border border-primary/20 bg-card p-4 flex items-start gap-3">
                      <div className="flex items-center gap-1 shrink-0 mt-0.5">
                        <span className="text-lg">{t1.icon}</span>
                        <span className="text-primary text-xs">+</span>
                        <span className="text-lg">{t2.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          <span style={{ color: t1.color }}>{t1.name}</span>
                          {" + "}
                          <span style={{ color: t2.color }}>{t2.name}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{p.effect}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Counteracting */}
            <div>
              <h3 className="font-display text-lg text-foreground mb-4 uppercase tracking-wider">
                ⚖️ Counteracting Pairings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {counteractingPairings.map((p, i) => {
                  const t1 = terpenes.find(t => t.name === p.pair[0])!;
                  const t2 = terpenes.find(t => t.name === p.pair[1])!;
                  return (
                    <div key={i} className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
                      <span className="text-lg">{t1.icon}</span>
                      <span className="text-muted-foreground text-xs font-display">VS</span>
                      <span className="text-lg">{t2.icon}</span>
                      <p className="text-sm text-foreground">
                        <span style={{ color: t1.color }}>{t1.name}</span>
                        {" vs "}
                        <span style={{ color: t2.color }}>{t2.name}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deboosting */}
            <div>
              <h3 className="font-display text-lg text-destructive mb-4 uppercase tracking-wider">
                💀 Deboosting Pairings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {deboostingPairings.map((p, i) => {
                  const t1 = terpenes.find(t => t.name === p.pair[0])!;
                  const t2 = terpenes.find(t => t.name === p.pair[1])!;
                  return (
                    <div key={i} className="rounded-lg border border-destructive/20 bg-card p-4 flex items-start gap-3">
                      <div className="flex items-center gap-1 shrink-0 mt-0.5">
                        <span className="text-lg">{t1.icon}</span>
                        <span className="text-destructive text-xs">×</span>
                        <span className="text-lg">{t2.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          <span style={{ color: t1.color }}>{t1.name}</span>
                          {" + "}
                          <span style={{ color: t2.color }}>{t2.name}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{p.effect}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TerpenesSection;
