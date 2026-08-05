import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "GNKITMS, Kurukshetra University (Yamuna Nagar)",
    year: "2007"
  },
  {
    degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
    institution: "GNG College, Kurukshetra University (Yamuna Nagar)",
    year: "2003"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 bg-card/20 border-t border-border/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-4">
              <GraduationCap className="text-primary" size={36} />
              Academic Background
            </h2>
            <div className="h-px bg-border flex-1 ml-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-background border border-border p-8 rounded-lg hover:border-primary/30 hover:bg-secondary/10 transition-all duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-300 rounded-l-lg"></div>
                <div className="text-primary font-mono text-sm mb-3 font-semibold">{edu.year}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight">{edu.degree}</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wide">{edu.institution}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
