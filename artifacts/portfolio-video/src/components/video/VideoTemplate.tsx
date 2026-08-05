import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

const SCENE_DURATIONS = {
  scene1: 5000, // Intro
  scene2: 7000, // Experience
  scene3: 7000, // Tech Stack
  scene4: 6000, // Core Theme
  scene5: 5000, // Outro
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="w-full h-screen overflow-hidden relative bg-primary"
    >
      {/* Background Video - Plays continuously across all scenes */}
      <video
        src={`${import.meta.env.BASE_URL}tech_bg.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
      />
      
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* Global Accent Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[8vw] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-accent-alt/20 rounded-full blur-[8vw] pointer-events-none" />

      {/* Scenes */}
      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <Scene1 key="scene1" />}
        {currentScene === 1 && <Scene2 key="scene2" />}
        {currentScene === 2 && <Scene3 key="scene3" />}
        {currentScene === 3 && <Scene4 key="scene4" />}
        {currentScene === 4 && <Scene5 key="scene5" />}
      </AnimatePresence>
    </div>
  );
}