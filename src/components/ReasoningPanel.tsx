
import { ReasoningStep } from '@/pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Brain, Clock } from 'lucide-react';

interface ReasoningPanelProps {
  isOpen: boolean;
  reasoning: ReasoningStep[] | null;
  onClose: () => void;
}

export const ReasoningPanel = ({ isOpen, reasoning }: ReasoningPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Reasoning Steps</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {reasoning ? `${reasoning.length} steps` : 'No reasoning selected'}
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        {reasoning ? (
          <div className="space-y-4">
            {reasoning.map((step, index) => (
              <Card key={step.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      <Badge variant="outline" className="mr-2">
                        Step {index + 1}
                      </Badge>
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-2">{step.content}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {step.timestamp.toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              Click on an AI message to see its reasoning steps
            </p>
          </div>
        )}
      </ScrollArea>

      {reasoning && (
        <>
          <Separator />
          <div className="p-4 bg-gray-50">
            <div className="text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Total Steps: {reasoning.length}</span>
                <span>Processing Time: ~2s</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
