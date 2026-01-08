import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        {/* 3D Glow layers */}
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
        <div className="absolute inset-1 rounded-full bg-accent/30 blur-lg" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-accent via-accent/80 to-primary/60 blur-sm" />
        {/* Main bubble */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_20px_hsl(var(--accent)/0.5),0_0_40px_hsl(var(--accent)/0.3),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-white/20">
          <Bot className="h-5 w-5 text-white drop-shadow-lg" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-card/80 backdrop-blur-sm px-4 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-border/50">
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)] [animation-delay:-0.3s]"></div>
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)] [animation-delay:-0.15s]"></div>
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)]"></div>
      </div>
    </div>
  );
};
