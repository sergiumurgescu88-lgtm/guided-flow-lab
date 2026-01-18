import { Film, MessageSquare, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SceneCardProps {
  sceneNumber: number;
  sceneType: 'hook' | 'showcase' | 'cta';
  dialogue: string;
  description: string;
  cameraNote: string;
}

const sceneTypeConfig = {
  hook: {
    label: 'Hook',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  showcase: {
    label: 'Food Showcase',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  cta: {
    label: 'Call to Action',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
};

export const SceneCard = ({ 
  sceneNumber, 
  sceneType, 
  dialogue, 
  description, 
  cameraNote 
}: SceneCardProps) => {
  const config = sceneTypeConfig[sceneType];
  
  return (
    <Card className="scene-card card-glow border-border/50 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Scene {sceneNumber}</h3>
              <span className={`text-xs font-medium ${config.color}`}>
                {config.label}
              </span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
            {sceneType.toUpperCase()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Dialogue */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
            <span>Dialogue</span>
          </div>
          <p className="text-sm text-foreground/90 bg-muted/30 rounded-lg p-3 italic">
            "{dialogue}"
          </p>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Camera Note */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
          <Camera className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{cameraNote}</span>
        </div>
      </CardContent>
    </Card>
  );
};
