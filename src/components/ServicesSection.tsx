import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sparkles, Stars } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { allServices, type ServiceData } from "@/data/services";
import * as THREE from "three";

// ---------- 3D pieces ----------
// Beautiful glass + glow staircase. Each step is clickable and navigates to its service page.

const STEP_RISE = 0.6;
const STEP_DEPTH = 0.95;
const STEP_WIDTH = 3.0;
const STEP_THICKNESS = 0.14;
const STEP_TREAD = 1.05;

const stepPosition = (i: number): [number, number, number] => [
  0,
  i * STEP_RISE,
  -i * STEP_DEPTH,
];

const StraightStep = ({
  index,
  active,
  passed,
  label,
  slug,
  onSelect,
}: {
  index: number;
  active: boolean;
  passed: boolean;
  label: string;
  slug: string;
  onSelect: (slug: string) => void;
}) => {
  const [x, y, z] = stepPosition(index);
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating + scale-on-active animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const targetScale = active ? 1.08 : 1;
    const s = groupRef.current.scale.x;
    const next = s + (targetScale - s) * 0.08;
    groupRef.current.scale.set(next, next, next);
    groupRef.current.position.y = y + Math.sin(t * 1.5 + index) * 0.02;
  });

  const baseColor = active ? "#ef4444" : passed ? "#b91c1c" : "#15161a";
  const emissive = active ? "#ff2d2d" : passed ? "#7f1d1d" : "#1a0a0a";
  const emissiveIntensity = active ? 2.2 : passed ? 0.9 : 0.15;

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Glow halo under step */}
      <mesh position={[0, -STEP_THICKNESS / 2 - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[STEP_WIDTH * 0.45, STEP_WIDTH * 0.7, 48]} />
        <meshBasicMaterial color={active ? "#ff3838" : "#dc2626"} transparent opacity={active ? 0.35 : 0.08} />
      </mesh>

      {/* Main tread - glassy slab */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[STEP_WIDTH, STEP_THICKNESS, STEP_TREAD]} />
        <meshPhysicalMaterial
          color={baseColor}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.25}
          metalness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Beveled top accent */}
      <mesh position={[0, STEP_THICKNESS / 2 + 0.005, 0]}>
        <boxGeometry args={[STEP_WIDTH * 0.96, 0.02, STEP_TREAD * 0.92]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={active ? "#ff8080" : "#ef4444"}
          emissiveIntensity={active ? 1.5 : 0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Riser */}
      <mesh position={[0, -STEP_RISE / 2 + STEP_THICKNESS / 2, STEP_TREAD / 2]}>
        <boxGeometry args={[STEP_WIDTH, STEP_RISE - STEP_THICKNESS, 0.05]} />
        <meshStandardMaterial color="#08090c" roughness={0.85} metalness={0.3} />
      </mesh>

      {/* Front neon strip */}
      <mesh position={[0, STEP_THICKNESS / 2 + 0.008, STEP_TREAD / 2 + 0.002]}>
        <boxGeometry args={[STEP_WIDTH * 0.92, 0.04, 0.025]} />
        <meshStandardMaterial
          color="#ff4d4d"
          emissive="#ff0000"
          emissiveIntensity={active ? 4 : passed ? 1.6 : 0.3}
        />
      </mesh>

      {/* Side caps */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(STEP_WIDTH / 2) * side, 0, 0]}>
          <boxGeometry args={[0.04, STEP_THICKNESS + 0.08, STEP_TREAD]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#dc2626"
            emissiveIntensity={active ? 2 : 0.5}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Sparkles around active step */}
      {active && (
        <Sparkles count={30} scale={[STEP_WIDTH, 0.8, STEP_TREAD]} size={2.5} speed={0.6} color="#ff4444" />
      )}

      {/* Clickable HTML label */}
      <Html position={[0, 0.55, 0]} center distanceFactor={6} zIndexRange={[10, 0]}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(slug);
          }}
          className={`pointer-events-auto whitespace-nowrap select-none transition-all duration-300 px-5 py-2 rounded-full border backdrop-blur-md font-bold tracking-wide ${
            active
              ? "text-base bg-gradient-to-r from-red-600 to-red-500 text-white border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.8)] scale-110"
              : passed
              ? "text-sm bg-red-950/70 text-red-200 border-red-700/60"
              : "text-xs bg-black/60 text-zinc-400 border-zinc-700/60 hover:text-white hover:border-red-500"
          }`}
          style={{ cursor: "pointer" }}
        >
          {label.toUpperCase()}
        </button>
      </Html>
    </group>
  );
};

