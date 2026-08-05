import { motion } from 'framer-motion';
import { Award, BookOpen, CheckCircle2 } from 'lucide-react';

const certGroups = [
  {
    issuer: "Anthropic",
    icon: <div className="w-10 h-10 rounded-lg bg-[#d4c5b9]/10 border border-[#d4c5b9]/30 flex items-center justify-center text-[#d4c5b9] font-serif font-bold text-xl">A</div>,
    color: "group-hover:border-[#d4c5b9]/50",
    items: [
      "AIFluency: Framework & Foundations",
      "Claude Code in Action",
      "Introduction to Claude Cowork",
      "Claude Platform 101",
      "ClaudeCode 101",
      "Claude 101",
      "Introduction to Agent Skills",
      "Introduction to Subagents",
      "AI Capabilities & Limitations"
    ]
  },
  {
    issuer: "Udemy",
    icon: <div className="w-10 h-10 rounded-lg bg-[#a435f0]/10 border border-[#a435f0]/30 flex items-center justify-center text-[#a435f0] font-bold text-xl">U</div>,
    color: "group-hover:border-[#a435f0]/50",
    items: [
      "7 Days of GitHub Copilot: The GitHub Copilot Masterclass",
      "GitHub Copilot — The Complete Guide 2026"
    ]
  },
  {
    issuer: "Microsoft",
    icon: <div className="w-10 h-10 rounded-lg bg-[#00a4ef]/10 border border-[#00a4ef]/30 flex items-center justify-center text-[#00a4ef] font-bold text-xl">M</div>,
    color: "group-hover:border-[#00a4ef]/50",
    items: [
      "MCPD | MCTS | MCP"
    ]
  },
  {
    issuer: "In Progress",
    icon: <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary"><BookOpen size={20} /></div>,
    color: "group-hover:border-primary/50",
    items: [
      "Google AI Fundamentals (Coursera)",
      "Anthropic Claude Certified Architect Foundations CCAR-F Cert Prep (LinkedIn Learning)"
    ]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <Award size={48} className="text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Certifications & Continuous Learning</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Staying at the vanguard of AI and architectural methodologies.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {certGroups.map((group, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-secondary/20 border border-border p-8 rounded-lg transition-all duration-300 group hover:-translate-y-1 ${group.color} flex flex-col h-full`}
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
                {group.icon}
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-white transition-colors">{group.issuer}</h3>
              </div>
              
              <ul className="space-y-4 flex-1">
                {group.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
