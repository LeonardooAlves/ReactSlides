/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Sparkles, FileText } from 'lucide-react';

type AnySlide = Record<string, any>;

const SlideShow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slides = [/* … your existing long slides array … */] as const;

  const nextSlide = () => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1);
  const prevSlide = () => currentSlide > 0 && setCurrentSlide(currentSlide - 1);
  const downloadAsPDF = () => window.print();

  const downloadAsHTML = () => {
    const html = generateFullHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Part6_Synthetic_Data_Techniques.html';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateFullHTML = (): string => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Part 6: Synthetic Data Generation Techniques</title></head>
<body>${(slides as unknown as AnySlide[]).map((s) => `<div><h1>${s.title || 'Content'}</h1></div>`).join('')}</body></html>`;

  const renderSlide = (slide: AnySlide) => {
    // keep your existing switch; add types to map callbacks & Object.entries casts like earlier
    return <div />; // placeholder — replace with your existing render switch/cases
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .slide-container { box-shadow: none !important; margin: 0 !important; height: 100vh !important; page-break-after: always; }
        }
      `}</style>

      <div className="flex-1 bg-white shadow-lg mx-8 my-4 rounded-lg overflow-hidden slide-container">
        {renderSlide(slides[currentSlide] as AnySlide)}
      </div>

      <div className="bg-gray-800 text-white p-4 flex items-center justify-between no-print">
        <button onClick={prevSlide} disabled={currentSlide === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </button>

        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 6: Synthetic Data Generation Techniques</p>
        </div>

        <div className="flex items-center gap-4>
          <button onClick={downloadAsPDF} className="flex items-center px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-all" title="Print to PDF (Ctrl+P or Cmd+P)">
            <FileText className="w-5 h-5 mr-2" /> Print/PDF
          </button>
          <button onClick={downloadAsHTML} className="flex items-center px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all">
            <Download className="w-5 h-5 mr-2" /> Download HTML
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
            Next <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;