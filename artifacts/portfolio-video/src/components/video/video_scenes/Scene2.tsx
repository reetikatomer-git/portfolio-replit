import { motion } from 'framer-motion';

export function Scene2() {
  return (
    <div className="absolute inset-0 flex items-center justify-between pointer-events-none p-[6vw] z-10">
      
      {/* Left Content */}
      <div className="w-1/2 flex flex-col items-start justify-center h-full relative z-20">
        <div className="overflow-hidden mb-[1vw]">
          <motion.p
            initial={{ opacity: 0, y: "2vw" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-2vw", transition: { duration: 0.4 } }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-mono text-accent text-[1.5vw] tracking-widest uppercase"
          >
            Domain Expertise
          </motion.p>
        </div>

        <div className="flex items-baseline gap-[1vw] overflow-hidden mb-[1.5vw]">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", opacity: 0, transition: { duration: 0.5, ease: "circIn" } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-[12vw] leading-none font-display font-extrabold tracking-tighter text-white"
          >
            18
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-3vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "2vw" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
            className="text-[5vw] leading-none font-display font-light text-accent-alt"
          >
            + YEARS
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="bg-secondary/40 backdrop-blur-lg border border-white/10 p-[2vw] rounded-[1.5vw]"
        >
          <h3 className="text-[2vw] font-display font-medium text-white mb-[0.5vw]">Enterprise Architecture</h3>
          <p className="text-[1.2vw] text-text-muted font-display">Specializing in the Insurance Domain</p>
        </motion.div>
      </div>

      {/* Right Graphic */}
      <div className="w-1/2 h-full relative flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: 45 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 1.2, opacity: 0, filter: 'blur(20px)', transition: { duration: 0.8 } }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="relative w-[80%] aspect-square perspective-[100vw]"
        >
          {/* We will load the generated tech architecture image here */}
          <img 
            src={`${import.meta.env.BASE_URL}tech_architecture.png`}
            alt="" 
            className="w-full h-full object-contain drop-shadow-[0_0_2vw_rgba(6,182,212,0.3)]"
          />
        </motion.div>
      </div>

    </div>
  );
}
