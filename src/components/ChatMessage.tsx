import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 sm:gap-3 animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center">
          {/* 3D Glow layers */}
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
          <div className="absolute inset-1 rounded-full bg-accent/30 blur-lg" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-accent via-accent/80 to-primary/60 blur-sm" />
          {/* Main bubble */}
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_20px_hsl(var(--accent)/0.5),0_0_40px_hsl(var(--accent)/0.3),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-white/20">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" />
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300",
          isUser
            ? "bg-gradient-to-br from-accent to-accent/80 text-white rounded-br-md shadow-[0_4px_20px_hsl(var(--accent)/0.4),0_0_30px_hsl(var(--accent)/0.2)] hover:shadow-[0_4px_25px_hsl(var(--accent)/0.5),0_0_40px_hsl(var(--accent)/0.3)]"
            : "bg-card/80 backdrop-blur-sm text-card-foreground rounded-bl-md shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-border/50"
        )}
      >
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className={cn(
            "mt-1 text-[10px] sm:text-xs",
            isUser ? "text-white/70" : "text-muted-foreground"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      {isUser && (
        <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center">
          {/* 3D Glow layers for user */}
          <div className="absolute inset-0 rounded-full bg-accent/15 blur-xl" />
          <div className="absolute inset-1 rounded-full bg-accent/25 blur-lg" />
          {/* Main bubble */}
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary/80 shadow-[0_0_15px_hsl(var(--accent)/0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-accent/20">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};
