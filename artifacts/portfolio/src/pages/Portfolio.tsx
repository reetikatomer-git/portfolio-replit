import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Summary from '@/components/Summary';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import QueryForm from '@/components/QueryForm';
import Contact from '@/components/Contact';
import VideoSection from '@/components/video/VideoSection';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <Summary />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
        <QueryForm />
        <Contact />
      </main>
    </div>
  );
}
