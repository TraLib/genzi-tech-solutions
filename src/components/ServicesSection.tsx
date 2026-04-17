import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { allServices } from "@/data/services";
import * as THREE from "three";

// One arrow-shaped sign plank
const ArrowSign = ({
  text,
  y,
  direction = 1,
  color = "#8b5a2b",
}: {
  text: string;
  y: number;
  direction?: 1 | -1;
  color?: string;
}) => {
  // Arrow shape (pointing right when direction=1)
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 1.6;
    const h = 0.42;
    const tip = 0.35;
    s.moveTo(0, -h / 2);
    s.lineTo(w - tip, -h / 2);
    s.lineTo(w, 0);
    s.lineTo(w - tip, h / 2);
    s.lineTo(0, h / 2);
    s.lineTo(0, -h / 2);
    return s;
  }, []);

  return (
    <group position={[0, y, 0]} rotation={[0, direction === 1 ? 0 : Math.PI, 0]}>
      <mesh castShadow position={[0.05, 0, 0]}>
        <extrudeGeometry args={[shape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 2 }]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      <Text
        position={[0.7, 0, 0.1]}
        fontSize={0.2}
        color="#f5e6d3"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
        textAlign="center"
      >
        {text.toUpperCase()}
      </Text>
    </group>
  );
};

const Signpost = ({ rotationMV, services }: { rotationMV: any; services: typeof allServices }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const target = rotationMV.get();
      // Smooth lerp toward scroll-driven rotation
      groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * 0.12;
    }
  });

  // Pair services into arrow sets — up to 6 pairs
  const pairs = useMemo(() => {
    const out: { left: string; right: string }[] = [];
    for (let i = 0; i < services.length; i += 2) {
      out.push({
        left: services[i]?.title ?? "",
        right: services[i + 1]?.title ?? services[0].title,
      });
    }
    return out;
  }, [services]);

  return (
    <group ref={groupRef}>
      {/* Wooden pole */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 4.2, 24]} />
        <meshStandardMaterial color="#a37044" roughness={0.85} />
      </mesh>
      {/* Pole top cap */}
      <mesh position={[0, 2.18, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
      </mesh>

      {/* Arrow signs — stacked */}
      {pairs.slice(0, 4).map((p, i) => {
        const y = 1.4 - i * 0.95;
        const tones = ["#a3683f", "#8b5a2b", "#6f4626", "#956140"];
        return (
          <group key={i}>
            <ArrowSign text={p.left} y={y} direction={-1} color={tones[i % tones.length]} />
            <ArrowSign text={p.right} y={y - 0.05} direction={1} color={tones[(i + 1) % tones.length]} />
          </group>
        );
      })}

      {/* Base / ground hint */}
      <mesh position={[0, -2.15, 0]} receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.08, 32]} />
        <meshStandardMaterial color="#3a2818" roughness={1} />
      </mesh>
    </group>
  );
};

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Drive 3D rotation purely from scroll — 3 full turns across the section
  const rotationMV = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 6]);

  // Header
  const headerY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Active service index based on scroll
  const activeIndex = useMotionValue(0);
  useTransform(scrollYProgress, (v) => {
    const i = Math.min(allServices.length - 1, Math.floor(v * allServices.length));
    activeIndex.set(i);
    return i;
  });

  return (
    <section id="services" ref={containerRef} className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Scroll to rotate the signpost and discover every direction we can take you.
          </p>
        </motion.div>

        {/* Sticky 3D viewer */}
        <div className="relative h-[300vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-full h-full max-w-5xl mx-auto">
              {/* Soft glow backdrop */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[60%] h-[60%] rounded-full bg-primary/10 blur-3xl" />
              </div>

              <Canvas
                shadows
                camera={{ position: [0, 0.4, 5.2], fov: 38 }}
                className="!absolute inset-0"
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.55} />
                  <directionalLight
                    position={[4, 6, 4]}
                    intensity={1.1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                  />
                  <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#7dd3fc" />
                  <Signpost rotationMV={rotationMV} services={allServices} />
                </Suspense>
              </Canvas>

              {/* Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full border border-border bg-card/70 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Scroll to rotate · Discover services
              </div>
            </div>
          </div>
        </div>

        {/* Service quick-links grid below */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
