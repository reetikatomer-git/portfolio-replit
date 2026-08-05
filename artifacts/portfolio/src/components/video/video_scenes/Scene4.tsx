import { motion } from 'framer-motion';

export function Scene4() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-[4vw] z-10 bg-[#020617]/50 backdrop-blur-sm">

      <div className="w-full max-w-[80vw] flex flex-col justify-center h-full">

        <div className="overflow-hidden">
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.6 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[9vw] leading-none font-extrabold tracking-tighter text-[#64748b]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            VAST
          </motion.div>
        </div>

        <div className="overflow-hidden mb-[3vw]">
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.6, delay: 0.1 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[9vw] leading-none font-extrabold tracking-tighter text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            EXPERIENCE.
          </motion.div>
        </div>

        <div className="overflow-hidden flex justify-end">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.6, delay: 0.2 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
            className="text-[8vw] leading-none font-light italic tracking-tight text-[#06b6d4] text-right"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready for what's next.
          </motion.div>
        </div>

      </div>

    </div>
  );
}
