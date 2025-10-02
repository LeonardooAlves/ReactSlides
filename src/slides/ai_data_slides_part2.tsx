import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Database } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Data Collection',
        subtitle: 'Part 2: Concepts & Techniques',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Part 2 Overview',
      duration: '12 minutes',
      topics: [
        'Statistical framing of data collection',
        'Key considerations: Population, sampling frame, measurement',
        'Four primary collection techniques with AI examples',
        'Quality dimensions for AI applications',
        'Real-world tradeoffs and considerations'
      ]
    },
    {
      type: 'definition',
      title: 'Data Collection: Statistical Framing',
      definition: 'Systematic gathering of observations from a target population or data-generating process to enable statistical inference or learning',
      components: [
        { 
          label: 'Population Definition', 
          desc: 'What are we trying to learn about?',
          example: 'All possible customer transactions, All medical images of disease X'
        },
        { 
          label: 'Sampling Frame', 
          desc: 'The accessible subset of the population',
          example: 'Customers who opted in, Images from partnered hospitals'
        },
        { 
          label: 'Measurement Process', 
          desc: 'How observations are recorded and stored',
          example: 'Database logs, Image capture protocols, Sensor readings'
        }
      ]
    },
    {
      type: 'gapConcept',
      title: 'The Critical Gap: Population vs. Sampling Frame',
      concept: 'In AI, there is almost always a gap between what we want to learn about (population) and what we can access (sampling frame)',
      examples: [
        {
          population: 'All human faces globally',
          frame: 'Celebrity photos on internet',
          gap: 'Missing: Underrepresented ethnicities, ages, non-public individuals',
          impact: 'Facial recognition fails on demographics not in training data'
        },
        {
          population: 'All English language usage',
          frame: 'Wikipedia + news articles',
          gap: 'Missing: Colloquial speech, dialects, evolving slang',
          impact: 'NLP models struggle with informal or regional language'
        },
        {
          population: 'All credit default patterns',
          frame: 'Historical bank records',
          gap: 'Missing: Unbanked populations, new economic conditions',
          impact: 'Credit models exclude valid borrowers, fail in crises'
        }
      ],
      insight: 'Understanding this gap is the first step to mitigating its impact'
    },
    {
      type: 'technique',
      title: 'Technique 1: Observational Data Collection',
      subtitle: 'Recording naturally occurring data without intervention',
      characteristics: [
        'Passive collection - no manipulation of environment',
        'Data reflects natural behavior/processes',
        'Often large-scale and cost-effective',
        'Risk of selection bias from accessibility constraints'
      ],
      aiApplications: [
        { domain: 'Natural Language Processing', example: 'Web scraping for text corpora, social media sentiment' },
        { domain: 'Anomaly Detection', example: 'Server logs, network traffic monitoring' },
        { domain: 'IoT & Predictive Maintenance', example: 'Sensor data from equipment' },
        { domain: 'User Behavior Analysis', example: 'Clickstream data, app usage patterns' }
      ],
      detailedExample: {
        scenario: 'Building a Sentiment Analysis Model',
        process: 'Scrape tweets containing specific hashtags or keywords',
        population: 'All opinions about product/topic',
        reality: 'English speakers, public accounts, active users, specific platforms',
        statisticalIssue: 'Selection bias - excludes non-English, private accounts, lurkers',
        mitigation: 'Acknowledge limitations, diversify sources, weight by demographics'
      }
    },
    {
      type: 'technique',
      title: 'Technique 2: Experimental Data Collection',
      subtitle: 'Controlled manipulation with randomization',
      characteristics: [
        'Active intervention and control',
        'Randomization enables causal inference',
        'High internal validity if done correctly',
        'May have limited external validity'
      ],
      aiApplications: [
        { domain: 'A/B Testing', example: 'Testing recommendation algorithms, UI variations' },
        { domain: 'Medical AI', example: 'Controlled trials for diagnostic systems' },
        { domain: 'Reinforcement Learning', example: 'Simulation environments with controlled parameters' },
        { domain: 'Robotics', example: 'Controlled experiments in lab environments' }
      ],
      detailedExample: {
        scenario: 'Training Medical Diagnosis AI',
        process: 'Randomized controlled trial with diverse patient recruitment',
        population: 'All patients with suspected condition',
        reality: 'Patients from specific hospitals, who consent, meet inclusion criteria',
        statisticalIssue: 'External validity - generalize beyond trial participants?',
        mitigation: 'Multi-site trials, broad inclusion criteria, stratified sampling'
      }
    },
    {
      type: 'technique',
      title: 'Technique 3: Streaming Data Collection',
      subtitle: 'Real-time, continuous data ingestion',
      characteristics: [
        'Continuous, real-time collection',
        'Must handle high velocity and volume',
        'Data distribution may change over time (non-stationarity)',
        'Requires online processing capabilities'
      ],
      aiApplications: [
        { domain: 'Financial Systems', example: 'Trading algorithms, fraud detection' },
        { domain: 'Video Analytics', example: 'Real-time object detection' },
        { domain: 'Network Security', example: 'Intrusion detection, DDoS prevention' },
        { domain: 'Industrial IoT', example: 'Real-time equipment monitoring' }
      ],
      detailedExample: {
        scenario: 'Credit Card Fraud Detection',
        process: 'Continuous stream of transaction data analyzed in real-time',
        population: 'All transaction patterns including evolving fraud tactics',
        reality: 'Historical fraud patterns may not match current/future patterns',
        statisticalIssue: 'Concept drift - fraud patterns change, violates IID assumption',
        mitigation: 'Online learning, sliding windows, drift detection algorithms'
      }
    },
    {
      type: 'technique',
      title: 'Technique 4: Crowdsourced Data Collection',
      subtitle: 'Distributed collection via human annotators',
      characteristics: [
        'Leverages distributed human intelligence',
        'Scalable for large annotation tasks',
        'Variable quality across annotators',
        'Potential for systematic biases'
      ],
      aiApplications: [
        { domain: 'Computer Vision', example: 'Image labeling (ImageNet via Mechanical Turk)' },
        { domain: 'Supervised Learning', example: 'Creating labeled training datasets' },
        { domain: 'Data Validation', example: 'Human-in-the-loop annotation' },
        { domain: 'Rare Event Labeling', example: 'Medical image annotation by radiologists' }
      ],
      detailedExample: {
        scenario: 'Building Facial Recognition Dataset',
        process: 'Crowdworkers label faces by demographics, expressions',
        population: 'Diverse faces across all demographics globally',
        reality: 'Annotator demographics affect labeling, quality varies',
        statisticalIssue: 'Annotator bias, inter-rater disagreement, demographic imbalance',
        mitigation: 'Multiple annotators per sample, quality control, demographic targets'
      }
    },
    {
      type: 'comparison',
      title: 'Comparing Collection Techniques',
      headers: ['Technique', 'Cost', 'Scale', 'Control', 'Main Risk', 'Best For'],
      rows: [
        ['Observational', 'Low', 'Very High', 'Low', 'Selection Bias', 'Large patterns'],
        ['Experimental', 'High', 'Low-Med', 'Very High', 'External Validity', 'Causal inference'],
        ['Streaming', 'Medium', 'Very High', 'Low', 'Concept Drift', 'Real-time systems'],
        ['Crowdsourced', 'Medium', 'High', 'Medium', 'Quality Variance', 'Labeled data']
      ]
    },
    {
      type: 'quality',
      title: 'Data Quality: Five Critical Dimensions',
      subtitle: 'Statistical requirements for AI applications',
      dimensions: [
        {
          name: 'Validity',
          definition: 'Measures what it claims to measure',
          aiContext: 'Features accurately represent concepts the model needs to learn',
          example: 'Image labels correctly identify objects',
          failure: 'Noisy labels cause model to learn wrong patterns'
        },
        {
          name: 'Reliability',
          definition: 'Consistent measurements across time and observers',
          aiContext: 'Same input produces same measurement',
          example: 'Multiple radiologists agree on diagnosis',
          failure: 'High variance in labels confuses model training'
        },
        {
          name: 'Representativeness',
          definition: 'Reflects target population distribution',
          aiContext: 'Training data covers diversity model will encounter',
          example: 'Dataset includes all age groups, ethnicities',
          failure: 'Model fails on underrepresented subgroups'
        },
        {
          name: 'Completeness',
          definition: 'Minimal missing data',
          aiContext: 'Few missing values; missing data mechanism understood',
          example: 'All required features present for most samples',
          failure: 'Biased imputation affects predictions'
        },
        {
          name: 'Timeliness',
          definition: 'Current and relevant for the application',
          aiContext: 'Data reflects current patterns, not obsolete conditions',
          example: 'Recent transaction data, current language usage',
          failure: 'Model learns outdated patterns'
        }
      ]
    },
    {
      type: 'tradeoffs',
      title: 'Real-World Tradeoffs in Data Collection',
      subtitle: 'There are no perfect solutions - only informed choices',
      tradeoffs: [
        {
          dimension: 'Quantity vs. Quality',
          option1: 'Large dataset with noise',
          option2: 'Small dataset with high quality',
          consideration: 'Deep learning needs quantity, but quality matters for critical apps'
        },
        {
          dimension: 'Breadth vs. Depth',
          option1: 'Wide coverage of many scenarios',
          option2: 'Deep coverage of specific cases',
          consideration: 'Generalist models need breadth; specialist models need depth'
        },
        {
          dimension: 'Cost vs. Scale',
          option1: 'Expensive curated data (small)',
          option2: 'Cheap automated collection (large)',
          consideration: 'Often hybrid: Start cheap, augment strategically'
        },
        {
          dimension: 'Speed vs. Thoroughness',
          option1: 'Rapid collection to meet deadline',
          option2: 'Careful, time-intensive collection',
          consideration: 'Iterative approach: Quick first version, improve over time'
        }
      ]
    },
    {
      type: 'bestPractices',
      title: 'Best Practices for AI Data Collection',
      practices: [
        {
          practice: '1. Define Population and Goals Explicitly',
          detail: 'Document target population, use cases, required coverage'
        },
        {
          practice: '2. Understand and Document the Gap',
          detail: 'Explicitly list what populations/scenarios are missing'
        },
        {
          practice: '3. Pilot Before Full Collection',
          detail: 'Collect small sample, train prototype, identify problems early'
        },
        {
          practice: '4. Version Control Your Data',
          detail: 'Use data versioning tools (DVC, Git LFS), timestamp snapshots'
        },
        {
          practice: '5. Collect Metadata',
          detail: 'Record: collection date, source, method, annotator info'
        },
        {
          practice: '6. Plan for Validation',
          detail: 'Separate collection for train/validation/test'
        },
        {
          practice: '7. Monitor Production Data',
          detail: 'Track input distributions, flag anomalies, detect drift'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Part 2 Summary: Data Collection',
      keyPoints: [
        {
          point: 'Statistical framing',
          detail: 'Requires understanding population, sampling frame, and measurement'
        },
        {
          point: 'Population-frame gap',
          detail: 'Gap between what we want to learn and what we can access is inevitable'
        },
        {
          point: 'Four techniques',
          detail: 'Observational, experimental, streaming, crowdsourced - each with tradeoffs'
        },
        {
          point: 'Quality dimensions',
          detail: 'Validity, reliability, representativeness, completeness, timeliness'
        },
        {
          point: 'Informed tradeoffs',
          detail: 'No perfect data collection; make conscious choices'
        },
        {
          point: 'Best practices',
          detail: 'Document everything, pilot early, version control, collect metadata'
        }
      ],
      transition: 'Next: How do we sample from collected data to create training sets?'
    }
  ];

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
    a.download = 'Part2_Data_Collection.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateFullHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Part 2: Data Collection - Concepts & Techniques</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #22863a; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #28a745; font-size: 24px; margin-top: 20px; }
        h3 { color: #333; font-size: 20px; margin-top: 15px; }
        .subtitle { color: #666; font-size: 18px; margin-bottom: 20px; }
        .definition { background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .example { background: #f0f0f0; padding: 15px; border-left: 4px solid #28a745; margin: 15px 0; }
        .box { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0; }
        ul { line-height: 1.8; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background: #22863a; color: white; }
        @media print { .slide { page-break-after: always; } }
    </style>
</head>
<body>
    ${slides.map((slide, idx) => generateSlideHTML(slide, idx + 1)).join('')}
</body>
</html>`;
  };

  const generateSlideHTML = (slide, num) => {
    let content = '';
    switch (slide.type) {
      case 'title':
        content = `<h1 style="text-align: center; margin-top: 100px;">${slide.content.title}</h1>
          <h2 style="text-align: center;">${slide.content.subtitle}</h2>
          <p style="text-align: center;">${slide.content.details}<br>${slide.content.course}</p>`;
        break;
      case 'overview':
        content = `<h1>${slide.title}</h1><p class="subtitle">${slide.duration}</p>
          <ul>${slide.topics.map(t => `<li>${t}</li>`).join('')}</ul>`;
        break;
      case 'definition':
        content = `<h1>${slide.title}</h1><div class="definition">${slide.definition}</div>
          ${slide.components.map(c => `<div class="box"><h3>${c.label}</h3><p>${c.desc}</p><p><em>${c.example}</em></p></div>`).join('')}`;
        break;
      default:
        content = `<h1>${slide.title || 'Slide'}</h1><p>Content for ${slide.type}</p>`;
    }
    return `<div class="slide">${content}</div>`;
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-600 to-green-800 text-white p-12">
            <Database className="w-24 h-24 mb-8" />
            <h1 className="text-5xl font-bold mb-4 text-center">{slide.content.title}</h1>
            <div className="h-1 w-32 bg-white mb-6"></div>
            <p className="text-2xl mb-3 font-semibold">{slide.content.subtitle}</p>
            <p className="text-xl opacity-90 mb-2">{slide.content.details}</p>
            <p className="text-lg opacity-80">{slide.content.course}</p>
          </div>
        );

      case 'overview':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-3 text-green-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {slide.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <span className="text-green-600 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'definition':
        return (
          <div className="p-12 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-6 text-green-800">{slide.title}</h2>
            <div className="bg-green-100 p-6 rounded-lg mb-6 border-2 border-green-300">
              <p className="text-xl font-semibold text-green-900">{slide.definition}</p>
            </div>
            <div className="space-y-4">
              {slide.components.map((comp, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-200 p-5 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{comp.label}</h3>
                  <p className="text-lg text-gray-700 mb-2">{comp.desc}</p>
                  <p className="text-base text-gray-600 italic">Example: {comp.example}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gapConcept':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-green-800">{slide.title}</h2>
            <div className="bg-yellow-100 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
              <p className="text-lg font-semibold text-yellow-900">{slide.concept}</p>
            </div>
            <div className="space-y-4">
              {slide.examples.map((ex, idx) => (
                <div key={idx} className="bg-white border-2 border-orange-300 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Population</p>
                      <p className="text-base">{ex.population}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Sampling Frame</p>
                      <p className="text-base">{ex.frame}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2"><span className="font-semibold text-red-700">Gap:</span> {ex.gap}</p>
                  <p className="text-sm"><span className="font-semibold text-blue-700">Impact:</span> {ex.impact}</p>
                </div>
              ))}
            </div>
            <div className="bg-green-100 p-4 rounded-lg mt-4">
              <p className="text-lg font-semibold text-green-900">💡 {slide.insight}</p>
            </div>
          </div>
        );

      case 'technique':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-green-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            
            <h3 className="text-xl font-bold mb-3 text-gray-800">Characteristics:</h3>
            <ul className="space-y-2 mb-4">
              {slide.characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start text-base">
                  <span className="text-green-600 mr-3">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold mb-3 text-gray-800">AI Applications:</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {slide.aiApplications.map((app, idx) => (
                <div key={idx} className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <p className="font-semibold text-sm text-blue-900">{app.domain}</p>
                  <p className="text-xs text-gray-700">{app.example}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-gray-800">Example: {slide.detailedExample.scenario}</h3>
              <p className="text-sm mb-1"><span className="font-semibold">Process:</span> {slide.detailedExample.process}</p>
              <p className="text-sm mb-1"><span className="font-semibold">Population:</span> {slide.detailedExample.population}</p>
              <p className="text-sm mb-1"><span className="font-semibold">Reality:</span> {slide.detailedExample.reality}</p>
              <p className="text-sm mb-1 text-red-700"><span className="font-semibold">Issue:</span> {slide.detailedExample.statisticalIssue}</p>
              <p className="text-sm text-green-700"><span className="font-semibold">Mitigation:</span> {slide.detailedExample.mitigation}</p>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-6 text-green-800">{slide.title}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-700 text-white">
                  {slide.headers.map((header, idx) => (
                    <th key={idx} className="p-3 text-left text-sm">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="p-3 text-sm border-b border-gray-200">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'quality':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-green-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-3">
              {slide.dimensions.map((dim, idx) => (
                <div key={idx} className="bg-white border-l-4 border-green-500 p-4 rounded shadow-sm">
                  <h3 className="text-lg font-bold text-green-900 mb-1">{idx + 1}. {dim.name}</h3>
                  <p className="text-sm mb-1"><span className="font-semibold">Definition:</span> {dim.definition}</p>
                  <p className="text-sm mb-1"><span className="font-semibold">AI Context:</span> {dim.aiContext}</p>
                  <p className="text-xs text-gray-600 mb-1"><em>Example: {dim.example}</em></p>
                  <p className="text-xs text-red-700"><strong>Failure:</strong> {dim.failure}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tradeoffs':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-green-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="space-y-4">
              {slide.tradeoffs.map((trade, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-300 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{trade.dimension}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-semibold text-blue-900">Option A</p>
                      <p className="text-sm">{trade.option1}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="text-sm font-semibold text-orange-900">Option B</p>
                      <p className="text-sm">{trade.option2}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Consider:</span> {trade.consideration}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bestPractices':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-green-800">{slide.title}</h2>
            <div className="space-y-3">
              {slide.practices.map((prac, idx) => (
                <div key={idx} className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <h3 className="text-lg font-bold text-green-900 mb-2">{prac.practice}</h3>
                  <p className="text-base text-gray-700">{prac.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-10 h-full flex flex-col bg-gradient-to-br from-green-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-green-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-green-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-green-900 mb-2">{idx + 1}. {kp.point}</h3>
                  <p className="text-lg text-gray-700">{kp.detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-100 border-2 border-blue-500 p-5 rounded-lg mt-auto">
              <p className="text-xl font-semibold text-center text-blue-900">➡️ {slide.transition}</p>
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
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 2: Data Collection - Concepts & Techniques</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={downloadAsHTML}
            className="flex items-center px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <Download className="w-5 h-5 mr-2" />
            Download HTML
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
              currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-700'
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
            