/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Sparkles } from 'lucide-react';

type AnySlide = Record<string, any>;

const SlideShow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // ⬇️ Keep your existing slides array here. This stub keeps the file compiling if slides are empty.
  const slides: AnySlide[] = [
  // Example structure (safe to delete/replace with your real array):
  // {
  //   type: 'title',
  //   content: { title: 'Synthetic Data Techniques', subtitle: 'Part 6', details: 'Statistics for AI', course: 'MSc AAI' }
  // }
 ];

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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateFullHTML = (): string => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Part 6: Synthetic Data Generation Techniques</title>
<style>
body{font-family:Arial,sans-serif;margin:0;padding:20px;background:#f5f5f5}
.slide{background:#fff;margin:20px auto;padding:40px;max-width:900px;box-shadow:0 2px 8px rgba(0,0,0,.1);page-break-after:always}
h1{color:#0ea5e9;font-size:32px;margin-bottom:10px}
h2{color:#0369a1;font-size:24px;margin-top:20px}
h3{color:#333;font-size:20px;margin-top:15px}
ul{line-height:1.8}
table{width:100%;border-collapse:collapse;margin:20px 0}
th,td{padding:12px;text-align:left;border:1px solid #ddd}
th{background:#0ea5e9;color:#fff}
@media print{.slide{page-break-after:always}}
</style></head><body>
${slides.map((s, i) => generateSlideHTML(s, i + 1)).join('')}
</body></html>`;

  const generateSlideHTML = (slide: AnySlide, _num: number): string => {
    let content = '';
    switch (slide.type) {
      case 'title':
        content = `<h1 style="text-align:center;margin-top:100px;">${slide.content?.title ?? ''}</h1>
        <h2 style="text-align:center;">${slide.content?.subtitle ?? ''}</h2>
        <p style="text-align:center;">${slide.content?.details ?? ''}<br>${slide.content?.course ?? ''}</p>`;
        break;
      case 'overview':
        content = `<h1>${slide.title ?? 'Overview'}</h1><p>${slide.duration ?? ''}</p>
          <ul>${(slide.topics as string[] || []).map((t) => `<li>${t}</li>`).join('')}</ul>`;
        break;
      case 'comparison':
        content = `<h1>${slide.title ?? 'Comparison'}</h1>
          <table><thead><tr>${(slide.headers as string[] || []).map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${(slide.rows as string[][] || []).map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
        break;
      default:
        content = `<h1>${slide.title ?? 'Slide'}</h1><p>Content for ${slide.type ?? 'unknown'}</p>`;
    }
    return `<div class="slide">${content}</div>`;
  };

  const renderSlide = (slide: AnySlide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-sky-500 to-cyan-700 text-white p-12">
            <Sparkles className="w-24 h-24 mb-8" />
            <h1 className="text-5xl font-bold mb-4 text-center">{slide.content?.title}</h1>
            <div className="h-1 w-32 bg-white mb-6" />
            <p className="text-2xl mb-3 font-semibold">{slide.content?.subtitle}</p>
            <p className="text-xl opacity-90 mb-2">{slide.content?.details}</p>
            <p className="text-lg opacity-80">{slide.content?.course}</p>
          </div>
        );

      case 'overview':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-3 text-sky-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {(slide.topics as string[] || []).map((topic: string, idx: number) => (
                <div key={idx} className="flex items-start bg-sky-50 p-4 rounded-lg border-l-4 border-sky-500">
                  <span className="text-sky-700 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technique':
        // Generic renderer for techniques (distribution-based, augmentation, GANs, VAEs, simulation, etc.)
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-sky-800">{slide.title}</h2>
            {slide.subtitle && <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>}

            {slide.method && (
              <div className="bg-sky-50 p-4 rounded mb-4">
                <p className="text-base"><span className="font-semibold">Method:</span> {slide.method}</p>
                {slide.process && <p className="text-sm mt-2">{slide.process}</p>}
              </div>
            )}

            {slide.details && (
              <div className="bg-white border p-4 rounded mb-4">
                {(slide.details as string[]).map((d: string, idx: number) => (
                  <p key={idx} className="text-sm mb-1">• {d}</p>
                ))}
              </div>
            )}

            {slide.properties && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(slide.properties as Record<string, string>).map(([k, v], idx: number) => (
                  <div key={idx} className="bg-white border p-3 rounded">
                    <p className="font-semibold text-sm text-gray-700 capitalize">{k}:</p>
                    <p className="text-sm">{v}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.example && (
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Example</h3>
                {Object.entries(slide.example as Record<string, string>).map(([k, v], idx: number) => (
                  <p key={idx} className="text-sm mb-1"><span className="font-semibold capitalize">{k}:</span> {v}</p>
                ))}
              </div>
            )}
          </div>
        );

      case 'comparison':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-6 text-sky-800">{slide.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sky-600 text-white">
                    {(slide.headers as string[] || []).map((header: string, idx: number) => (
                      <th key={idx} className="p-2 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(slide.rows as string[][] || []).map((row: string[], idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {row.map((cell: string, cellIdx: number) => (
                        <td key={cellIdx} className="p-2 border-b border-gray-200">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-10 h-full flex flex-col bg-gradient-to-br from-sky-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-sky-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {(slide.keyPoints as AnySlide[] || []).map((kp: AnySlide, idx: number) => (
                <div key={idx} className="bg-white border-l-4 border-sky-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-sky-900 mb-2">{idx + 1}. {kp.point}</h3>
                  <p className="text-lg text-gray-700">{kp.detail}</p>
                </div>
              ))}
            </div>
            {slide.transition && (
              <div className="bg-blue-100 border-2 border-blue-500 p-5 rounded-lg mt-auto">
                <p className="text-xl font-semibold text-center text-blue-900">➡️ {slide.transition}</p>
              </div>
            )}
          </div>
        );

      default:
        // Fallback that shows raw JSON to avoid blank slides if an unexpected type appears.
        return (
          <div className="p-10 h-full overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Slide</h2>
            <pre className="text-xs bg-gray-50 p-4 rounded border overflow-auto">
              {JSON.stringify(slide, null, 2)}
            </pre>
          </div>
        );
    }
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
        {slides.length > 0 ? renderSlide(slides[currentSlide] as AnySlide) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No slides found in Slide6.tsx. Add your slides array.</p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white p-4 flex items-center justify-between no-print">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-sky-600 hover:bg-sky-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>

        <div className="text-center">
          <p className="text-lg font-semibold">Slide {slides.length ? currentSlide + 1 : 0} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 6: Synthetic Data Generation Techniques</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={downloadAsPDF}
            className="flex items-center px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-all"
            title="Print to PDF (Ctrl+P)"
          >
            <FileText className="w-5 h-5 mr-2" />
            Print/PDF
          </button>
          <button
            onClick={downloadAsHTML}
            className="flex items-center px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <Download className="w-5 h-5 mr-2" />
            Download HTML
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1 || slides.length === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
              currentSlide === slides.length - 1 || slides.length === 0
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;