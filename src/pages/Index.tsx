import { Play, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { UploadZone } from '@/components/UploadZone';
import { InstructionsInput } from '@/components/InstructionsInput';
import { LanguageSelector } from '@/components/LanguageSelector';
import { PipelineStatus } from '@/components/PipelineStatus';
import { GeneratedContent } from '@/components/GeneratedContent';
import { useWorkflow } from '@/hooks/useWorkflow';

const Index = () => {
  const {
    state,
    setImage,
    clearImage,
    setInstructions,
    setLocationName,
    setLanguage,
    simulateWorkflow,
    getPipelineSteps,
    reset,
  } = useWorkflow();

  const canGenerate = state.uploadedImage && !state.isProcessing;

  return (
    <div className="min-h-screen bg-background">
      {/* Background Glow Effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(38 92% 50% / 0.08) 0%, transparent 50%)',
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Transform Food Photos into
            <span className="block gradient-text">Viral UGC Videos</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a food image, and our AI will create professional influencer-style 
            video content with authentic dialogue in your preferred language.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Create Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <UploadZone
                  onImageUpload={setImage}
                  uploadedImage={state.uploadedImageUrl}
                  onClear={clearImage}
                />
                
                <InstructionsInput
                  instructions={state.instructions}
                  onInstructionsChange={setInstructions}
                  locationName={state.locationName}
                  onLocationChange={setLocationName}
                />
                
                <LanguageSelector
                  value={state.language}
                  onChange={setLanguage}
                />
                
                <div className="flex gap-3">
                  <Button
                    onClick={simulateWorkflow}
                    disabled={!canGenerate}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold"
                    size="lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Generate Content
                  </Button>
                  
                  {state.currentStep !== 'idle' && (
                    <Button
                      onClick={reset}
                      variant="outline"
                      size="lg"
                      className="border-border hover:bg-secondary"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Status */}
            {state.currentStep !== 'idle' && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-display text-base">
                    Pipeline Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PipelineStatus steps={getPipelineSteps()} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <GeneratedContent
              imageAnalysis={state.imageAnalysis}
              imagePrompt={state.imagePrompt}
              scenes={state.scenes}
              generatedImageUrl={state.generatedImageUrl}
            />
            
            {state.currentStep === 'idle' && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">
                    Ready to Create
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Upload a food photo and we'll generate professional 
                    UGC video content with AI-powered scene prompts.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          {[
            {
              title: 'Multi-Language Support',
              description: 'Generate content in English, Spanish, Romanian, French, or Italian',
              icon: '🌍',
            },
            {
              title: 'AI Image Analysis',
              description: 'Automatic detection of food details, textures, and presentation',
              icon: '🔍',
            },
            {
              title: '3-Scene Structure',
              description: 'Hook, Showcase, and CTA scenes optimized for social media',
              icon: '🎬',
            },
          ].map((feature, index) => (
            <Card 
              key={feature.title}
              className="border-border/50 bg-card/30 backdrop-blur-sm card-glow animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
