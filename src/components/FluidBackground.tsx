import { useEffect, useRef } from "react";

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const resolution = 6;
    let cols: number, rows: number;
    let current: Float32Array;
    let previous: Float32Array;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / resolution) + 1;
      rows = Math.ceil(canvas.height / resolution) + 1;
      const size = cols * rows;
      current = new Float32Array(size);
      previous = new Float32Array(size);
    };
    resize();
    window.addEventListener("resize", resize);

    const idx = (x: number, y: number) => y * cols + x;

    const disturb = (mx: number, my: number, amount: number) => {
      const cx = Math.floor(mx / resolution);
      const cy = Math.floor(my / resolution);
      const radius = 4;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              previous[idx(nx, ny)] += amount * (1 - dist / radius);
            }
          }
        }
      }
    };

    let lastX = 0, lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const speed = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
      disturb(e.clientX, e.clientY, Math.min(speed * 3, 600));
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const damping = 0.97;

    const animate = () => {
      // Water simulation step
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = idx(x, y);
          current[i] = (
            previous[idx(x - 1, y)] +
            previous[idx(x + 1, y)] +
            previous[idx(x, y - 1)] +
            previous[idx(x, y + 1)]
          ) / 2 - current[i];
          current[i] *= damping;
        }
      }

      // Swap buffers
      const temp = previous;
      previous = current;
      current = temp;

      // Render
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const val = current[idx(x, y)];
          
          // Calculate light refraction from height differences
          const dx = current[idx(x - 1, y)] - current[idx(x + 1, y)];
          const dy = current[idx(x, y - 1)] - current[idx(x, y + 1)];
          
          const highlight = Math.min(255, Math.max(0, (dx + dy) * 0.8));
          const absVal = Math.abs(val);
          
          // Fill the resolution block
          for (let py = 0; py < resolution; py++) {
            for (let px = 0; px < resolution; px++) {
              const screenX = x * resolution + px;
              const screenY = y * resolution + py;
              if (screenX >= canvas.width || screenY >= canvas.height) continue;
              const pi = (screenY * canvas.width + screenX) * 4;
              
              // Red-tinted water with light refraction
              const r = Math.min(255, 8 + absVal * 0.3 + highlight * 0.6);
              const g = Math.min(255, 3 + highlight * 0.05);
              const b = Math.min(255, 3 + highlight * 0.05);
              
              data[pi] = r;
              data[pi + 1] = g;
              data[pi + 2] = b;
              data[pi + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
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
    />
  );
};

export default FluidBackground;