// Camera that climbs the stairs alongside the climber, looking forward+up
const ClimbingCamera = ({ targetIndex }: { targetIndex: number }) => {
  const { camera } = useThree();
  const idxRef = useRef(targetIndex);

  useFrame((_, dt) => {
    // Smoother interpolation for cinematic feel
    idxRef.current += (targetIndex - idxRef.current) * Math.min(1, dt * 2);
    const [, y, z] = stepPosition(idxRef.current);
    const camY = y + 1.6;
    const camZ = z + 3.2;
    const camX = Math.sin(idxRef.current * 0.3) * 0.4;
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 1);
    const [, ly, lz] = stepPosition(idxRef.current + 0.6);
    camera.lookAt(0, ly + 0.4, lz);
  });

  return null;
};

const Staircase = ({
  services,
  activeIndex,
  onSelect,
}: {
  services: ServiceData[];
  activeIndex: number;
  onSelect: (slug: string) => void;
}) => {
  const total = services.length;
  return (
    <group>
      {services.map((s, i) => (
        <StraightStep
          key={s.slug}
          index={i}
          active={i === activeIndex}
          passed={i < activeIndex}
          label={s.title}
          slug={s.slug}
          onSelect={onSelect}
        />
      ))}

      {/* Side rails */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            (STEP_WIDTH / 2 + 0.12) * side,
            ((total - 1) * STEP_RISE) / 2 + 0.5,
            (-(total - 1) * STEP_DEPTH) / 2,
          ]}
          rotation={[Math.atan2(STEP_DEPTH, STEP_RISE) - Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.04, 0.04, Math.hypot(total * STEP_RISE, total * STEP_DEPTH), 16]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#ef4444" emissiveIntensity={0.6} metalness={0.95} roughness={0.2} />
        </mesh>
      ))}

      {/* Ground with grid feel */}
      <mesh position={[0, -0.4, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 80]} />
        <meshStandardMaterial color="#050505" roughness={1} metalness={0.3} />
      </mesh>
    </group>
  );
};

// ---------- React component ----------

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(allServices.length - 1, Math.floor(v * allServices.length));
    setActiveIndex(i);
  });

  const handleSelect = (slug: string) => {
    if (slug === "__title__") return;
    navigate(`/services/${slug}`);
  };

  return (
    <section id="services" ref={containerRef} className="relative">
      {/* Long scroll container — drives the climb */}
      <div className="relative" style={{ height: `${allServices.length * 100 + 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 3D Canvas */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] rounded-full bg-red-600/15 blur-3xl animate-pulse" />
            </div>

            {/* Progress indicator */}
            <div className="absolute top-1/2 right-6 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
              {allServices.map((s, i) => (
                <div
                  key={s.slug}
                  className={`w-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "h-8 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                      : i < activeIndex
                      ? "h-3 bg-red-700"
                      : "h-3 bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            {/* Heading overlay */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
              <p className="text-xs tracking-[0.4em] text-red-500/80 mb-2">CLIMB THE STAIRS</p>
              <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                Our Services
              </h2>
              <p className="text-xs text-zinc-500 mt-2">scroll to ascend · click any step</p>
            </div>

            <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 50 }} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <fog attach="fog" args={["#000000", 4, 18]} />
                <ambientLight intensity={0.35} />
                <directionalLight position={[4, 8, 4]} intensity={1.2} castShadow />
                <pointLight position={[-3, 3, 2]} intensity={1.5} color="#ef4444" />
                <pointLight position={[3, 2, -2]} intensity={1} color="#ff6b6b" />
                <Stars radius={50} depth={30} count={1500} factor={3} fade speed={0.5} />
                <ClimbingCamera targetIndex={activeIndex} />
                <Staircase
                  services={allServices}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Service quick-links grid below */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allServices.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <service.icon size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground">{service.shortDesc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
