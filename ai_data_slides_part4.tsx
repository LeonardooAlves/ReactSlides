import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, AlertTriangle, Shield } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Challenges & Mitigation Strategies',
        subtitle: 'Part 4: Addressing Real-World Data Problems',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Part 4 Overview',
      duration: '12 minutes',
      topics: [
        'Four major challenges in data collection and sampling',
        'Selection bias: causes, detection, and mitigation',
        'Class imbalance: statistical impact and solutions',
        'Temporal drift: concept drift and adaptation strategies',
        'Missing data: MCAR, MAR, MNAR taxonomy and handling',
        'Diagnostic framework for data quality assessment',
        'Documentation best practices'
      ]
    },
    {
      type: 'challengeOverview',
      title: 'The Four Major Challenges',
      subtitle: 'Common pitfalls in real-world AI data',
      challenges: [
        {
          name: 'Selection Bias',
          icon: '🎯',
          description: 'Sample systematically differs from population',
          frequency: 'Very Common',
          severity: 'High',
          detectability: 'Medium'
        },
        {
          name: 'Class Imbalance',
          icon: '⚖️',
          description: 'Unequal representation of classes',
          frequency: 'Extremely Common',
          severity: 'High',
          detectability: 'Easy'
        },
        {
          name: 'Temporal Drift',
          icon: '📈',
          description: 'Data distribution changes over time',
          frequency: 'Common',
          severity: 'Very High',
          detectability: 'Hard'
        },
        {
          name: 'Missing Data',
          icon: '❓',
          description: 'Incomplete observations',
          frequency: 'Very Common',
          severity: 'Variable',
          detectability: 'Easy'
        }
      ],
      note: 'These challenges often occur together, compounding their effects'
    },
    {
      type: 'challenge',
      number: 1,
      title: 'Challenge: Selection Bias',
      definition: 'E[Sample] ≠ E[Population] - Sample systematically differs from target population',
      statisticalImpact: 'Biased parameter estimates, poor generalization, systematic prediction errors',
      causes: [
        'Accessibility constraints: Only some populations available',
        'Self-selection: Volunteers differ from non-volunteers',
        'Survival bias: Only successful cases observed',
        'Coverage bias: Sampling frame excludes populations',
        'Non-response: Systematic differences in who responds'
      ],
      realExample: {
        scenario: 'Facial Recognition System',
        context: 'Trained on celebrity photos from internet',
        dataCharacteristics: [
          'High-quality professional images',
          'Good lighting, frontal poses',
          'Predominantly certain demographics',
          'Public figures only'
        ],
        selectionBias: 'Missing: Average people, poor lighting, varied angles, underrepresented groups',
        manifestation: 'Model performs excellently on celebrity photos',
        deploymentFailure: 'Fails on security camera footage with diverse population, poor lighting',
        impact: 'Discriminatory outcomes, security failures, loss of trust'
      },
      mitigations: [
        {
          strategy: 'Domain Randomization',
          description: 'Collect from diverse sources to reduce systematic bias',
          implementation: 'Sample from multiple hospitals, platforms, demographics',
          effectiveness: 'High',
          cost: 'Medium'
        },
        {
          strategy: 'Propensity Score Weighting',
          description: 'Reweight samples to match target distribution',
          implementation: 'Estimate P(sample|X), weight by inverse probability',
          effectiveness: 'Medium-High',
          cost: 'Low'
        },
        {
          strategy: 'Covariate Shift Detection',
          description: 'Monitor P(X) in production vs training',
          implementation: 'Statistical tests (K-S, MMD), distribution monitoring',
          effectiveness: 'High for detection',
          cost: 'Low'
        },
        {
          strategy: 'Adversarial Validation',
          description: 'Train classifier to distinguish train from test',
          implementation: 'If AUC > 0.5, distributions differ - investigate features',
          effectiveness: 'High for diagnosis',
          cost: 'Low'
        }
      ]
    },
    {
      type: 'challenge',
      number: 2,
      title: 'Challenge: Class Imbalance',
      definition: 'Minority classes have fewer samples, leading to higher variance in estimates',
      statisticalImpact: 'Models default to majority class, poor minority class recall, biased decision boundaries',
      causes: [
        'Natural imbalance: Rare events in real world (fraud, disease)',
        'Sampling bias: Easier to collect majority class',
        'Cost asymmetry: Minority class expensive to label',
        'Temporal: Rare events occur infrequently'
      ],
      realExample: {
        scenario: 'Credit Card Fraud Detection',
        context: 'Transaction classification system',
        dataCharacteristics: [
          'Dataset: 1,000,000 transactions',
          'Legitimate: 999,000 (99.9%)',
          'Fraudulent: 1,000 (0.1%)',
          'Simple baseline: Always predict "not fraud"'
        ],
        problem: 'Baseline achieves 99.9% accuracy!',
        realityCheck: 'But catches 0% of fraud - completely useless',
        whyItHappens: 'Model minimizes overall error, ignores rare class',
        businessImpact: 'Millions in fraud losses, customer dissatisfaction'
      },
      metricFailure: {
        misleading: 'Accuracy is misleading with imbalanced data',
        accuracy: 'Model predicting all "not fraud" = 99.9% accurate',
        betterMetrics: [
          'Precision: TP / (TP + FP) - Of predicted positives, how many correct?',
          'Recall: TP / (TP + FN) - Of actual positives, how many caught?',
          'F1-Score: Harmonic mean of precision and recall',
          'AUC-ROC: Area under ROC curve - threshold-independent',
          'Confusion Matrix: See all four quadrants'
        ]
      },
      mitigations: [
        {
          strategy: 'Stratified Sampling',
          description: 'Ensure minimum minority class representation',
          implementation: 'Sample equal or minimum per class',
          pros: 'Simple, preserves real data',
          cons: 'Limited by minority class size'
        },
        {
          strategy: 'Random Oversampling',
          description: 'Duplicate minority class examples',
          implementation: 'Randomly replicate minority samples',
          pros: 'Simple, no information loss',
          cons: 'Overfitting risk, no new information'
        },
        {
          strategy: 'Random Undersampling',
          description: 'Reduce majority class examples',
          implementation: 'Randomly remove majority samples',
          pros: 'Balanced dataset, faster training',
          cons: 'Information loss, smaller dataset'
        },
        {
          strategy: 'SMOTE (Synthetic Minority Oversampling)',
          description: 'Create synthetic minority examples',
          implementation: 'Interpolate between minority neighbors',
          pros: 'New examples, reduces overfitting',
          cons: 'May create unrealistic examples'
        },
        {
          strategy: 'Class Weights in Loss Function',
          description: 'Penalize minority errors more heavily',
          implementation: 'Weight = n_samples / (n_classes * n_samples_class)',
          pros: 'No data modification, end-to-end',
          cons: 'Hyperparameter tuning needed'
        },
        {
          strategy: 'Ensemble Methods',
          description: 'Combine multiple models trained on balanced subsets',
          implementation: 'BalancedBaggingClassifier, EasyEnsemble',
          pros: 'Robust, often best performance',
          cons: 'Computational cost, complexity'
        }
      ]
    },
    {
      type: 'challenge',
      number: 3,
      title: 'Challenge: Temporal Drift',
      definition: 'Data distribution changes over time, violating IID (Independent and Identically Distributed) assumption',
      statisticalImpact: 'Non-stationary distributions, model decay, concept drift',
      types: [
        {
          type: 'Covariate Shift',
          description: 'P(X) changes, P(Y|X) stays same',
          example: 'Income distribution changes, but credit risk model still valid',
          detection: 'Distribution tests on features',
          fix: 'Reweight samples, retrain periodically'
        },
        {
          type: 'Prior Probability Shift',
          description: 'P(Y) changes, P(X|Y) stays same',
          example: 'Fraud rate increases, but fraud patterns unchanged',
          detection: 'Monitor class distribution',
          fix: 'Adjust decision threshold'
        },
        {
          type: 'Concept Drift',
          description: 'P(Y|X) changes - relationship changes',
          example: 'Fraud tactics evolve, old patterns obsolete',
          detection: 'Model performance degradation',
          fix: 'Retrain with recent data'
        }
      ],
      realExample: {
        scenario: 'Consumer Behavior Model During COVID-19',
        preChange: 'Model trained on 2015-2019 shopping patterns',
        event: 'March 2020: COVID-19 pandemic begins',
        postChange: [
          'E-commerce skyrockets, physical retail plummets',
          'Essential goods prioritized over luxury',
          'Work-from-home changes product demand',
          'Supply chain disruptions alter availability'
        ],
        modelBehavior: 'Historical model completely fails',
        whyFailed: 'Training data no longer representative',
        businessImpact: 'Poor inventory decisions, missed opportunities'
      },
      mitigations: [
        {
          strategy: 'Sliding Window Approach',
          description: 'Train only on recent data',
          implementation: 'Keep last N months/days of data, discard old',
          pros: 'Adapts to changes, simple',
          cons: 'Loses historical patterns, need enough recent data'
        },
        {
          strategy: 'Weighted Recent Data',
          description: 'Weight recent data more heavily',
          implementation: 'Exponential decay weights: w(t) = exp(-λ(T-t))',
          pros: 'Keeps history, emphasizes recent',
          cons: 'Hyperparameter tuning (λ)'
        },
        {
          strategy: 'Online Learning',
          description: 'Continuously update model with new data',
          implementation: 'Incremental updates after each batch',
          pros: 'Always current, adapts quickly',
          cons: 'Computational overhead, stability concerns'
        },
        {
          strategy: 'Drift Detection Algorithms',
          description: 'Monitor for distribution changes',
          implementation: 'ADWIN, DDM, EDDM, Page-Hinkley test',
          pros: 'Automated detection, triggers retraining',
          cons: 'False positives, detection lag'
        },
        {
          strategy: 'Ensemble with Temporal Models',
          description: 'Combine models from different time periods',
          implementation: 'Weight models by recency and performance',
          pros: 'Robust to drift, smooth adaptation',
          cons: 'Multiple models to maintain'
        }
      ]
    },
    {
      type: 'challenge',
      number: 4,
      title: 'Challenge: Missing Data',
      definition: 'Incomplete observations where values are absent for some features',
      taxonomy: [
        {
          type: 'MCAR',
          full: 'Missing Completely at Random',
          description: 'Missingness independent of observed and unobserved values',
          example: 'Lab equipment randomly fails, data points missing',
          statisticalConsequence: 'No bias, just loss of efficiency (power)',
          testable: 'Yes (Little\'s MCAR test)',
          implications: 'Complete case analysis is valid'
        },
        {
          type: 'MAR',
          full: 'Missing at Random',
          description: 'Missingness depends on observed variables, not unobserved',
          example: 'Younger patients skip optional tests (age observed, test missing)',
          statisticalConsequence: 'Biased if not accounted for',
          testable: 'Cannot definitively test',
          implications: 'Can be handled with proper modeling'
        },
        {
          type: 'MNAR',
          full: 'Missing Not at Random',
          description: 'Missingness depends on unobserved values',
          example: 'Sickest patients too ill for tests (severity unobserved)',
          statisticalConsequence: 'Severe bias, difficult to correct',
          testable: 'Cannot test without strong assumptions',
          implications: 'Must model missingness mechanism'
        }
      ],
      realExample: {
        scenario: 'Electronic Health Records',
        context: 'Predicting hospital readmission',
        observations: [
          'Blood pressure missing for 20% of patients',
          'Pattern: Missing more often for sicker patients',
          'Reason: Sickest patients in ICU, different protocols',
          'Type: MNAR - missingness related to unobserved severity'
        ],
        naiveApproach: 'Delete rows with missing BP (complete case)',
        result: 'Model trained only on healthier patients',
        problem: 'Underestimates readmission risk for sick patients',
        correctApproach: 'Model the missingness, use it as feature'
      },
      mitigations: [
        {
          strategy: 'Complete Case Analysis (Listwise Deletion)',
          description: 'Remove all rows with any missing values',
          whenValid: 'Only if MCAR and sufficient data remains',
          pros: 'Simple, unbiased under MCAR',
          cons: 'Loses data, biased if not MCAR, reduced power'
        },
        {
          strategy: 'Mean/Median/Mode Imputation',
          description: 'Replace missing with central tendency',
          implementation: 'Fill with mean (continuous) or mode (categorical)',
          pros: 'Simple, preserves sample size',
          cons: 'Underestimates variance, distorts relationships'
        },
        {
          strategy: 'Forward/Backward Fill',
          description: 'Use previous/next value (time series)',
          implementation: 'Carry forward last observed value',
          pros: 'Natural for temporal data',
          cons: 'Only for ordered data, propagates errors'
        },
        {
          strategy: 'Multiple Imputation',
          description: 'Create multiple complete datasets, combine results',
          implementation: 'MICE, Amelia, generate m datasets, pool estimates',
          pros: 'Accounts for imputation uncertainty, theoretically sound',
          cons: 'Computationally intensive, complex'
        },
        {
          strategy: 'Model-Based Imputation',
          description: 'Predict missing values using ML',
          implementation: 'Train model on complete cases, predict missing',
          pros: 'Sophisticated, can capture complex patterns',
          cons: 'Can introduce bias, double-dipping risk'
        },
        {
          strategy: 'Missingness as Feature',
          description: 'Create binary indicator for missingness',
          implementation: 'Add column: is_missing_X (0/1), impute original',
          pros: 'Preserves information about missingness pattern',
          cons: 'Increases dimensionality'
        }
      ]
    },
    {
      type: 'diagnosticFramework',
      title: 'Diagnostic Framework for Data Quality',
      subtitle: 'Systematic approach to detecting and quantifying issues',
      framework: [
        {
          category: 'Distribution Analysis',
          tests: [
            {
              name: 'Two-Sample Kolmogorov-Smirnov Test',
              purpose: 'Compare train vs test/production distributions',
              nullHypothesis: 'Samples from same distribution',
              interpretation: 'p < 0.05 suggests distribution shift',
              implementation: 'scipy.stats.ks_2samp(train_data, test_data)'
            },
            {
              name: 'Maximum Mean Discrepancy (MMD)',
              purpose: 'Measure distance between distributions',
              nullHypothesis: 'N/A (distance metric, not test)',
              interpretation: 'Larger MMD = more different distributions',
              implementation: 'Use kernel methods, available in various packages'
            },
            {
              name: 'Chi-Square Test',
              purpose: 'Compare categorical distributions',
              nullHypothesis: 'Same categorical distribution',
              interpretation: 'p < 0.05 suggests different distributions',
              implementation: 'scipy.stats.chisquare(observed, expected)'
            }
          ]
        },
        {
          category: 'Independence Testing',
          tests: [
            {
              name: 'Chi-Square Independence Test',
              purpose: 'Test if sampling is independent of features',
              nullHypothesis: 'Variables are independent',
              interpretation: 'p < 0.05 suggests dependence (potential bias)',
              implementation: 'scipy.stats.chi2_contingency(crosstab)'
            },
            {
              name: 'Correlation Analysis',
              purpose: 'Detect unexpected correlations',
              nullHypothesis: 'N/A',
              interpretation: 'Unexpected correlations suggest artifacts',
              implementation: 'Look for spurious correlations in correlation matrix'
            }
          ]
        },
        {
          category: 'Coverage Analysis',
          tests: [
            {
              name: 'Demographic Parity',
              purpose: 'Ensure subgroup representation',
              nullHypothesis: 'N/A (descriptive)',
              interpretation: 'Compare sample vs population percentages',
              implementation: 'Stratify by demographics, compare proportions'
            },
            {
              name: 'Feature Coverage',
              purpose: 'Check feature value representation',
              nullHypothesis: 'N/A (descriptive)',
              interpretation: 'Identify missing ranges or values',
              implementation: 'Histogram comparison, range checks'
            }
          ]
        },
        {
          category: 'Temporal Analysis',
          tests: [
            {
              name: 'Rolling Window Statistics',
              purpose: 'Monitor distribution over time',
              nullHypothesis: 'N/A (monitoring)',
              interpretation: 'Detect gradual or sudden changes',
              implementation: 'Track mean, variance, quantiles over time'
            },
            {
              name: 'Performance Degradation',
              purpose: 'Monitor model performance over time',
              nullHypothesis: 'Performance stable',
              interpretation: 'Degradation suggests drift',
              implementation: 'Track metrics on holdout set over time'
            }
          ]
        }
      ]
    },
    {
      type: 'documentationBestPractices',
      title: 'Documentation Best Practices',
      subtitle: 'Datasheets for Datasets Framework',
      importance: 'Transparent documentation enables reproducibility, auditing, and responsible AI',
      framework: {
        name: 'Datasheets for Datasets (Gebru et al., 2018)',
        purpose: 'Standardized documentation for dataset creation and use',
        analogy: 'Like datasheets for electronic components - essential specs'
      },
      sections: [
        {
          section: 'Motivation',
          questions: [
            'Why was the dataset created?',
            'Who funded the creation?',
            'What tasks is it intended for?'
          ],
          importance: 'Understanding purpose reveals potential misuse'
        },
        {
          section: 'Composition',
          questions: [
            'What do instances represent?',
            'How many instances?',
            'Is there missing data? Why?',
            'Are there errors or noise?',
            'Is the dataset self-contained?'
          ],
          importance: 'Users need to know what they are working with'
        },
        {
          section: 'Collection Process',
          questions: [
            'How was data collected?',
            'Who collected the data?',
            'What mechanisms were used?',
            'If sampling, what strategy?',
            'Over what timeframe?'
          ],
          importance: 'Collection method determines biases and limitations'
        },
        {
          section: 'Preprocessing',
          questions: [
            'What preprocessing was done?',
            'Was raw data saved?',
            'What software was used?'
          ],
          importance: 'Preprocessing can introduce artifacts'
        },
        {
          section: 'Uses',
          questions: [
            'What tasks has it been used for?',
            'Are there tasks it should not be used for?',
            'What are the limitations?'
          ],
          importance: 'Prevent misuse, set expectations'
        },
        {
          section: 'Distribution',
          questions: [
            'How will it be distributed?',
            'When will it be available?',
            'Are there any copyrights or licenses?'
          ],
          importance: 'Legal and ethical considerations'
        },
        {
          section: 'Maintenance',
          questions: [
            'Who will maintain the dataset?',
            'How will updates be communicated?',
            'Will older versions be preserved?'
          ],
          importance: 'Ensure long-term usability and reproducibility'
        }
      ],
      criticalElements: [
        'Known biases and limitations',
        'Sampling strategy and parameters',
        'Exclusion criteria',
        'Collection date and location',
        'Demographic composition',
        'Missing data patterns',
        'Version information'
      ]
    },
    {
      type: 'practicalWorkflow',
      title: 'Practical Workflow for Data Quality Assurance',
      workflow: [
        {
          phase: '1. Initial Assessment',
          duration: '1-2 days',
          activities: [
            'Load data and compute basic statistics',
            'Check for missing values, outliers, duplicates',
            'Visualize distributions of key features',
            'Compare train/val/test splits',
            'Document data schema and sources'
          ],
          outputs: ['Data quality report', 'Initial documentation']
        },
        {
          phase: '2. Bias Detection',
          duration: '2-3 days',
          activities: [
            'Run distribution comparison tests (K-S, chi-square)',
            'Analyze demographic representation',
            'Check for unexpected correlations',
            'Adversarial validation to detect train/test differences',
            'Identify underrepresented subgroups'
          ],
          outputs: ['Bias report', 'List of concerns']
        },
        {
          phase: '3. Missing Data Analysis',
          duration: '1-2 days',
          activities: [
            'Quantify missingness per feature',
            'Test for MCAR using Little\'s test',
            'Visualize missingness patterns',
            'Investigate MAR vs MNAR mechanisms',
            'Decide on handling strategy'
          ],
          outputs: ['Missingness report', 'Imputation plan']
        },
        {
          phase: '4. Temporal Analysis',
          duration: '1-2 days',
          activities: [
            'Plot feature distributions over time',
            'Check for seasonality, trends',
            'Analyze target variable stability',
            'Identify potential drift points',
            'Define monitoring strategy'
          ],
          outputs: ['Temporal analysis', 'Drift detection plan']
        },
        {
          phase: '5. Mitigation Implementation',
          duration: '3-5 days',
          activities: [
            'Implement chosen mitigation strategies',
            'Re-balance data if needed',
            'Handle missing data',
            'Apply corrections for known biases',
            'Document all transformations'
          ],
          outputs: ['Clean dataset', 'Transformation pipeline']
        },
        {
          phase: '6. Validation',
          duration: '2-3 days',
          activities: [
            'Re-run diagnostic tests',
            'Verify mitigations worked',
            'Check for introduced artifacts',
            'Validate on held-out data',
            'Benchmark model performance'
          ],
          outputs: ['Validation report', 'Final dataset version']
        },
        {
          phase: '7. Documentation',
          duration: '1-2 days',
          activities: [
            'Complete datasheet for dataset',
            'Document all known limitations',
            'Create reproducibility instructions',
            'Set up version control',
            'Establish update procedures'
          ],
          outputs: ['Complete documentation', 'Version 1.0 release']
        }
      ],
      totalTime: '11-19 days for thorough data quality assurance',
      note: 'Time investment pays off in model reliability and debugging efficiency'
    },
    {
      type: 'summary',
      title: 'Part 4 Summary: Challenges & Mitigation',
      keyPoints: [
        {
          point: 'Four major challenges',
          detail: 'Selection bias, class imbalance, temporal drift, and missing data are pervasive in real-world AI'
        },
        {
          point: 'Statistical understanding is key',
          detail: 'Each challenge has specific statistical properties that inform mitigation strategies'
        },
        {
          point: 'No silver bullets',
          detail: 'Multiple mitigation strategies exist; choose based on specific data characteristics and constraints'
        },
        {
          point: 'Detection before mitigation',
          detail: 'Use diagnostic framework to identify and quantify issues systematically'
        },
        {
          point: 'Documentation is essential',
          detail: 'Datasheets for datasets enable transparency, reproducibility, and responsible use'
        },
        {
          point: 'Iterative process',
          detail: 'Data quality assurance is ongoing - monitor, detect, mitigate, validate, repeat'
        }
      ],
      transition: 'Next: When real data is insufficient, how do we generate synthetic data?'
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
    a.download = 'Part4_Challenges_Mitigation.html';
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
    <title>Part 4: Challenges & Mitigation Strategies</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #dc2626; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #ef4444; font-size: 24px; margin-top: 20px; }
        h3 { color: #333; font-size: 20px; margin-top: 15px; }
        .subtitle { color: #666; font-size: 18px; margin-bottom: 20px; }
        .box { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0; }
        ul { line-height: 1.8; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background: #dc2626; color: white; }
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
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-600 to-red-800 text-white p-12">
            <AlertTriangle className="w-24 h-24 mb-8" />
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
            <h2 className="text-4xl font-bold mb-3 text-red-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {slide.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <span className="text-red-600 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'challengeOverview':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-red-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-4">
              {slide.challenges.map((challenge, idx) => (
                <div key={idx} className="bg-white border-2 border-red-300 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-4xl mr-3">{challenge.icon}</span>
                    <h3 className="text-xl font-bold text-red-900">{challenge.name}</h3>
                  </div>
                  <p className="text-sm mb-3">{challenge.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-orange-100 p-2 rounded">
                      <p className="font-semibold">Frequency</p>
                      <p>{challenge.frequency}</p>
                    </div>
                    <div className="bg-red-100 p-2 rounded">
                      <p className="font-semibold">Severity</p>
                      <p>{challenge.severity}</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p className="font-semibold">Detection</p>
                      <p>{challenge.detectability}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg mt-4 border-l-4 border-yellow-500">
              <p className="text-base font-semibold text-yellow-900">⚠️ {slide.note}</p>
            </div>
          </div>
        );

      case 'challenge':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center mb-4">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">
                {slide.number}
              </div>
              <h2 className="text-3xl font-bold text-red-800">{slide.title}</h2>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg mb-4 border-l-4 border-red-500">
              <p className="text-base font-semibold mb-2">Definition: {slide.definition}</p>
              <p className="text-sm text-red-800">Impact: {slide.statisticalImpact}</p>
            </div>

            {slide.causes && (
              <div className="mb-4">
                <h3 className="font-bold text-gray-800 mb-2">Common Causes:</h3>
                <ul className="space-y-1">
                  {slide.causes.map((cause, idx) => (
                    <li key={idx} className="text-sm">• {cause}</li>
                  ))}
                </ul>
              </div>
            )}

            {slide.types && (
              <div className="mb-4 space-y-3">
                <h3 className="font-bold text-gray-800 mb-2">Types of Drift:</h3>
                {slide.types.map((type, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-900 mb-1">{type.type}</h4>
                    <p className="text-xs mb-1">{type.description}</p>
                    <p className="text-xs text-gray-600 mb-1"><em>Example: {type.example}</em></p>
                    <p className="text-xs"><strong>Detection:</strong> {type.detection}</p>
                    <p className="text-xs text-green-700"><strong>Fix:</strong> {type.fix}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.taxonomy && (
              <div className="mb-4 space-y-2">
                <h3 className="font-bold text-gray-800 mb-2">Missing Data Taxonomy:</h3>
                {slide.taxonomy.map((tax, idx) => (
                  <div key={idx} className="bg-white border p-3 rounded">
                    <h4 className="font-bold text-purple-900 mb-1">{tax.type}: {tax.full}</h4>
                    <p className="text-xs mb-1">{tax.description}</p>
                    <p className="text-xs text-gray-600 mb-1"><em>Example: {tax.example}</em></p>
                    <p className="text-xs text-red-700"><strong>Consequence:</strong> {tax.statisticalConsequence}</p>
                    <p className="text-xs"><strong>Testable:</strong> {tax.testable}</p>
                    <p className="text-xs text-green-700"><strong>Implication:</strong> {tax.implications}</p>
                  </div>
                ))}
              </div>
            )}

            {slide.realExample && (
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold mb-2 text-gray-800">Real Example: {slide.realExample.scenario}</h3>
                {Object.entries(slide.realExample).filter(([key]) => key !== 'scenario').map(([key, value], idx) => {
                  if (Array.isArray(value)) {
                    return (
                      <div key={idx} className="mb-2">
                        <p className="text-xs font-semibold capitalize">{key.replace(/_/g, ' ')}:</p>
                        <ul className="ml-4">
                          {value.map((item, i) => (
                            <li key={i} className="text-xs">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-xs mb-1">
                      <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
                    </p>
                  );
                })}
              </div>
            )}

            {slide.metricFailure && (
              <div className="bg-yellow-50 p-3 rounded-lg mb-4 border-l-4 border-yellow-500">
                <h3 className="font-bold text-yellow-900 mb-2">Why Metrics Fail:</h3>
                <p className="text-sm mb-2">{slide.metricFailure.misleading}</p>
                <p className="text-sm mb-2 text-red-700">{slide.metricFailure.accuracy}</p>
                <p className="text-xs font-semibold mb-1">Better Metrics:</p>
                {slide.metricFailure.betterMetrics.map((metric, idx) => (
                  <p key={idx} className="text-xs ml-3">• {metric}</p>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-bold text-green-800 mb-2">Mitigation Strategies:</h3>
              {slide.mitigations.map((mitigation, idx) => (
                <div key={idx} className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 text-sm mb-1">{mitigation.strategy}</h4>
                  <p className="text-xs mb-1">{mitigation.description}</p>
                  <p className="text-xs mb-1"><strong>Implementation:</strong> {mitigation.implementation}</p>
                  {mitigation.effectiveness && <p className="text-xs"><strong>Effectiveness:</strong> {mitigation.effectiveness}</p>}
                  {mitigation.pros && <p className="text-xs text-green-700"><strong>Pros:</strong> {mitigation.pros}</p>}
                  {mitigation.cons && <p className="text-xs text-red-700"><strong>Cons:</strong> {mitigation.cons}</p>}
                  {mitigation.cost && <p className="text-xs"><strong>Cost:</strong> {mitigation.cost}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'diagnosticFramework':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-red-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{slide.subtitle}</p>
            
            <div className="space-y-4">
              {slide.framework.map((category, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-300 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.tests.map((test, tIdx) => (
                      <div key={tIdx} className="bg-gray-50 p-3 rounded">
                        <h4 className="font-bold text-blue-900 text-sm mb-1">{test.name}</h4>
                        <p className="text-xs mb-1"><strong>Purpose:</strong> {test.purpose}</p>
                        {test.nullHypothesis !== 'N/A' && (
                          <p className="text-xs mb-1"><strong>H₀:</strong> {test.nullHypothesis}</p>
                        )}
                        <p className="text-xs mb-1 text-purple-700"><strong>Interpretation:</strong> {test.interpretation}</p>
                        <p className="text-xs font-mono bg-white p-1 rounded">{test.implementation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'documentationBestPractices':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-red-800">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <p className="text-base mb-2"><strong>Importance:</strong> {slide.importance}</p>
              <p className="text-sm"><strong>Framework:</strong> {slide.framework.name}</p>
              <p className="text-sm">{slide.framework.purpose}</p>
            </div>

            <div className="space-y-3">
              {slide.sections.map((section, idx) => (
                <div key={idx} className="bg-white border-l-4 border-blue-500 p-3 rounded">
                  <h3 className="font-bold text-blue-900 mb-2">{section.section}</h3>
                  <div className="text-xs mb-2">
                    {section.questions.map((q, qIdx) => (
                      <p key={qIdx} className="mb-1">• {q}</p>
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic">{section.importance}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg mt-4">
              <h3 className="font-bold text-yellow-900 mb-2">Critical Elements to Document:</h3>
              <div className="grid grid-cols-2 gap-2">
                {slide.criticalElements.map((elem, idx) => (
                  <p key={idx} className="text-xs">✓ {elem}</p>
                ))}
              </div>
            </div>
          </div>
        );

      case 'practicalWorkflow':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-red-800">{slide.title}</h2>
            
            <div className="space-y-3">
              {slide.workflow.map((phase, idx) => (
                <div key={idx} className="bg-white border-l-4 border-red-500 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-red-900">{phase.phase}</h3>
                    <span className="text-sm bg-red-100 px-3 py-1 rounded">{phase.duration}</span>
                  </div>
                  <div className="mb-2">
                    <p className="text-xs font-semibold mb-1">Activities:</p>
                    <ul className="ml-4">
                      {phase.activities.map((activity, aIdx) => (
                        <li key={aIdx} className="text-xs">• {activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Outputs:</p>
                    <p className="text-xs text-green-700 ml-4">{phase.outputs.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-100 p-4 rounded-lg mt-4">
              <p className="text-base font-semibold text-blue-900">{slide.totalTime}</p>
              <p className="text-sm text-blue-800 mt-2">{slide.note}</p>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="p-10 h-full flex flex-col bg-gradient-to-br from-red-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-red-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-red-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-red-900 mb-2">{idx + 1}. {kp.point}</h3>
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
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 4: Challenges & Mitigation Strategies</p>
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
              currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-red-600 hover:bg-red-700'
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