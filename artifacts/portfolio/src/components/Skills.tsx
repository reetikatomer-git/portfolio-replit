import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Core Architectural Competencies",
    items: [
      "Solution Architecture", "Technical Design", "API-First Design", "Event-Driven Architecture", 
      "Cloud-Native Architecture", "Domain-Driven Design", "Microservices Architecture", 
      "Distributed Systems Design", "Integration Patterns", "Data Modeling", "System Design", 
      "Reference Architectures", "Scalability", "Resilience Engineering", "Architecture Decision Records (ADRs)", 
      "Performance Optimisation", "Maintainability", "Interoperability", "Observability Strategy", 
      "Security Architecture", "Cost Optimisation", "Threat Modeling", "Zero-Trust Design", 
      "AI-Enabled Architecture", "Agentic Capabilities Architecture"
    ]
  },
  {
    title: "Languages",
    items: ["C#", "HTML", "JavaScript", "TypeScript"]
  },
  {
    title: "Databases",
    items: ["SQL", "Redis"]
  },
  {
    title: "Cloud Platforms",
    items: ["Azure"]
  },
  {
    title: "Frameworks",
    items: ["Angular", ".NET Core", ".NET Framework 4.7", ".NET Standard 2.0"]
  },
  {
    title: "AI Tools",
    items: ["GitHub Copilot", "Claude"]
  },
  {
    title: "Developer Tools",
    items: ["Visual Studio", "VS Code", "SSMS"]
  },
  {
    title: "Other",
    items: [
      "Technical Design Docs", "Full-Stack Engineering", "Legacy Modernisation", 
      "Workflow Optimisation", "Technical Leadership & Mentorship", "Cross-functional Communication", 
      "Global Team Collaboration", "Stakeholder Management", "Strategic Alignment"
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Technical Mastery</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">A comprehensive toolkit forged over 18+ years of enterprise engineering and architectural design.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Core Competencies spans full width or large area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-3 bg-secondary/30 border border-border p-8 rounded-sm hover:border-primary/50 transition-colors duration-500"
          >
            <h3 className="text-xl font-serif font-semibold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>
              {skillCategories[0].title}
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {skillCategories[0].items.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-background border border-border text-sm text-muted-foreground hover:text-white hover:border-primary/60 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all duration-300 rounded-sm cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Other Categories */}
          {skillCategories.slice(1).map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
              className="bg-secondary/20 border border-border p-6 rounded-sm hover:bg-secondary/40 hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="text-lg font-serif font-semibold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.items.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1.5 bg-background/50 border border-border/50 text-xs md:text-sm text-muted-foreground rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
