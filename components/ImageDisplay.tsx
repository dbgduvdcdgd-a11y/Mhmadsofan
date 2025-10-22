
import React from 'react';
import { ArrowLeftIcon, SparklesIcon } from './Icons';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  isLoading: boolean;
}

const ImagePanel: React.FC<{ title: string; imageUrl: string | null; children?: React.ReactNode; isOriginal?: boolean; }> = ({ title, imageUrl, children, isOriginal=false }) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-gray-900/50 p-4 rounded-xl border border-gray-700 min-h-[300px] md:min-h-[400px]">
    <h3 className={`text-lg font-semibold mb-3 ${isOriginal ? 'text-gray-400' : 'text-teal-300'}`}>{title}</h3>
    <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain" />
      ) : (
        children
      )}
    </div>
  </div>
);


const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-gray-400">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="mt-4 text-lg">...جاري تطبيق السحر</span>
    </div>
);


const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-gray-600">
        <SparklesIcon className="w-12 h-12 mb-2" />
        <span>الصورة المعدلة ستظهر هنا</span>
    </div>
)

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, editedImageUrl, isLoading }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-6">
      <ImagePanel title="الصورة الأصلية" imageUrl={originalImageUrl} isOriginal={true}/>
      
      <div className="hidden md:flex items-center justify-center px-4">
        <ArrowLeftIcon className="w-8 h-8 text-gray-600"/>
      </div>
      
      <ImagePanel title="الصورة المعدلة">
        {isLoading ? <LoadingSpinner /> : (editedImageUrl ? <img src={editedImageUrl} alt="Edited" className="max-w-full max-h-full object-contain" /> : <Placeholder />)}
      </ImagePanel>
    </div>
  );
};
