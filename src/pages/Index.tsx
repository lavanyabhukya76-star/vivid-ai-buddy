import { useState, useEffect, useRef } from "react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { SamplePrompts } from "@/components/SamplePrompts";
import { Bot } from "lucide-react";
import { toast } from "sonner";

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

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Math calculations
    if (lowerMessage.includes("calculate") || lowerMessage.includes("what is") && /\d/.test(lowerMessage)) {
      try {
        const match = lowerMessage.match(/(\d+\.?\d*)\s*%\s*(?:tip|of)\s*(?:on\s*)?\$?(\d+\.?\d*)/i);
        if (match) {
          const percentage = parseFloat(match[1]);
          const amount = parseFloat(match[2]);
          const result = (amount * percentage) / 100;
          return `A ${percentage}% tip on $${amount.toFixed(2)} would be $${result.toFixed(2)}. The total would be $${(amount + result).toFixed(2)}.`;
        }
      } catch (e) {
        return "I had trouble with that calculation. Could you rephrase it?";
      }
    }

    // Weather
    if (lowerMessage.includes("weather")) {
      return "I don't have real-time weather data access, but I can suggest checking weather.com or your local weather app for the most accurate forecast!";
    }

    // Scheduling
    if (lowerMessage.includes("schedule") || lowerMessage.includes("meeting")) {
      return "I'd be happy to help you schedule a meeting! While I can't access your calendar directly, I recommend using Google Calendar or Outlook to set up your meeting. Would you like tips on how to organize effective meetings?";
    }

    // Coding help
    if (lowerMessage.includes("code") || lowerMessage.includes("debug") || lowerMessage.includes("javascript") || lowerMessage.includes("python")) {
      return "I'd love to help with your code! Could you share the specific issue you're facing? I can assist with debugging, explain concepts, or suggest best practices for various programming languages.";
    }

    // Travel
    if (lowerMessage.includes("travel") || lowerMessage.includes("destination") || lowerMessage.includes("europe")) {
      return "Europe has amazing destinations! Some popular choices include Paris for art and culture, Rome for history, Barcelona for architecture, Amsterdam for canals and museums, and Santorini for stunning views. What type of experience are you looking for?";
    }

    // Jokes
    if (lowerMessage.includes("joke") || lowerMessage.includes("funny")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "What do you call a bear with no teeth? A gummy bear!",
        "Why don't eggs tell jokes? They'd crack each other up!",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Translation
    if (lowerMessage.includes("translate")) {
      return "I can help guide you on translation! For accurate translations, I recommend using Google Translate or DeepL. What languages are you working with?";
    }

    // Facts
    if (lowerMessage.includes("fact") || lowerMessage.includes("interesting")) {
      const facts = [
        "Did you know? Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that's still edible!",
        "Here's a cool fact: Octopuses have three hearts and blue blood!",
        "Interesting fact: A day on Venus is longer than its year!",
        "Did you know? Bananas are berries, but strawberries aren't!",
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }

    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! I'm your AI assistant, ready to help with scheduling, questions, coding, travel tips, and much more. What can I do for you today?";
    }

    // Default response
    return "That's an interesting question! While I can help with many things like scheduling, weather info, coding help, travel tips, calculations, and general knowledge, I might need more specific information to give you the best answer. Could you provide more details?";
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(text),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
