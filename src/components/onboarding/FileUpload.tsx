'use client'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

interface FileUploadProps {
  label: string;
  description: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  icon: React.ReactNode;
  required?: boolean;
}

export function FileUpload({ label, description, file, onFileChange, icon, required = false }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        return;
      }
      toast.success(`${selectedFile.name} uploaded successfully`);
    }
    onFileChange(selectedFile || null);
  };

  return (
    <div className={cn(
      "relative group border-2 border-dashed rounded-xl p-4 transition-all duration-300 cursor-pointer",
      file 
        ? "border-primary bg-accent" 
        : "border-border hover:border-primary hover:bg-primary/5"
    )}>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          file ? "bg-primary" : "bg-primary/10 group-hover:bg-primary/20"
        )}>
          {file ? <Check className="w-5 h-5 text-white" /> : icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">{label}</h3>
          {file ? (
            <p className="text-xs text-primary font-medium">{file.name}</p>
          ) : (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {required && !file && (
            <span className="text-xs text-destructive">Required</span>
          )}
        </div>
        {file && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onFileChange(null);
            }}
            className="text-muted-foreground hover:text-destructive p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}