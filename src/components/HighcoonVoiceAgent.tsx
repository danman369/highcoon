import { useConversation } from "@elevenlabs/react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, PhoneOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AGENT_ID = "agent_01jzta15r6ex3bcpfhnzszrw17";

const HighcoonVoiceAgent = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      toast({ title: "🍃 Conectado con Highcoon", description: "Habla cuando quieras." });
    },
    onDisconnect: () => {
      toast({ title: "Desconectado", description: "Hasta la próxima, vibe keeper." });
    },
    onError: (error) => {
      console.error("Voice error:", error);
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar. Intenta de nuevo.",
      });
    },
  });

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      toast({
        variant: "destructive",
        title: "Micrófono requerido",
        description: "Permite acceso al micrófono para hablar con Highcoon.",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <section id="voice" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
            Voice Agent
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            TALK TO HIGHCOON
          </h2>
          <div className="neon-line w-24 mx-auto mb-4" />
          <p className="text-muted-foreground max-w-md mx-auto">
            Habla directamente con Highcoon. Pregunta sobre terpenos, la historia, o simplemente vibra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          {/* Orb visualizer */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <AnimatePresence>
              {isConnected && (
                <>
                  <motion.div
                    key="ring1"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: conversation.isSpeaking ? [1, 1.3, 1] : [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: conversation.isSpeaking ? 0.8 : 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border border-primary/40"
                  />
                  <motion.div
                    key="ring2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: conversation.isSpeaking ? [1.1, 1.5, 1.1] : [1.05, 1.2, 1.05],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: conversation.isSpeaking ? 1 : 3, repeat: Infinity, delay: 0.3 }}
                    className="absolute inset-0 rounded-full border border-primary/20"
                  />
                </>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isConnected ? stopConversation : startConversation}
              disabled={isConnecting}
              className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer ${
                isConnected
                  ? "bg-primary/20 border-2 border-primary shadow-[var(--shadow-neon-strong)]"
                  : "bg-card border border-primary/30 hover:border-primary/60 hover:shadow-[var(--shadow-neon)]"
              } ${isConnecting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isConnecting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                />
              ) : isConnected ? (
                <PhoneOff className="w-8 h-8 text-primary" />
              ) : (
                <Mic className="w-8 h-8 text-primary" />
              )}
            </motion.button>
          </div>

          {/* Status */}
          <div className="text-center space-y-2">
            <p className="font-display text-xs tracking-widest uppercase text-muted-foreground">
              {isConnecting
                ? "Conectando..."
                : isConnected
                ? conversation.isSpeaking
                  ? "🍃 Highcoon está hablando..."
                  : "🎙️ Escuchando..."
                : "Toca para hablar"}
            </p>
            {isConnected && (
              <div className="flex items-center justify-center gap-2 text-xs text-primary/60">
                <Volume2 className="w-3 h-3" />
                <span>WebRTC · Conectado</span>
              </div>
            )}
          </div>

          {!isConnected && (
            <Button
              variant="neon-outline"
              size="sm"
              onClick={startConversation}
              disabled={isConnecting}
            >
              {isConnecting ? "Conectando..." : "Iniciar conversación"}
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HighcoonVoiceAgent;
