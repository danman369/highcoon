import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";

interface BubbleData {
  id: number;
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  name: string;
}

const TERPENE_COLORS: { name: string; color: string }[] = [
  { name: "Limonene", color: "#FFD700" },
  { name: "Myrcene", color: "#4488FF" },
  { name: "Caryophyllene", color: "#DD3333" },
  { name: "Humulene", color: "#EE8833" },
  { name: "Linalool", color: "#DD66AA" },
  { name: "Alpha-Pinene", color: "#44BBAA" },
  { name: "Terpinolene", color: "#9955DD" },
  { name: "Beta-Pinene", color: "#44BB44" },
];

function randomPos(): [number, number, number] {
  return [
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 3 - 1,
  ];
}

function TerpeneBubble({
  data,
  onPop,
}: {
  data: BubbleData;
  onPop: (id: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [popping, setPopping] = useState(false);
  const popProgress = useRef(0);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Gentle rotation
    meshRef.current.rotation.x += delta * data.speed * 0.3;
    meshRef.current.rotation.y += delta * data.speed * 0.5;

    if (popping) {
      popProgress.current += delta * 4;
      const s = 1 + popProgress.current * 1.5;
      meshRef.current.scale.setScalar(data.scale * s);
      if (materialRef.current) {
        materialRef.current.opacity = Math.max(0, 1 - popProgress.current);
      }
      if (popProgress.current >= 1) {
        onPop(data.id);
      }
    }
  });

  const handleClick = useCallback(() => {
    if (!popping) setPopping(true);
  }, [popping]);

  const color = useMemo(() => new THREE.Color(data.color), [data.color]);

  return (
    <Float
      speed={data.speed}
      rotationIntensity={0.4}
      floatIntensity={1.2}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh
        ref={meshRef}
        position={data.position}
        scale={data.scale}
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          transparent
          opacity={0.55}
          roughness={0.1}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.4}
          wireframe={false}
        />
      </mesh>
      {/* Inner glow sphere */}
      {!popping && (
        <mesh position={data.position} scale={data.scale * 0.6}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.25}
            emissive={color}
            emissiveIntensity={0.8}
          />
        </mesh>
      )}
    </Float>
  );
}

// Small particles that appear when a bubble pops
function PopParticles({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Points>(null!);
  const elapsed = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const count = 12;
    const pos = new Float32Array(count * 3);
    const vel: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = position[0];
      pos[i * 3 + 1] = position[1];
      pos[i * 3 + 2] = position[2];
      vel.push([
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ]);
    }
    return { positions: pos, velocities: vel };
  }, [position]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    const geo = ref.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < velocities.length; i++) {
      posAttr.array[i * 3] += velocities[i][0] * delta;
      posAttr.array[i * 3 + 1] += velocities[i][1] * delta;
      posAttr.array[i * 3 + 2] += velocities[i][2] * delta;
    }
    posAttr.needsUpdate = true;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - elapsed.current * 2);
  });

  const col = useMemo(() => new THREE.Color(color), [color]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={col}
        transparent
        opacity={1}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const [bubbles, setBubbles] = useState<BubbleData[]>(() =>
    Array.from({ length: 14 }, (_, i) => {
      const terp = TERPENE_COLORS[i % TERPENE_COLORS.length];
      return {
        id: i,
        position: randomPos(),
        color: terp.color,
        scale: 0.2 + Math.random() * 0.25,
        speed: 1 + Math.random() * 2,
        name: terp.name,
      };
    })
  );

  const [particles, setParticles] = useState<{ id: number; position: [number, number, number]; color: string }[]>([]);
  const nextId = useRef(14);

  const handlePop = useCallback((id: number) => {
    setBubbles((prev) => {
      const popped = prev.find((b) => b.id === id);
      if (popped) {
        setParticles((pp) => [...pp, { id: popped.id, position: popped.position, color: popped.color }]);
        // Remove particles after 1s
        setTimeout(() => {
          setParticles((pp) => pp.filter((p) => p.id !== popped.id));
        }, 1000);
        // Respawn after delay
        setTimeout(() => {
          const terp = TERPENE_COLORS[Math.floor(Math.random() * TERPENE_COLORS.length)];
          setBubbles((curr) => [
            ...curr,
            {
              id: nextId.current++,
              position: randomPos(),
              color: terp.color,
              scale: 0.2 + Math.random() * 0.25,
              speed: 1 + Math.random() * 2,
              name: terp.name,
            },
          ]);
        }, 2000);
      }
      return prev.filter((b) => b.id !== id);
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#39FF14" />
      <pointLight position={[-5, -3, 2]} intensity={0.3} color="#4488FF" />

      {bubbles.map((b) => (
        <TerpeneBubble key={b.id} data={b} onPop={handlePop} />
      ))}
      {particles.map((p) => (
        <PopParticles key={`p-${p.id}`} position={p.position} color={p.color} />
      ))}
    </>
  );
}

const FloatingTerpenes3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ pointerEvents: "auto" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingTerpenes3D;
