import { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onClear: () => void;
}

export const UploadZone = ({ onImageUpload, uploadedImage, onClear }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  if (uploadedImage) {
    return (
      <div className="relative group animate-scale-in">
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img 
            src={uploadedImage} 
            alt="Uploaded food" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            onClick={onClear}
            variant="destructive"
            size="icon"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-3">
          Image uploaded successfully
        </p>
      </div>
    );
  }

  return (
    <div
      className={`upload-zone p-8 flex flex-col items-center justify-center min-h-[256px] cursor-pointer ${isDragging ? 'drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
      />
      
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Upload className="w-8 h-8 text-primary" />
      </div>
      
      <h3 className="font-display text-lg font-semibold mb-2">
        Upload Food Image
      </h3>
      
      <p className="text-muted-foreground text-sm text-center max-w-xs">
        Drag and drop your food photo here, or click to browse
      </p>
      
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <ImageIcon className="w-4 h-4" />
        <span>PNG, JPG up to 10MB</span>
      </div>
    </div>
  );
};
