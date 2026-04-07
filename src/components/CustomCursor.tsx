import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePos.x - (isHovering ? 20 : 8),
          y: mousePos.y - (isHovering ? 20 : 8),
          width: isHovering ? 40 : 16,
          height: isHovering ? 40 : 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className={`w-full h-full rounded-full transition-colors duration-200 ${
            isHovering
              ? "bg-primary border-2 border-primary-foreground"
              : "bg-primary"
          }`}
        />
      </motion.div>

      {/* Trailing glow ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }}
      >
        <div className="w-12 h-12 rounded-full border border-primary/50" />
      </motion.div>

      {/* Red glow blob */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        animate={{
          x: mousePos.x - 60,
          y: mousePos.y - 60,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 2 }}
      >
        <div className="w-[120px] h-[120px] rounded-full bg-primary/10 blur-[40px]" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
