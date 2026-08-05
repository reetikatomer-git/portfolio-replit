import { motion } from 'framer-motion';

export function Scene1() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-[4vw] z-10">
      <div className="w-full max-w-[80vw] flex flex-col items-start justify-center h-full">
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.5, ease: 'circIn' } }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="h-[0.3vw] w-[10vw] bg-[#06b6d4] mb-[2vw]"
        />

        <div className="overflow-hidden mb-[1vw]">
          <motion.h1
            initial={{ y: '100%', rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            exit={{ y: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'circIn' } }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-[8vw] leading-none font-bold tracking-tighter text-white uppercase m-0"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Reetika Tomer
          </motion.h1>
        </div>

        <div className="overflow-hidden flex items-center gap-[1.5vw]">
          <motion.div
            initial={{ opacity: 0, x: '-2vw' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '2vw' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
            className="px-[1vw] py-[0.5vw] border border-[#06b6d4]/30 rounded-full bg-[#06b6d4]/10 backdrop-blur-md"
          >
            <span className="text-[1.2vw] tracking-wider text-[#06b6d4]" style={{ fontFamily: "'Space Mono', monospace" }}>TECHNICAL ARCHITECT</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-[#64748b] text-[1.5vw] font-light tracking-wide"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Delhi, India
          </motion.div>
        </div>
      </div>
    </div>
  );
}
