import { motion } from 'framer-motion';

const techStack = [
  { title: '.NET Core', desc: 'Backend Services', color: 'border-[#06b6d4] text-[#06b6d4]' },
  { title: 'Azure', desc: 'Cloud Native', color: 'border-[#8b5cf6] text-[#8b5cf6]' },
  { title: 'SaaS', desc: 'Architecture', color: 'border-white text-white' },
  { title: 'AI-Assisted', desc: 'Engineering', color: 'border-[#10b981] text-[#10b981]' },
];

export function Scene3() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-[4vw] z-10">

      <div className="w-full max-w-[80vw]">
        <div className="overflow-hidden mb-[4vw]">
          <motion.h2
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%', transition: { duration: 0.5, ease: 'circIn' } }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[6vw] leading-none font-bold tracking-tighter text-center"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            MODERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]">STACK</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-[2vw]">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, scale: 0.9, y: '4vw' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: '-4vw',
                transition: { duration: 0.4, delay: i * 0.1 },
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.6 + i * 0.15,
              }}
              className={`p-[2.5vw] rounded-[1vw] border-l-[0.3vw] ${tech.color} bg-[#1e293b]/30 backdrop-blur-md flex flex-col justify-center`}
            >
              <h3 className="text-[2.2vw] font-bold mb-[0.5vw] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{tech.title}</h3>
              <p className="text-[1vw] text-[#64748b] uppercase tracking-wider" style={{ fontFamily: "'Space Mono', monospace" }}>{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
