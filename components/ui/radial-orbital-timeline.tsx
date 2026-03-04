"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number>(
    timelineData[0]?.id ?? 1
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const activeItem = timelineData.find((item) => item.id === activeNodeId);

  // Always auto-rotate
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 0.3) % 360;
        return Number(newAngle.toFixed(3));
      });
    }, 50);
    return () => clearInterval(rotationTimer);
  }, []);

  // Set initial pulse for first item's related nodes
  useEffect(() => {
    if (timelineData[0]) {
      const relatedItems = getRelatedItems(timelineData[0].id);
      const newPulse: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulse[relId] = true;
      });
      setPulseEffect(newPulse);
    }
  }, []);

  const selectNode = (id: number) => {
    setActiveNodeId(id);
    const relatedItems = getRelatedItems(id);
    const newPulse: Record<number, boolean> = {};
    relatedItems.forEach((relId) => {
      newPulse[relId] = true;
    });
    setPulseEffect(newPulse);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 140;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 overflow-hidden"
    >
      {/* Left: Orbital visualization */}
      <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex-shrink-0 flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Central core */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] via-[#A08838] to-[#C9A84C] animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-18 h-18 rounded-full border border-gold/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-22 h-22 rounded-full border border-gold/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-7 h-7 rounded-full bg-cream/80 backdrop-blur-md"></div>
          </div>

          {/* Orbit ring */}
          <div className="absolute w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-full border border-gold/10"></div>

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(
              index,
              timelineData.length
            );
            const isActive = activeNodeId === item.id;
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isActive ? 200 : position.zIndex,
                  opacity: isActive ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  selectNode(item.id);
                }}
              >
                {/* Energy glow */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0) 70%)`,
                    width: `${item.energy * 0.4 + 36}px`,
                    height: `${item.energy * 0.4 + 36}px`,
                    left: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                    top: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2
                    transition-all duration-300 transform
                    ${
                      isActive
                        ? "bg-gold text-dark border-gold shadow-lg shadow-gold/30 scale-[1.3]"
                        : isRelated
                        ? "bg-gold/50 text-dark border-gold animate-pulse"
                        : "bg-dark text-cream border-gold/40"
                    }
                  `}
                >
                  <Icon size={16} />
                </div>

                {/* Node label */}
                <div
                  className={`
                    absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[10px] font-semibold tracking-wider font-sans text-center
                    transition-all duration-300
                    ${isActive ? "text-cream scale-110" : "text-cream/60"}
                  `}
                >
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Detail panel */}
      <div className="flex-1 min-w-0 max-w-md">
        {activeItem && (
          <div
            key={activeItem.id}
            className="animate-fade-up"
          >
            {/* Step indicator */}
            <p className="text-gold/60 text-xs font-mono tracking-widest uppercase mb-3">
              {activeItem.date}
            </p>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl text-cream leading-snug mb-4">
              {activeItem.title}
            </h3>

            {/* Gold accent line */}
            <div className="w-12 h-px bg-gold/40 mb-5" />

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-6">
              {activeItem.content}
            </p>

            {/* Connected steps */}
            {activeItem.relatedIds.length > 0 && (
              <div className="pt-5 border-t border-gold/10">
                <p className="text-cream/40 text-[10px] uppercase tracking-[0.2em] font-sans mb-3">
                  Next Steps
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeItem.relatedIds.map((relatedId) => {
                    const relatedItem = timelineData.find(
                      (i) => i.id === relatedId
                    );
                    if (!relatedItem) return null;
                    return (
                      <Button
                        key={relatedId}
                        variant="outline"
                        size="sm"
                        className="flex items-center h-8 px-3 text-xs border-gold/20 bg-transparent hover:bg-gold/10 text-cream/70 hover:text-cream transition-all rounded-full"
                        onClick={() => selectNode(relatedId)}
                      >
                        {relatedItem.title}
                        <ArrowRight size={10} className="ml-1.5 text-gold/50" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
