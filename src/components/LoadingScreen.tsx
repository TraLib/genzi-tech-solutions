import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      animate={{ opacity: 0 }}
      transition={{ delay: 2.8, duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Code snippet top-left */}
      <div className="absolute top-8 left-8 font-mono text-xs text-muted-foreground/40 leading-relaxed">
        <p>01 &lt;div className='genzi'&gt;</p>
        <p>02 &nbsp;const innovation = true;</p>
        <p>03 &nbsp;return &lt;Excellence /&gt;;</p>
        <p>04 &lt;/div&gt;</p>
      </div>

      {/* Loading indicator top-right */}
      <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-xs text-muted-foreground/60">
        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        loading
      </div>

      {/* Main logo */}
      <motion.h1
        className="text-6xl md:text-8xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="text-foreground">genzi</span>
        <span className="text-gradient"> tech</span>
      </motion.h1>

      {/* Loading bar */}
      <div className="mt-6 w-48 h-[2px] bg-border rounded-full overflow-hidden">
        <div className="h-full bg-gradient-primary animate-loading-bar rounded-full" />
      </div>

      {/* Year bottom-left */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-xs text-muted-foreground/40 font-mono">
        <span className="w-8 h-px bg-muted-foreground/30" />
        2026
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
