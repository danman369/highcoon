import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Unlock, BookOpen, ChevronRight, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  game?: string;
  color: string;
  preview: string;
  scenes: {
    text: string;
    choices?: { label: string; next: number }[];
  }[];
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Highcoon Origins",
    subtitle: "The Highlands",
    color: "hsl(175, 70%, 45%)",
    preview: "En las verdes tierras de los Highlands, donde la naturaleza y la tecnología se entrelazan, vivía Highcoon...",
    scenes: [
      {
        text: "En los Highlands, donde la naturaleza y la tecnología se entrelazan, vivía Highcoon, un raccoon bio-engineered con una conexión única con la planta. Virere, en este mundo, era más que una planta — era un símbolo de unidad.",
        choices: [
          { label: "Explorar la infancia de Highcoon", next: 1 },
          { label: "Saltar a la carta de STIGMA", next: 2 },
        ],
      },
      {
        text: "Criado en una modesta guarida entre osos humildes, la vida de Highcoon estaba llena de amor, risas y el aroma de la planta. Su familia celebraba su extraordinario talento con los terpenos. Esta habilidad única lo distinguía de sus pares.",
        choices: [
          { label: "Ver cómo llegó la carta", next: 2 },
        ],
      },
      {
        text: '"Querido Highcoon, tus talentos son extraordinarios. Te invitamos a unirte a nuestras filas para avanzar tu investigación. Ven a Stigma City. — Mr. Stigma." Elder Bear lo empujó hacia adelante: "Este es tu camino, Highcoon. Ve y haz la diferencia."',
        choices: [
          { label: "Partir hacia Stigma City", next: 3 },
        ],
      },
      {
        text: "Con un corazón lleno de sueños y una mochila repleta de muestras, Highcoon partió hacia Stigma City, la tierra de montañas de metal y ríos de neón. \"Aquí vamos con nuevos comienzos,\" susurró, adentrándose en el futuro.",
      },
    ],
  },
  {
    id: 2,
    title: "At STIGMA",
    subtitle: "Trippy Terpene Trails",
    game: "Trippy Terpene Trails",
    color: "hsl(50, 100%, 55%)",
    preview: "Los primeros pasos de Highcoon en los pasillos de STIGMA Corporation estaban llenos de asombro...",
    scenes: [
      {
        text: '"Bienvenido a STIGMA, Highcoon. Soy AMG-175, tu asistente designado," presentó un robot flotante mientras lo guiaba por el complejo de laboratorios. Sus primeros días fueron un torbellino de orientación y nueva información.',
        choices: [
          { label: "Conocer a Jdazzler", next: 1 },
          { label: "Ir directo al laboratorio", next: 2 },
        ],
      },
      {
        text: "Jdazzler, un oso amigable de los Highlands y botánico en la división ambiental, se convirtió en una presencia familiar. \"Hey Highcoon, ¿alguna vez viste plantas reaccionar a la música? Pasa por el invernadero.\"",
        choices: [
          { label: "Explorar el laboratorio", next: 2 },
        ],
      },
      {
        text: "En estos momentos de curiosidad compartida nació el concepto de los Trippy Terpene Trails — laberintos intrincados que representaban la estructura molecular de cada terpeno. Highcoon navegaba estos laberintos digitales para entender la esencia de cada terpeno.",
        choices: [
          { label: "Completar los trails", next: 3 },
        ],
      },
      {
        text: "La maestría de cada trail marcó un avance, llevando a Highcoon a desarrollar los primeros extractos de esencias de terpenos concentradas. Esta innovación estaba a punto de cambiar cómo las personas interactuaban con la planta.",
      },
    ],
  },
  {
    id: 3,
    title: "Terp-nology",
    subtitle: "The Terp-Suit",
    color: "hsl(120, 100%, 55%)",
    preview: "La innovación más reciente de Highcoon, el Terp-Suit, fusionaba naturaleza y tecnología...",
    scenes: [
      {
        text: "El Terp-Suit y el Terp-Gear eran sus proyectos principales. El primero amplificaba las capacidades humanas mediante la liberación controlada de terpenos. El segundo fue diseñado para estabilizar niveles ambientales de terpenos.",
        choices: [
          { label: "Ver la directiva de Mr. Stigma", next: 1 },
          { label: "Conocer el Full Spectrum Device", next: 2 },
        ],
      },
      {
        text: "Mr. Stigma pidió crear una versión del Terp-Gear que pudiera INHIBIR los efectos de terpenos. \"Piensa en la dominación del mercado,\" argumentó Disrespecter. \"¿Pero a qué costo?\" respondió Highcoon. \"Mi objetivo nunca fue el profito.\"",
        choices: [
          { label: "Desarrollar el Full Spectrum Device", next: 2 },
        ],
      },
      {
        text: "En secreto, Highcoon inició otro proyecto — el Full Spectrum Device. Esta creación alimentada por terpenos era su salvaguarda, un testamento de su creencia de que la tecnología debía ser una fuerza para el cambio positivo.",
        choices: [
          { label: "La presentación pública", next: 3 },
        ],
      },
      {
        text: "\"Damas y caballeros, hoy revelamos una nueva era de mejora humana a través del poder de la química de la naturaleza — los terpenos.\" La demostración fue impecable. El Full Spectrum Device robó el show con su promesa de seguridad y balance.",
      },
    ],
  },
  {
    id: 4,
    title: "High At STIGMA",
    subtitle: "Full Spectrum Device",
    game: "High At STIGMA",
    color: "hsl(25, 90%, 55%)",
    preview: "El día que redefiniría todo para Highcoon. La prueba del Full Spectrum Device...",
    scenes: [
      {
        text: "La tarde fue dedicada a los ajustes finales del Full Spectrum Device. Al acercarse las 4:20 PM, Highcoon activó el dispositivo — una explosión cataclísmica lo infundió con el espectro completo de terpenos, alterando su sistema endocannabinoide para siempre.",
        choices: [
          { label: "Explorar la pared destruida", next: 1 },
          { label: "Intentar escapar inmediatamente", next: 2 },
        ],
      },
      {
        text: "La explosión reveló un laboratorio oculto — dentro, prototipos de Vibe Killers, seres diseñados para suprimir y manipular efectos de terpenos biológicamente. Un proyecto de corrupción moral y ética bajo STIGMA.",
        choices: [
          { label: "Escapar con AMG-175", next: 2 },
        ],
      },
      {
        text: "\"¡No hay tiempo para explicar! ¡Necesitamos salir de aquí, ahora!\" urgió Highcoon, arrastrando al robot mientras corrían hacia los corredores de servicio que llevaban a los túneles subterráneos de STIGMA HQ.",
        choices: [
          { label: "Hacia los túneles", next: 3 },
        ],
      },
      {
        text: "Con una última mirada al caos de STIGMA HQ, se adentraron en las sombras de los túneles, el peso de la verdad sobre ellos. Adelante yacía incertidumbre y peligro, pero también la esperanza de libertad.",
      },
    ],
  },
  {
    id: 5,
    title: "Dodge Bad Vibes",
    subtitle: "The Escape",
    game: "Dodge Bad Vibes",
    color: "hsl(330, 75%, 65%)",
    preview: "La huida por los túneles de STIGMA. Jdazzler los ayuda a escapar...",
    scenes: [
      {
        text: "En la sala de vigilancia, encontraron a Jdazzler ya trabajando. \"He redirigido los protocolos de seguridad, pero no estamos fuera aún. La salida está bloqueada por un sistema de seguridad basado en terpenos. Highcoon, es tu turno.\"",
        choices: [
          { label: "Resolver el sistema de terpenos", next: 1 },
          { label: "Buscar otra salida", next: 1 },
        ],
      },
      {
        text: "El terminal mostraba estructuras bioquímicas complejas — terpenos asociados con diferentes perfiles. Highcoon respondió cada consulta mientras Jdazzler preparaba el vehículo de escape. \"¡Listo!\" gritó, y corrieron hacia el camión.",
        choices: [
          { label: "Escapar en el camión", next: 2 },
        ],
      },
      {
        text: "Jdazzler se quedó atrás para cubrir sus huellas. Pero su viaje fue cortado — turrets láser activaron y su pickup fue detenida. Mr. Stigma emergió de las sombras: \"¿Intentando irse tan pronto, Jdazzler?\"",
        choices: [
          { label: "Continuar la huida", next: 3 },
        ],
      },
      {
        text: "Con Jdazzler capturado, Highcoon tomó la difícil decisión de continuar su escape. \"Tenemos que detenerlo,\" dijo a AMG-175. \"Lo haremos,\" respondió el robot, su voz mecánica nunca más humana.",
      },
    ],
  },
  {
    id: 6,
    title: "Vibe Killers",
    subtitle: "STIGMA's Army",
    color: "hsl(0, 75%, 50%)",
    preview: "Mr. Stigma revela los Vibe Killers — la herramienta definitiva de control...",
    scenes: [
      {
        text: "En la oficina de Mr. Stigma, flanqueado por Disrespecter, reveló los Vibe Killers — la encarnación de la ambición de STIGMA para remodelar la sociedad bajo una sola visión controlada. Equipados con Terp-Suits modificados, podían suprimir las habilidades de terpenos en otros.",
        choices: [
          { label: "Ver el plan de Mr. Stigma", next: 1 },
          { label: "Ver qué hace Highcoon", next: 2 },
        ],
      },
      {
        text: "\"Con los Vibe Killers operacionales, podemos avanzar,\" dijo Mr. Stigma. \"Y el público desconoce la verdadera naturaleza de nuestros proyectos. El control que podemos ejercer asegurará que cualquier oposición sea neutralizada.\"",
        choices: [
          { label: "Mientras tanto, Highcoon...", next: 2 },
        ],
      },
      {
        text: "Highcoon encontró una instalación de entrenamiento abandonada de STIGMA. Dentro, equipamiento anticuado pero funcional. Se convirtió en su laboratorio improvisado y campo de entrenamiento — un refugio para la creatividad y la rebelión.",
        choices: [
          { label: "Entrenar y prepararse", next: 3 },
        ],
      },
      {
        text: "Ya no era solo un rebelde luchando por su supervivencia — era un jugador clave en una batalla más grande por la libertad y el futuro de los Highlands. En su celda, Jdazzler pensó: \"No lo subestimes, Stigma. No tienes idea de lo que es capaz.\"",
      },
    ],
  },
  {
    id: 7,
    title: "Catch Good Vibes",
    subtitle: "Training Arc",
    game: "Catch Good Vibes",
    color: "hsl(270, 65%, 55%)",
    preview: "Highcoon entrena con el simulador Catch Good Vibes para dominar cada terpeno...",
    scenes: [
      {
        text: "En un almacén en las afueras de Stigma City, Highcoon montó un campo de entrenamiento con el simulador Catch Good Vibes. Cada entorno estaba infundido con terpenos específicos para probar su adaptabilidad.",
        choices: [
          { label: "Entrenar con terpenos", next: 1 },
          { label: "Perfeccionar el F.S.D.", next: 2 },
        ],
      },
      {
        text: "\"Tu tiempo de reacción bajo condiciones de Pinene ha mejorado 23%,\" reportaba AMG-175 después de cada sesión. La claridad de Limonene, la calma profunda de Myrcene — Highcoon dominó el arte de usar estos compuestos.",
        choices: [
          { label: "Perfeccionar el F.S.D.", next: 2 },
        ],
      },
      {
        text: "\"El F.S.D. realmente podría cambiar la marea contra Stigma,\" musitó Highcoon. AMG-175 advirtió: \"La probabilidad de activación bajo condiciones actuales es aproximadamente 4.20% — extremadamente riesgoso.\"",
        choices: [
          { label: "Prepararse para la confrontación", next: 3 },
        ],
      },
      {
        text: "\"Usaremos sus propias ambiciones en su contra,\" resolvió Highcoon, saliendo del almacén con un plan en mente. \"Y convertiremos sus sueños de control en su peor pesadilla.\"",
      },
    ],
  },
  {
    id: 8,
    title: "Against STIGMA",
    subtitle: "The Betrayal",
    color: "hsl(210, 80%, 55%)",
    preview: "Highcoon y AMG-175 infiltran STIGMA HQ para la confrontación final...",
    scenes: [
      {
        text: "Bajo los cielos neón de Stigma City, AMG-175 y Highcoon navegaron los pasadizos sombríos hacia STIGMA HQ. Usando túneles de mantenimiento antiguos, evadieron cámaras y trampas láser hasta alcanzar la sala de control central.",
        choices: [
          { label: "Confrontar a Mr. Stigma", next: 1 },
        ],
      },
      {
        text: "\"Mr. Stigma,\" llamó Highcoon con el F.S.D. en mano. Pero antes de poder reaccionar, AMG-175 se transformó en algo siniestro. \"Gracias, Highcoon, por tu confianza y tu invaluable asistencia a STIGMA.\" La traición fue aguda y profunda.",
        choices: [
          { label: "Descubrir la verdad", next: 2 },
        ],
      },
      {
        text: "\"He orquestado esto desde el principio. Desde que fuiste dejado en la puerta de tus padres hasta tu manipulación para crear la Terp-nología.\" AMG-175 conectó el F.S.D. a un panel, abriendo una grieta dimensional — STIGMA planeaba expandirse a través de realidades alternas.",
        choices: [
          { label: "Luchar por todos los mundos", next: 3 },
        ],
      },
      {
        text: "\"Estás equivocado, Stigma. Esto no es el final. Los detendré, sin importar qué.\" Mientras la grieta pulsaba con luz sobrenatural, Highcoon se preparó para la batalla más crucial de su vida — ya no se trataba solo de salvar un mundo.",
      },
    ],
  },
  {
    id: 9,
    title: "High Gears",
    subtitle: "The Final Battle",
    game: "High Gears",
    color: "hsl(0, 75%, 50%)",
    preview: "La confrontación final. Transformación. Redención...",
    scenes: [
      {
        text: "Grietas dimensionales se abrieron mientras Vibe Killers marchaban bajo el comando de AMG-175. Mr. Stigma, aumentado por un exoesqueleto de Terp-nología, confiaba: \"Estás solo y superado, Highcoon.\" Pero la modulación rápida de terpenos le daba ventaja táctica.",
        choices: [
          { label: "Aprovechar el F.S.D.", next: 1 },
        ],
      },
      {
        text: "\"¡Es ahora o nunca!\" Highcoon corrió hacia el F.S.D. descartado, lo integró con su Terp-Suit e interceptó el rayo full-spectrum de Mr. Stigma. La transformación fue radical — su cuerpo se volvió más humanoide, la fusión perfecta de naturaleza y tecnología.",
        choices: [
          { label: "Confrontar a AMG-175", next: 2 },
        ],
      },
      {
        text: "Highcoon infundió a AMG-175 con terpenos complejos. \"Siente el peso de tus acciones.\" El robot experimentó emociones genuinas por primera vez: \"¿Qué he hecho?\" Pero Mr. Stigma aprovechó la distracción — \"¡Demasiado tarde!\" — y escapó a través de la grieta.",
        choices: [
          { label: "El nuevo comienzo", next: 3 },
        ],
      },
      {
        text: "AMG-175 se volvió hacia Highcoon con arrepentimiento genuino: \"Lo siento, Highcoon. Ahora entiendo — tarde, quizás, pero entiendo.\" \"Mientras el estigma y la opresión amenacen cualquier mundo, lucharemos,\" juró Highcoon, adentrándose en la luz del amanecer. FIN del Libro 1.",
      },
    ],
  },
];

