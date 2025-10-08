import { useState, useEffect, useRef } from "react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SamplePrompts } from "@/components/SamplePrompts";
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
          // Remove the partial message if there was an error
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
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-medium">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Your intelligent helper</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col px-4 py-6">
        <div className="flex flex-1 flex-col space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-4xl">
                <SamplePrompts onSelectPrompt={handleSendMessage} />
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-4 overflow-y-auto">
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

          <div className="sticky bottom-0 bg-background/80 backdrop-blur-lg pt-4">
            <div className="mx-auto max-w-4xl">
              <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
