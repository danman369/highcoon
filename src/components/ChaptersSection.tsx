import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, Unlock, BookOpen } from "lucide-react";

const chapters = [
  { id: 1, title: "Highcoon Origins", subtitle: "The Highlands", unlocked: true, color: "var(--terpene-pinene)" },
  { id: 2, title: "At STIGMA", subtitle: "Trippy Terpene Trails", unlocked: true, color: "var(--terpene-limonene)" },
  { id: 3, title: "Terp-nology", subtitle: "The Terp-Suit", unlocked: true, color: "var(--neon-green)" },
  { id: 4, title: "High At STIGMA", subtitle: "Full Spectrum Device", unlocked: false, color: "var(--terpene-myrcene)" },
  { id: 5, title: "Dodge Bad Vibes", subtitle: "The Escape", unlocked: false, color: "var(--terpene-linalool)" },
  { id: 6, title: "Vibe Killers", subtitle: "STIGMA's Army", unlocked: false, color: "var(--terpene-caryophyllene)" },
];

const ChaptersSection = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  return (
    <section id="chapters" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
            Interactive Story
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            STORYTIME
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Navega la historia de Highcoon capítulo por capítulo. Desbloquea nuevos episodios completando retos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => chapter.unlocked && setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
              className={`relative group cursor-pointer rounded-lg border p-6 transition-all duration-300 ${
                chapter.unlocked
                  ? "border-border hover:border-primary/50 bg-card hover:shadow-[var(--shadow-neon)]"
                  : "border-border/30 bg-card/50 opacity-60 cursor-not-allowed"
              } ${selectedChapter === chapter.id ? "border-primary shadow-[var(--shadow-neon)]" : ""}`}
            >
              {/* Chapter number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-xs tracking-widest text-muted-foreground">
                  CHAPTER {chapter.id}
                </span>
                {chapter.unlocked ? (
                  <Unlock className="w-4 h-4 text-primary" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {chapter.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{chapter.subtitle}</p>

              {/* Progress bar */}
              <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: chapter.unlocked ? (chapter.id <= 2 ? "100%" : "30%") : "0%" }}
                />
              </div>

              {/* Expanded content */}
              {selectedChapter === chapter.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <div className="flex items-center gap-2 text-primary text-sm font-display">
                    <BookOpen className="w-4 h-4" />
                    <span>Comenzar capítulo</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChaptersSection;
