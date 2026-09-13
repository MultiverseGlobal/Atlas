import { motion } from "framer-motion";
import { AtlasIcon } from "@/components/atlas/EcosystemIcons";

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Glow rings */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute h-24 w-24 rounded-full border border-foreground/10 border-t-foreground/40 border-r-foreground/20"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute h-32 w-32 rounded-full border border-foreground/5 border-b-foreground/20 border-l-foreground/10"
        />

        {/* Core Icon */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/50 backdrop-blur-xl border border-white/10 shadow-2xl">
          <AtlasIcon className="h-6 w-6 text-foreground" />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="h-1.5 w-1.5 rounded-full bg-foreground"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="h-1.5 w-1.5 rounded-full bg-foreground"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="h-1.5 w-1.5 rounded-full bg-foreground"
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
            Loading context
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
