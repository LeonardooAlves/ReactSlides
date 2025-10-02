import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Target, TrendingUp } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Sampling Techniques',
        subtitle: 'Part 3: Theory & Practice',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Part 3 Overview',
      duration: '15 minutes',
      topics: [
        'Why sampling matters critically for AI systems',
        'Core sampling techniques: SRS, Stratified, Cluster, Systematic',
        'AI-specific techniques: Reservoir sampling, Importance sampling',
        'Active learning as adaptive sampling',
        'Statistical properties and trade-offs of each method',
        'Practical implementation considerations'
      ]
    },
    {
      type: 'whySampling',
      title: 'Why Sampling Matters in AI',
      subtitle: 'Four fundamental constraints',
      reasons: [
        {
          constraint: 'Computational Constraint',
          icon: '💻',
          explanation: 'Cannot process entire populations - too large, too expensive',
          example: 'Training on all internet images is impossible; sample strategically',
          impact: 'Sample must preserve patterns needed for learning'
        },
        {
          constraint: 'Cost Constraint',
          icon: '💰',
          explanation: 'Labeling is expensive, especially for specialized domains',
          example: 'Medical image annotation: $100-500 per image by radiologists',
          impact: 'Must maximize information per labeled sample'
        },
        {
          constraint: 'Temporal Constraint',
          icon: '⏰',
          explanation: 'Need training data before full population exists',
          example: 'New product launch - no historical user behavior data yet',
          impact: 'Sample from early adopters, proxy populations'
        },
        {
          constraint: 'Statistical Goal',
          icon: '🎯',
          explanation: 'Sample should preserve population properties relevant to learning',
          example: 'Class distributions, feature correlations, decision boundaries',
          impact: 'Bad sampling = biased models regardless of architecture'
        }
      ],
      keyInsight: 'The goal is not to sample everything, but to sample intelligently'
    },
    {
      type: 'samplingFoundation',
      title: 'Sampling: Statistical Foundation',
      definition: 'Sampling is the process of selecting a subset from a population such that statistical properties can be inferred',
      notation: {
        population: 'N = Population size',
        sample: 'n = Sample size',
        probability: 'P(i ∈ S) = Probability unit i is selected',
        estimator: 'θ̂ = Estimate from sample',
        parameter: 'θ = True population parameter'
      },
      goals: [
        'Unbiased estimation: E[θ̂] = θ',
        'Low variance: Var(θ̂) should be small',
        'Representative: Sample reflects population structure',
        'Efficient: Minimize cost for given precision'
      ]
    },
    {
      type: 'technique',
      number: 1,
      title: 'Simple Random Sampling (SRS)',
      method: 'Each unit has equal probability of selection',
      formula: 'P(i selected) = n/N for all i',
      statisticalProperty: 'Unbiased estimator of population mean: E[ȳ] = μ',
      variance: 'Var(ȳ) = (1 - n/N) × σ²/n',
      advantages: [
        'Simple to implement and understand',
        'Unbiased for population parameters',
        'Foundation for other sampling methods',
        'Well-understood statistical properties'
      ],
      limitations: [
        'May miss rare but important classes',
        'Ignores population structure',
        'Can be inefficient for heterogeneous populations',
        'No guarantee of class balance'
      ],
      aiExample: {
        scenario: 'Training a Spam Email Classifier',
        implementation: 'Randomly sample emails from inbox',
        dataset: '10,000 emails: 9,500 legitimate, 500 spam (5%)',
        srsResult: 'Random sample of 1,000 may get only 40-60 spam emails',
        problem: 'Model trained on 50 spam examples performs poorly on spam detection',
        lesson: 'SRS ignores class imbalance - inadequate for minority classes'
      }
    },
    {
      type: 'technique',
      number: 2,
      title: 'Stratified Sampling',
      method: 'Divide population into strata, sample from each stratum',
      formula: 'Sample nh from stratum h (h = 1, ..., H)',
      statisticalProperty: 'Variance reduction when strata are homogeneous within',
      variance: 'Var(ȳst) ≤ Var(ȳsrs) when within-stratum variance is low',
      advantages: [
        'Ensures representation of all subgroups',
        'Reduces variance if strata are homogeneous',
        'Guarantees minimum samples per class',
        'Can use different sampling rates per stratum'
      ],
      limitations: [
        'Requires knowing strata in advance',
        'More complex to implement',
        'Need to define meaningful strata',
        'May miss interactions between strata'
      ],
      aiExample: {
        scenario: 'Image Classification with Imbalanced Classes',
        implementation: 'Stratify by class label (cats, dogs, birds, etc.)',
        dataset: 'ImageNet subset: 1000 cats, 1000 dogs, 100 rare birds',
        stratifiedApproach: 'Ensure 500 samples per class (oversample birds, undersample cats/dogs)',
        result: 'Model learns all classes well, not just common ones',
        lesson: 'Critical for AI: Prevents model from ignoring minority classes'
      },
      allocation: [
        'Proportional: nh/n = Nh/N (sample proportional to stratum size)',
        'Equal: nh = n/H (equal samples per stratum)',
        'Optimal: Minimize variance given cost constraints',
        'AI typical: Equal or minimum per class to ensure learning'
      ]
    },
    {
      type: 'technique',
      number: 3,
      title: 'Cluster Sampling',
      method: 'Randomly select groups (clusters), sample all or some units within',
      formula: 'Select m clusters from M total, sample within selected clusters',
      statisticalProperty: 'Cost-efficient but increases variance if clusters heterogeneous',
      variance: 'Var increases with within-cluster homogeneity (intracluster correlation)',
      advantages: [
        'Reduces data collection costs',
        'Practical when sampling frame unavailable for individuals',
        'Natural when data organized in groups',
        'Efficient for geographically dispersed populations'
      ],
      limitations: [
        'Increases variance if clusters are similar internally',
        'Less efficient than SRS if clusters are homogeneous',
        'Risk of systematic bias if clusters differ',
        'Design effect often > 1 (less efficient than SRS)'
      ],
      aiExample: {
        scenario: 'Medical AI Trained on Hospital Data',
        implementation: 'Sample patients from selected hospitals',
        dataset: 'Cluster = Hospital; Units = Patients',
        approach: 'Select 5 hospitals, use all their patient records',
        risk: 'If hospitals systematically differ (demographics, equipment, protocols)',
        problem: 'Model learns hospital-specific patterns, not disease patterns',
        lesson: 'Cluster sampling can introduce systematic bias in AI'
      }
    },
    {
      type: 'technique',
      number: 4,
      title: 'Systematic Sampling',
      method: 'Select every kth element after random start',
      formula: 'k = N/n (sampling interval), random start r ∈ [1, k]',
      statisticalProperty: 'Equivalent to SRS if list is randomly ordered',
      variance: 'Can be more or less efficient than SRS depending on ordering',
      advantages: [
        'Simple to implement',
        'Spreads sample evenly across population',
        'Easy to explain and audit',
        'Good for quality control applications'
      ],
      limitations: [
        'Severe bias if periodicity matches k',
        'Cannot estimate variance without assumptions',
        'Inflexible once k is chosen',
        'Requires ordered list of population'
      ],
      aiExample: {
        scenario: 'Time-Series Data for Forecasting',
        implementation: 'Select every 10th data point to reduce autocorrelation',
        dataset: 'High-frequency sensor data (1 reading/second)',
        approach: 'Sample every 10th reading (1 per 10 seconds)',
        benefit: 'Reduces redundancy from autocorrelated observations',
        risk: 'If data has 10-second cycles, completely miss pattern',
        lesson: 'Check for periodicities before using systematic sampling'
      }
    },
    {
      type: 'advancedTechnique',
      title: 'Reservoir Sampling (AI-Specific)',
      subtitle: 'Maintain random sample from stream without knowing total size',
      algorithm: {
        name: 'Reservoir Sampling Algorithm',
        steps: [
          'Keep first k items in reservoir',
          'For item i > k: include with probability k/i',
          'If included, randomly replace one item in reservoir',
          'Continue until stream ends'
        ],
        guarantee: 'Each item has equal probability k/n of being in final sample'
      },
      properties: {
        space: 'O(k) - only store k items',
        time: 'O(n) - single pass through data',
        randomness: 'Uniform random sample at any point',
        adaptivity: 'Works without knowing n in advance'
      },
      aiExample: {
        scenario: 'Sampling from Twitter Firehose',
        problem: 'Unknown total tweets, continuous stream',
        solution: 'Maintain reservoir of 10,000 tweets',
        process: 'For each new tweet, include with probability 10000/tweets_seen',
        result: 'Always have representative random sample',
        application: 'Real-time trend detection, sentiment analysis'
      }
    },
    {
      type: 'advancedTechnique',
      title: 'Importance Sampling',
      subtitle: 'Sample according to importance, reweight during training',
      concept: 'Sample from proposal distribution q(x), reweight by p(x)/q(x)',
      formula: 'E_p[f(x)] = E_q[f(x) × p(x)/q(x)]',
      purpose: 'Reduce variance of Monte Carlo estimates by focusing on important regions',
      aiApplications: [
        {
          name: 'Hard Example Mining',
          description: 'Oversample examples where model performs poorly',
          example: 'Object detection: Sample images with small objects more frequently',
          benefit: 'Faster convergence, better performance on difficult cases'
        },
        {
          name: 'Rare Event Modeling',
          description: 'Oversample rare but important events',
          example: 'Fraud detection: Sample fraudulent transactions at higher rate',
          benefit: 'Sufficient data to learn rare patterns'
        },
        {
          name: 'Variance Reduction',
          description: 'Sample from regions contributing most to expectation',
          example: 'Reinforcement learning: Sample high-reward trajectories',
          benefit: 'More efficient learning'
        }
      ],
      implementation: {
        step1: 'Define importance function q(x) ∝ importance',
        step2: 'Sample from q(x) instead of uniform',
        step3: 'During training, weight examples by p(x)/q(x)',
        caveat: 'Need good estimate of importance - circular problem'
      }
    },
    {
      type: 'advancedTechnique',
      title: 'Active Learning as Adaptive Sampling',
      subtitle: 'Iteratively select most informative samples to label',
      framework: 'Adaptive sampling strategy that uses model feedback',
      process: [
        '1. Train initial model on small labeled dataset',
        '2. Apply model to unlabeled pool',
        '3. Select most informative examples (high uncertainty, disagreement)',
        '4. Get human labels for selected examples',
        '5. Add to training set, retrain model',
        '6. Repeat until budget exhausted or performance satisfactory'
      ],
      selectionStrategies: [
        {
          name: 'Uncertainty Sampling',
          criterion: 'Select examples where model is most uncertain',
          measure: 'Entropy, margin, least confident',
          example: 'Classification: Select samples near decision boundary'
        },
        {
          name: 'Query by Committee',
          criterion: 'Select examples where ensemble models disagree',
          measure: 'Vote entropy, KL divergence',
          example: 'Train multiple models, label where they disagree'
        },
        {
          name: 'Expected Model Change',
          criterion: 'Select examples that would most change model',
          measure: 'Gradient magnitude, parameter change',
          example: 'Examples that would have largest impact on model weights'
        },
        {
          name: 'Expected Error Reduction',
          criterion: 'Select examples that would most reduce expected error',
          measure: 'Expected future loss',
          example: 'Computationally expensive but theoretically optimal'
        }
      ],
      aiExample: {
        scenario: 'Medical Image Annotation',
        problem: 'Have 100,000 images, can only label 1,000 (budget)',
        baseline: 'Random sampling: Label 1,000 random images',
        activeLearning: 'Start with 100 random, iteratively select 900 most informative',
        result: 'Active learning often achieves same performance with 50-70% fewer labels',
        benefit: 'Massive cost savings in expensive labeling domains'
      }
    },
    {
      type: 'comparison',
      title: 'Sampling Techniques: Comparison',
      headers: ['Technique', 'Complexity', 'Efficiency', 'Use When', 'AI Benefit', 'Main Risk'],
      rows: [
        ['Simple Random', 'Very Low', 'Baseline', 'Homogeneous population', 'Simple baseline', 'Miss rare classes'],
        ['Stratified', 'Medium', 'High', 'Known subgroups', 'Ensures class balance', 'Need to define strata'],
        ['Cluster', 'Low', 'Variable', 'Cost-driven', 'Practical for geo data', 'Cluster bias'],
        ['Systematic', 'Very Low', 'Variable', 'Ordered lists', 'Even coverage', 'Periodicity risk'],
        ['Reservoir', 'Medium', 'High', 'Streaming data', 'Real-time sampling', 'Memory limited'],
        ['Importance', 'High', 'Very High', 'Known importance', 'Focus on hard examples', 'Need good q(x)'],
        ['Active Learning', 'Very High', 'Excellent', 'Expensive labels', 'Minimize labeling cost', 'Computational cost']
      ]
    },
    {
      type: 'practicalConsiderations',
      title: 'Practical Implementation Considerations',
      considerations: [
        {
          aspect: 'Train/Validation/Test Split',
          importance: 'Critical for unbiased evaluation',
          guidelines: [
            'Typical split: 70/15/15 or 80/10/10',
            'Use stratified sampling for split to maintain class balance',
            'Test set must be completely held out - never used in training',
            'Validation set for hyperparameter tuning',
            'For time series: Temporal split (train on past, test on future)'
          ],
          common_mistakes: [
            'Data leakage: Test data used in feature engineering',
            'Information leakage: Future data influences past predictions',
            'Unrepresentative test set: Not sampled from deployment distribution'
          ]
        },
        {
          aspect: 'Imbalanced Data Handling',
          importance: 'Central to many real-world AI applications',
          techniques: [
            'Stratified sampling: Ensure minimum representation',
            'Oversampling minority: Duplicate minority class examples',
            'Undersampling majority: Reduce majority class examples',
            'SMOTE: Synthetic minority oversampling (interpolate between examples)',
            'Class weights: Penalize minority class errors more heavily in loss'
          ],
          decision_factors: [
            'Degree of imbalance (2:1 vs 100:1)',
            'Absolute minority class size (1000 samples vs 10 samples)',
            'Cost of errors (false positive vs false negative)',
            'Available computational resources'
          ]
        },
        {
          aspect: 'Sample Size Determination',
          importance: 'Balance between performance and cost',
          rules_of_thumb: [
            'Traditional ML: 10x features per class minimum',
            'Deep learning: 1000+ per class for decent performance',
            'Rule of thumb: More complex model = more data needed',
            'Learning curves: Plot performance vs. sample size to guide'
          ],
          statistical_approach: [
            'Power analysis: Determine n for desired statistical power',
            'Confidence intervals: Achieve desired precision',
            'Effect size: Larger effect = smaller n needed',
            'For AI: Often data-driven - collect until performance plateaus'
          ]
        },
        {
          aspect: 'Sampling from Multiple Sources',
          importance: 'Common in real-world data pipelines',
          challenges: [
            'Different distributions across sources',
            'Different quality levels',
            'Different costs per sample',
            'Different update frequencies'
          ],
          strategies: [
            'Stratify by source to ensure representation',
            'Weight by source quality/importance',
            'Monitor per-source performance',
            'Adaptive sampling: Adjust rates based on performance'
          ]
        }
      ]
    },
    {
      type: 'bestPractices',
      title: 'Best Practices for Sampling in AI',
      practices: [
        {
          practice: 'Always Use Stratified Sampling for Train/Test Split',
          rationale: 'Maintains class distribution, ensures fair evaluation',
          implementation: 'Use sklearn.model_selection.train_test_split with stratify parameter'
        },
        {
          practice: 'Document Your Sampling Strategy',
          rationale: 'Reproducibility, debugging, and auditing require knowing how data was sampled',
          implementation: 'Record: method, parameters, random seed, exclusion criteria'
        },
        {
          practice: 'Check Sample Representativeness',
          rationale: 'Verify sample statistics match population',
          implementation: 'Compare distributions, run statistical tests (K-S, chi-square)'
        },
        {
          practice: 'Use Random Seeds for Reproducibility',
          rationale: 'Different random samples can lead to different model performance',
          implementation: 'Set random seed, version control seed values'
        },
        {
          practice: 'Monitor Sampling Bias',
          rationale: 'Even good sampling methods can introduce bias',
          implementation: 'Analyze errors by subgroup, check for systematic patterns'
        },
        {
          practice: 'Consider Computational Cost',
          rationale: 'Sophisticated sampling may not be worth the overhead',
          implementation: 'Profile sampling code, optimize bottlenecks, cache when possible'
        },
        {
          practice: 'Iterate on Sampling Strategy',
          rationale: 'First attempt rarely optimal',
          implementation: 'Start simple, add complexity only if needed, measure impact'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Part 3 Summary: Sampling Techniques',
      keyPoints: [
        {
          point: 'Sampling is essential',
          detail: 'Cannot process entire populations - must sample intelligently to preserve learnable patterns'
        },
        {
          point: 'Stratified sampling for AI',
          detail: 'Almost always preferred for classification - ensures class balance and representation'
        },
        {
          point: 'Advanced techniques',
          detail: 'Reservoir sampling for streams, importance sampling for hard examples, active learning for expensive labels'
        },
        {
          point: 'Statistical properties matter',
          detail: 'Each technique has trade-offs in bias, variance, and efficiency'
        },
        {
          point: 'Practical considerations',
          detail: 'Train/test split, imbalanced data, sample size, multiple sources all require careful thought'
        },
        {
          point: 'Document and validate',
          detail: 'Always document sampling strategy and validate sample representativeness'
        }
      ],
      transition: 'Next: What are the main challenges in data collection and sampling, and how do we mitigate them?'
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
    a.download = 'Part3_Sampling_Techniques.html';
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
    <title>Part 3: Sampling Techniques - Theory & Practice</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #6f42c1; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #8b5cf6; font-size: 24px; margin-top: 20px; }
        h3 { color: #333; font-size: 20px; margin-top: 15px; }
        .subtitle { color: #666; font-size: 18px; margin-bottom: 20px; }
        .definition { background: #e9d5ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .box { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0; }
        ul { line-height: 1.8; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background: #6f42c1; color: white; }
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
      default:
        content = `<h1>${slide.title || 'Slide'}</h1><p>Content for ${slide.type}</p>`;
    }
    return `<div class="slide">${content}</div>`;
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-600 to-purple-800 text-white p-12">
            <Target className="w-24 h-24 mb-8" />
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
            <h2 className="text-4xl font-bold mb-3 text-purple-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {slide.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <span className="text-purple-600 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'whySampling':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-purple-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="space-y-4">
              {slide.reasons.map((reason, idx) => (
                <div key={idx} className="bg-white border-l-4 border-purple-500 p-4 rounded shadow-sm">
                  <div className="flex items-start mb-2">
                    <span className="text-3xl mr-3">{reason.icon}</span>
                    <h3 className="text-xl font-bold text-purple-900">{reason.constraint}</h3>
                  </div>
                  <p className="text-base mb-2"><span className="font-semibold">Why:</span> {reason.explanation}</p>
                  <p className="text-sm text-gray-700 mb-2"><em>Example: {reason.example}</em></p>
                  <p className="text-sm text-blue-700"><strong>Impact:</strong> {reason.impact}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg mt-4 border-l-4 border-yellow-500">
              <p className="text-lg font-semibold text-yellow-900">🎯 {slide.keyInsight}</p>
            </div>
          </div>
        );

      case 'samplingFoundation':
        return (
          <div className="p-12 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4 text-purple-800">{slide.title}</h2>
            <div className="bg-purple-100 p-6 rounded-lg mb-6">
              <p className="text-lg font-semibold text-purple-900">{slide.definition}</p>
            </div>
            <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Key Notation:</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(slide.notation).map(([key, value], idx) => (
                  <div key={idx} className="font-mono text-sm bg-gray-50 p-2 rounded">
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-800">Statistical Goals:</h3>
              {slide.goals.map((goal, idx) => (
                <div key={idx} className="flex items-start bg-green-50 p-3 rounded">
                  <span className="text-green-600 mr-3 font-bold">✓</span>
                  <p className="text-base">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technique':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">
                {slide.number}
              </div>
              <h2 className="text-3xl font-bold text-purple-800">{slide.title}</h2>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2"><span className="text-purple-800">Method:</span> {slide.method}</p>
              <p className="text-base font-mono bg-white p-3 rounded mb-2">{slide.formula}</p>
              <p className="text-base"><span className="font-semibold">Property:</span> {slide.statisticalProperty}</p>
              {slide.variance && <p className="text-sm text-gray-700 mt-2">{slide.variance}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-bold text-green-800 mb-2">✓ Advantages:</h3>
                <ul className="space-y-1">
                  {slide.advantages.map((adv, idx) => (
                    <li key={idx} className="text-sm">• {adv}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-800 mb-2">⚠ Limitations:</h3>
                <ul className="space-y-1">
                  {slide.limitations.map((lim, idx) => (
                    <li key={idx} className="text-sm">• {lim}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 text-gray-800">AI Example: {slide.aiExample.scenario}</h3>
              <p className="text-sm mb-1"><span className="font-semibold">Implementation:</span> {slide.aiExample.implementation}</p>
              <p className="text-sm mb-1"><span className="font-semibold">Dataset:</span> {slide.aiExample.dataset}</p>
              {slide.aiExample.srsResult && <p className="text-sm mb-1"><span className="font-semibold">SRS Result:</span> {slide.aiExample.srsResult}</p>}
              {slide.aiExample.stratifiedApproach && <p className="text-sm mb-1"><span className="font-semibold">Approach:</span> {slide.aiExample.stratifiedApproach}</p>}
              {slide.aiExample.approach && <p className="text-sm mb-1"><span className="font-semibold">Approach:</span> {slide.aiExample.approach}</p>}
              {slide.aiExample.problem && <p className="text-sm mb-1 text-red-700"><span className="font-semibold">Problem:</span> {slide.aiExample.problem}</p>}
              {slide.aiExample.risk && <p className="text-sm mb-1 text-red-700"><span className="font-semibold">Risk:</span> {slide.aiExample.risk}</p>}
              {slide.aiExample.result && <p className="text-sm mb-1 text-green-700"><span className="font-semibold">Result:</span> {slide.aiExample.result}</p>}
              {slide.aiExample.benefit && <p className="text-sm mb-1 text-green-700"><span className="font-semibold">Benefit:</span> {slide.aiExample.benefit}</p>}
              <p className="text-sm mt-2 font-semibold text-purple-900">💡 {slide.aiExample.lesson}</p>
            </div>

            {slide.allocation && (
              <div className="mt-4 bg-blue-50 p-3 rounded">
                <h3 className="font-bold text-blue-900 mb-2">Allocation Strategies:</h3>
                {slide.allocation.map((alloc, idx) => (
                  <p key={idx} className="text-xs mb-1">• {alloc}</p>
                ))}
              </div>
            )}
          </div>
        );

      case 'advancedTechnique':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-purple-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>

            {slide.algorithm && (
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="font-bold text-purple-900 mb-3">{slide.algorithm.name}</h3>
                <ol className="space-y-2">
                  {slide.algorithm.steps.map((step, idx) => (
                    <li key={idx} className="text-sm">{step}</li>
                  ))}
                </ol>
                <p className="text-sm mt-3 bg-white p-2 rounded"><strong>Guarantee:</strong> {slide.algorithm.guarantee}</p>
              </div>
            )}

            {slide.properties && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(slide.properties).map(([key, value], idx) => (
                  <div key={idx} className="bg-white border p-3 rounded">
                    <p className="font-semibold text-sm text-gray-700 capitalize">{key}:</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.concept && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-base mb-2"><strong>Concept:</strong> {slide.concept}</p>
                {slide.formula && <p className="font-mono text-sm bg-white p-2 rounded">{slide.formula}</p>}
                {slide.purpose && <p className="text-sm mt-2">{slide.purpose}</p>}
              </div>
            )}

            {slide.aiApplications && (
              <div className="space-y-3 mb-4">
                <h3 className="font-bold text-gray-800">AI Applications:</h3>
                {slide.aiApplications.map((app, idx) => (
                  <div key={idx} className="bg-white border-l-4 border-green-500 p-3 rounded">
                    <h4 className="font-bold text-green-900 mb-1">{app.name}</h4>
                    <p className="text-sm mb-1">{app.description}</p>
                    <p className="text-xs text-gray-600 mb-1"><em>Example: {app.example}</em></p>
                    <p className="text-xs text-green-700"><strong>Benefit:</strong> {app.benefit}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.implementation && (
              <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                <h3 className="font-bold text-yellow-900 mb-2">Implementation:</h3>
                {Object.entries(slide.implementation).map(([key, value], idx) => (
                  <p key={idx} className="text-sm mb-1">{key === 'caveat' ? '⚠️ ' : ''}<strong>{key}:</strong> {value}</p>
                ))}
              </div>
            )}

            {slide.process && (
              <div className="bg-white border-2 border-purple-300 p-4 rounded-lg mb-4">
                <h3 className="font-bold text-purple-900 mb-3">Process:</h3>
                <ol className="space-y-2">
                  {slide.process.map((step, idx) => (
                    <li key={idx} className="text-sm">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {slide.selectionStrategies && (
              <div className="space-y-3 mb-4">
                <h3 className="font-bold text-gray-800">Selection Strategies:</h3>
                {slide.selectionStrategies.map((strat, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{strat.name}</h4>
                    <p className="text-xs mb-1"><strong>Criterion:</strong> {strat.criterion}</p>
                    <p className="text-xs mb-1"><strong>Measure:</strong> {strat.measure}</p>
                    <p className="text-xs text-gray-600"><em>{strat.example}</em></p>
                  </div>
                ))}
              </div>
            )}

            {slide.aiExample && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Example: {slide.aiExample.scenario}</h3>
                {Object.entries(slide.aiExample).filter(([key]) => key !== 'scenario').map(([key, value], idx) => (
                  <p key={idx} className="text-sm mb-1"><span className="font-semibold capitalize">{key}:</span> {value}</p>
                ))}
              </div>
            )}
          </div>
        );

      case 'comparison':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-4xl font-bold mb-6 text-purple-800">{slide.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-purple-700 text-white">
                    {slide.headers.map((header, idx) => (
                      <th key={idx} className="p-2 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slide.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="p-2 border-b border-gray-200">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'practicalConsiderations':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-purple-800">{slide.title}</h2>
            <div className="space-y-5">
              {slide.considerations.map((consideration, idx) => (
                <div key={idx} className="bg-white border-2 border-purple-200 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{consideration.aspect}</h3>
                  <p className="text-sm text-purple-700 mb-3"><em>Importance: {consideration.importance}</em></p>
                  
                  {consideration.guidelines && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm mb-1">Guidelines:</p>
                      <ul className="space-y-1">
                        {consideration.guidelines.map((g, gIdx) => (
                          <li key={gIdx} className="text-xs">• {g}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.techniques && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm mb-1">Techniques:</p>
                      <ul className="space-y-1">
                        {consideration.techniques.map((t, tIdx) => (
                          <li key={tIdx} className="text-xs">• {t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.rules_of_thumb && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm mb-1">Rules of Thumb:</p>
                      <ul className="space-y-1">
                        {consideration.rules_of_thumb.map((r, rIdx) => (
                          <li key={rIdx} className="text-xs">• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.challenges && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm mb-1">Challenges:</p>
                      <ul className="space-y-1">
                        {consideration.challenges.map((c, cIdx) => (
                          <li key={cIdx} className="text-xs text-red-700">• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.strategies && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm mb-1">Strategies:</p>
                      <ul className="space-y-1">
                        {consideration.strategies.map((s, sIdx) => (
                          <li key={sIdx} className="text-xs text-green-700">• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.common_mistakes && (
                    <div className="bg-red-50 p-2 rounded">
                      <p className="font-semibold text-sm text-red-900 mb-1">⚠️ Common Mistakes:</p>
                      <ul className="space-y-1">
                        {consideration.common_mistakes.map((m, mIdx) => (
                          <li key={mIdx} className="text-xs text-red-800">• {m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.decision_factors && (
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <p className="font-semibold text-sm text-blue-900 mb-1">Decision Factors:</p>
                      <ul className="space-y-1">
                        {consideration.decision_factors.map((d, dIdx) => (
                          <li key={dIdx} className="text-xs text-blue-800">• {d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consideration.statistical_approach && (
                    <div className="bg-green-50 p-2 rounded mt-2">
                      <p className="font-semibold text-sm text-green-900 mb-1">Statistical Approach:</p>
                      <ul className="space-y-1">
                        {consideration.statistical_approach.map((s, sIdx) => (
                          <li key={sIdx} className="text-xs text-green-800">• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'bestPractices':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-purple-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.practices.map((prac, idx) => (
                <div key={idx} className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                  <h3 className="text-lg font-bold text-purple-900 mb-2">{prac.practice}</h3>
                  <p className="text-sm mb-2"><span className="font-semibold">Why:</span> {prac.rationale}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">How:</span> {prac.implementation}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-10 h-full flex flex-col bg-gradient-to-br from-purple-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-purple-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-purple-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-purple-900 mb-2">{idx + 1}. {kp.point}</h3>
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
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 3: Sampling Techniques - Theory & Practice</p>
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
              currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-purple-600 hover:bg-purple-700'
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
                