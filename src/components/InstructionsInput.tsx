import { Lightbulb, Store } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InstructionsInputProps {
  instructions: string;
  onInstructionsChange: (value: string) => void;
  locationName: string;
  onLocationChange: (value: string) => void;
}

export const InstructionsInput = ({
  instructions,
  onInstructionsChange,
  locationName,
  onLocationChange,
}: InstructionsInputProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
          <Store className="w-4 h-4 text-primary" />
          Restaurant / Brand Name
        </Label>
        <Input
          id="location"
          value={locationName}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="e.g., Mama's Kitchen, Pizza Palace"
          className="bg-input border-border focus:border-primary"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="instructions" className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="w-4 h-4 text-primary" />
          Additional Instructions
        </Label>
        <Textarea
          id="instructions"
          value={instructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          placeholder="Describe the vibe, specific shots, or any special requests... (optional)"
          className="bg-input border-border focus:border-primary min-h-[100px] resize-none"
        />
        <p className="text-xs text-muted-foreground">
          The AI will auto-detect your language from these instructions
        </p>
      </div>
    </div>
  );
};
