import { motion } from 'framer-motion';

export function Scene5() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-[4vw] z-10">

      <div className="flex flex-col items-center justify-center">

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 1.0, type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-[8vw] h-[8vw] rounded-full border-[0.2vw] border-accent flex items-center justify-center mb-[2vw] bg-accent/10 backdrop-blur-md"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1vw] h-[1vw] bg-accent rounded-full shadow-[0_0_1vw_rgba(6,182,212,0.8)]"
          />
        </motion.div>

        <div className="overflow-hidden mb-[1.5vw]">
          <motion.h2
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%', opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[1.8vw] font-display text-text-muted font-light uppercase tracking-[0.2em]"
          >
            Explore the portfolio
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: '2vw' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="px-[2vw] py-[1vw] bg-white rounded-full shadow-[0_0_2vw_rgba(255,255,255,0.2)]"
        >
          <span className="font-mono text-[2vw] font-bold text-primary tracking-tight">
            reetikatomer.replit.app
          </span>
        </motion.div>

      </div>

    </div>
  );
}
