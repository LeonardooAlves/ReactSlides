import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Shield, FileText, CheckCircle } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Validation & Ethics',
        subtitle: 'Part 7: Ensuring Quality and Responsibility',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Part 7 Overview',
      duration: '7 minutes',
      topics: [
        'Multi-level validation framework for synthetic data',
        'Statistical validation methods and metrics',
        'Privacy auditing and membership inference testing',
        'Ethical considerations in data use',
        'Responsible AI principles for data practices',
        'Documentation and transparency requirements',
        'Lab exercise preview and practical integration'
      ]
    },
    {
      type: 'validationFramework',
      title: 'Multi-Level Validation Framework',
      subtitle: 'Never assume synthetic data is good enough',
      philosophy: 'Validation must be rigorous, multi-faceted, and continuous',
      levels: [
        {
          level: 'Level 1: Visual Inspection',
          icon: '👁️',
          purpose: 'Quick sanity check and exploratory analysis',
          timeframe: '30 minutes - 1 hour',
          methods: [
            'Side-by-side distribution plots (histograms, KDE)',
            'Scatter plots for feature pairs',
            'Correlation heatmaps (real vs synthetic)',
            'Sample inspection (do examples look realistic?)',
            'Outlier detection visualization'
          ],
          tools: 'MATLAB: histogram, scatter, heatmap, corrplot',
          output: 'Visual report with key observations',
          pros: 'Fast, intuitive, catches obvious problems',
          cons: 'Subjective, misses subtle issues, does not scale to many dimensions',
          when: 'Always start here before formal testing'
        },
        {
          level: 'Level 2: Statistical Testing',
          icon: '📊',
          purpose: 'Quantitative distributional comparison',
          timeframe: '1-2 hours',
          methods: [
            'Two-sample Kolmogorov-Smirnov test (continuous features)',
            'Chi-square test (categorical features)',
            'Compare statistical moments (mean, variance, skewness, kurtosis)',
            'Correlation structure comparison (Frobenius norm)',
            'Maximum Mean Discrepancy (MMD) for distribution distance'
          ],
          tools: 'MATLAB: kstest2, chi2test, mean, var, corr',
          output: 'Statistical report with p-values and effect sizes',
          pros: 'Objective, quantitative, standard methodology',
          cons: 'May reject for trivial differences, multiple testing issues, assumes test validity',
          when: 'After visual inspection confirms basic sanity'
        },
        {
          level: 'Level 3: Machine Learning Utility',
          icon: '🤖',
          purpose: 'Test downstream task performance',
          timeframe: '2-4 hours',
          methods: [
            'Train Real, Test Real (baseline)',
            'Train Synthetic, Test Real (primary validation)',
            'Train Synthetic+Real, Test Real (augmentation test)',
            'TRTR (Train Real Test Real) vs TSTR (Train Synthetic Test Real)',
            'Compare: Accuracy, Precision, Recall, F1, AUC-ROC'
          ],
          tools: 'MATLAB: fitcensemble, crossval, perfcurve',
          output: 'Performance comparison report',
          pros: 'Directly measures what matters for ML applications',
          cons: 'Expensive, task-specific, confounded by model choice',
          when: 'Before committing to use synthetic data in production'
        },
        {
          level: 'Level 4: Privacy Auditing',
          icon: '🔒',
          purpose: 'Ensure privacy preservation',
          timeframe: '2-3 hours',
          methods: [
            'Membership inference attack (can attacker tell if sample in training?)',
            'Attribute inference attack (can attacker infer sensitive attributes?)',
            'Nearest neighbor distance (are synthetic too close to real?)',
            'Distance to Closest Record (DCR) metric',
            'Differential privacy budget analysis'
          ],
          tools: 'MATLAB: pdist2, knnsearch, custom attack implementations',
          output: 'Privacy risk assessment report',
          pros: 'Critical for sensitive applications, identifies privacy leaks',
          cons: 'Adversarial - new attacks may emerge, requires expertise',
          when: 'Always for privacy-sensitive domains (medical, financial)'
        }
      ],
      criticalNote: 'Use all four levels in sequence. Each level catches different issues.'
    },
    {
      type: 'statisticalMetrics',
      title: 'Statistical Validation Metrics',
      subtitle: 'Quantifying synthetic data quality',
      categories: [
        {
          category: 'Distributional Similarity',
          metrics: [
            {
              name: 'Kolmogorov-Smirnov Distance',
              formula: 'D = sup_x |F_real(x) - F_synthetic(x)|',
              interpretation: 'D = 0 (identical), D = 1 (completely different)',
              threshold: 'D < 0.1 generally acceptable',
              matlabCode: '[h, p, ks] = kstest2(real_data, synthetic_data);'
            },
            {
              name: 'Wasserstein Distance',
              formula: 'W(P,Q) = inf E[||X-Y||] over all couplings',
              interpretation: 'Optimal transport cost between distributions',
              threshold: 'Domain-specific, compare to baseline',
              matlabCode: '% Requires optimization toolbox or custom implementation'
            },
            {
              name: 'Maximum Mean Discrepancy (MMD)',
              formula: 'MMD²(P,Q) = E[k(X,X\')] - 2E[k(X,Y)] + E[k(Y,Y\')]',
              interpretation: 'Kernel-based distribution distance',
              threshold: 'MMD² ≈ 0 indicates similar distributions',
              matlabCode: '% Custom kernel-based implementation needed'
            }
          ]
        },
        {
          category: 'Statistical Moments',
          metrics: [
            {
              name: 'Mean Absolute Percentage Error (MAPE)',
              formula: 'MAPE = (1/n) Σ |mean_real - mean_synthetic| / mean_real',
              interpretation: 'Percentage difference in means',
              threshold: 'MAPE < 5% good, < 10% acceptable',
              matlabCode: 'mape = mean(abs(mean(real) - mean(synthetic)) ./ mean(real)) * 100;'
            },
            {
              name: 'Variance Ratio',
              formula: 'VR = var_synthetic / var_real',
              interpretation: 'VR = 1 (perfect match), VR > 1 (over-dispersed), VR < 1 (under-dispersed)',
              threshold: '0.8 < VR < 1.2 acceptable',
              matlabCode: 'vr = var(synthetic) / var(real);'
            },
            {
              name: 'Correlation Matrix Difference',
              formula: '||Corr_real - Corr_synthetic||_F (Frobenius norm)',
              interpretation: 'Overall difference in correlation structure',
              threshold: 'Lower is better, compare to random baseline',
              matlabCode: 'diff = norm(corr(real) - corr(synthetic), \'fro\');'
            }
          ]
        },
        {
          category: 'ML Performance',
          metrics: [
            {
              name: 'TSTR Performance Gap',
              formula: 'Gap = Performance(TRTR) - Performance(TSTR)',
              interpretation: 'How much worse is synthetic compared to real',
              threshold: 'Gap < 5% excellent, < 10% acceptable',
              matlabCode: '% Train classifier on synthetic, test on real, compare to baseline'
            },
            {
              name: 'Synthetic Data Quality Score',
              formula: 'Quality = (1 - Gap/Performance_TRTR) * 100',
              interpretation: 'Percentage of real data quality achieved',
              threshold: 'Quality > 90% excellent, > 80% good',
              matlabCode: 'quality = (1 - gap / perf_trtr) * 100;'
            }
          ]
        }
      ]
    },
    {
      type: 'privacyAuditing',
      title: 'Privacy Auditing Framework',
      subtitle: 'Ensuring synthetic data does not leak private information',
      importance: 'Critical for medical, financial, and personal data applications',
      attacks: [
        {
          attack: 'Membership Inference Attack',
          description: 'Adversary tries to determine if specific record was in training data',
          method: 'Train binary classifier to distinguish training vs holdout samples',
          successMetric: 'Attack accuracy (50% = random guessing)',
          threshold: 'Success rate ≤ 55% (barely better than random)',
          matlabCode: `% Membership Inference Attack Test
% Split real data: training (used for synthetic) and holdout
train_idx = randperm(length(real_data), floor(0.8*length(real_data)));
holdout_idx = setdiff(1:length(real_data), train_idx);

% Generate synthetic from training data only
synthetic_data = generate_synthetic(real_data(train_idx));

% Create attack dataset
X_attack = [real_data(train_idx); real_data(holdout_idx)];
y_attack = [ones(length(train_idx),1); zeros(length(holdout_idx),1)];

% Train attack classifier
attack_model = fitcensemble(X_attack, y_attack);

% Test on synthetic data
synthetic_predictions = predict(attack_model, synthetic_data);
attack_success_rate = mean(synthetic_predictions == 1);

% Assess privacy risk
fprintf('Attack Success Rate: %.2f%%\\n', attack_success_rate*100);
if attack_success_rate > 0.55
    warning('Privacy risk detected!');
end`,
          mitigation: 'Add noise, use differential privacy, increase synthetic sample diversity'
        },
        {
          attack: 'Attribute Inference Attack',
          description: 'Adversary tries to infer sensitive attributes from public attributes',
          method: 'Predict sensitive attribute using other features',
          successMetric: 'Prediction accuracy on sensitive attribute',
          threshold: 'Should not be significantly better than on real data',
          matlabCode: `% Attribute Inference Attack Test
% Assume 'salary' is sensitive, other features are public
public_features = {'age', 'education', 'experience'};
sensitive_feature = 'salary';

% Train predictor on real data (baseline)
real_predictor = fitlm(real_data(:, public_features), ...
                       real_data.salary);
real_r2 = real_predictor.Rsquared.Ordinary;

% Train predictor on synthetic data
synthetic_predictor = fitlm(synthetic_data(:, public_features), ...
                            synthetic_data.salary);
synthetic_r2 = synthetic_predictor.Rsquared.Ordinary;

% Compare inference capability
fprintf('Real R²: %.3f\\n', real_r2);
fprintf('Synthetic R²: %.3f\\n', synthetic_r2);

if synthetic_r2 > real_r2 * 1.1
    warning('Synthetic data may enable easier attribute inference!');
end`,
          mitigation: 'Reduce correlation between public and sensitive attributes'
        },
        {
          attack: 'Distance to Closest Record (DCR)',
          description: 'Measure how close synthetic samples are to real training samples',
          method: 'For each synthetic sample, find nearest real training sample',
          successMetric: 'Minimum distance across all synthetic samples',
          threshold: 'Should be > 0 with sufficient margin (not exact copies)',
          matlabCode: `% Distance to Closest Record (DCR)
% Normalize data first
real_normalized = normalize(real_data);
synthetic_normalized = normalize(synthetic_data);

% For each synthetic sample, find closest real sample
distances = pdist2(synthetic_normalized, real_normalized);
min_distances = min(distances, [], 2);

% Analyze distance distribution
fprintf('Min DCR: %.4f\\n', min(min_distances));
fprintf('Median DCR: %.4f\\n', median(min_distances));
fprintf('Mean DCR: %.4f\\n', mean(min_distances));

% Check for exact or near-exact copies
threshold = 0.01;
num_near_copies = sum(min_distances < threshold);
fprintf('Near-copies (dist < %.2f): %d (%.1f%%)\\n', ...
        threshold, num_near_copies, ...
        100*num_near_copies/length(min_distances));

if num_near_copies > 0
    warning('Synthetic data contains near-copies of real data!');
end`,
          mitigation: 'Reject synthetic samples too close to real data'
        }
      ]
    },
    {
      type: 'ethicalConsiderations',
      title: 'Ethical Considerations in Data & AI',
      subtitle: 'Principles for responsible data practices',
      framework: 'Built on principles of fairness, accountability, transparency, and privacy',
      considerations: [
        {
          principle: 'Fairness & Non-Discrimination',
          icon: '⚖️',
          description: 'Ensure data practices do not perpetuate or amplify bias',
          questions: [
            'Does our data collection exclude or underrepresent groups?',
            'Are sampling methods systematically biased?',
            'Does synthetic data amplify existing biases?',
            'Have we tested for demographic parity and equalized odds?'
          ],
          practices: [
            'Conduct bias audits on both real and synthetic data',
            'Stratified sampling to ensure representation',
            'Use fairness constraints in synthetic generation',
            'Monitor performance across demographic groups',
            'Document known biases and limitations'
          ],
          example: 'If training data has historical hiring bias, synthetic data might amplify gender imbalance unless explicitly corrected'
        },
        {
          principle: 'Privacy & Data Protection',
          icon: '🔒',
          description: 'Protect individual privacy throughout data lifecycle',
          questions: [
            'Have we obtained proper consent for data use?',
            'Does our approach comply with GDPR, HIPAA, etc.?',
            'Can individuals be re-identified from synthetic data?',
            'What is our data retention and deletion policy?'
          ],
          practices: [
            'Implement differential privacy where appropriate',
            'Conduct regular privacy audits (membership inference tests)',
            'Minimize data collection (purpose limitation)',
            'Anonymize or pseudonymize data',
            'Secure storage and access controls'
          ],
          example: 'Medical synthetic data that preserves disease correlations but protects patient identities'
        },
        {
          principle: 'Transparency & Explainability',
          icon: '📖',
          description: 'Make data practices and decisions transparent',
          questions: [
            'Can we explain how data was collected and processed?',
            'Are synthetic data generation methods documented?',
            'Do users know when they are interacting with synthetic data?',
            'Can we trace decisions back to data sources?'
          ],
          practices: [
            'Complete datasheets for datasets',
            'Document all data processing steps',
            'Disclose use of synthetic data',
            'Provide model cards for AI systems',
            'Enable auditability through versioning'
          ],
          example: 'Research papers must disclose when results are based on synthetic rather than real data'
        },
        {
          principle: 'Accountability & Governance',
          icon: '📋',
          description: 'Establish clear responsibility for data decisions',
          questions: [
            'Who is responsible for data quality and ethics?',
            'What is our process for addressing issues?',
            'How do we handle discovered biases or privacy breaches?',
            'Are there review processes for high-stakes applications?'
          ],
          practices: [
            'Designate data stewards and ethics officers',
            'Establish data governance committees',
            'Regular ethical reviews for AI systems',
            'Incident response procedures',
            'Stakeholder engagement (affected communities)'
          ],
          example: 'Medical AI requires ethics board approval before deployment'
        },
        {
          principle: 'Beneficence & Non-Maleficence',
          icon: '💚',
          description: 'Do good and avoid harm',
          questions: [
            'What are potential harms from our data practices?',
            'Who benefits and who might be harmed?',
            'Are we considering long-term societal impacts?',
            'Have we considered dual-use concerns (e.g., deepfakes)?'
          ],
          practices: [
            'Impact assessments before deployment',
            'Red-teaming for potential misuse',
            'Watermarking for synthetic media',
            'Consider refusing certain applications',
            'Ongoing monitoring of real-world impacts'
          ],
          example: 'Facial recognition technology requires careful consideration of surveillance risks'
        }
      ]
    },
    {
      type: 'responsibleAI',
      title: 'Responsible AI Principles for Data',
      subtitle: 'Translating ethics into practice',
      principles: [
        {
          principle: 'Human-Centered Design',
          description: 'Put people first in data and AI systems',
          practices: [
            'Involve affected communities in design decisions',
            'Consider human rights implications',
            'Ensure human oversight of automated decisions',
            'Design for accessibility and inclusion',
            'Regular user feedback and adjustment'
          ]
        },
        {
          principle: 'Robust & Reliable',
          description: 'Ensure systems work consistently and safely',
          practices: [
            'Rigorous validation before deployment',
            'Continuous monitoring in production',
            'Graceful degradation under failure',
            'Regular audits and updates',
            'Incident response procedures'
          ]
        },
        {
          principle: 'Sustainable',
          description: 'Consider environmental and long-term impacts',
          practices: [
            'Minimize computational carbon footprint',
            'Efficient data storage and processing',
            'Plan for maintenance and updates',
            'Consider data lifecycle and disposal',
            'Balance innovation with sustainability'
          ]
        }
      ]
    },
    {
      type: 'documentation',
      title: 'Documentation Requirements',
      subtitle: 'Transparency through comprehensive documentation',
      frameworks: [
        {
          name: 'Datasheets for Datasets (Gebru et al., 2018)',
          purpose: 'Standardized documentation for dataset creation',
          sections: [
            'Motivation: Why was dataset created?',
            'Composition: What data does it contain?',
            'Collection: How was data collected?',
            'Preprocessing: What preprocessing was applied?',
            'Uses: What should it (not) be used for?',
            'Distribution: How is it shared?',
            'Maintenance: Who maintains it?'
          ],
          critical: 'Must include known biases, limitations, and ethical considerations'
        },
        {
          name: 'Model Cards (Mitchell et al., 2019)',
          purpose: 'Documentation for ML models',
          sections: [
            'Model details: Architecture, training data',
            'Intended use: Applications and limitations',
            'Factors: Relevant demographic factors',
            'Metrics: Performance measures',
            'Evaluation data: Test set description',
            'Ethical considerations: Known issues',
            'Caveats and recommendations: Usage guidance'
          ],
          critical: 'Disaggregated performance across demographic groups'
        }
      ],
      additionalDocs: [
        'Data processing pipeline diagrams',
        'Version control and change logs',
        'Privacy impact assessments',
        'Bias audit reports',
        'Validation test results',
        'Known failure modes',
        'Contact information for questions'
      ]
    },
    {
      type: 'labPreview',
      title: 'Post-Session Lab Exercise Preview',
      subtitle: 'Hands-on practice with data collection, sampling, and synthetic generation',
      objectives: [
        'Apply sampling techniques to imbalanced dataset',
        'Generate synthetic data using multiple methods',
        'Validate synthetic data quality',
        'Document data practices properly'
      ],
      structure: [
        {
          part: 'Part A: Sampling (20 minutes)',
          tasks: [
            'Load imbalanced credit card fraud dataset',
            'Implement Simple Random Sampling',
            'Implement Stratified Sampling',
            'Compare classifier performance (SRS vs Stratified)',
            'Analyze impact of sampling on minority class detection'
          ],
          deliverable: 'Performance comparison report'
        },
        {
          part: 'Part B: Synthetic Data Generation (25 minutes)',
          tasks: [
            'Generate synthetic data using Distribution-Based method (GMM)',
            'Generate synthetic data using Data Augmentation (SMOTE)',
            'Visualize real vs synthetic distributions',
            'Combine real + synthetic for training',
            'Evaluate downstream ML performance'
          ],
          deliverable: 'Synthetic data quality report'
        },
        {
          part: 'Part C: Validation & Documentation (15 minutes)',
          tasks: [
            'Run statistical tests (K-S test, moment comparison)',
            'Compute TSTR performance gap',
            'Check for privacy risks (DCR analysis)',
            'Create mini datasheet for synthetic dataset',
            'Document known limitations'
          ],
          deliverable: 'Complete validation and documentation package'
        }
      ],
      tools: [
        'MATLAB Statistics and Machine Learning Toolbox',
        'Provided dataset: creditcard_fraud.csv',
        'Template scripts and documentation forms',
        'Reference solutions for self-assessment'
      ],
      assessment: 'Self-guided with checkpoints and reference solutions'
    },
    {
      type: 'practicalIntegration',
      title: 'Practical Integration Workflow',
      subtitle: 'From data collection to deployment',
      workflow: [
        {
          phase: '1. Requirements & Planning',
          activities: ['Define use case and success criteria', 'Identify data needs and constraints', 'Assess privacy and ethical requirements', 'Budget allocation (time, cost, compute)'],
          output: 'Data requirements document'
        },
        {
          phase: '2. Data Collection',
          activities: ['Choose collection method', 'Implement collection pipeline', 'Quality control during collection', 'Document collection process'],
          output: 'Raw dataset with metadata'
        },
        {
          phase: '3. Sampling',
          activities: ['Analyze population characteristics', 'Select sampling technique', 'Create train/validation/test splits', 'Verify representativeness'],
          output: 'Sampled datasets ready for ML'
        },
        {
          phase: '4. Synthetic Augmentation (if needed)',
          activities: ['Assess need for synthetic data', 'Choose generation technique', 'Generate synthetic samples', 'Initial quality check'],
          output: 'Synthetic dataset (preliminary)'
        },
        {
          phase: '5. Validation',
          activities: ['Visual inspection', 'Statistical testing', 'ML utility evaluation', 'Privacy auditing'],
          output: 'Validation report with quality metrics'
        },
        {
          phase: '6. Integration',
          activities: ['Combine real + synthetic if applicable', 'Final preprocessing', 'Version control and archiving', 'Complete documentation'],
          output: 'Production-ready dataset v1.0'
        },
        {
          phase: '7. Model Training & Evaluation',
          activities: ['Train ML models', 'Evaluate on held-out test set', 'Bias and fairness audits', 'Performance monitoring'],
          output: 'Trained model with evaluation report'
        },
        {
          phase: '8. Deployment & Monitoring',
          activities: ['Deploy to production', 'Monitor data drift', 'Track performance metrics', 'Regular audits and updates'],
          output: 'Production system with monitoring'
        }
      ],
      timeline: 'Typical project: 2-4 weeks for data preparation, ongoing monitoring',
      criticalSuccess: 'Documentation, validation, and ethical review at every phase'
    },
    {
      type: 'summary',
      title: 'Part 7 Summary: Validation & Ethics',
      keyPoints: [
        {
          point: 'Multi-level validation required',
          detail: 'Visual, statistical, ML utility, and privacy auditing - all four levels catch different issues'
        },
        {
          point: 'Statistical metrics matter',
          detail: 'Use quantitative measures: K-S distance, MMD, TSTR gap, DCR for rigorous validation'
        },
        {
          point: 'Privacy is not optional',
          detail: 'Membership inference, attribute inference, and DCR testing required for sensitive domains'
        },
        {
          point: 'Ethics must be proactive',
          detail: 'Fairness, privacy, transparency, accountability, and beneficence guide all data decisions'
        },
        {
          point: 'Documentation enables responsibility',
          detail: 'Datasheets and model cards provide transparency and enable proper use'
        },
        {
          point: 'Integration is iterative',
          detail: 'Data preparation is ongoing - collect, sample, validate, monitor, repeat'
        }
      ],
      finalMessage: 'Responsible AI starts with responsible data practices. You now have the tools, techniques, and ethical framework to build AI systems that are not only effective but also trustworthy and fair.',
      nextSteps: [
        'Complete the lab exercise to practice these skills',
        'Apply these principles to your own projects',
        'Stay updated on evolving ethical standards',
        'Advocate for responsible data practices in your organizations'
      ]
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const downloadAsPDF = () => {
    window.print();
  };

  const downloadAsHTML = () => {
    const htmlContent = generateFullHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Part7_Validation_Ethics.html';
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
    <title>Part 7: Validation & Ethics</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #1e40af; font-size: 32px; margin-bottom: 10px; }
        pre { background: #1e293b; color: #10b981; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { font-family: 'Courier New', monospace; font-size: 13px; }
        @media print { .slide { page-break-after: always; } body { background: white; } }
    </style>
</head>
<body>
    ${slides.map((slide, idx) => `<div class="slide"><h1>Slide ${idx + 1}</h1></div>`).join('')}
</body>
</html>`;
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12">
            <Shield className="w-24 h-24 mb-8" />
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
            <h2 className="text-4xl font-bold mb-3 text-blue-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {slide.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <span className="text-blue-600 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'validationFramework':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="bg-blue-100 p-3 rounded-lg mb-4">
              <p className="text-base font-semibold text-blue-900">{slide.philosophy}</p>
            </div>
            <div className="space-y-3">
              {slide.levels.map((level, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{level.icon}</span>
                    <h3 className="text-lg font-bold text-blue-900">{level.level}</h3>
                  </div>
                  <p className="text-xs mb-2"><strong>Purpose:</strong> {level.purpose} | <strong>Time:</strong> {level.timeframe}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <p className="font-semibold mb-1">Methods:</p>
                      <ul className="ml-3 space-y-1">
                        {level.methods.slice(0,3).map((m, mIdx) => (
                          <li key={mIdx}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Output:</p>
                      <p>{level.output}</p>
                      <p className="font-semibold mt-1">Tools:</p>
                      <p className="text-xs">{level.tools}</p>
                    </div>
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
                  <p className="text-xs mt-2 text-blue-700"><strong>When:</strong> {level.when}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg mt-3 border-l-4 border-yellow-500">
              <p className="text-sm font-semibold text-yellow-900">⚠️ {slide.criticalNote}</p>
            </div>
          </div>
        );

      case 'statisticalMetrics':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-3">
              {slide.categories.map((category, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-300 p-3 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{category.category}</h3>
                  <div className="space-y-2">
                    {category.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-gray-50 p-2 rounded">
                        <h4 className="font-bold text-sm text-blue-900">{metric.name}</h4>
                        <p className="font-mono text-xs bg-white p-1 rounded my-1">{metric.formula}</p>
                        <p className="text-xs mb-1"><strong>Interpretation:</strong> {metric.interpretation}</p>
                        <p className="text-xs mb-1 text-green-700"><strong>Threshold:</strong> {metric.threshold}</p>
                        {metric.matlabCode && (
                          <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs mt-1">
                            <code>{metric.matlabCode}</code>
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'privacyAuditing':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-2">{slide.subtitle}</p>
            <div className="bg-red-100 p-3 rounded-lg mb-4 border-l-4 border-red-500">
              <p className="text-sm font-semibold text-red-900">🔒 {slide.importance}</p>
            </div>
            <div className="space-y-3">
              {slide.attacks.map((attack, idx) => (
                <div key={idx} className="bg-white border-2 border-red-300 p-3 rounded-lg">
                  <h3 className="text-lg font-bold text-red-900 mb-2">{attack.attack}</h3>
                  <p className="text-xs mb-2">{attack.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <p><strong>Method:</strong> {attack.method}</p>
                      <p><strong>Success Metric:</strong> {attack.successMetric}</p>
                    </div>
                    <div>
                      <p className="text-green-700"><strong>Threshold:</strong> {attack.threshold}</p>
                      <p className="text-blue-700"><strong>Mitigation:</strong> {attack.mitigation}</p>
                    </div>
                  </div>
                  {attack.matlabCode && (
                    <details className="mt-2">
                      <summary className="text-xs font-semibold cursor-pointer text-blue-700">View MATLAB Code</summary>
                      <pre className="bg-gray-900 text-green-400 p-2 rounded text-xs mt-2 overflow-x-auto">
                        <code>{attack.matlabCode}</code>
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'ethicalConsiderations':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="bg-indigo-100 p-3 rounded-lg mb-4">
              <p className="text-sm font-semibold text-indigo-900">{slide.framework}</p>
            </div>
            <div className="space-y-3">
              {slide.considerations.map((consideration, idx) => (
                <div key={idx} className="bg-white border-l-4 border-indigo-500 p-3 rounded">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{consideration.icon}</span>
                    <h3 className="text-lg font-bold text-indigo-900">{consideration.principle}</h3>
                  </div>
                  <p className="text-xs mb-2 italic">{consideration.description}</p>
                  <details className="mb-2">
                    <summary className="text-xs font-semibold cursor-pointer text-blue-700">Key Questions</summary>
                    <ul className="ml-4 mt-1 text-xs space-y-1">
                      {consideration.questions.map((q, qIdx) => (
                        <li key={qIdx}>• {q}</li>
                      ))}
                    </ul>
                  </details>
                  <details className="mb-2">
                    <summary className="text-xs font-semibold cursor-pointer text-green-700">Best Practices</summary>
                    <ul className="ml-4 mt-1 text-xs space-y-1">
                      {consideration.practices.map((p, pIdx) => (
                        <li key={pIdx}>✓ {p}</li>
                      ))}
                    </ul>
                  </details>
                  <div className="bg-yellow-50 p-2 rounded mt-2">
                    <p className="text-xs"><strong>Example:</strong> {consideration.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'responsibleAI':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="space-y-4">
              {slide.principles.map((principle, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{principle.principle}</h3>
                  <p className="text-sm mb-3 italic">{principle.description}</p>
                  <ul className="space-y-2 text-sm">
                    {principle.practices.map((practice, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'documentation':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-3">
              {slide.frameworks.map((framework, idx) => (
                <div key={idx} className="bg-white border-2 border-green-300 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-green-900 mb-2">{framework.name}</h3>
                  <p className="text-sm mb-3 italic">{framework.purpose}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {framework.sections.map((section, sIdx) => (
                      <div key={sIdx} className="bg-green-50 p-2 rounded">
                        <p className="text-xs">{section}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-yellow-100 p-2 rounded mt-3">
                    <p className="text-xs font-semibold text-yellow-900">⚠️ {framework.critical}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <h3 className="font-bold text-blue-900 mb-2">Additional Documentation:</h3>
              <div className="grid grid-cols-2 gap-2">
                {slide.additionalDocs.map((doc, idx) => (
                  <p key={idx} className="text-xs">• {doc}</p>
                ))}
              </div>
            </div>
          </div>
        );

      case 'labPreview':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="bg-green-100 p-3 rounded-lg mb-4">
              <h3 className="font-bold text-green-900 mb-2">Objectives:</h3>
              <ul className="text-sm space-y-1">
                {slide.objectives.map((obj, idx) => (
                  <li key={idx}>✓ {obj}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {slide.structure.map((part, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-3 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{part.part}</h3>
                  <ul className="text-xs space-y-1 mb-2">
                    {part.tasks.map((task, tIdx) => (
                      <li key={tIdx}>• {task}</li>
                    ))}
                  </ul>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs font-semibold text-green-900">Deliverable: {part.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <h3 className="font-bold text-blue-900 mb-2 text-sm">Tools & Resources:</h3>
              <ul className="text-xs space-y-1">
                {slide.tools.map((tool, idx) => (
                  <li key={idx}>• {tool}</li>
                ))}
              </ul>
              <p className="text-xs mt-2"><strong>Assessment:</strong> {slide.assessment}</p>
            </div>
          </div>
        );

      case 'practicalIntegration':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-blue-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-2">
              {slide.workflow.map((phase, idx) => (
                <div key={idx} className="bg-white border-l-4 border-blue-500 p-3 rounded">
                  <h3 className="text-base font-bold text-blue-900 mb-2">{phase.phase}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold mb-1">Activities:</p>
                      <ul className="text-xs space-y-1">
                        {phase.activities.map((activity, aIdx) => (
                          <li key={aIdx}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1">Output:</p>
                      <p className="text-xs bg-green-50 p-2 rounded">{phase.output}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg mt-3">
              <p className="text-sm"><strong>Timeline:</strong> {slide.timeline}</p>
              <p className="text-sm mt-2"><strong>Critical Success Factor:</strong> {slide.criticalSuccess}</p>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-8 h-full flex flex-col bg-gradient-to-br from-blue-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-800">{slide.title}</h2>
            <div className="space-y-3 mb-4">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-blue-900 mb-2">{idx + 1}. {kp.point}</h3>
                  <p className="text-base text-gray-700">{kp.detail}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-5 rounded-lg border-2 border-blue-500 mb-4">
              <p className="text-lg font-semibold text-center text-blue-900 mb-3">{slide.finalMessage}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-900 mb-2">Next Steps:</h3>
              <ul className="text-sm space-y-1">
                {slide.nextSteps.map((step, idx) => (
                  <li key={idx}>→ {step}</li>
                ))}
              </ul>
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
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 7: Validation & Ethics</p>
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
            className="flex items-center px-6 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 transition-all"
          >
            <Download className="w-5 h-5 mr-2" />
            Download HTML
          </button>
          
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
    </div>
  );
};

export default SlideShow;