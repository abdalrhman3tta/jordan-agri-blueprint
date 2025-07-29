import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const uploadFile = async (
    file: File,
    bucket: string = 'documents',
    folder?: string
  ) => {
    try {
      if (!user) throw new Error('No user logged in');

      setUploading(true);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;
      const fullPath = `${user.id}/${filePath}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fullPath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        toast.error('Failed to upload file');
        console.error('Error uploading file:', error);
        return { error };
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fullPath);

      return { 
        data: {
          ...data,
          publicUrl: urlData.publicUrl,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        }, 
        error: null 
      };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (
    filePath: string,
    bucket: string = 'documents'
  ) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        toast.error('Failed to delete file');
        console.error('Error deleting file:', error);
        return { error };
      }

      toast.success('File deleted successfully');
      return { error: null };
    } catch (error: any) {
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  const getFileUrl = (filePath: string, bucket: string = 'documents') => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  return {
    uploading,
    uploadFile,
    deleteFile,
    getFileUrl,
  };
};