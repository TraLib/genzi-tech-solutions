import { useEffect, useRef } from "react";

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const blobs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 150 + Math.random() * 200,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      phase: Math.random() * Math.PI * 2,
      hue: i % 2 === 0 ? 0 : 0, // red hue
      saturation: 70 + Math.random() * 20,
      lightness: 15 + Math.random() * 15,
    }));

    const animate = () => {
      time += 0.008;
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        // Attract toward mouse slightly
        const dx = mouseX - blob.x;
        const dy = mouseY - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        blob.x += blob.speedX + (dx / dist) * 0.3 + Math.sin(time + blob.phase) * 1.5;
        blob.y += blob.speedY + (dy / dist) * 0.3 + Math.cos(time + blob.phase) * 1.5;

        // Wrap around edges
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

        const pulsatingRadius = blob.radius + Math.sin(time * 2 + blob.phase) * 30;

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, pulsatingRadius
        );
        gradient.addColorStop(0, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.lightness}%, 0.25)`);
        gradient.addColorStop(0.4, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.lightness - 5}%, 0.1)`);
        gradient.addColorStop(1, `hsla(${blob.hue}, ${blob.saturation}%, 5%, 0)`);

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, pulsatingRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Extra glow near mouse
      const mouseGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
      mouseGradient.addColorStop(0, "hsla(0, 85%, 45%, 0.08)");
      mouseGradient.addColorStop(1, "hsla(0, 85%, 45%, 0)");
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
      ctx.fillStyle = mouseGradient;
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default FluidBackground;
