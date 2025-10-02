/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, AlertTriangle } from 'lucide-react';

type AnySlide = Record<string, any>;

const SlideShow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // (Keeping your long `slides` array content as-is)
  // ── Just ensure it’s defined here, then:
  const slides = [/* … your existing objects … */] as const;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const downloadAsHTML = () => {
    const htmlContent = generateFullHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Part4_Challenges_Mitigation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateFullHTML = (): string => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Part 4: Challenges & Mitigation Strategies</title>
<style>
body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5}
.slide{background:#fff;margin:20px auto;padding:40px;max-width:900px;box-shadow:0 2px 8px rgba(0,0,0,.1);page-break-after:always}
h1{color:#dc2626;font-size:32px;margin-bottom:10px}
h2{color:#ef4444;font-size:24px;margin-top:20px}
h3{color:#333;font-size:20px;margin-top:15px}
.subtitle{color:#666;font-size:18px;margin-bottom:20px}
ul{line-height:1.8}
table{width:100%;border-collapse:collapse;margin:20px 0}
th,td{padding:12px;text-align:left;border:1px solid #ddd}
th{background:#dc2626;color:#fff}
@media print{.slide{page-break-after:always}}
</style></head><body>
${(slides as unknown as AnySlide[]).map((s, i) => generateSlideHTML(s, i + 1)).join('')}
</body></html>`;

  const generateSlideHTML = (slide: AnySlide, _num: number): string => {
    switch (slide.type) {
      case 'title':
        return `<div class="slide"><h1 style="text-align:center;margin-top:100px;">${slide.content.title}</h1>
        <h2 style="text-align:center;">${slide.content.subtitle}</h2>
        <p style="text-align:center;">${slide.content.details}<br>${slide.content.course}</p></div>`;
      case 'overview':
        return `<div class="slide"><h1>${slide.title}</h1><p class="subtitle">${slide.duration}</p>
        <ul>${(slide.topics as string[]).map((t) => `<li>${t}</li>`).join('')}</ul></div>`;
      default:
        return `<div class="slide"><h1>${slide.title || 'Slide'}</h1><p>Content for ${slide.type}</p></div>`;
    }
  };

  const renderSlide = (slide: AnySlide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-600 to-red-800 text-white p-12">
            <AlertTriangle className="w-24 h-24 mb-8" />
            <h1 className="text-5xl font-bold mb-4 text-center">{slide.content.title}</h1>
            <div className="h-1 w-32 bg-white mb-6" />
            <p className="text-2xl mb-3 font-semibold">{slide.content.subtitle}</p>
            <p className="text-xl opacity-90 mb-2">{slide.content.details}</p>
            <p className="text-lg opacity-80">{slide.content.course}</p>
          </div>
        );
      // …keep your other cases; add types to .map like (x: T, idx: number) …
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-gray-600">Slide type not implemented</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="flex-1 bg-white shadow-lg mx-8 my-4 rounded-lg overflow-hidden">
        {renderSlide(slides[currentSlide] as AnySlide)}
      </div>
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <button onClick={prevSlide} disabled={currentSlide === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-red-600 hover:bg-red-700'}`}>
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </button>
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 4: Challenges & Mitigation Strategies</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={downloadAsHTML} className="flex items-center px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all">
            <Download className="w-5 h-5 mr-2" /> Download HTML
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-red-600 hover:bg-red-700'}`}>
            Next <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;