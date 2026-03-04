"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  theme?: "dark" | "light";
}

export default function RadialOrbitalTimeline({
  timelineData,
  theme = "dark",
}: RadialOrbitalTimelineProps) {
  const isLight = theme === "light";
  const [activeNodeId, setActiveNodeId] = useState<number>(
    timelineData[0]?.id ?? 1
  );
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const activeNodeRef = useRef(activeNodeId);

  const activeItem = timelineData.find((item) => item.id === activeNodeId);

  // Keep ref in sync with state (for RAF callback)
  useEffect(() => { activeNodeRef.current = activeNodeId; }, [activeNodeId]);

  // IntersectionObserver — only animate when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const obs = new IntersectionObserver(
      ([e]) => { isVisibleRef.current = e.isIntersecting; },
      { threshold: 0 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  // RAF-driven rotation — direct DOM updates, no React re-renders
  const updatePositions = useCallback(() => {
    rafRef.current = requestAnimationFrame(updatePositions);
    if (!isVisibleRef.current) return;

    const isMobile = window.innerWidth < 768;
    angleRef.current = (angleRef.current + (isMobile ? 0.032 : 0.12)) % 360;
    const total = timelineData.length;
    const radius = 140;

    for (let i = 0; i < total; i++) {
      const item = timelineData[i];
      const el = nodeRefs.current[item.id];
      if (!el) continue;

      const angle = ((i / total) * 360 + angleRef.current) % 360;
      const radian = (angle * Math.PI) / 180;
      const x = radius * Math.cos(radian);
      const y = radius * Math.sin(radian);
      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      const opacity = Math.max(0.4, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2));
      const isActive = activeNodeRef.current === item.id;

      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      el.style.zIndex = isActive ? "200" : String(zIndex);
      el.style.opacity = isActive ? "1" : opacity.toFixed(2);
    }
  }, [timelineData]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updatePositions]);

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
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-teal via-teal-dark to-teal animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-18 h-18 rounded-full border border-teal/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-22 h-22 rounded-full border border-teal/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className={`w-7 h-7 rounded-full backdrop-blur-md ${isLight ? "bg-white/90" : "bg-cream/80"}`}></div>
          </div>

          {/* Orbit ring */}
          <div className={`absolute w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-full border ${isLight ? "border-teal/20" : "border-teal/10"}`}></div>

          {/* Nodes — positioned via RAF, not React state */}
          {timelineData.map((item, index) => {
            const isActive = activeNodeId === item.id;
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            // Initial position (RAF takes over immediately)
            const initAngle = ((index / timelineData.length) * 360 * Math.PI) / 180;
            const initX = 140 * Math.cos(initAngle);
            const initY = 140 * Math.sin(initAngle);

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${initX}px, ${initY}px)`,
                  zIndex: isActive ? 200 : 100,
                  willChange: "transform",
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
                    background: `radial-gradient(circle, rgba(91,158,166,0.2) 0%, rgba(91,158,166,0) 70%)`,
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
                        ? "bg-teal text-white border-teal shadow-lg shadow-teal/30 scale-[1.3]"
                        : isRelated
                        ? "bg-teal/50 text-white border-teal animate-pulse"
                        : isLight
                        ? "bg-white text-[#1A1A2E] border-teal/30 shadow-sm"
                        : "bg-dark text-cream border-teal/40"
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
                    ${isActive
                      ? isLight ? "text-[#1A1A2E] scale-110" : "text-cream scale-110"
                      : isLight ? "text-[#4A4A5A]" : "text-cream/60"
                    }
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
            <p className="text-teal/60 text-xs font-mono tracking-widest uppercase mb-3">
              {activeItem.date}
            </p>

            {/* Title */}
            <h3 className={`font-serif text-2xl sm:text-3xl leading-snug mb-4 ${isLight ? "text-[#1A1A2E]" : "text-cream"}`}>
              {activeItem.title}
            </h3>

            {/* Accent line */}
            <div className="w-12 h-px bg-gold/30 mb-5" />

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-6 ${isLight ? "text-[#4A4A5A]" : "text-muted"}`}>
              {activeItem.content}
            </p>

            {/* Connected steps */}
            {activeItem.relatedIds.length > 0 && (
              <div className={`pt-5 border-t ${isLight ? "border-teal/15" : "border-teal/10"}`}>
                <p className={`text-[10px] uppercase tracking-[0.2em] font-sans mb-3 ${isLight ? "text-[#6A6A7A]" : "text-cream/40"}`}>
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
                        className={`flex items-center h-8 px-3 text-xs transition-all rounded-full ${
                          isLight
                            ? "border-teal/25 bg-white hover:bg-teal/10 text-[#4A4A5A] hover:text-[#1A1A2E]"
                            : "border-teal/20 bg-transparent hover:bg-teal/10 text-cream/70 hover:text-cream"
                        }`}
                        onClick={() => selectNode(relatedId)}
                      >
                        {relatedItem.title}
                        <ArrowRight size={10} className="ml-1.5 text-teal/50" />
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
