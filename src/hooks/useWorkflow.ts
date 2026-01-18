import { useState, useCallback } from 'react';
import type { WorkflowState, PipelineStep, GeneratedScenes, PipelineStepInfo } from '@/types/workflow';
import type { SupportedLanguage } from '@/components/LanguageSelector';

const initialState: WorkflowState = {
  uploadedImage: null,
  uploadedImageUrl: null,
  instructions: '',
  locationName: '',
  language: 'en',
  isProcessing: false,
  currentStep: 'idle',
  imageAnalysis: null,
  imagePrompt: null,
  generatedImageUrl: null,
  scenes: null,
  videoUrls: [],
  finalVideoUrl: null,
  error: null,
};

export const useWorkflow = () => {
  const [state, setState] = useState<WorkflowState>(initialState);

  const setImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setState(prev => ({
      ...prev,
      uploadedImage: file,
      uploadedImageUrl: url,
    }));
  }, []);

  const clearImage = useCallback(() => {
    if (state.uploadedImageUrl) {
      URL.revokeObjectURL(state.uploadedImageUrl);
    }
    setState(prev => ({
      ...prev,
      uploadedImage: null,
      uploadedImageUrl: null,
    }));
  }, [state.uploadedImageUrl]);

  const setInstructions = useCallback((instructions: string) => {
    setState(prev => ({ ...prev, instructions }));
  }, []);

  const setLocationName = useCallback((locationName: string) => {
    setState(prev => ({ ...prev, locationName }));
  }, []);

  const setLanguage = useCallback((language: SupportedLanguage) => {
    setState(prev => ({ ...prev, language }));
  }, []);

  const setStep = useCallback((step: PipelineStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const simulateWorkflow = useCallback(async () => {
    if (!state.uploadedImage) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));

    try {
      // Step 1: Analyze Image
      setStep('analyzing');
      await delay(1500);
      const mockAnalysis = `The image shows a gourmet burger with a golden brioche bun, layered with melted cheddar cheese, crispy bacon strips, fresh green lettuce, ripe red tomato slices, and caramelized onions. The patty appears to be a thick, juicy beef patty with visible grill marks. The burger is presented in a branded cardboard container with the restaurant logo visible.`;
      setState(prev => ({ ...prev, imageAnalysis: mockAnalysis }));

      // Step 2: Generate Image Prompt
      setStep('generating-prompt');
      await delay(1200);
      const mockImagePrompt = `A beautiful blonde woman with expressive blue eyes and long flowing hair sits at a rustic wooden kitchen table, holding an open delivery container showcasing a gourmet burger with melted cheddar cheese, crispy bacon, fresh lettuce, and caramelized onions exactly as shown in the reference image, her warm smile revealing genuine delight as morning sunlight streams through the window behind her, casting a soft natural glow on her fitted cream sweater and the appetizing food details, small sauce drips visible on the container adding authenticity, her phone and coffee cup casually placed beside her on the table. Handheld iPhone photo, vertical framing, natural daylight, warm color tone, shallow depth of field, realistic imperfections, casual focus, soft shadows, UGC influencer aesthetic.`;
      setState(prev => ({ ...prev, imagePrompt: mockImagePrompt }));

      // Step 3: Create AI Image (simulated)
      setStep('creating-image');
      await delay(2000);
      setState(prev => ({ 
        ...prev, 
        generatedImageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' 
      }));

      // Step 4: Generate Video Scenes
      setStep('generating-scenes');
      await delay(1800);
      const mockScenes: GeneratedScenes = {
        'scene 1': `Dialogue: 'Okay you guys, I just got this from ${state.locationName || "Mama's Kitchen"} and I am so excited right now… look at the size of this thing.' The beautiful blonde woman sits in her bright kitchen, golden afternoon light streaming through the window behind her as she places a large branded delivery bag on the white marble counter, her expressive blue eyes wide with anticipation, wearing a casual fitted cream sweater, long hair falling naturally over her shoulders. Camera: vertical iPhone framing, front-facing camera, handheld stability, natural window light creating soft glow, warm color temperature.`,
        'scene 2': `Dialogue: 'Oh my god, the cheese is literally melting everywhere… and look at all these toppings, this is ridiculous.' Close-up shot as her hands carefully lift the gourmet burger from its container, revealing layers of melted cheddar, crispy bacon, fresh lettuce, and caramelized onions, steam visibly rising from the warm patty. Camera: vertical iPhone framing, close-up focus on food, slight handheld shake, natural daylight from left side, warm appetizing color grade.`,
        'scene 3': `Dialogue: 'Seriously, if you haven't tried ${state.locationName || "Mama's Kitchen"} yet, what are you doing… download the app right now, you can thank me later.' The woman looks directly at the camera with a warm, satisfied smile, the half-eaten burger visible on a plate beside her, golden hour sunlight casting a gentle glow across her face. Camera: vertical iPhone framing, front-facing camera at chest level, natural golden hour lighting, warm color tone, direct eye contact with lens.`,
      };
      setState(prev => ({ ...prev, scenes: mockScenes }));

      // Complete
      setStep('complete');
      setState(prev => ({ ...prev, isProcessing: false }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        currentStep: 'error',
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, [state.uploadedImage, state.locationName, setStep]);

  const getPipelineSteps = useCallback((): PipelineStepInfo[] => {
    const stepOrder: PipelineStep[] = [
      'analyzing',
      'generating-prompt',
      'creating-image',
      'generating-scenes',
      'complete',
    ];
    
    const stepLabels: Record<string, string> = {
      'analyzing': 'Analyzing Image',
      'generating-prompt': 'Generating Image Prompt',
      'creating-image': 'Creating AI Image',
      'generating-scenes': 'Generating Video Scenes',
      'complete': 'Complete',
    };

    const currentIndex = stepOrder.indexOf(state.currentStep);

    return stepOrder.map((step, index) => ({
      id: step,
      label: stepLabels[step],
      status: 
        state.currentStep === 'error' && index === currentIndex ? 'error' :
        index < currentIndex ? 'complete' :
        index === currentIndex && state.isProcessing ? 'processing' :
        index === currentIndex && state.currentStep === 'complete' ? 'complete' :
        'pending',
    }));
  }, [state.currentStep, state.isProcessing]);

  const reset = useCallback(() => {
    if (state.uploadedImageUrl) {
      URL.revokeObjectURL(state.uploadedImageUrl);
    }
    setState(initialState);
  }, [state.uploadedImageUrl]);

  return {
    state,
    setImage,
    clearImage,
    setInstructions,
    setLocationName,
    setLanguage,
    simulateWorkflow,
    getPipelineSteps,
    reset,
  };
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
