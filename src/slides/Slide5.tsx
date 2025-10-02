import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Sparkles, FileText } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Introduction to Synthetic Data',
        subtitle: 'Part 5: When Real Data Is Not Enough',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Part 5 Overview',
      duration: '6 minutes',
      topics: [
        'What is synthetic data from a statistical perspective',
        'Five key scenarios when synthetic data is necessary',
        'Benefits and limitations of synthetic data',
        'Statistical requirements for valid synthetic data',
        'Validation approaches',
        'Ethical considerations and risks'
      ]
    },
    {
      type: 'definition',
      title: 'Synthetic Data: Statistical Definition',
      definition: 'Artificially generated data that preserves statistical properties of real data',
      mathematicalGoal: "Create X' ~ P'(X) where P'(X) ≈ P(X) for task-relevant properties",
      keyInsight: "We don't need real data; we need data with the right statistical properties for learning",
      properties: [
        {
          property: 'Statistical Fidelity',
          description: 'Matches real data distributions for relevant features',
          measure: 'Distribution distance metrics (K-S, MMD, Wasserstein)'
        },
        {
          property: 'Diversity',
          description: 'Covers the full range of real data variability',
          measure: 'Coverage of feature space, inter-sample distances'
        },
        {
          property: 'Privacy Preservation',
          description: 'Does not leak individual real data points',
          measure: 'Membership inference attack success rate'
        },
        {
          property: 'Utility',
          description: 'Enables effective model training for intended task',
          measure: 'Downstream model performance on real test data'
        }
      ]
    },
    {
      type: 'whySynthetic',
      title: 'Why Synthetic Data? Five Key Scenarios',
      scenarios: [
        {
          number: 1,
          scenario: 'Insufficient Real Data',
          icon: '📊',
          problem: 'Not enough real samples, especially for rare events',
          example: 'Rare disease diagnosis: Only 100 real cases exist globally',
          statisticalIssue: 'Cannot estimate P(X|Y) reliably with n=100',
          syntheticSolution: 'Generate synthetic examples of rare disease presentations',
          benefit: 'Increase effective sample size, improve model robustness',
          caveat: 'Synthetic examples must not introduce unrealistic patterns'
        },
        {
          number: 2,
          scenario: 'Privacy Constraints',
          icon: '🔒',
          problem: 'Real data contains sensitive personal information',
          example: 'Medical records: Patient diagnosis, treatment, outcomes',
          statisticalIssue: 'Direct use violates privacy (can re-identify individuals)',
          syntheticSolution: 'Generate statistically similar but non-identifiable data',
          benefit: 'Enables research and development while protecting privacy',
          caveat: 'Must ensure synthetic data does not memorize training examples'
        },
        {
          number: 3,
          scenario: 'Bias in Real Data',
          icon: '⚖️',
          problem: 'Historical data reflects discriminatory practices',
          example: 'Hiring data: Historical gender/racial bias in decisions',
          statisticalIssue: 'Real P(X,Y) is biased, reflects societal discrimination',
          syntheticSolution: 'Generate synthetic data from debiased distribution P\'(X,Y)',
          benefit: 'Train fair models that do not perpetuate historical bias',
          caveat: 'Defining "debiased" distribution requires careful ethical consideration'
        },
        {
          number: 4,
          scenario: 'Cost & Accessibility',
          icon: '💰',
          problem: 'Data collection or labeling is prohibitively expensive',
          example: 'Medical image annotation: $100-500 per image by radiologists',
          statisticalIssue: 'Budget constrains sample size n, limiting statistical power',
          syntheticSolution: 'Generate synthetic labeled examples to augment real data',
          benefit: 'Achieve desired performance with lower labeling cost',
          caveat: 'Quality of synthetic data must justify cost savings'
        },
        {
          number: 5,
          scenario: 'Edge Cases & Safety',
          icon: '🚗',
          problem: 'Cannot ethically or safely create real scenarios',
          example: 'Autonomous vehicle: Testing crash scenarios, extreme weather',
          statisticalIssue: 'Cannot sample from dangerous regions of distribution',
          syntheticSolution: 'Simulate rare and dangerous scenarios in controlled environment',
          benefit: 'Test system behavior without risk to humans',
          caveat: 'Sim-to-real gap - synthetic may not perfectly match reality'
        }
      ]
    },
    {
      type: 'realVsSynthetic',
      title: 'Real Data vs. Synthetic Data: Comparison',
      dimensions: [
        {
          dimension: 'Cost',
          real: 'High (collection, labeling, storage)',
          synthetic: 'Variable (generation cost depends on method)',
          winner: 'Synthetic (often)',
          notes: 'Simple synthetic methods cheap; complex (GANs) expensive'
        },
        {
          dimension: 'Privacy',
          real: 'Low (contains sensitive information)',
          synthetic: 'High (if generated properly)',
          winner: 'Synthetic',
          notes: 'Synthetic can be privacy-preserving by design'
        },
        {
          dimension: 'Fidelity',
          real: 'Perfect (by definition)',
          synthetic: 'Imperfect (approximation)',
          winner: 'Real',
          notes: 'Synthetic always an approximation of real distribution'
        },
        {
          dimension: 'Scale',
          real: 'Limited (by collection capacity)',
          synthetic: 'Unlimited (generate as needed)',
          winner: 'Synthetic',
          notes: 'Can generate millions of synthetic samples cheaply'
        },
        {
          dimension: 'Bias',
          real: 'Reflects real-world bias',
          synthetic: 'Can be debiased (if done carefully)',
          winner: 'Depends',
          notes: 'Synthetic can reduce bias or introduce new biases'
        },
        {
          dimension: 'Rare Events',
          real: 'Difficult to obtain',
          synthetic: 'Can be oversampled',
          winner: 'Synthetic',
          notes: 'Synthetic enables controlled sampling of rare events'
        },
        {
          dimension: 'Validity',
          real: 'Ground truth',
          synthetic: 'Requires validation',
          winner: 'Real',
          notes: 'Synthetic must be validated against real data'
        }
      ]
    },
    {
      type: 'statisticalRequirements',
      title: 'Statistical Requirements for Valid Synthetic Data',
      subtitle: 'What makes synthetic data "good enough"?',
      requirements: [
        {
          requirement: 'Distributional Similarity',
          description: 'Marginal and joint distributions match real data',
          mathematicalCondition: 'P_synthetic(X) ≈ P_real(X) for task-relevant features',
          testingMethods: [
            'Two-sample tests: Kolmogorov-Smirnov, Mann-Whitney',
            'Maximum Mean Discrepancy (MMD)',
            'Wasserstein distance',
            'Visual: Q-Q plots, histograms'
          ],
          threshold: 'No universal threshold - depends on application'
        },
        {
          requirement: 'Statistical Moments',
          description: 'Mean, variance, correlations preserved',
          mathematicalCondition: 'E[X_synthetic] ≈ E[X_real], Cov(X_synthetic) ≈ Cov(X_real)',
          testingMethods: [
            'Compare sample statistics',
            'Correlation matrix comparison',
            'Covariance structure analysis'
          ],
          threshold: 'Typically within 5-10% for means, correlations'
        },
        {
          requirement: 'Feature Relationships',
          description: 'Dependencies between features maintained',
          mathematicalCondition: 'Conditional distributions P(X_i|X_j) preserved',
          testingMethods: [
            'Mutual information',
            'Conditional independence tests',
            'Predictive modeling (predict features from others)'
          ],
          threshold: 'Application-specific'
        },
        {
          requirement: 'Downstream Utility',
          description: 'Models trained on synthetic perform well on real test',
          mathematicalCondition: 'Performance(Model_synthetic, Test_real) ≈ Performance(Model_real, Test_real)',
          testingMethods: [
            'Train on synthetic, test on real',
            'Compare to baseline trained on real',
            'Measure performance gap'
          ],
          threshold: 'Within 90-95% of real-data performance (rule of thumb)'
        },
        {
          requirement: 'Privacy Preservation',
          description: 'Cannot reconstruct or identify real individuals',
          mathematicalCondition: 'Low success rate for membership inference attacks',
          testingMethods: [
            'Membership inference attacks',
            'Attribute inference attacks',
            'Nearest neighbor analysis'
          ],
          threshold: 'Attack success ≤ random guessing + small margin'
        }
      ]
    },
    {
      type: 'validation',
      title: 'Validating Synthetic Data: A Framework',
      levels: [
        {
          level: 'Level 1: Visual Inspection',
          purpose: 'Quick sanity check',
          methods: [
            'Plot distributions side-by-side (real vs synthetic)',
            'Scatter plots for feature pairs',
            'Correlation heatmaps',
            'Sample individual examples'
          ],
          pros: 'Fast, intuitive, catches obvious issues',
          cons: 'Subjective, misses subtle problems, does not scale'
        },
        {
          level: 'Level 2: Statistical Tests',
          purpose: 'Quantitative distributional comparison',
          methods: [
            'Two-sample tests (K-S, chi-square)',
            'Compare moments (mean, variance, skewness, kurtosis)',
            'Correlation structure comparison',
            'Maximum Mean Discrepancy (MMD)'
          ],
          pros: 'Objective, quantitative, standard methodology',
          cons: 'May reject for trivial differences, multiple testing issues'
        },
        {
          level: 'Level 3: Machine Learning Utility',
          purpose: 'Test downstream task performance',
          methods: [
            'Train Real, Test Real (baseline)',
            'Train Synthetic, Test Real (primary test)',
            'Train Synthetic+Real, Test Real (augmentation test)',
            'Compare performance metrics'
          ],
          pros: 'Directly measures what matters - task performance',
          cons: 'Expensive, task-specific, confounded by model choice'
        },
        {
          level: 'Level 4: Privacy Auditing',
          purpose: 'Ensure privacy preservation',
          methods: [
            'Membership inference: Can attacker tell if sample was in training?',
            'Attribute inference: Can attacker infer sensitive attributes?',
            'Nearest neighbor distance: Are synthetic samples too close to real?',
            'Reconstruction attacks'
          ],
          pros: 'Critical for privacy-sensitive applications',
          cons: 'Adversarial - attacker may find new attacks'
        }
      ],
      recommendedApproach: 'Use all four levels in sequence: Visual → Statistical → ML Utility → Privacy'
    },
    {
      type: 'tradeoffs',
      title: 'The Fundamental Tradeoffs',
      tradeoffs: [
        {
          tradeoff: 'Fidelity vs. Privacy',
          description: 'More realistic synthetic data may leak more information',
          leftExtreme: 'Perfect fidelity = Copy real data',
          rightExtreme: 'Perfect privacy = Random noise',
          sweetSpot: 'Differential privacy provides formal guarantee',
          example: 'GANs can memorize training examples if not careful',
          mitigation: 'Add noise during generation, limit model capacity'
        },
        {
          tradeoff: 'Diversity vs. Quality',
          description: 'Can generate many samples, but quality may suffer',
          leftExtreme: 'High diversity = Include unrealistic samples',
          rightExtreme: 'High quality = Mode collapse, limited variety',
          sweetSpot: 'Balance through regularization and evaluation',
          example: 'GANs may produce diverse but low-quality images',
          mitigation: 'Multiple quality metrics, rejection sampling'
        },
        {
          tradeoff: 'Complexity vs. Control',
          description: 'Complex models generate better data but are harder to control',
          leftExtreme: 'Simple (parametric) = Easy to control, limited realism',
          rightExtreme: 'Complex (deep learning) = Realistic, hard to control',
          sweetSpot: 'Match complexity to application needs',
          example: 'Simple distribution sampling vs. GANs',
          mitigation: 'Start simple, add complexity only if needed'
        }
      ]
    },
    {
      type: 'ethics',
      title: 'Ethical Considerations & Risks',
      considerations: [
        {
          issue: 'Bias Amplification',
          description: 'Synthetic data generation can amplify biases present in training data',
          example: 'GAN trained on biased data may generate even more biased samples',
          risk: 'Perpetuate and worsen discrimination',
          mitigation: [
            'Audit training data for bias before generation',
            'Test synthetic data for demographic parity',
            'Use fairness constraints during generation'
          ]
        },
        {
          issue: 'Deepfakes & Misinformation',
          description: 'High-quality synthetic media can be used for deception',
          example: 'Synthetic faces, voices, videos indistinguishable from real',
          risk: 'Fraud, impersonation, propaganda, erosion of trust',
          mitigation: [
            'Watermarking synthetic content',
            'Disclosure requirements',
            'Detection tools for synthetic media',
            'Legal frameworks for misuse'
          ]
        },
        {
          issue: 'Privacy Paradox',
          description: 'Synthetic data aims to preserve privacy but may fail',
          example: 'GANs can memorize and reproduce training examples',
          risk: 'Privacy breach despite synthetic data promise',
          mitigation: [
            'Differential privacy in generation',
            'Membership inference testing',
            'K-anonymity checks',
            'Regular privacy audits'
          ]
        },
        {
          issue: 'False Sense of Security',
          description: 'Users may over-trust synthetic data quality',
          example: 'Deploy model trained on synthetic without adequate validation',
          risk: 'Poor real-world performance, safety issues',
          mitigation: [
            'Rigorous validation requirements',
            'Transparency about limitations',
            'Always test on real data before deployment'
          ]
        },
        {
          issue: 'Transparency & Disclosure',
          description: 'Users and affected parties should know when synthetic data is used',
          example: 'Research using synthetic medical data should disclose this',
          risk: 'Misinterpretation of results, replication issues',
          mitigation: [
            'Clear documentation',
            'Disclosure in publications and products',
            'Synthetic data registry'
          ]
        }
      ]
    },
    {
      type: 'whenToUse',
      title: 'Decision Framework: When to Use Synthetic Data',
      decisionTree: [
        {
          question: 'Is real data sufficient in quantity and quality?',
          yes: 'Use real data - no need for synthetic',
          no: 'Continue to next question'
        },
        {
          question: 'Is there a specific limitation preventing real data use?',
          options: [
            { limitation: 'Privacy concerns', recommendation: 'Synthetic data is strong candidate' },
            { limitation: 'Insufficient rare events', recommendation: 'Synthetic augmentation useful' },
            { limitation: 'High labeling cost', recommendation: 'Consider synthetic + active learning' },
            { limitation: 'Safety constraints', recommendation: 'Simulation-based synthetic' },
            { limitation: 'Bias in real data', recommendation: 'Synthetic can help if debiasing is possible' }
          ]
        },
        {
          question: 'Can you validate synthetic data quality?',
          yes: 'Continue to next question',
          no: 'High risk - proceed with caution or avoid'
        },
        {
          question: 'Are the stakes high (safety, healthcare, finance)?',
          yes: 'Require extensive validation, consider hybrid real+synthetic',
          no: 'Lower bar for synthetic data, but still validate'
        },
        {
          question: 'Do you have expertise in synthetic data generation?',
          yes: 'Proceed with appropriate method',
          no: 'Start with simple methods or get expert consultation'
        }
      ],
      generalGuidance: [
        'Start with real data whenever possible',
        'Use synthetic as augmentation, not replacement',
        'Always validate on real data',
        'Document synthetic data use transparently',
        'Monitor performance in production'
      ]
    },
    {
      type: 'bestPractices',
      title: 'Best Practices for Synthetic Data',
      practices: [
        {
          category: 'Generation',
          practices: [
            'Start with simplest method that might work',
            'Use real data to guide generation process',
            'Generate more data than needed, filter for quality',
            'Document generation process and parameters'
          ]
        },
        {
          category: 'Validation',
          practices: [
            'Use multiple validation methods (visual, statistical, ML utility)',
            'Always test on real held-out data',
            'Compare to real-data baseline',
            'Test for privacy leakage'
          ]
        },
        {
          category: 'Usage',
          practices: [
            'Prefer hybrid: real + synthetic',
            'Weight real data more heavily if combined',
            'Monitor performance on real data over time',
            'Have fallback to real data if synthetic fails'
          ]
        },
        {
          category: 'Ethics',
          practices: [
            'Audit for bias before and after generation',
            'Disclose synthetic data use',
            'Watermark synthetic media',
            'Follow data protection regulations'
          ]
        },
        {
          category: 'Documentation',
          practices: [
            'Create datasheet for synthetic dataset',
            'Document known limitations',
            'Specify intended uses and non-uses',
            'Version control synthetic data'
          ]
        }
      ]
    },
    {
      type: 'summary',
      title: 'Part 5 Summary: Introduction to Synthetic Data',
      keyPoints: [
        {
          point: 'Definition',
          detail: 'Synthetic data preserves statistical properties of real data without being real'
        },
        {
          point: 'Five key scenarios',
          detail: 'Insufficient data, privacy, bias, cost, and safety are main drivers'
        },
        {
          point: 'Statistical requirements',
          detail: 'Must match distributions, preserve relationships, enable downstream utility'
        },
        {
          point: 'Validation is critical',
          detail: 'Use visual, statistical, ML utility, and privacy auditing approaches'
        },
        {
          point: 'Fundamental tradeoffs',
          detail: 'Fidelity vs. privacy, diversity vs. quality, complexity vs. control'
        },
        {
          point: 'Ethical considerations',
          detail: 'Bias amplification, deepfakes, privacy risks require careful management'
        },
        {
          point: 'Decision framework',
          detail: 'Use synthetic when real data is insufficient, but always validate thoroughly'
        }
      ],
      transition: 'Next: What are the specific techniques for generating synthetic data?'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const downloadAsPDF = () => {
    // Create print-friendly version
    window.print();
  };

  const downloadAsHTML = () => {
    const htmlContent = generateFullHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Part5_Introduction_Synthetic_Data.html';
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
    <title>Part 5: Introduction to Synthetic Data</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #7c3aed; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #8b5cf6; font-size: 24px; margin-top: 20px; }
        h3 { color: #333; font-size: 20px; margin-top: 15px; }
        .subtitle { color: #666; font-size: 18px; margin-bottom: 20px; }
        .box { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0; }
        ul { line-height: 1.8; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background: #7c3aed; color: white; }
        @media print { .slide { page-break-after: always; } body { background: white; } }
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
      default:
        content = `<h1>${slide.title || 'Slide'}</h1><p>Content for ${slide.type}</p>`;
    }
    return `<div class="slide">${content}</div>`;
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-violet-600 to-purple-800 text-white p-12">
            <Sparkles className="w-24 h-24 mb-8" />
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
            <h2 className="text-4xl font-bold mb-3 text-violet-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {slide.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start bg-violet-50 p-4 rounded-lg border-l-4 border-violet-500">
                  <span className="text-violet-600 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'definition':
        return (
          <div className="p-12 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="bg-violet-100 p-6 rounded-lg mb-4 border-2 border-violet-300">
              <p className="text-xl font-semibold text-violet-900 mb-3">{slide.definition}</p>
              <p className="font-mono text-base bg-white p-3 rounded mb-3">{slide.mathematicalGoal}</p>
              <p className="text-lg text-green-800">💡 {slide.keyInsight}</p>
            </div>
            <div className="space-y-3">
              {slide.properties.map((prop, idx) => (
                <div key={idx} className="bg-white border-l-4 border-violet-500 p-4 rounded">
                  <h3 className="text-lg font-bold text-violet-900 mb-2">{prop.property}</h3>
                  <p className="text-base mb-2">{prop.description}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Measure:</span> {prop.measure}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'whySynthetic':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-white border-2 border-violet-200 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="bg-violet-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      {scenario.number}
                    </div>
                    <span className="text-3xl mr-2">{scenario.icon}</span>
                    <h3 className="text-xl font-bold text-violet-900">{scenario.scenario}</h3>
                  </div>
                  <p className="text-sm mb-2"><span className="font-semibold text-red-700">Problem:</span> {scenario.problem}</p>
                  <p className="text-xs mb-2"><em>Example: {scenario.example}</em></p>
                  <p className="text-xs mb-2"><span className="font-semibold">Statistical Issue:</span> {scenario.statisticalIssue}</p>
                  <p className="text-xs mb-2 text-green-700"><span className="font-semibold">Synthetic Solution:</span> {scenario.syntheticSolution}</p>
                  <p className="text-xs mb-2 text-blue-700"><span className="font-semibold">Benefit:</span> {scenario.benefit}</p>
                  <p className="text-xs text-orange-700"><span className="font-semibold">⚠️ Caveat:</span> {scenario.caveat}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'realVsSynthetic':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-3">
              {slide.dimensions.map((dim, idx) => (
                <div key={idx} className="bg-white border p-3 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800">{dim.dimension}</h3>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      dim.winner === 'Real' ? 'bg-blue-100 text-blue-800' :
                      dim.winner === 'Synthetic' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      Winner: {dim.winner}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-2 text-sm">
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-semibold text-blue-900">Real:</p>
                      <p>{dim.real}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="font-semibold text-green-900">Synthetic:</p>
                      <p>{dim.synthetic}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 italic">{dim.notes}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'statisticalRequirements':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-violet-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="space-y-4">
              {slide.requirements.map((req, idx) => (
                <div key={idx} className="bg-white border-l-4 border-violet-500 p-4 rounded">
                  <h3 className="text-lg font-bold text-violet-900 mb-2">{req.requirement}</h3>
                  <p className="text-sm mb-2">{req.description}</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded mb-2">{req.mathematicalCondition}</p>
                  <div className="mb-2">
                    <p className="text-xs font-semibold mb-1">Testing Methods:</p>
                    <ul className="ml-4">
                      {req.testingMethods.map((method, mIdx) => (
                        <li key={mIdx} className="text-xs">• {method}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-blue-700"><strong>Threshold:</strong> {req.threshold}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'validation':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.levels.map((level, idx) => (
                <div key={idx} className="bg-white border-2 border-violet-300 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-violet-900 mb-2">{level.level}</h3>
                  <p className="text-sm mb-3 italic">Purpose: {level.purpose}</p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold mb-1">Methods:</p>
                    <ul className="ml-4">
                      {level.methods.map((method, mIdx) => (
                        <li key={mIdx} className="text-xs">• {method}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-green-50 p-2 rounded">
                      <p className="font-semibold text-green-900">Pros:</p>
                      <p>{level.pros}</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <p className="font-semibold text-red-900">Cons:</p>
                      <p>{level.cons}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-100 p-4 rounded-lg mt-4">
              <p className="text-base font-semibold text-blue-900">💡 {slide.recommendedApproach}</p>
            </div>
          </div>
        );

      case 'tradeoffs':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-5">
              {slide.tradeoffs.map((tradeoff, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-300 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{tradeoff.tradeoff}</h3>
                  <p className="text-sm mb-3">{tradeoff.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-red-100 p-2 rounded flex-1 mr-2">
                      <p className="text-xs">{tradeoff.leftExtreme}</p>
                    </div>
                    <span className="text-2xl">↔️</span>
                    <div className="bg-blue-100 p-2 rounded flex-1 ml-2">
                      <p className="text-xs">{tradeoff.rightExtreme}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded mb-2">
                    <p className="text-sm"><strong>Sweet Spot:</strong> {tradeoff.sweetSpot}</p>
                  </div>
                  <p className="text-xs mb-2"><em>Example: {tradeoff.example}</em></p>
                  <p className="text-xs text-violet-700"><strong>Mitigation:</strong> {tradeoff.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ethics':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.considerations.map((consideration, idx) => (
                <div key={idx} className="bg-white border-l-4 border-red-500 p-4 rounded">
                  <h3 className="text-lg font-bold text-red-900 mb-2">{consideration.issue}</h3>
                  <p className="text-sm mb-2">{consideration.description}</p>
                  <p className="text-xs mb-2"><em>Example: {consideration.example}</em></p>
                  <p className="text-sm text-red-700 mb-2"><strong>Risk:</strong> {consideration.risk}</p>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs font-semibold mb-1 text-green-900">Mitigation Strategies:</p>
                    <ul className="ml-4">
                      {consideration.mitigation.map((mit, mIdx) => (
                        <li key={mIdx} className="text-xs">• {mit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'whenToUse':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {slide.decisionTree.map((node, idx) => (
                <div key={idx} className="bg-white border-2 border-violet-300 p-4 rounded-lg">
                  <p className="text-lg font-bold text-violet-900 mb-3">{node.question}</p>
                  {node.yes && (
                    <div className="space-y-2">
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm"><strong>✓ Yes:</strong> {node.yes}</p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded">
                        <p className="text-sm"><strong>✗ No:</strong> {node.no}</p>
                      </div>
                    </div>
                  )}
                  {node.options && (
                    <div className="space-y-2">
                      {node.options.map((option, oIdx) => (
                        <div key={oIdx} className="bg-blue-50 p-3 rounded">
                          <p className="text-sm"><strong>{option.limitation}:</strong> {option.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="font-bold text-yellow-900 mb-2">General Guidance:</p>
              <ul className="ml-4">
                {slide.generalGuidance.map((guidance, idx) => (
                  <li key={idx} className="text-sm">• {guidance}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'bestPractices':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-violet-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.practices.map((category, idx) => (
                <div key={idx} className="bg-white border-2 border-violet-200 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-violet-900 mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.practices.map((practice, pIdx) => (
                      <li key={pIdx} className="flex items-start text-sm">
                        <span className="text-violet-600 mr-3 font-bold">✓</span>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-10 h-full flex flex-col bg-gradient-to-br from-violet-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-violet-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-violet-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-violet-900 mb-2">{idx + 1}. {kp.point}</h3>
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
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .slide-container { 
            box-shadow: none !important;
            margin: 0 !important;
            height: 100vh !important;
            page-break-after: always;
          }
        }
      `}</style>
      
      <div className="flex-1 bg-white shadow-lg mx-8 my-4 rounded-lg overflow-hidden slide-container">
        {renderSlide(slides[currentSlide])}
      </div>
      
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between no-print">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-violet-600 hover:bg-violet-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 5: Introduction to Synthetic Data</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={downloadAsPDF}
            className="flex items-center px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-all"
            title="Print to PDF (Ctrl+P or Cmd+P)"
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
            disabled={currentSlide === slides.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
              currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-violet-600 hover:bg-violet-700'
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