import { useCallback, useEffect, useRef, useState } from 'react';
import { Repeat, ChevronDown, ChevronUp } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const PROGRESS_TICK_MS = 60;

interface ProgressSegmentsProps {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  tick: number;
  onJumpTo: (index: number) => void;
}

function ProgressSegments({ sceneKeys, activeIndex, activeDuration, tick, onJumpTo }: ProgressSegmentsProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const start = performance.now();
    const id = window.setInterval(() => {
      setElapsed(performance.now() - start);
    }, PROGRESS_TICK_MS);
    return () => window.clearInterval(id);
  }, [tick]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;

  return (
    <div className="flex-1 flex items-center gap-1.5">
      {sceneKeys.map((key, i) => {
        const isActive = i === activeIndex;
        const fill = isActive ? progress * 100 : i < activeIndex ? 100 : 0;
        return (
          <button
            key={key}
            onClick={() => onJumpTo(i)}
            className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-4 hover:bg-white/25 transition-all relative min-h-[12px]"
            aria-label={`Jump to scene ${i + 1}`}
          >
            <div
              className="absolute inset-y-0 left-0 bg-white/90 rounded-full transition-[width] duration-100"
              style={{ width: `${fill}%` }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function VideoSection() {
  const {
    sceneKeys, activeIndex, locked, mountKey, tick,
    durations, activeDuration, onSceneChange, jumpTo, toggleLock,
  } = useSceneControls(SCENE_DURATIONS);

  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setHovering(true);
  }, []);
  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setHovering(false);
  }, []);
  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((c) => {
      if (!c) setHovering(false);
      return !c;
    });
  }, []);

  const barVisible = !collapsed || hovering;

  return (
    <section className="w-full relative" style={{ aspectRatio: '16/9' }}>
      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop
        onSceneChange={onSceneChange}
      />

      {/* Control bar hover zone */}
      <div
        ref={sensorRef}
        className="absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end"
        style={{ height: '25%' }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div className="flex-1 w-full" aria-hidden="true" />

        {/* Control Bar */}
        <div
          className={`flex items-center gap-3 bg-black/50 backdrop-blur-sm px-5 py-4 transition-all duration-200 ease-out ${
            barVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={toggleLock}
            className={`w-10 h-10 flex items-center justify-center transition-colors rounded-lg shrink-0 ${
              locked ? 'text-white bg-white/15 hover:bg-white/25' : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            title={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
          >
            <Repeat className="w-5 h-5" />
          </button>

          <div className="w-px self-stretch bg-white/15" />

          <ProgressSegments
            sceneKeys={sceneKeys}
            activeIndex={activeIndex}
            activeDuration={activeDuration}
            tick={tick}
            onJumpTo={jumpTo}
          />

          <div className="text-sm text-white/60 font-mono tabular-nums shrink-0">
            {activeIndex + 1}/{sceneKeys.length}
          </div>

          <button
            onClick={handleToggleCollapsed}
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-lg shrink-0"
            title={collapsed ? 'Show controls' : 'Hide controls'}
          >
            {collapsed ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
