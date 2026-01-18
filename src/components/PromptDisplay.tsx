import { Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PromptDisplayProps {
  title: string;
  prompt: string;
  icon?: React.ReactNode;
}

export const PromptDisplay = ({ title, prompt, icon }: PromptDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="card-glow border-border/50 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              {icon || <Sparkles className="w-5 h-5 text-primary" />}
            </div>
            <CardTitle className="font-display text-lg">{title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 rounded-lg p-4 max-h-[300px] overflow-y-auto">
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {prompt}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
