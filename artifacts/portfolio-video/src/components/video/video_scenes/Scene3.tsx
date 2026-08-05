import { motion } from 'framer-motion';

const techStack = [
  { title: ".NET Core", desc: "Backend Services", color: "border-accent text-accent" },
  { title: "Azure", desc: "Cloud Native", color: "border-accent-alt text-accent-alt" },
  { title: "SaaS", desc: "Architecture", color: "border-white text-white" },
  { title: "AI-Assisted", desc: "Engineering", color: "border-success text-success" },
];

export function Scene3() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-[4vw] z-10">
      
      <div className="w-full max-w-[80vw]">
        <div className="overflow-hidden mb-[4vw]">
          <motion.h2
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%", transition: { duration: 0.5, ease: "circIn" } }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[6vw] leading-none font-display font-bold tracking-tighter text-center"
          >
            MODERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-alt">STACK</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-[2vw]">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, scale: 0.9, y: "4vw" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                y: "-4vw",
                transition: { duration: 0.4, delay: i * 0.1 } 
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1], 
                delay: 0.6 + (i * 0.15) 
              }}
              className={`p-[2.5vw] rounded-[1vw] border-l-[0.3vw] ${tech.color} bg-secondary/30 backdrop-blur-md flex flex-col justify-center`}
            >
              <h3 className="text-[2.2vw] font-display font-bold mb-[0.5vw] text-white">{tech.title}</h3>
              <p className="font-mono text-[1vw] text-text-muted uppercase tracking-wider">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
