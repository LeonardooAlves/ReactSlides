import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Database, AlertTriangle } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Data Collection, Sampling & Synthetic Data',
        subtitle: 'Part 1: Introduction & Motivation',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Session Overview',
      duration: '70 minutes',
      parts: [
        { name: 'Part 1', topic: 'Introduction & Motivation', time: '8 min' },
        { name: 'Part 2', topic: 'Data Collection Concepts', time: '12 min' },
        { name: 'Part 3', topic: 'Sampling Techniques', time: '15 min' },
        { name: 'Part 4', topic: 'Challenges & Mitigation', time: '12 min' },
        { name: 'Part 5', topic: 'Introduction to Synthetic Data', time: '6 min' },
        { name: 'Part 6', topic: 'Synthetic Data Techniques', time: '10 min' },
        { name: 'Part 7-8', topic: 'Validation & Practical Integration', time: '7 min' }
      ]
    },
    {
      type: 'objectives',
      title: 'Learning Objectives',
      subtitle: 'By the end of this session, you will be able to:',
      objectives: [
        { icon: '🎯', text: 'Understand statistical foundations of data collection and sampling for AI' },
        { icon: '⚙️', text: 'Identify and apply appropriate sampling techniques based on problem constraints' },
        { icon: '⚠️', text: 'Recognize challenges in real-world data collection and their impact on AI models' },
        { icon: '🔬', text: 'Understand when and why synthetic data is necessary' },
        { icon: '🤖', text: 'Apply basic synthetic data generation techniques for AI applications' }
      ]
    },
    {
      type: 'caseStudy',
      title: 'When Data Goes Wrong: A Cautionary Tale',
      year: '2018',
      company: 'Amazon',
      caseName: 'AI Recruiting Tool Failure',
      sections: [
        { label: 'The Problem', content: 'AI recruiting tool showed systematic bias against women candidates', color: 'red' },
        { label: 'The Root Cause', content: 'Training data reflected 10 years of male-dominated hiring patterns in tech industry', color: 'orange' },
        { label: 'The Outcome', content: 'Tool was scrapped. Cost: millions in development + reputational damage', color: 'gray' },
        { label: 'The Lesson', content: 'This was NOT a model architecture problem—it was a DATA problem', color: 'blue' }
      ],
      highlight: 'Poor Data Collection → Biased AI → Real-World Harm'
    },
    {
      type: 'importance',
      title: 'Why This Matters for AI Practitioners',
      subtitle: 'Data quality determines AI system success',
      points: [
        { icon: '📊', title: 'Models Learn What Data Shows', desc: 'Even the most sophisticated algorithms cannot overcome fundamentally flawed data' },
        { icon: '⚖️', title: 'Bias Amplification', desc: 'AI systems can amplify existing biases in data, creating discriminatory outcomes' },
        { icon: '💰', title: 'Business Impact', desc: 'Poor data practices lead to failed deployments, wasted resources, and legal liability' },
        { icon: '🌍', title: 'Societal Consequences', desc: 'Biased AI affects hiring, lending, criminal justice, healthcare—real people, real harm' }
      ]
    },
    {
      type: 'foundation',
      title: 'The Statistical Foundation',
      principle: 'Any inference or prediction is only as valid as the data it represents',
      formula: {
        title: 'Mean Squared Error Decomposition',
        equation: 'E[(θ̂ - θ)²] = Bias² + Variance + Irreducible Error',
        components: [
          { term: 'Bias²', cause: 'Poor data collection', impact: 'Systematic errors' },
          { term: 'Variance', cause: 'Insufficient sampling', impact: 'High uncertainty' },
          { term: 'Irreducible', cause: 'Natural randomness', impact: 'Cannot eliminate' }
        ]
      },
      insight: 'In AI, both bias and variance are primarily DATA problems, not model problems'
    },
    {
      type: 'comparison',
      title: 'Traditional Statistics vs. AI/Machine Learning',
      subtitle: 'Same principles, different stakes',
      left: {
        title: 'Traditional Statistics',
        items: ['Make inferences about populations', 'Estimate parameters', 'Test hypotheses', 'Limited to data seen', 'Errors are typically bounded']
      },
      right: {
        title: 'AI/Machine Learning',
        items: ['Learn complex representations', 'Discover hidden patterns', 'Make predictions on new data', 'Generalize to unseen cases', 'Errors can compound and amplify']
      },
      bottom: { text: 'AI can AMPLIFY data issues through: overfitting, learning spurious correlations, poor generalization', emphasis: true }
    },
    {
      type: 'amplification',
      title: 'How AI Amplifies Data Problems',
      subtitle: 'Three mechanisms of amplification',
      mechanisms: [
        { name: 'Overfitting', description: 'Models memorize noise and artifacts in training data', example: 'Medical AI learns hospital equipment markers instead of disease patterns', icon: '🔬' },
        { name: 'Spurious Correlations', description: 'Models discover false patterns that happen to exist in collected data', example: 'Image classifier associates "husky" with snow because all training huskies had snow backgrounds', icon: '🔗' },
        { name: 'Poor Generalization', description: 'Models fail on real-world data that differs from training distribution', example: 'Face recognition trained on celebrities fails on security camera footage', icon: '🌐' }
      ]
    },
    {
      type: 'dependencies',
      title: 'AI System Dependencies on Data',
      subtitle: 'Every major AI application relies on large-scale data',
      applications: [
        { domain: 'Computer Vision', datasets: 'ImageNet, COCO, Open Images', samples: '14M+ images', challenge: 'Demographic bias, label noise' },
        { domain: 'Natural Language Processing', datasets: 'Common Crawl, Wikipedia, Books', samples: '570GB+ text', challenge: 'Language bias, toxic content' },
        { domain: 'Recommender Systems', datasets: 'User interaction logs, ratings', samples: 'Billions of events', challenge: 'Cold start, popularity bias' },
        { domain: 'Autonomous Vehicles', datasets: 'Sensor data, driving scenarios', samples: 'Millions of miles', challenge: 'Rare events, sim-to-real gap' }
      ],
      note: 'All of these systems are only as good as their training data'
    },
    {
      type: 'crisis',
      title: 'The Data Quality Crisis in AI',
      subtitle: 'Recent findings from AI research',
      findings: [
        { year: '2021', study: 'ImageNet Annotation Study', finding: '6% error rate in labels', impact: 'Model performance ceiling artificially lowered' },
        { year: '2022', study: 'Gender Bias in Word Embeddings', finding: '89% of word embeddings show gender bias', impact: 'NLP systems perpetuate stereotypes' },
        { year: '2023', study: 'Medical AI Dataset Audit', finding: '83% lack geographic diversity', impact: 'Models fail on underrepresented populations' },
        { year: '2024', study: 'Large Language Model Training Data', finding: 'Contamination with test data', impact: 'Inflated performance metrics' }
      ],
      message: 'We are in a data quality crisis, not a model architecture crisis'
    },
    {
      type: 'summary',
      title: 'Part 1 Summary: Why Data Matters',
      keyPoints: [
        { point: 'Real-world failures', detail: 'Amazon, facial recognition, medical AI—all stem from data problems' },
        { point: 'Statistical foundation', detail: 'Bias and variance in AI models primarily originate from data issues' },
        { point: 'AI amplification', detail: 'Machine learning can amplify data problems through overfitting and spurious correlations' },
        { point: 'Systemic dependency', detail: 'All major AI systems depend critically on large-scale, high-quality data' },
        { point: 'Crisis recognition', detail: 'The field is experiencing a data quality crisis that limits AI progress' }
      ],
      transition: 'Next: How do we collect and sample data properly for AI applications?'
    },
    {
      type: 'reflection',
      title: 'Reflection Questions',
      subtitle: 'Think about these before we move on',
      questions: [
        'Can you think of other AI failures that might be due to data problems?',
        'In your domain, what are the biggest challenges in collecting good data?',
        'How would you know if your AI model is failing due to data vs. architecture?'
      ],
      note: 'We will address these throughout the session'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12">
            <Database className="w-24 h-24 mb-8" />
            <h1 className="text-5xl font-bold mb-4 text-center leading-tight">{slide.content.title}</h1>
            <div className="h-1 w-32 bg-white mb-6"></div>
            <p className="text-2xl mb-3 font-semibold">{slide.content.subtitle}</p>
            <p className="text-xl opacity-90 mb-2">{slide.content.details}</p>
            <p className="text-lg opacity-80">{slide.content.course}</p>
          </div>
        );

      case 'overview':
        return (
          <div className="p-12 h-full flex flex-col bg-gradient-to-br from-gray-50 to-white">
            <h2 className="text-4xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-8">Total Duration: {slide.duration}</p>
            <div className="grid grid-cols-1 gap-4">
              {slide.parts.map((part, idx) => (
                <div key={idx} className={`flex items-center p-4 rounded-lg ${idx === 0 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}>
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mr-6 ${idx === 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                    {part.name}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{part.topic}</h3>
                  </div>
                  <div className="text-lg font-semibold text-gray-600 ml-4">{part.time}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'objectives':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-3 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            <div className="space-y-5">
              {slide.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                  <span className="text-3xl mr-5">{obj.icon}</span>
                  <p className="text-xl leading-relaxed">{obj.text}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'caseStudy':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-6 text-blue-800">{slide.title}</h2>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-8 border-red-500 p-8 rounded-lg mb-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600 mr-4" />
                <div>
                  <h3 className="text-3xl font-bold text-red-800">{slide.company} ({slide.year})</h3>
                  <p className="text-xl text-red-700">{slide.caseName}</p>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                {slide.sections.map((section, idx) => (
                  <div key={idx} className="bg-white p-4 rounded border-l-4 border-red-400">
                    <h4 className="font-bold text-lg mb-2 text-gray-800">{section.label}</h4>
                    <p className="text-lg text-gray-700">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-yellow-100 border-2 border-yellow-500 p-5 rounded-lg">
              <p className="text-2xl font-bold text-center text-yellow-900">⚠️ {slide.highlight}</p>
            </div>
          </div>
        );

      case 'importance':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-3 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-6">
              {slide.points.map((point, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border-2 border-blue-200">
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{point.title}</h3>
                  <p className="text-lg text-gray-700">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'foundation':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-6 text-blue-800">{slide.title}</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6 border-2 border-blue-300">
              <p className="text-2xl font-semibold text-blue-900 mb-6 text-center">{slide.principle}</p>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800">{slide.formula.title}</h3>
                <p className="font-mono text-2xl text-center mb-6 text-blue-700">{slide.formula.equation}</p>
                <div className="grid grid-cols-3 gap-4">
                  {slide.formula.components.map((comp, idx) => (
                    <div key={idx} className="text-center">
                      <p className="font-mono font-bold text-lg text-blue-800 mb-2">{comp.term}</p>
                      <p className="text-sm text-gray-600 mb-1">{comp.cause}</p>
                      <p className="text-sm font-semibold text-red-700">{comp.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-5 rounded-lg border-l-4 border-green-500">
              <p className="text-xl font-semibold text-green-900">💡 {slide.insight}</p>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-8 flex-1">
              <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-300">
                <h3 className="text-2xl font-bold mb-5 text-gray-800 text-center">{slide.left.title}</h3>
                <ul className="space-y-3">
                  {slide.left.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-lg">
                      <span className="text-gray-600 mr-3 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-400">
                <h3 className="text-2xl font-bold mb-5 text-blue-900 text-center">{slide.right.title}</h3>
                <ul className="space-y-3">
                  {slide.right.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-lg">
                      <span className="text-blue-600 mr-3 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`p-5 rounded-lg mt-4 ${slide.bottom.emphasis ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'}`}>
              <p className={`text-lg text-center font-bold ${slide.bottom.emphasis ? 'text-red-900' : 'text-gray-800'}`}>
                {slide.bottom.emphasis && '⚠️ '}{slide.bottom.text}
              </p>
            </div>
          </div>
        );

      case 'amplification':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-3 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
            <div className="space-y-5">
              {slide.mechanisms.map((mech, idx) => (
                <div key={idx} className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-start">
                    <span className="text-4xl mr-4">{mech.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-red-800">{mech.name}</h3>
                      <p className="text-lg mb-3 text-gray-800">{mech.description}</p>
                      <div className="bg-white p-3 rounded border-l-2 border-orange-400">
                        <p className="text-base"><span className="font-semibold">Example:</span> {mech.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dependencies':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="space-y-4 mb-6">
              {slide.applications.map((app, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-200 rounded-lg p-5">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div><h3 className="font-bold text-xl text-blue-900">{app.domain}</h3></div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Datasets</p>
                      <p className="text-base font-semibold">{app.datasets}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Scale</p>
                      <p className="text-base font-semibold text-green-700">{app.samples}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Challenge</p>
                      <p className="text-base font-semibold text-red-700">{app.challenge}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-lg font-semibold text-yellow-900 text-center">💡 {slide.note}</p>
            </div>
          </div>
        );

      case 'crisis':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="space-y-4 mb-6">
              {slide.findings.map((finding, idx) => (
                <div key={idx} className="bg-white border-l-4 border-orange-500 p-5 rounded shadow-sm">
                  <div className="flex items-start">
                    <div className="bg-orange-500 text-white font-bold px-4 py-2 rounded mr-4">{finding.year}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{finding.study}</h3>
                      <p className="text-base mb-2"><span className="font-semibold text-red-700">Finding:</span> {finding.finding}</p>
                      <p className="text-base text-gray-700"><span className="font-semibold">Impact:</span> {finding.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-red-100 border-2 border-red-500 p-5 rounded-lg">
              <p className="text-2xl font-bold text-center text-red-900">⚠️ {slide.message}</p>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-12 h-full flex flex-col bg-gradient-to-br from-blue-50 to-white">
            <h2 className="text-4xl font-bold mb-8 text-blue-800">{slide.title}</h2>
            <div className="space-y-4 mb-8">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-blue-900 mb-2">{idx + 1}. {kp.point}</h3>
                  <p className="text-lg text-gray-700">{kp.detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-green-100 border-2 border-green-500 p-5 rounded-lg mt-auto">
              <p className="text-xl font-semibold text-center text-green-900">➡️ {slide.transition}</p>
            </div>
          </div>
        );

      case 'reflection':
        return (
          <div className="p-12 h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            <h2 className="text-4xl font-bold mb-3 text-purple-800 text-center">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-10 text-center">{slide.subtitle}</p>
            <div className="space-y-6 max-w-4xl">
              {slide.questions.map((q, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <div className="flex items-start">
                    <span className="text-3xl mr-4">🤔</span>
                    <p className="text-xl text-gray-800">{q}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-purple-100 p-4 rounded-lg">
              <p className="text-lg text-purple-900 text-center italic">{slide.note}</p>
            </div>
          </div>
        );

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
        {renderSlide(slides[currentSlide])}
      </div>
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 1: Introduction & Motivation</p>
        </div>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SlideShow;