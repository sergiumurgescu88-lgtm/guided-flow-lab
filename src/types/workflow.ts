export interface GeneratedScenes {
  'scene 1': string;
  'scene 2': string;
  'scene 3': string;
}

export interface WorkflowState {
  // Input
  uploadedImage: File | null;
  uploadedImageUrl: string | null;
  instructions: string;
  locationName: string;
  language: 'en' | 'ro' | 'es' | 'fr' | 'it';
  
  // Pipeline status
  isProcessing: boolean;
  currentStep: PipelineStep;
  
  // Generated content
  imageAnalysis: string | null;
  imagePrompt: string | null;
  generatedImageUrl: string | null;
  scenes: GeneratedScenes | null;
  videoUrls: string[];
  finalVideoUrl: string | null;
  
  // Errors
  error: string | null;
}

export type PipelineStep = 
  | 'idle'
  | 'analyzing'
  | 'generating-prompt'
  | 'creating-image'
  | 'generating-scenes'
  | 'creating-videos'
  | 'merging-videos'
  | 'complete'
  | 'error';

export interface PipelineStepInfo {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
}