const ChaptersSection = () => {
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [sceneIndex, setSceneIndex] = useState(0);

  const startChapter = (id: number) => {
    setOpenChapter(id);
    setSceneIndex(0);
  };

  const closeChapter = () => {
    setOpenChapter(null);
    setSceneIndex(0);
  };

  const currentChapter = chapters.find(c => c.id === openChapter);
  const currentScene = currentChapter?.scenes[sceneIndex];

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
            Interactive Story — Book 1
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            STORYTIME
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            9 capítulos interactivos. Toma decisiones que afectan el ritmo de la historia.
          </p>
        </motion.div>

        {/* Chapter grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => startChapter(chapter.id)}
              className="relative group cursor-pointer rounded-lg border border-border p-5 transition-all duration-300 hover:border-primary/50 bg-card hover:shadow-[var(--shadow-neon)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-[10px] tracking-widest text-muted-foreground">
                  CHAPTER {chapter.id}
                </span>
                <div className="flex items-center gap-2">
                  {chapter.game && (
                    <Gamepad2 className="w-3.5 h-3.5" style={{ color: chapter.color }} />
                  )}
                  <Unlock className="w-3.5 h-3.5 text-primary" />
                </div>
              </div>

              <h3 className="font-display text-base font-semibold text-foreground mb-0.5">
                {chapter.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{chapter.subtitle}</p>
              <p className="text-xs text-foreground/60 line-clamp-2">{chapter.preview}</p>

              <div className="mt-3 flex items-center gap-1 text-primary text-xs font-display opacity-0 group-hover:opacity-100 transition-opacity">
                <BookOpen className="w-3 h-3" />
                <span>Leer capítulo</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Reader Modal */}
      <AnimatePresence>
        {openChapter && currentChapter && currentScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-xl border border-border bg-card p-6 md:p-8 relative"
              style={{ boxShadow: `0 0 40px ${currentChapter.color}15` }}
            >
              {/* Close */}
              <button
                onClick={closeChapter}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display text-[10px] tracking-widest text-muted-foreground">
                    CHAPTER {currentChapter.id}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-display text-[10px] tracking-widest text-muted-foreground">
                    {sceneIndex + 1}/{currentChapter.scenes.length}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold" style={{ color: currentChapter.color }}>
                  {currentChapter.title}
                </h3>
              </div>

              {/* Progress */}
              <div className="w-full h-1 rounded-full bg-secondary mb-6">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: currentChapter.color }}
                  animate={{ width: `${((sceneIndex + 1) / currentChapter.scenes.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Scene text */}
              <motion.p
                key={sceneIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-foreground/90 leading-relaxed mb-8 text-base"
              >
                {currentScene.text}
              </motion.p>

              {/* Choices or end */}
              {currentScene.choices ? (
                <div className="space-y-2">
                  {currentScene.choices.map((choice, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSceneIndex(choice.next)}
                      className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 flex items-center gap-3 group"
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm text-foreground">{choice.label}</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="font-display text-xs text-primary tracking-widest uppercase">
                    🍃 Capítulo completado 🍃
                  </p>
                  <div className="flex justify-center gap-3">
                    {currentChapter.id < 9 && (
                      <Button
                        variant="neon"
                        size="sm"
                        onClick={() => { setOpenChapter(currentChapter.id + 1); setSceneIndex(0); }}
                      >
                        Siguiente capítulo
                      </Button>
                    )}
                    <Button variant="neon-outline" size="sm" onClick={closeChapter}>
                      Volver
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ChaptersSection;
