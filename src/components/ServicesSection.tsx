import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
  // First step is always red (label step). Others light up as user climbs.
  const isFirst = index === 0;
  const color = isFirst || passed ? "#dc2626" : active ? "#ef4444" : "#1f1f1f";
  const emissive = isFirst || passed || active ? "#7f1d1d" : "#000000";
  const emissiveIntensity = isFirst ? 1.6 : active ? 1.4 : passed ? 0.4 : 0;

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
        fontSize={isFirst ? 0.28 : active ? 0.22 : 0.14}
        color={isFirst ? "#ffffff" : active ? "#ffffff" : passed ? "#fca5a5" : "#555555"}
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
}: {
  services: ServiceData[];
  activeIndex: number;
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
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(allServices.length - 1, Math.floor(v * allServices.length));
    setActiveIndex(i);
  });

  return (
    <section id="services" ref={containerRef} className="relative">
      {/* Long scroll container — drives the climb */}
      <div className="relative" style={{ height: `${allServices.length * 80 + 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
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
                <Staircase services={[{ slug: "__title__", title: "Our Services", shortDesc: "", icon: ArrowRight as never } as unknown as ServiceData, ...allServices]} activeIndex={activeIndex + 1} />
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
