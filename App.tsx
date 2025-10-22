
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { editImageWithGemini } from './services/geminiService';
import { ImageIcon, SparklesIcon } from './components/Icons';
import type { ImageFile } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({
        file: file,
        base64: (reader.result as string).split(',')[1],
        url: URL.createObjectURL(file),
        mimeType: file.type,
      });
      setEditedImageUrl(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('يرجى تحميل صورة وكتابة وصف للتعديل.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const newImageBase64 = await editImageWithGemini(originalImage.base64, originalImage.mimeType, prompt);
      if (newImageBase64) {
        setEditedImageUrl(`data:image/png;base64,${newImageBase64}`);
      } else {
        throw new Error('لم يتم إرجاع أي صورة من الواجهة البرمجية.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const resetState = () => {
    setOriginalImage(null);
    setEditedImageUrl(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8" dir="rtl">
      <Header />
      <main className="w-full max-w-6xl mx-auto flex-grow flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full flex flex-col gap-8">
            <ImageDisplay 
              originalImageUrl={originalImage.url} 
              editedImageUrl={editedImageUrl} 
              isLoading={isLoading}
            />

            {error && <div className="bg-red-900/50 text-red-300 border border-red-700 p-3 rounded-lg text-center">{error}</div>}

            <div className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
              <label htmlFor="prompt" className="block text-lg font-semibold text-teal-300 mb-2">
                صف التعديل الذي تريده
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="مثال: اجعل السماء مليئة بالنجوم، أضف قطة ترتدي قبعة، غير لون السيارة إلى الأحمر..."
                className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 resize-none"
                disabled={isLoading}
              />
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                 <button
                    onClick={handleGenerateClick}
                    disabled={isLoading || !prompt}
                    className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    <SparklesIcon />
                    {isLoading ? '...جاري التعديل' : 'نفذ التعديل'}
                </button>
                 <button
                    onClick={resetState}
                    disabled={isLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 text-white font-bold rounded-lg shadow-lg transition-colors"
                >
                    <ImageIcon />
                    اختر صورة أخرى
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="w-full max-w-6xl mx-auto text-center text-gray-500 py-4 mt-8">
        <p>مدعوم بواسطة Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
