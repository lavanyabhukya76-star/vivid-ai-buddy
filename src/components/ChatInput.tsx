import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        disabled={disabled}
        className="min-h-[60px] max-h-[120px] resize-none rounded-2xl border-border bg-card focus-visible:ring-primary"
        rows={1}
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        size="icon"
        className="h-[60px] w-[60px] shrink-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 hover:opacity-90 transition-opacity shadow-medium"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
