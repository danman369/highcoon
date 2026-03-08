import { motion } from "framer-motion";
import { useState } from "react";
import terpenesBg from "@/assets/terpenes-bg.jpg";

const terpenes = [
  {
    name: "Limonene",
    color: "hsl(var(--terpene-limonene))",
    bgClass: "bg-terpene-limonene",
    effect: "Alertness",
    icon: "🍋",
    description: "Encontrado en cítricos. Eleva el ánimo, reduce el estrés y tiene propiedades antibacterianas.",
    vibes: { good: ["Energía", "Enfoque", "Humor"], bad: ["Ansiedad si exceso"] },
  },
  {
    name: "Linalool",
    color: "hsl(var(--terpene-linalool))",
    bgClass: "bg-terpene-linalool",
    effect: "Calmness",
    icon: "💜",
    description: "Presente en lavanda. Promueve relajación, alivio del dolor y tiene efectos anti-inflamatorios.",
    vibes: { good: ["Calma", "Sueño", "Alivio"], bad: ["Somnolencia"] },
  },
  {
    name: "Myrcene",
    color: "hsl(var(--terpene-myrcene))",
    bgClass: "bg-terpene-myrcene",
    effect: "Relaxation",
    icon: "🥭",
    description: "El terpeno más común en cannabis. Efecto sedante, analgésico y anti-inflamatorio.",
    vibes: { good: ["Relajación profunda", "Alivio muscular"], bad: ["Letargo"] },
  },
  {
    name: "Pinene",
    color: "hsl(var(--terpene-pinene))",
    bgClass: "bg-terpene-pinene",
    effect: "Alertness",
    icon: "🌲",
    description: "Aroma a pino. Mejora la memoria, apertura bronquial y tiene propiedades anti-inflamatorias.",
    vibes: { good: ["Claridad mental", "Respiración"], bad: ["Irritación si sensible"] },
  },
  {
    name: "Caryophyllene",
    color: "hsl(var(--terpene-caryophyllene))",
    bgClass: "bg-terpene-caryophyllene",
    effect: "Balance",
    icon: "🌶️",
    description: "Presente en pimienta negra. Único terpeno que actúa como cannabinoide, alivia dolor e inflamación.",
    vibes: { good: ["Anti-inflamatorio", "Calma"], bad: ["Sabor intenso"] },
  },
  {
    name: "Humulene",
    color: "hsl(var(--terpene-humulene))",
    bgClass: "bg-terpene-humulene",
    effect: "Appetite control",
    icon: "🍺",
    description: "Encontrado en lúpulo. Supresor del apetito, anti-bacteriano y anti-inflamatorio.",
    vibes: { good: ["Control apetito", "Anti-tumor"], bad: ["Sequedad"] },
  },
];

const TerpenesSection = () => {
  const [activeTerpene, setActiveTerpene] = useState(0);
  const active = terpenes[activeTerpene];

  return (
    <section id="terpenes" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img src={terpenesBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-background/90" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
            Terpene Education
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            TERPENE LAB
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explora el Full Spectrum de terpenos. Cada uno tiene propiedades únicas que Highcoon domina.
          </p>
        </motion.div>

        {/* Terpene selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {terpenes.map((t, i) => (
            <motion.button
              key={t.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTerpene(i)}
              className={`px-4 py-2 rounded-lg font-display text-sm uppercase tracking-wider transition-all duration-300 border ${
                activeTerpene === i
                  ? "border-current shadow-lg"
                  : "border-border bg-card hover:border-current"
              }`}
              style={{
                color: t.color,
                backgroundColor: activeTerpene === i ? `${t.color}15` : undefined,
                boxShadow: activeTerpene === i ? `0 0 20px ${t.color}30` : undefined,
              }}
            >
              {t.icon} {t.name}
            </motion.button>
          ))}
        </div>

        {/* Active terpene card */}
        <motion.div
          key={activeTerpene}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto rounded-xl border border-border p-8 bg-card"
          style={{ boxShadow: `0 0 30px ${active.color}20` }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">{active.icon}</span>
            <div>
              <h3 className="font-display text-2xl font-bold" style={{ color: active.color }}>
                {active.name}
              </h3>
              <span className="text-xs font-display tracking-widest text-muted-foreground uppercase">
                {active.effect}
              </span>
            </div>
          </div>

          <p className="text-foreground/80 mb-6 leading-relaxed">{active.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary/50 p-4">
              <p className="font-display text-xs tracking-widest text-primary mb-2 uppercase">
                ✨ Good Vibes
              </p>
              <div className="flex flex-wrap gap-2">
                {active.vibes.good.map((v) => (
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
                {active.vibes.bad.map((v) => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerpenesSection;
