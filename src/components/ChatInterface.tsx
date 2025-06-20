
import { Message } from '@/pages/Index';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Brain, User } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onMessageClick: (message: Message) => void;
}

export const ChatInterface = ({ messages, isLoading, onMessageClick }: ChatInterfaceProps) => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">Welcome to AI Assistant</h2>
          <p className="text-gray-500">Start a conversation to see reasoning steps in the side panel</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <Brain className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <Card 
              className={`max-w-[80%] p-4 ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : message.reasoning 
                    ? 'bg-white border-2 border-blue-200 cursor-pointer hover:border-blue-300 transition-colors' 
                    : 'bg-white'
              }`}
              onClick={() => message.reasoning && onMessageClick(message)}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              {message.reasoning && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  Click to view reasoning steps →
                </div>
              )}
              <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </Card>

            {message.role === 'user' && (
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-green-100 text-green-600">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))
      )}
      
      {isLoading && (
        <div className="flex gap-4 justify-start">
          <Avatar className="w-8 h-8 mt-1">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              <Brain className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <Card className="max-w-[80%] p-4 bg-white">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
