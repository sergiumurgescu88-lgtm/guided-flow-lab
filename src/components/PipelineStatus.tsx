import { Check, Loader2, Circle, AlertCircle } from 'lucide-react';

export type StepStatus = 'pending' | 'processing' | 'complete' | 'error';

interface PipelineStep {
  id: string;
  label: string;
  status: StepStatus;
}

interface PipelineStatusProps {
  steps: PipelineStep[];
}

const StatusIcon = ({ status }: { status: StepStatus }) => {
  switch (status) {
    case 'complete':
      return <Check className="w-4 h-4 text-success" />;
    case 'processing':
      return <Loader2 className="w-4 h-4 text-info animate-spin" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    default:
      return <Circle className="w-4 h-4 text-muted-foreground" />;
  }
};

export const PipelineStatus = ({ steps }: PipelineStatusProps) => {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className="flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${step.status === 'complete' ? 'bg-success/20' : ''}
            ${step.status === 'processing' ? 'bg-info/20' : ''}
            ${step.status === 'error' ? 'bg-destructive/20' : ''}
            ${step.status === 'pending' ? 'bg-muted' : ''}
          `}>
            <StatusIcon status={step.status} />
          </div>
          
          <div className="flex-1">
            <span className={`text-sm font-medium ${
              step.status === 'complete' ? 'text-success' :
              step.status === 'processing' ? 'text-info' :
              step.status === 'error' ? 'text-destructive' :
              'text-muted-foreground'
            }`}>
              {step.label}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`absolute left-4 top-8 w-0.5 h-6 ${
              step.status === 'complete' ? 'bg-success/40' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};
