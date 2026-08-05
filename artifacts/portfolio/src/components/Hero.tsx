import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Mail, ChevronDown } from 'lucide-react';

const specialties = [
  "Technical Architect",
  "Insurance Domain Expert",
  ".NET Core & Azure",
  "Microservices",
  "AI-Assisted Engineering"
];

export default function Hero() {
  const [currentSpecialtyIndex, setCurrentSpecialtyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialtyIndex((prev) => (prev + 1) % specialties.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] text-white tracking-tight mb-4">
            Reetika Tomer
          </h1>
          
          <div className="h-[40px] md:h-[60px] flex items-center text-xl md:text-3xl font-light text-muted-foreground mb-8">
            <span className="mr-2">I specialise in</span>
            <div className="relative h-full flex items-center overflow-hidden w-[300px] md:w-[450px]">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentSpecialtyIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary font-medium absolute left-0 border-b border-primary/30 pb-1 whitespace-nowrap"
                >
                  {specialties[currentSpecialtyIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl leading-relaxed mb-10">
            Delhi, India based architect bridging complex enterprise systems with cutting-edge AI tooling. Delivering scalable, resilient solutions that define the modern operations centre.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              <Mail size={20} />
              Contact Me
            </a>
            <a 
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-sm border border-border hover:bg-secondary/80 hover:border-primary/50 transition-all duration-300 w-full sm:w-auto"
            >
              <FileDown size={20} />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
