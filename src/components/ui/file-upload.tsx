import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploadProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  onUploadComplete?: (files: any[]) => void;
  onUploadError?: (error: any) => void;
  bucket?: string;
  folder?: string;
  required?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

interface UploadedFile {
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  url?: string;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = {
    'application/pdf': ['.pdf'],
    'image/*': ['.jpg', '.jpeg', '.png'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  onUploadComplete,
  onUploadError,
  bucket = 'documents',
  folder,
  required = false,
  label,
  description,
  className
}) => {
  const { uploadFile, uploading } = useFileUpload();
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      file,
      status: 'uploading' as const,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload files one by one
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const fileIndex = uploadedFiles.length + i;
      
      try {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setUploadedFiles(prev => prev.map((f, idx) => 
            idx === fileIndex ? { ...f, progress: Math.min(f.progress + 10, 90) } : f
          ));
        }, 200);

        const result = await uploadFile(file, bucket, folder);
        
        clearInterval(progressInterval);

        if (result.error) {
          setUploadedFiles(prev => prev.map((f, idx) => 
            idx === fileIndex ? { 
              ...f, 
              status: 'error', 
              progress: 100, 
              error: result.error.message 
            } : f
          ));
          onUploadError?.(result.error);
        } else {
          setUploadedFiles(prev => prev.map((f, idx) => 
            idx === fileIndex ? { 
              ...f, 
              status: 'success', 
              progress: 100, 
              url: result.data?.publicUrl 
            } : f
          ));
        }
      } catch (error) {
        setUploadedFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { 
            ...f, 
            status: 'error', 
            progress: 100, 
            error: 'Upload failed' 
          } : f
        ));
        onUploadError?.(error);
      }
    }

    // Call onUploadComplete with successful uploads
    const successfulUploads = uploadedFiles.filter(f => f.status === 'success');
    if (successfulUploads.length > 0) {
      onUploadComplete?.(successfulUploads);
    }
  }, [uploadFile, bucket, folder, onUploadComplete, onUploadError, uploadedFiles.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: uploading
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">{label}</label>
          {required && <Badge variant="destructive" className="text-xs">Required</Badge>}
        </div>
      )}
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          
          {isDragActive ? (
            <p className="text-sm text-primary font-medium">Drop files here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, DOCX, JPG, PNG up to {formatFileSize(maxSize)}
              </p>
            </div>
          )}
          
          <Button type="button" variant="outline" size="sm" disabled={uploading}>
            Choose Files
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files</h4>
          {uploadedFiles.map((uploadedFile, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border rounded-lg"
            >
              <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">
                    {uploadedFile.file.name}
                  </p>
                  <div className="flex items-center gap-2">
                    {uploadedFile.status === 'uploading' && (
                      <div className="w-16">
                        <Progress value={uploadedFile.progress} className="h-1" />
                      </div>
                    )}
                    
                    {uploadedFile.status === 'success' && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                    
                    {uploadedFile.status === 'error' && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  
                  {uploadedFile.status === 'error' && uploadedFile.error && (
                    <p className="text-xs text-red-600">{uploadedFile.error}</p>
                  )}
                  
                  {uploadedFile.status === 'uploading' && (
                    <p className="text-xs text-muted-foreground">
                      {uploadedFile.progress}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};