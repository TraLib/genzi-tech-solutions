import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { allServices, type ServiceData } from "@/data/services";
import * as THREE from "three";

// ---------- 3D pieces ----------
// Step layout: straight staircase going UP and BACK (positive Y, negative Z).
// Camera climbs along with progress so the active step is always centered in front of the user.

const STEP_RISE = 0.55;   // vertical distance per step
const STEP_DEPTH = 0.85;  // horizontal (Z) distance per step
const STEP_WIDTH = 2.4;
const STEP_THICKNESS = 0.12;
const STEP_TREAD = 0.9;

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
}: {
  index: number;
  active: boolean;
  passed: boolean;
  label: string;
}) => {
  const [x, y, z] = stepPosition(index);
  const color = passed ? "#dc2626" : active ? "#ef4444" : "#1f1f1f";
  const emissive = passed || active ? "#7f1d1d" : "#000000";
  const emissiveIntensity = active ? 1.4 : passed ? 0.4 : 0;

  return (
    <group position={[x, y, z]}>
      {/* Tread */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[STEP_WIDTH, STEP_THICKNESS, STEP_TREAD]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      {/* Riser (front face) */}
      <mesh position={[0, -STEP_RISE / 2 + STEP_THICKNESS / 2, STEP_TREAD / 2]}>
        <boxGeometry args={[STEP_WIDTH, STEP_RISE - STEP_THICKNESS, 0.04]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.8} />
      </mesh>
      {/* Front glow strip */}
      <mesh position={[0, STEP_THICKNESS / 2 + 0.005, STEP_TREAD / 2 + 0.001]}>
        <boxGeometry args={[STEP_WIDTH * 0.95, 0.03, 0.02]} />
        <meshStandardMaterial
          color="#ff3030"
          emissive="#ff0000"
          emissiveIntensity={active ? 3 : passed ? 1.2 : 0.25}
        />
      </mesh>
      {/* Floating label centered over the step, facing the camera */}
      <Text
        position={[0, 0.55, 0]}
        fontSize={active ? 0.22 : 0.14}
        color={active ? "#ffffff" : passed ? "#fca5a5" : "#555555"}
        anchorX="center"
        anchorY="middle"
        maxWidth={STEP_WIDTH - 0.2}
        textAlign="center"
        outlineWidth={0.008}
        outlineColor="#000000"
      >
        {label.toUpperCase()}
      </Text>
    </group>
  );
};

const Goal = ({ position, reached }: { position: [number, number, number]; reached: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6;
  });
  return (
    <group ref={ref} position={position}>
      {/* Cup */}
      <mesh>
        <cylinderGeometry args={[0.32, 0.2, 0.5, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={1}
          roughness={0.2}
          emissive={reached ? "#f59e0b" : "#000000"}
          emissiveIntensity={reached ? 1.4 : 0}
        />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.24, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.26, 0.28, 0.1, 24]} />
        <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.4} />
      </mesh>
      {reached && (
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.7, 48]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

// Simple stylized human climber that stands one step below the active step
const Climber = ({ targetIndex }: { targetIndex: number }) => {
  const ref = useRef<THREE.Group>(null);
  const stepRef = useRef(targetIndex);

  useFrame((_, dt) => {
    if (!ref.current) return;
    // Smoothly interpolate to current target step
    stepRef.current += (targetIndex - stepRef.current) * Math.min(1, dt * 4);
    const [x, y, z] = stepPosition(stepRef.current);
    ref.current.position.set(x, y + STEP_THICKNESS / 2, z - STEP_TREAD * 0.1);
    // Bobbing
    const t = performance.now() / 300;
    ref.current.position.y += Math.sin(t) * 0.02;
  });

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.35, 8, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color="#fde68a" roughness={0.6} />
      </mesh>
      {/* Glow under feet */}
      <pointLight color="#ff3030" intensity={1.4} distance={2.4} position={[0, 0.4, 0]} />
    </group>
  );
};

// Camera that climbs the stairs alongside the climber, looking forward+up
const ClimbingCamera = ({ targetIndex }: { targetIndex: number }) => {
  const { camera } = useThree();
  const idxRef = useRef(targetIndex);

  useFrame((_, dt) => {
    idxRef.current += (targetIndex - idxRef.current) * Math.min(1, dt * 3);
    const [, y, z] = stepPosition(idxRef.current);
    // Camera sits a bit behind & above the climber, looking at the step in front
    const camY = y + 1.4;
    const camZ = z + 2.6;
    camera.position.lerp(new THREE.Vector3(0, camY, camZ), 1);
    const [, ly, lz] = stepPosition(idxRef.current + 0.8);
    camera.lookAt(0, ly + 0.3, lz);
  });

  return null;
};

const Staircase = ({
  services,
  activeIndex,
  reached,
}: {
  services: ServiceData[];
  activeIndex: number;
  reached: boolean;
}) => {
  const total = services.length;
  const goalPos = stepPosition(total - 1);
  return (
    <group>
      {services.map((s, i) => (
        <StraightStep
          key={s.slug}
          index={i}
          active={i === activeIndex}
          passed={i < activeIndex}
          label={s.title}
        />
      ))}

      {/* Side rails */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            (STEP_WIDTH / 2 + 0.05) * side,
            ((total - 1) * STEP_RISE) / 2 + 0.5,
            (-(total - 1) * STEP_DEPTH) / 2,
          ]}
          rotation={[Math.atan2(STEP_DEPTH, STEP_RISE) - Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[0.06, Math.hypot(total * STEP_RISE, total * STEP_DEPTH), 0.06]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#dc2626" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Goal trophy floats above the top step */}
      <Goal position={[goalPos[0], goalPos[1] + 1.0, goalPos[2]]} reached={reached} />

      {/* Ground */}
      <mesh position={[0, -0.4, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#050505" roughness={1} />
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
              Scroll to climb the staircase. Each step brings a new service to the front — reach the top and claim the goal.
            </p>
          </motion.div>

          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[60%] h-[60%] rounded-full bg-primary/10 blur-3xl" />
            </div>
            <Canvas shadows camera={{ position: [0, 1.4, 3.5], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 8, 4]} intensity={1.1} castShadow />
                <pointLight position={[-3, 3, 2]} intensity={0.8} color="#ef4444" />
                <ClimbingCamera targetIndex={activeIndex} />
                <Staircase services={allServices} activeIndex={activeIndex} reached={reached} />
                <Climber targetIndex={activeIndex} />
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
