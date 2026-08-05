import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Summary() {
  return (
    <section id="summary" className="py-24 md:py-32 relative border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-primary flex-1 opacity-20"></div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">Executive Summary</h2>
            <div className="h-px bg-primary flex-1 opacity-20"></div>
          </div>

          <div className="space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            <p>
              Accomplished Technical Architect with <strong className="text-white font-medium">18+ years</strong> of IT experience, including <strong className="text-white font-medium">10+ years specialising in insurance domain</strong>, delivering enterprise-grade solutions across underwriting, policy administration, integration, and platform modernisation.
            </p>
            <p>
              Proven expertise in solution architecture, technical design, and full-stack engineering, with a strong focus on legacy modernisation and cloud-enabled Microsoft ecosystems (.NET Core, C#, Azure, APIs, microservices, event-driven messaging). Skilled in translating complex business rules into scalable systems, optimising underwriting workflows, stabilising mission-critical platforms, and enabling high-availability enterprise delivery across insurance and adjacent digital products.
            </p>
            <p>
              Skilled in leveraging AI coding agents (GitHub Copilot, Claude) to accelerate underwriting workflows, automate rule validation, enhance risk assessment accuracy and migrating legacy solutions to latest tech.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 p-8 md:p-12 border border-primary/20 bg-primary/5 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
              <Quote size={120} className="text-primary" />
            </div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Career Objective</h3>
            <p className="text-xl md:text-2xl font-serif text-white leading-snug italic relative z-10">
              "Seeking to leverage deep architectural judgment, practical execution focus, and pragmatic use of AI-assisted engineering to define architecture strategy, technical standards, and solution direction for complex software platforms and enterprise applications."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
