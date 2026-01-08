import { useState, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  inputRef?: RefObject<HTMLTextAreaElement>;
}

export const ChatInput = ({ onSend, disabled, inputRef }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <Textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        disabled={disabled}
        className="min-h-[50px] sm:min-h-[60px] max-h-[120px] resize-none rounded-2xl border-border bg-card focus-visible:ring-accent text-sm sm:text-base shadow-[0_0_15px_hsl(var(--accent)/0.1)] focus:shadow-[0_0_25px_hsl(var(--accent)/0.2)] transition-shadow"
        rows={1}
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        size="icon"
        className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] shrink-0 rounded-2xl bg-gradient-to-br from-accent to-primary hover:opacity-90 active:opacity-80 transition-all shadow-[0_0_20px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_30px_hsl(var(--accent)/0.6)]"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </form>
  );
};
