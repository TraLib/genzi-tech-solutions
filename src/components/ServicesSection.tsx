import { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { allServices, type ServiceData } from "@/data/services";
import * as THREE from "three";

// ---------- 3D pieces ----------

// A single curved staircase step that wraps around a central axis
const SpiralStep = ({
  index,
  total,
  active,
  passed,
  label,
}: {
  index: number;
  total: number;
  active: boolean;
  passed: boolean;
  label: string;
}) => {
  // Spiral parameters
  const radius = 1.4;
  const angle = (index / total) * Math.PI * 4; // 2 full turns total
  const yStep = 0.42;
  const y = -((total - 1) / 2) * yStep + index * yStep;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  // Step plank rotated to face outward from center
  const facing = angle + Math.PI / 2;

  const color = passed ? "#dc2626" : active ? "#ef4444" : "#2a2a2a";
  const emissive = passed || active ? "#7f1d1d" : "#000000";
  const emissiveIntensity = active ? 1.2 : passed ? 0.5 : 0;

  return (
    <group position={[x, y, z]} rotation={[0, -facing, 0]}>
      {/* Step plank */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.08, 0.55]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>
      {/* Step edge glow */}
      <mesh position={[0, 0.045, 0.27]}>
        <boxGeometry args={[0.95, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#ff2a2a"
          emissive="#ff0000"
          emissiveIntensity={active ? 2.5 : passed ? 1.2 : 0.2}
        />
      </mesh>
      {/* Floating label above the step */}
      <Text
        position={[0, 0.32, 0]}
        fontSize={0.11}
        color={active ? "#ffffff" : passed ? "#fca5a5" : "#666666"}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.9}
        textAlign="center"
        outlineWidth={0.005}
        outlineColor="#000000"
      >
        {label.toUpperCase()}
      </Text>
    </group>
  );
};

// The trophy / goal at the top of the staircase
const Goal = ({ y, reached }: { y: number; reached: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6;
  });
  return (
    <group ref={ref} position={[0, y, 0]}>
      {/* Cup */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.18, 0.42, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={1}
          roughness={0.2}
          emissive={reached ? "#f59e0b" : "#000000"}
          emissiveIntensity={reached ? 1.4 : 0}
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.22, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.25} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.46, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.08, 24]} />
        <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Halo */}
      {reached && (
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 48]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Climber dot that ascends as user scrolls
const Climber = ({ progress, total }: { progress: number; total: number }) => {
  const radius = 1.4;
  const angle = progress * Math.PI * 4;
  const yStep = 0.42;
  const y = -((total - 1) / 2) * yStep + progress * (total - 1) * yStep + 0.2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
      </mesh>
      <pointLight color="#ff3030" intensity={2} distance={3} />
    </group>
  );
};

// Whole spiral scene
const SpiralStaircase = ({
  services,
  progress,
  activeIndex,
}: {
  services: ServiceData[];
  progress: number;
  activeIndex: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const total = services.length;
  const topY = ((total - 1) / 2) * 0.42 + 0.9;

  // Camera-style group rotation that follows progress so the climber stays facing user
  useFrame(() => {
    if (groupRef.current) {
      const targetRot = -progress * Math.PI * 4;
      groupRef.current.rotation.y += (targetRot - groupRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {/* Central glowing pillar */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.22, ((total - 1) * 0.42) + 1.6, 24]} />
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#dc2626"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {services.map((s, i) => (
          <SpiralStep
            key={s.slug}
            index={i}
            total={total}
            active={i === activeIndex}
            passed={i < activeIndex}
            label={s.title}
          />
        ))}

        <Goal y={topY} reached={progress > 0.95} />
        <Climber progress={progress} total={total} />
      </group>

      {/* Ground disc */}
      <mesh position={[0, -((total - 1) / 2) * 0.42 - 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.0, 2.4, 64]} />
        <meshStandardMaterial color="#0a0a0a" emissive="#dc2626" emissiveIntensity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// ---------- React component ----------

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    const i = Math.min(allServices.length - 1, Math.floor(v * allServices.length));
    setActiveIndex(i);
  });

  const headerY = useTransform(scrollYProgress, [0, 0.1], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const activeService = allServices[activeIndex];
  const reached = progress > 0.95;

  return (
    <section id="services" ref={containerRef} className="relative">
      {/* Long scroll container — drives the climb */}
      <div className="relative" style={{ height: `${allServices.length * 80 + 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Header */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="absolute top-10 left-0 right-0 text-center z-10 px-6"
          >
            <span className="text-xs font-mono text-accent uppercase tracking-widest">Climb With Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
              Scroll to climb the spiral staircase. Each step unlocks a service — reach the top and claim the goal.
            </p>
          </motion.div>

          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[60%] h-[60%] rounded-full bg-primary/10 blur-3xl" />
            </div>
            <Canvas shadows camera={{ position: [0, 0.6, 5.5], fov: 42 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.45} />
                <directionalLight position={[4, 6, 4]} intensity={1.0} castShadow />
                <pointLight position={[-3, 2, -3]} intensity={0.6} color="#ef4444" />
                <SpiralStaircase services={allServices} progress={progress} activeIndex={activeIndex} />
              </Suspense>
            </Canvas>
          </div>

          {/* Active service panel */}
          <div className="absolute bottom-10 left-0 right-0 z-10 px-6 pointer-events-none">
            <div className="max-w-md mx-auto">
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-auto rounded-2xl border border-primary/40 bg-card/80 backdrop-blur-xl p-5 shadow-glow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    {reached ? (
                      <Trophy size={20} className="text-yellow-400" />
                    ) : (
                      <activeService.icon size={20} className="text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-accent">
                      {reached ? "Goal Achieved" : `Step ${activeIndex + 1} / ${allServices.length}`}
                    </p>
                    <h3 className="font-bold">{reached ? "You Made It To The Top!" : activeService.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {reached ? "You've explored every service we offer. Let's build something amazing together." : activeService.shortDesc}
                </p>
                {!reached && (
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary hover:translate-x-1 transition-transform"
                  >
                    Explore <ArrowRight size={12} />
                  </Link>
                )}
                {/* Progress bar */}
                <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary transition-all"
                    style={{ width: `${Math.min(100, progress * 100)}%` }}
                  />
                </div>
              </motion.div>
            </div>
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
