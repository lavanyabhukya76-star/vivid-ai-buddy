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
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-medium">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-soft",
          isUser
            ? "bg-user-message text-user-message-foreground rounded-br-md"
            : "bg-ai-message text-ai-message-foreground rounded-bl-md"
        )}
      >
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <p className="mt-1 text-[10px] sm:text-xs opacity-70">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
          <User className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};
