import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-medium">
        <Bot className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-ai-message px-4 py-3 shadow-soft">
        <div className="h-2 w-2 animate-bounce rounded-full bg-ai-message-foreground [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-ai-message-foreground [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-ai-message-foreground"></div>
      </div>
    </div>
  );
};
