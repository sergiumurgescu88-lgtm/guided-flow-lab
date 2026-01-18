import { Image as ImageIcon, Video, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptDisplay } from './PromptDisplay';
import { SceneCard } from './SceneCard';
import type { GeneratedScenes } from '@/types/workflow';

interface GeneratedContentProps {
  imageAnalysis: string | null;
  imagePrompt: string | null;
  scenes: GeneratedScenes | null;
  generatedImageUrl: string | null;
}

export const GeneratedContent = ({
  imageAnalysis,
  imagePrompt,
  scenes,
  generatedImageUrl,
}: GeneratedContentProps) => {
  if (!imageAnalysis && !imagePrompt && !scenes) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="prompts" className="w-full">
        <TabsList className="w-full bg-secondary border border-border">
          <TabsTrigger value="prompts" className="flex-1">
            <Sparkles className="w-4 h-4 mr-2" />
            Prompts
          </TabsTrigger>
          <TabsTrigger value="image" className="flex-1">
            <ImageIcon className="w-4 h-4 mr-2" />
            Image
          </TabsTrigger>
          <TabsTrigger value="scenes" className="flex-1">
            <Video className="w-4 h-4 mr-2" />
            Scenes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompts" className="space-y-4 mt-4">
          {imageAnalysis && (
            <PromptDisplay
              title="Image Analysis"
              prompt={imageAnalysis}
              icon={<ImageIcon className="w-5 h-5 text-primary" />}
            />
          )}
          {imagePrompt && (
            <PromptDisplay
              title="Generated Image Prompt"
              prompt={imagePrompt}
              icon={<Sparkles className="w-5 h-5 text-primary" />}
            />
          )}
        </TabsContent>
        
        <TabsContent value="image" className="mt-4">
          {generatedImageUrl ? (
            <div className="rounded-xl overflow-hidden border border-border">
              <img 
                src={generatedImageUrl} 
                alt="AI Generated" 
                className="w-full aspect-[9/16] object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Generated image will appear here
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="scenes" className="mt-4 space-y-4">
          {scenes ? (
            <>
              <SceneCard
                sceneNumber={1}
                sceneType="hook"
                dialogue={extractDialogue(scenes['scene 1'])}
                description={extractDescription(scenes['scene 1'])}
                cameraNote={extractCamera(scenes['scene 1'])}
              />
              <SceneCard
                sceneNumber={2}
                sceneType="showcase"
                dialogue={extractDialogue(scenes['scene 2'])}
                description={extractDescription(scenes['scene 2'])}
                cameraNote={extractCamera(scenes['scene 2'])}
              />
              <SceneCard
                sceneNumber={3}
                sceneType="cta"
                dialogue={extractDialogue(scenes['scene 3'])}
                description={extractDescription(scenes['scene 3'])}
                cameraNote={extractCamera(scenes['scene 3'])}
              />
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Video scenes will appear here after generation
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

function extractDialogue(scene: string): string {
  const match = scene.match(/Dialogue:\s*['"]([^'"]+)['"]/);
  return match?.[1] || 'No dialogue available';
}

function extractDescription(scene: string): string {
  // Get text between dialogue and camera
  const dialogueEnd = scene.indexOf("'", scene.indexOf("Dialogue:") + 10);
  const cameraStart = scene.indexOf("Camera:");
  if (dialogueEnd > 0 && cameraStart > dialogueEnd) {
    return scene.substring(dialogueEnd + 1, cameraStart).trim();
  }
  return scene.substring(0, 200) + '...';
}

function extractCamera(scene: string): string {
  const match = scene.match(/Camera:\s*(.+?)(?:\.|$)/);
  return match?.[1] || 'Standard shot';
}
