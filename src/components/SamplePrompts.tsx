import { Card } from "@/components/ui/card";
import { Calendar, Cloud, Code, Lightbulb, Map, Calculator } from "lucide-react";

interface SamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  { icon: Calendar, text: "Schedule a meeting for next Tuesday", color: "from-blue-500 to-cyan-500" },
  { icon: Cloud, text: "What's the weather like today?", color: "from-cyan-500 to-teal-500" },
  { icon: Code, text: "Help me debug this JavaScript code", color: "from-purple-500 to-pink-500" },
  { icon: Lightbulb, text: "Tell me an interesting fact", color: "from-yellow-500 to-orange-500" },
  { icon: Map, text: "Best travel destinations in Europe", color: "from-green-500 to-emerald-500" },
  { icon: Calculator, text: "Calculate 15% tip on $87.50", color: "from-red-500 to-rose-500" },
];

export const SamplePrompts = ({ onSelectPrompt }: SamplePromptsProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-center text-2xl font-semibold text-foreground">
        What can I help you with?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {prompts.map((prompt, index) => {
          const Icon = prompt.icon;
          return (
            <Card
              key={index}
              onClick={() => onSelectPrompt(prompt.text)}
              className="group cursor-pointer border-border bg-card p-4 transition-all hover:scale-105 hover:shadow-medium"
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-lg bg-gradient-to-br ${prompt.color} p-2 shadow-soft`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm text-card-foreground group-hover:text-primary transition-colors">
                  {prompt.text}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
