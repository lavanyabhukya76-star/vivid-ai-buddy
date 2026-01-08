import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingOrbProps {
  isThinking: boolean;
  onClick?: () => void;
}

export const FloatingOrb = ({ isThinking, onClick }: FloatingOrbProps) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={orbRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer select-none"
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Outer glow rings */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-500",
          isThinking
            ? "bg-accent/10 blur-3xl scale-[2.5] animate-pulse"
            : "bg-accent/5 blur-2xl scale-[2]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-500",
          isThinking
            ? "bg-accent/20 blur-2xl scale-[2] animate-pulse"
            : isHovered
            ? "bg-accent/15 blur-xl scale-[1.8]"
            : "bg-accent/10 blur-xl scale-[1.5]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-300",
          isThinking
            ? "bg-accent/30 blur-xl scale-[1.5]"
            : isHovered
            ? "bg-accent/25 blur-lg scale-[1.3]"
            : "bg-accent/20 blur-lg scale-[1.2]"
        )}
      />

      {/* Main orb */}
      <div
        className={cn(
          "relative w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300",
          "bg-gradient-to-br from-accent via-accent/80 to-primary",
          "shadow-[0_0_30px_hsl(var(--accent)/0.6),0_0_60px_hsl(var(--accent)/0.4),0_0_90px_hsl(var(--accent)/0.2)]",
          "border border-white/30",
          isThinking && "animate-[spin_3s_linear_infinite]",
          isHovered && !isThinking && "scale-110"
        )}
      >
        {/* Inner highlight */}
        <div className="absolute top-2 left-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/40 blur-sm" />
        <div className="absolute top-3 left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/60" />
        
        {/* Core glow */}
        <div
          className={cn(
            "absolute inset-4 rounded-full transition-all duration-500",
            isThinking
              ? "bg-white/30 animate-pulse"
              : "bg-white/10"
          )}
        />

        {/* Thinking particles */}
        {isThinking && (
          <>
            <div className="absolute -top-2 left-1/2 w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
            <div className="absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:-0.15s]" />
            <div className="absolute -bottom-2 left-1/2 w-2 h-2 rounded-full bg-accent animate-bounce" />
            <div className="absolute top-1/2 -left-2 w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:-0.45s]" />
          </>
        )}
      </div>

      {/* Label */}
      <div
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm font-medium transition-all duration-300",
          isThinking
            ? "text-accent animate-pulse"
            : isHovered
            ? "text-accent"
            : "text-muted-foreground"
        )}
      >
        {isThinking ? "Thinking..." : "Ask me anything"}
      </div>
    </div>
  );
};