import { useState, useEffect, useRef } from "react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SamplePrompts } from "@/components/SamplePrompts";
import { FloatingOrb } from "@/components/FloatingOrb";
import { Bot } from "lucide-react";
import { toast } from "sonner";
import { streamChat } from "@/lib/streamChat";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOrbClick = () => {
    inputRef.current?.focus();
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    try {
      await streamChat({
        messages: [
          ...messages.map(m => ({ role: m.isUser ? "user" as const : "assistant" as const, content: m.text })),
          { role: "user" as const, content: text }
        ],
        onDelta: (chunk) => {
          assistantContent += chunk;
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && !lastMessage.isUser && lastMessage.id === assistantId) {
              return prev.map(m => 
                m.id === assistantId 
                  ? { ...m, text: assistantContent }
                  : m
              );
            }
            return [...prev, {
              id: assistantId,
              text: assistantContent,
              isUser: false,
              timestamp: new Date(),
            }];
          });
        },
        onDone: () => {
          setIsTyping(false);
        },
        onError: (error) => {
          setIsTyping(false);
          toast.error("Failed to get response", {
            description: error,
          });
          setMessages(prev => prev.filter(m => m.id !== assistantId));
        }
      });
    } catch (error) {
      setIsTyping(false);
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <InteractiveBackground />

      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4">
          <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-lg animate-pulse" />
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_20px_hsl(var(--accent)/0.5)]">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Your intelligent helper</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col pb-24 sm:pb-28">
        <div className="flex flex-1 flex-col">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-3 sm:px-4 gap-8">
              <FloatingOrb isThinking={isTyping} onClick={handleOrbClick} />
              <div className="w-full max-w-4xl mt-12">
                <SamplePrompts onSelectPrompt={handleSendMessage} />
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-3 sm:p-4 safe-area-bottom">
          <div className="mx-auto max-w-4xl">
            <ChatInput onSend={handleSendMessage} disabled={isTyping} inputRef={inputRef} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
