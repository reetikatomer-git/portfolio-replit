import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, ArrowUpRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative border-t border-border bg-background">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">remarkable.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light mb-10 max-w-lg mx-auto md:mx-0">
              Open to architecting scalable, intelligent enterprise platforms and driving engineering excellence.
            </p>
            
            <a 
              href="mailto:reetika.tomer@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] group"
            >
              Start a Conversation
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6 w-full md:w-auto min-w-[300px]"
          >
            <a 
              href="mailto:reetika.tomer@gmail.com"
              className="flex items-center gap-4 p-6 bg-secondary/30 border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Email</div>
                <div className="text-white font-medium">reetika.tomer@gmail.com</div>
              </div>
            </a>
            
            <a 
              href="tel:+918800427941"
              className="flex items-center gap-4 p-6 bg-secondary/30 border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Phone</div>
                <div className="text-white font-medium">+91-8800427941</div>
              </div>
            </a>
            
            <a
              href="https://wa.me/918800427941"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-secondary/30 border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <SiWhatsapp size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">WhatsApp</div>
                <div className="text-white font-medium">Message me on WhatsApp</div>
              </div>
            </a>

            <a 
              href="https://linkedin.com/in/reetika-tomer-2010911b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-secondary/30 border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Linkedin size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">LinkedIn</div>
                <div className="text-white font-medium flex items-center gap-2">
                  View Profile <ArrowUpRight size={14} className="opacity-50" />
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-sm text-muted-foreground/50 border-t border-border/30 mt-24">
        © {new Date().getFullYear()} Reetika Tomer. All rights reserved.
      </div>
    </section>
  );
}
