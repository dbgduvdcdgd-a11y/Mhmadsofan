
import React, { useCallback, useState } from 'react';
import { ImageIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert('يرجى اختيار ملف صورة صالح.');
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
       if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        alert('يرجى اختيار ملف صورة صالح.');
      }
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl shadow-xl transition-all duration-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className={`flex flex-col items-center justify-center text-center p-10 rounded-lg transition-transform duration-300 ${isDragging ? 'scale-105' : 'scale-100'}`}>
        <ImageIcon className="w-16 h-16 mb-4 text-gray-500" />
        <h2 className="text-xl font-bold text-gray-200">اسحب وأفلت صورتك هنا</h2>
        <p className="text-gray-400 mt-2">أو</p>
        <label htmlFor="file-upload" className="mt-4 cursor-pointer inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors duration-300">
          <span>اختر ملفًا</span>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
        </label>
         <p className="text-xs text-gray-500 mt-4">يدعم: PNG, JPG, WEBP, GIF</p>
      </div>
    </div>
  );
};
