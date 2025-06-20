
import { useState, useRef, useEffect } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ReasoningPanel } from '@/components/ReasoningPanel';
import { Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  reasoning?: ReasoningStep[];
}

export interface ReasoningStep {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isReasoningOpen, setIsReasoningOpen] = useState(true);
  const [selectedMessageReasoning, setSelectedMessageReasoning] = useState<ReasoningStep[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with reasoning
    setTimeout(() => {
      const reasoning: ReasoningStep[] = [
        {
          id: '1',
          title: 'Understanding the question',
          content: 'The user is asking about...',
          timestamp: new Date()
        },
        {
          id: '2',
          title: 'Analyzing context',
          content: 'Based on the context provided, I need to consider...',
          timestamp: new Date()
        },
        {
          id: '3',
          title: 'Formulating response',
          content: 'The best approach would be to...',
          timestamp: new Date()
        }
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand your question about "${inputValue}". Here's my response with detailed reasoning available in the panel.`,
        role: 'assistant',
        timestamp: new Date(),
        reasoning
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSelectedMessageReasoning(reasoning);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMessageClick = (message: Message) => {
    if (message.reasoning) {
      setSelectedMessageReasoning(message.reasoning);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isReasoningOpen ? 'mr-96' : ''}`}>
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsReasoningOpen(!isReasoningOpen)}
            className="flex items-center gap-2"
          >
            {isReasoningOpen ? (
              <>
                <ChevronRight className="w-4 h-4" />
                Hide Reasoning
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                Show Reasoning
              </>
            )}
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <ChatInterface 
            messages={messages} 
            isLoading={isLoading}
            onMessageClick={handleMessageClick}
          />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message AI Assistant..."
                className="pr-12 min-h-[50px] max-h-[200px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="absolute right-2 bottom-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reasoning Panel */}
      <ReasoningPanel
        isOpen={isReasoningOpen}
        reasoning={selectedMessageReasoning}
        onClose={() => setIsReasoningOpen(false)}
      />
    </div>
  );
};

export default Index;
