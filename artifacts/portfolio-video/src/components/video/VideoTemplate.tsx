import { useEffect } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  scene1: 5000,
  scene2: 7000,
  scene3: 7000,
  scene4: 6000,
  scene5: 5000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  scene1: Scene1,
  scene2: Scene2,
  scene3: Scene3,
  scene4: Scene4,
  scene5: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="w-full h-screen overflow-hidden relative bg-primary">
      {/* Background Video */}
      <video
        src={`${import.meta.env.BASE_URL}tech_bg.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
      />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Accent Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[8vw] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-accent-alt/20 rounded-full blur-[8vw] pointer-events-none" />

      {/* Scenes */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
