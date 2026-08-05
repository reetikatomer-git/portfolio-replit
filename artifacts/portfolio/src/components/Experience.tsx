import { motion } from 'framer-motion';
import { Briefcase, Building, ChevronRight, Cpu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const experiences = [
  {
    company: "AdvantageGo (Sapiens & Coforge)",
    role: "Technical Architect",
    duration: "Apr 2019 – Present (6+ years)",
    domain: "Underwriting P&C — Insurance Domain",
    highlights: [
      "Evaluated property and casualty insurance applications to determine risk exposure and ensure policy compliance with underwriting guidelines.",
      "Implemented risk assessment models to improve accuracy in premium calculations and enhance portfolio profitability.",
      "Collaborated with brokers and agents to clarify policy terms and accelerate underwriting decisions, improving client satisfaction.",
      "Monitored claims trends and adjusted underwriting criteria to mitigate potential losses and maintain regulatory compliance.",
      "Streamlined documentation processes to reduce underwriting cycle times and increase operational efficiency.",
      "Integrated AI coding agents into underwriting modules to auto-generate risk evaluation scripts, reducing manual coding effort by 40%.",
      "Applied AI-driven automation for policy rule validation, improving underwriting cycle efficiency and compliance accuracy."
    ],
    highlightBold: "40%"
  },
  {
    company: "DXC / Xchanging",
    role: "Professional 2 — Product Developer",
    duration: "Sep 2015 – Mar 2019",
    domain: "Xuber Insurance Software",
    highlights: [
      "Developed and integrated insurance software modules to improve processing accuracy and streamline client policy management workflows.",
      "Monitored system performance and resolved technical issues to maintain high application reliability and uptime.",
      "Collaborated with cross-functional teams to align software features with customer requirements.",
      "Optimised codebase and automated testing procedures to accelerate deployment cycles.",
      "Conducted quality assurance reviews ensuring compliance with industry regulations.",
      "Developed and maintained Xuber Insurance Software solutions, enhancing policy administration efficiency and reducing processing errors through tailored automation and integration."
    ]
  },
  {
    company: "GlobalLogic",
    role: "Associate Consultant",
    duration: "Jun 2011 – Sep 2015",
    domain: "Multiple Domains (Social Commerce, Aviation, Travel)",
    highlights: [
      "Solavei (Social Commerce): Social commerce platform embedding peer-network monetisation dynamics into transactional spending workflows. Spearheaded initial development POCs and structured application logging architecture using Semantic Logging blocks. Tech: C#, ASP.NET 4.0, Web API, MVC4, jQuery, Umbraco CMS.",
      "FlightGlobal (Aviation): Implemented premium content delivery pipelines and personalised workflows using Episerver CMS. Developed secure, dedicated landing layers and data spaces for registered and premium-tier clients.",
      "RateGain (Travel): Designed and engineered critical service modules integrated with automated, bot-based client applications. Constructed modular Views, Controllers, and Models aligned with iterative product releases."
    ]
  },
  {
    company: "Daffodil Software",
    role: "Sr. Software Engineer",
    duration: "Jan 2007 – Jun 2011",
    domain: "E-Commerce",
    highlights: [
      "Focus: Customisation of AspDotNetStorefront, focusing on customer preferences and product catalogue."
    ]
  }
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 md:py-32 bg-card/20 border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Professional Trajectory</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">A track record of architectural leadership and engineering excellence.</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 text-primary px-6 py-3 rounded-sm inline-flex items-center gap-3">
            <Cpu size={20} />
            <span className="font-semibold tracking-wide">10+ Years Insurance Domain</span>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-[27px] top-0 bottom-0 w-[2px] bg-border">
            <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-primary via-primary/30 to-transparent shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Node */}
                <div className="absolute left-0 md:left-[12px] top-1.5 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)] z-10">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                </div>

                <div 
                  className={cn(
                    "bg-secondary/20 border border-border rounded-lg p-6 md:p-8 transition-all duration-300 cursor-pointer group",
                    expandedIndex === idx ? "bg-secondary/40 border-primary/40 shadow-lg shadow-black/20" : "hover:border-primary/20 hover:bg-secondary/30"
                  )}
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-lg text-muted-foreground font-medium mb-3">
                        <Building size={16} className="text-primary/70" />
                        {exp.company}
                      </div>
                      <div className="inline-block px-3 py-1 bg-background border border-border text-xs uppercase tracking-widest text-muted-foreground rounded-sm">
                        {exp.domain}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 whitespace-nowrap bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                      <Briefcase size={14} />
                      {exp.duration}
                    </div>
                  </div>

                  <div className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    expandedIndex === idx ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="overflow-hidden">
                      <div className="h-px w-full bg-border/50 mb-6"></div>
                      <ul className="space-y-4">
                        {exp.highlights.map((highlight, hIdx) => {
                          const text = exp.highlightBold 
                            ? highlight.split(exp.highlightBold) 
                            : [highlight];

                          return (
                            <li key={hIdx} className="flex items-start gap-3 text-muted-foreground/90 leading-relaxed">
                              <ChevronRight size={18} className="text-primary mt-1 shrink-0" />
                              <span>
                                {text.length > 1 ? (
                                  <>
                                    {text[0]}
                                    <strong className="text-white font-bold bg-primary/20 px-1.5 py-0.5 rounded">{exp.highlightBold}</strong>
                                    {text[1]}
                                  </>
                                ) : highlight}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
