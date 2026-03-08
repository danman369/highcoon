import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  bonds: number[];
  rotation: number;
  rotationSpeed: number;
  type: "thc" | "hexagon" | "atom";
}

const TERPENE_COLORS = [
  "hsla(50, 100%, 55%, 0.4)",   // limonene yellow
  "hsla(210, 80%, 55%, 0.4)",   // myrcene blue
  "hsla(0, 75%, 50%, 0.4)",     // caryophyllene red
  "hsla(25, 90%, 55%, 0.4)",    // humulene orange
  "hsla(330, 75%, 65%, 0.4)",   // linalool pink
  "hsla(175, 70%, 45%, 0.4)",   // alpha-pinene turquoise
  "hsla(270, 65%, 55%, 0.4)",   // terpinolene purple
  "hsla(120, 70%, 45%, 0.4)",   // beta-pinene green
];

const MoleculeParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles
    const count = Math.min(35, Math.floor(window.innerWidth / 50));
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 3 + 2,
      color: TERPENE_COLORS[i % TERPENE_COLORS.length],
      bonds: [],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      type: i % 3 === 0 ? "thc" : i % 3 === 1 ? "hexagon" : "atom",
    }));

    const drawHexagon = (cx: number, cy: number, size: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI / 3) * j - Math.PI / 6;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      // Draw inner bonds
      for (let j = 0; j < 6; j++) {
        const angle = (Math.PI / 3) * j - Math.PI / 6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * size * 0.5, Math.sin(angle) * size * 0.5);
        ctx.strokeStyle = color.replace("0.4", "0.15");
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawTHC = (cx: number, cy: number, size: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      // 3 fused hexagons
      const offsets = [
        { x: 0, y: 0 },
        { x: size * 1.5, y: 0 },
        { x: size * 0.75, y: size * 1.3 },
      ];
      offsets.forEach((o) => {
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j - Math.PI / 6;
          const px = o.x + Math.cos(angle) * size * 0.7;
          const py = o.y + Math.sin(angle) * size * 0.7;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      // OH group
      ctx.beginPath();
      ctx.arc(size * 2.2, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Draw bonds between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(120, 100%, 55%, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;

        if (p.type === "thc") {
          drawTHC(p.x, p.y, p.radius * 3, p.rotation, p.color);
        } else if (p.type === "hexagon") {
          drawHexagon(p.x, p.y, p.radius * 4, p.rotation, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          // Electron ring
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.radius * 3, p.radius * 1.5, p.rotation, 0, Math.PI * 2);
          ctx.strokeStyle = p.color.replace("0.4", "0.15");
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default MoleculeParticles;
