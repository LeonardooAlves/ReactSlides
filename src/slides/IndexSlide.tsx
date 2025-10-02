import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, BookOpen, FileText, Menu } from 'lucide-react';

const MasterIndexSlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'mainTitle',
      content: {
        title: 'Data Collection, Sampling & Synthetic Data Generation',
        subtitle: 'A Comprehensive Guide for AI Applications',
        course: 'MSc Applied Artificial Intelligence',
        level: 'Level 7 - Statistics for AI Module',
        instructor: 'Complete Session Materials',
        duration: '70 minutes + Lab Exercise'
      }
    },
    {
      type: 'sessionOverview',
      title: 'Complete Session Overview',
      totalDuration: '70 minutes',
      totalSlides: 89,
      structure: [
        {
          part: 'Part 1',
          title: 'Introduction & Motivation',
          duration: '8 minutes',
          slides: 12,
          color: 'blue',
          icon: '💡',
          topics: ['Why data matters', 'Real-world failures', 'Statistical foundation', 'AI amplification']
        },
        {
          part: 'Part 2',
          title: 'Data Collection - Concepts & Techniques',
          duration: '12 minutes',
          slides: 13,
          color: 'green',
          icon: '📊',
          topics: ['Collection methods', 'Quality dimensions', 'Observational vs experimental', 'Best practices']
        },
        {
          part: 'Part 3',
          title: 'Sampling Techniques - Theory & Practice',
          duration: '15 minutes',
          slides: 15,
          color: 'purple',
          icon: '🎯',
          topics: ['SRS, Stratified, Cluster', 'Reservoir sampling', 'Active learning', 'Practical considerations']
        },
        {
          part: 'Part 4',
          title: 'Challenges & Mitigation Strategies',
          duration: '12 minutes',
          slides: 13,
          color: 'red',
          icon: '⚠️',
          topics: ['Selection bias', 'Class imbalance', 'Temporal drift', 'Missing data']
        },
        {
          part: 'Part 5',
          title: 'Introduction to Synthetic Data',
          duration: '6 minutes',
          slides: 12,
          color: 'violet',
          icon: '✨',
          topics: ['When to use synthetic', 'Statistical requirements', 'Validation framework', 'Ethical considerations']
        },
        {
          part: 'Part 6',
          title: 'Synthetic Data Generation Techniques',
          duration: '10 minutes',
          slides: 13,
          color: 'emerald',
          icon: '🔬',
          topics: ['Distribution-based', 'GANs & VAEs', 'Simulation', 'MATLAB implementations']
        },
        {
          part: 'Part 7',
          title: 'Validation & Ethics',
          duration: '7 minutes',
          slides: 11,
          color: 'indigo',
          icon: '🛡️',
          topics: ['Multi-level validation', 'Privacy auditing', 'Responsible AI', 'Lab preview']
        }
      ]
    },
    {
      type: 'learningObjectives',
      title: 'Master Learning Objectives',
      subtitle: 'By completing this session, students will be able to:',
      categories: [
        {
          category: 'Knowledge & Understanding',
          objectives: [
            'Explain the statistical foundations of data collection and sampling',
            'Understand how data quality impacts AI model performance',
            'Describe the major challenges in real-world data practices',
            'Articulate when and why synthetic data is necessary',
            'Comprehend ethical considerations in data use for AI'
          ]
        },
        {
          category: 'Skills & Application',
          objectives: [
            'Apply appropriate sampling techniques based on problem constraints',
            'Implement data collection strategies for AI applications',
            'Generate synthetic data using multiple techniques',
            'Validate data quality using statistical and ML methods',
            'Conduct privacy audits for synthetic datasets'
          ]
        },
        {
          category: 'Analysis & Evaluation',
          objectives: [
            'Diagnose data quality issues in existing datasets',
            'Evaluate tradeoffs between different sampling strategies',
            'Assess synthetic data quality and utility',
            'Analyze ethical implications of data practices',
            'Compare and select appropriate generation techniques'
          ]
        },
        {
          category: 'Synthesis & Integration',
          objectives: [
            'Design complete data collection and validation pipelines',
            'Integrate real and synthetic data effectively',
            'Create documentation following industry standards',
            'Develop responsible AI practices for data use',
            'Apply learned concepts to novel problems'
          ]
        }
      ]
    },
    {
      type: 'contentMap',
      title: 'Content Navigation Map',
      parts: [
        {
          part: 'Part 1',
          sections: [
            { slide: '1-2', title: 'Introduction & Motivation', desc: 'Amazon case study, why data matters' },
            { slide: '3-4', title: 'Statistical Foundation', desc: 'MSE decomposition, bias vs variance' },
            { slide: '5-6', title: 'Statistics vs AI', desc: 'Amplification mechanisms' },
            { slide: '7-10', title: 'Real-World Dependencies', desc: 'Major AI systems, data quality crisis' },
            { slide: '11-12', title: 'Summary & Reflection', desc: 'Key takeaways, discussion questions' }
          ]
        },
        {
          part: 'Part 2',
          sections: [
            { slide: '1-3', title: 'Data Collection Framework', desc: 'Statistical framing, population vs frame' },
            { slide: '4-7', title: 'Collection Techniques', desc: 'Observational, experimental, streaming, crowdsourced' },
            { slide: '8-9', title: 'Quality & Comparison', desc: 'Five quality dimensions, technique comparison' },
            { slide: '10-12', title: 'Tradeoffs & Best Practices', desc: 'Real-world considerations' },
            { slide: '13', title: 'Summary', desc: 'Transition to sampling' }
          ]
        },
        {
          part: 'Part 3',
          sections: [
            { slide: '1-4', title: 'Sampling Foundation', desc: 'Why sampling matters, statistical goals' },
            { slide: '5-8', title: 'Core Techniques', desc: 'SRS, stratified, cluster, systematic' },
            { slide: '9-11', title: 'Advanced Techniques', desc: 'Reservoir, importance, active learning' },
            { slide: '12-14', title: 'Practical Implementation', desc: 'Comparison, considerations, best practices' },
            { slide: '15', title: 'Summary', desc: 'Transition to challenges' }
          ]
        },
        {
          part: 'Part 4',
          sections: [
            { slide: '1-3', title: 'Challenge Overview', desc: 'Four major challenges' },
            { slide: '4-7', title: 'Detailed Challenges', desc: 'Selection bias, imbalance, drift, missing data' },
            { slide: '8-9', title: 'Diagnostic Framework', desc: 'Statistical tests, documentation' },
            { slide: '10-12', title: 'Workflow & Summary', desc: 'Quality assurance process' },
            { slide: '13', title: 'Summary', desc: 'Transition to synthetic data' }
          ]
        },
        {
          part: 'Part 5',
          sections: [
            { slide: '1-4', title: 'Synthetic Data Introduction', desc: 'Definition, five key scenarios' },
            { slide: '5-6', title: 'Requirements & Validation', desc: 'Statistical requirements, validation framework' },
            { slide: '7-9', title: 'Tradeoffs & Ethics', desc: 'Fundamental tradeoffs, ethical considerations' },
            { slide: '10-11', title: 'Decision Framework', desc: 'When to use, best practices' },
            { slide: '12', title: 'Summary', desc: 'Transition to generation techniques' }
          ]
        },
        {
          part: 'Part 6',
          sections: [
            { slide: '1-3', title: 'Technique Overview', desc: 'Five generation techniques' },
            { slide: '4-8', title: 'Detailed Techniques', desc: 'Distribution, augmentation, GANs, VAEs, simulation' },
            { slide: '9-10', title: 'Comparison & Selection', desc: 'Comparison matrix, selection guide' },
            { slide: '11-12', title: 'Hybrid & Practical', desc: 'Combining techniques, implementation tips' },
            { slide: '13', title: 'Summary', desc: 'Transition to validation' }
          ]
        },
        {
          part: 'Part 7',
          sections: [
            { slide: '1-4', title: 'Validation Framework', desc: 'Four validation levels, statistical metrics' },
            { slide: '5', title: 'Privacy Auditing', desc: 'Membership inference, attribute inference, DCR' },
            { slide: '6-8', title: 'Ethics & Documentation', desc: 'Five ethical principles, responsible AI, datasheets' },
            { slide: '9-10', title: 'Lab & Integration', desc: 'Lab preview, practical workflow' },
            { slide: '11', title: 'Summary & Conclusion', desc: 'Final message, next steps' }
          ]
        }
      ]
    },
    {
      type: 'technicalTools',
      title: 'Technical Tools & Resources',
      categories: [
        {
          category: 'MATLAB Toolboxes Required',
          tools: [
            'Statistics and Machine Learning Toolbox',
            'Deep Learning Toolbox (for GANs, VAEs)',
            'Image Processing Toolbox (for augmentation)',
            'Optimization Toolbox (optional, for advanced methods)'
          ]
        },
        {
          category: 'Key MATLAB Functions Covered',
          tools: [
            'fitgmdist - Gaussian Mixture Models',
            'kstest2 - Kolmogorov-Smirnov test',
            'fitcensemble - Ensemble classifiers',
            'pdist2 - Distance calculations',
            'corr - Correlation analysis',
            'crossval - Cross-validation',
            'random - Random sampling from distributions'
          ]
        },
        {
          category: 'Datasets Provided',
          tools: [
            'creditcard_fraud.csv - Imbalanced classification',
            'customer_data.mat - Tabular data for GMM',
            'mnist_sample.mat - Image data for augmentation',
            'Template scripts and documentation forms'
          ]
        },
        {
          category: 'External Resources',
          tools: [
            'Datasheets for Datasets template',
            'Model Cards template',
            'Privacy audit checklist',
            'Best practices guide',
            'Reference implementations'
          ]
        }
      ]
    },
    {
      type: 'keyTakeaways',
      title: 'Master Key Takeaways',
      subtitle: 'Essential insights from the complete session',
      takeaways: [
        {
          number: 1,
          takeaway: 'Data quality is paramount',
          detail: 'Most AI failures stem from data problems, not model architecture. Statistical understanding of data collection and sampling is as important as knowing ML algorithms.',
          icon: '📊'
        },
        {
          number: 2,
          takeaway: 'No perfect data exists',
          detail: 'Every collection method and sampling technique involves tradeoffs. Success comes from understanding these tradeoffs and making informed choices.',
          icon: '⚖️'
        },
        {
          number: 3,
          takeaway: 'Stratified sampling is critical for AI',
          detail: 'Class imbalance is pervasive in real-world AI. Stratified sampling ensures minority class representation and prevents models from ignoring rare but important cases.',
          icon: '🎯'
        },
        {
          number: 4,
          takeaway: 'Validation must be rigorous',
          detail: 'Never assume data is good enough. Use multi-level validation: visual inspection, statistical tests, ML utility, and privacy auditing.',
          icon: '✓'
        },
        {
          number: 5,
          takeaway: 'Synthetic data is a tool, not magic',
          detail: 'Synthetic data addresses specific limitations but requires careful validation. Always test on real data before deployment.',
          icon: '✨'
        },
        {
          number: 6,
          takeaway: 'Ethics must be proactive',
          detail: 'Fairness, privacy, transparency, and accountability should guide every data decision. Responsible AI starts with responsible data practices.',
          icon: '🛡️'
        },
        {
          number: 7,
          takeaway: 'Documentation enables responsibility',
          detail: 'Comprehensive documentation (datasheets, model cards) provides transparency, enables proper use, and facilitates debugging.',
          icon: '📝'
        },
        {
          number: 8,
          takeaway: 'Start simple, validate often',
          detail: 'Begin with simplest approaches that might work. Add complexity only when validated as necessary. Iterate continuously.',
          icon: '🔄'
        }
      ]
    },
    {
      type: 'commonPitfalls',
      title: 'Common Pitfalls to Avoid',
      subtitle: 'Learn from these frequent mistakes',
      pitfalls: [
        {
          pitfall: 'Using accuracy for imbalanced data',
          why: 'Accuracy is misleading when classes are imbalanced',
          example: '99% accuracy predicting "not fraud" while catching 0% of fraud',
          solution: 'Use precision, recall, F1, AUC-ROC; always check confusion matrix'
        },
        {
          pitfall: 'Simple random sampling with rare classes',
          why: 'May miss minority classes entirely or get too few samples',
          example: 'Random sample of 1000 from dataset with 0.1% fraud gets ~1 fraud case',
          solution: 'Use stratified sampling to ensure minimum representation per class'
        },
        {
          pitfall: 'Ignoring temporal drift',
          why: 'Data distribution changes over time, violating IID assumption',
          example: 'COVID-19 made all pre-2020 consumer behavior models obsolete',
          solution: 'Monitor for drift, use sliding windows, implement online learning'
        },
        {
          pitfall: 'Treating all missing data as MCAR',
          why: 'Missingness often depends on unobserved values (MNAR)',
          example: 'Sicker patients have more missing tests - deleting them biases model',
          solution: 'Test for MCAR, use appropriate imputation, consider missingness as feature'
        },
        {
          pitfall: 'Assuming synthetic data is private',
          why: 'GANs can memorize and reproduce training examples',
          example: 'Synthetic medical data that contains identifiable patient records',
          solution: 'Conduct privacy audits: membership inference, DCR analysis'
        },
        {
          pitfall: 'No validation of synthetic data',
          why: 'Synthetic may not preserve statistical properties needed for learning',
          example: 'Synthetic data looks good visually but models trained on it fail',
          solution: 'Always validate: TSTR performance gap, statistical tests, privacy audits'
        },
        {
          pitfall: 'Collecting more features than needed',
          why: 'Increases cost, privacy risk, and curse of dimensionality',
          example: 'Collecting unnecessary demographic data that creates privacy liability',
          solution: 'Purpose limitation - collect only what is needed for specific use case'
        },
        {
          pitfall: 'No documentation of data practices',
          why: 'Cannot reproduce, debug, or audit without documentation',
          example: 'Cannot determine why model failed or what data was used for training',
          solution: 'Create datasheets, version control data, document all transformations'
        }
      ]
    },
    {
      type: 'labExercise',
      title: 'Hands-On Lab Exercise',
      subtitle: 'Post-session practical application (60 minutes)',
      overview: 'Apply learned concepts to real imbalanced dataset with three integrated parts',
      parts: [
        {
          part: 'Part A',
          title: 'Sampling Techniques Comparison',
          duration: '20 minutes',
          objectives: [
            'Load and explore imbalanced credit card fraud dataset',
            'Implement Simple Random Sampling (SRS)',
            'Implement Stratified Sampling',
            'Train classifiers on each sample',
            'Compare performance metrics (especially on minority class)'
          ],
          deliverable: 'Performance comparison report with confusion matrices',
          skills: 'Sampling implementation, classifier training, performance evaluation'
        },
        {
          part: 'Part B',
          title: 'Synthetic Data Generation',
          duration: '25 minutes',
          objectives: [
            'Generate synthetic data using Gaussian Mixture Model',
            'Generate synthetic data using SMOTE (Synthetic Minority Oversampling)',
            'Visualize real vs synthetic distributions',
            'Create hybrid dataset (real + synthetic)',
            'Train classifier on hybrid and evaluate on real test set'
          ],
          deliverable: 'Synthetic data quality report with visualizations',
          skills: 'GMM fitting, SMOTE implementation, data augmentation, evaluation'
        },
        {
          part: 'Part C',
          title: 'Validation & Documentation',
          duration: '15 minutes',
          objectives: [
            'Run Kolmogorov-Smirnov test on synthetic vs real',
            'Compare statistical moments (mean, variance, correlation)',
            'Calculate TSTR performance gap',
            'Perform Distance to Closest Record (DCR) analysis',
            'Create mini datasheet documenting the synthetic dataset'
          ],
          deliverable: 'Complete validation report and datasheet',
          skills: 'Statistical testing, privacy auditing, documentation'
        }
      ],
      assessment: {
        type: 'Self-guided with checkpoints',
        checkpoints: [
          'Checkpoint 1: SRS vs Stratified comparison complete',
          'Checkpoint 2: Synthetic data generated and visualized',
          'Checkpoint 3: Full validation completed with documentation'
        ],
        referenceProvided: 'Complete reference solutions for self-assessment',
        supportAvailable: 'Teaching assistants available for questions'
      }
    },
    {
      type: 'assessmentCriteria',
      title: 'Learning Assessment Criteria',
      subtitle: 'How mastery of this content will be evaluated',
      criteria: [
        {
          criterion: 'Technical Understanding (30%)',
          components: [
            'Explain statistical foundations of sampling and collection',
            'Describe how data quality impacts model performance',
            'Understand synthetic data generation techniques',
            'Comprehend validation methods and metrics'
          ],
          assessment: 'Written exam, concept questions, technical explanations'
        },
        {
          criterion: 'Practical Implementation (40%)',
          components: [
            'Correctly implement sampling techniques in MATLAB',
            'Generate and validate synthetic data',
            'Conduct statistical tests and interpret results',
            'Create complete data processing pipelines'
          ],
          assessment: 'Lab exercise deliverables, code quality, results correctness'
        },
        {
          criterion: 'Critical Analysis (20%)',
          components: [
            'Diagnose data quality issues in given datasets',
            'Evaluate tradeoffs between different approaches',
            'Assess synthetic data quality appropriately',
            'Identify ethical concerns in data practices'
          ],
          assessment: 'Case study analysis, problem-solving questions'
        },
        {
          criterion: 'Documentation & Communication (10%)',
          components: [
            'Create clear datasheets and documentation',
            'Explain technical concepts to non-technical audiences',
            'Present findings with appropriate visualizations',
            'Document code and processes effectively'
          ],
          assessment: 'Documentation quality, presentation clarity'
        }
      ]
    },
    {
      type: 'furtherResources',
      title: 'Further Learning Resources',
      categories: [
        {
          category: 'Foundational Papers',
          resources: [
            'Gebru et al. (2018) - Datasheets for Datasets',
            'Mitchell et al. (2019) - Model Cards for Model Reporting',
            'Goodfellow et al. (2014) - Generative Adversarial Networks',
            'Kingma & Welling (2014) - Auto-Encoding Variational Bayes',
            'Chawla et al. (2002) - SMOTE: Synthetic Minority Over-sampling'
          ]
        },
        {
          category: 'Books',
          resources: [
            'Sampling: Design and Analysis (Lohr) - Comprehensive sampling theory',
            'The Elements of Statistical Learning (Hastie et al.) - ML fundamentals',
            'Fairness and Machine Learning (Barocas et al.) - Ethics and fairness',
            'Deep Learning (Goodfellow et al.) - Neural network foundations'
          ]
        },
        {
          category: 'Online Courses',
          resources: [
            'Coursera: Sampling and Survey Design (University of Michigan)',
            'MIT OpenCourseWare: Statistics for Applications',
            'Fast.ai: Practical Deep Learning for Coders',
            'DeepLearning.AI: AI For Everyone (ethics focus)'
          ]
        },
        {
          category: 'Tools & Libraries',
          resources: [
            'MATLAB Statistics and Machine Learning Toolbox',
            'Python: scikit-learn, imbalanced-learn, synthetic-data-vault',
            'SDV (Synthetic Data Vault) for tabular data',
            'Faker for simple synthetic data generation'
          ]
        },
        {
          category: 'Journals & Conferences',
          resources: [
            'Journal of Machine Learning Research (JMLR)',
            'NeurIPS (Conference on Neural Information Processing)',
            'ICML (International Conference on Machine Learning)',
            'FAccT (Conference on Fairness, Accountability, and Transparency)'
          ]
        }
      ]
    },
    {
      type: 'contactSupport',
      title: 'Support & Contact Information',
      sections: [
        {
          type: 'Technical Support',
          info: [
            'Lab assistance: Available during scheduled lab hours',
            'MATLAB help: Consult documentation and teaching assistants',
            'Code debugging: Office hours by appointment',
            'Dataset access: Available on course portal'
          ]
        },
        {
          type: 'Content Questions',
          info: [
            'Conceptual questions: Post on course forum',
            'Clarifications: Email course instructor',
            'Additional examples: Consult recommended readings',
            'Advanced topics: Arrange individual consultation'
          ]
        },
        {
          type: 'Ethical Concerns',
          info: [
            'Data ethics questions: Contact designated ethics officer',
            'Privacy concerns: Consult with data protection officer',
            'Bias issues: Discuss with fairness team',
            'Responsible AI: Refer to university AI ethics guidelines'
          ]
        }
      ],
      additionalResources: [
        'Course website: [URL to be provided]',
        'Slack channel: #statistics-for-ai',
        'Office hours: Wednesdays 2-4 PM',
        'Discussion forum: Active monitoring during term'
      ]
    },
    {
      type: 'finalSlide',
      title: 'Session Complete',
      message: 'You are now equipped with the knowledge and tools to collect, sample, generate, and validate data responsibly for AI applications.',
      nextActions: [
        {
          action: 'Complete the Lab Exercise',
          description: 'Apply these concepts hands-on with the provided dataset',
          icon: '🔬'
        },
        {
          action: 'Review Session Materials',
          description: 'All 7 parts available for download (89 slides total)',
          icon: '📚'
        },
        {
          action: 'Explore Further Resources',
          description: 'Dive deeper into topics of particular interest',
          icon: '🌐'
        },
        {
          action: 'Apply to Your Projects',
          description: 'Use these principles in your own AI work',
          icon: '🚀'
        }
      ],
      quote: {
        text: 'Responsible AI starts with responsible data practices.',
        attribution: 'Core principle of this session'
      },
      finalNote: 'Thank you for your attention and engagement. Best of luck with your AI journey!'
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
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Master Index - Data Collection, Sampling & Synthetic Data</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #1e40af; font-size: 32px; }
        @media print { .slide { page-break-after: always; } body { background: white; } }
    </style>
</head>
<body>
    <div class="slide"><h1>Master Index - Complete Session</h1><p>89 slides across 7 parts covering data collection, sampling, and synthetic data generation for AI applications.</p></div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Master_Index_Complete_Session.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-500',
      green: 'bg-green-100 border-green-500',
      purple: 'bg-purple-100 border-purple-500',
      red: 'bg-red-100 border-red-500',
      violet: 'bg-violet-100 border-violet-500',
      emerald: 'bg-emerald-100 border-emerald-500',
      indigo: 'bg-indigo-100 border-indigo-500'
    };
    return colors[color] || 'bg-gray-100 border-gray-500';
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'mainTitle':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white p-12">
            <BookOpen className="w-32 h-32 mb-8 animate-pulse" />
            <h1 className="text-6xl font-bold mb-6 text-center leading-tight">{slide.content.title}</h1>
            <div className="h-2 w-48 bg-white rounded mb-8"></div>
            <p className="text-3xl mb-4 font-semibold text-center">{slide.content.subtitle}</p>
            <p className="text-2xl mb-3 opacity-90">{slide.content.course}</p>
            <p className="text-xl opacity-80 mb-3">{slide.content.level}</p>
            <p className="text-lg opacity-75 mb-6">{slide.content.instructor}</p>
            <div className="bg-white bg-opacity-20 px-8 py-4 rounded-lg">
              <p className="text-2xl font-bold">{slide.content.duration}</p>
            </div>
          </div>
        );

      case 'sessionOverview':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4 text-indigo-900">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-indigo-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-indigo-900">{slide.totalDuration}</p>
                <p className="text-sm text-gray-700">Total Duration</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-purple-900">{slide.totalSlides}</p>
                <p className="text-sm text-gray-700">Total Slides</p>
              </div>
            </div>
            <div className="space-y-3">
              {slide.structure.map((part, idx) => (
                <div key={idx} className={`border-l-4 p-4 rounded-lg ${getColorClass(part.color)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{part.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold">{part.part}: {part.title}</h3>
                        <p className="text-xs text-gray-600">{part.duration} • {part.slides} slides</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {part.topics.map((topic, tIdx) => (
                      <span key={tIdx} className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'learningObjectives':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-3 text-indigo-900">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-4">
              {slide.categories.map((category, idx) => (
                <div key={idx} className="bg-white border-2 border-indigo-300 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-indigo-900 mb-3">{category.category}</h3>
                  <ul className="space-y-2 text-sm">
                    {category.objectives.map((obj, oIdx) => (
                      <li key={oIdx} className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contentMap':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-indigo-900">{slide.title}</h2>
            <div className="space-y-4">
              {slide.parts.map((part, idx) => (
                <div key={idx} className="bg-white border-2 border-gray-300 p-3 rounded-lg">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">{part.part}</h3>
                  <div className="space-y-2">
                    {part.sections.map((section, sIdx) => (
                      <div key={sIdx} className="flex items-start text-sm bg-gray-50 p-2 rounded">
                        <span className="font-mono text-xs bg-indigo-100 px-2 py-1 rounded mr-3">{section.slide}</span>
                        <div>
                          <p className="font-semibold">{section.title}</p>
                          <p className="text-xs text-gray-600">{section.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technicalTools':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-6 text-indigo-900">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {slide.categories.map((category, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">{category.category}</h3>
                  <ul className="space-y-2 text-sm">
                    {category.tools.map((tool, tIdx) => (
                      <li key={tIdx} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'keyTakeaways':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-3">
              {slide.takeaways.map((takeaway, idx) => (
                <div key={idx} className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex items-center mr-3">
                      <span className="text-2xl">{takeaway.icon}</span>
                      <div className="bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm ml-2">
                        {takeaway.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-indigo-900 mb-1">{takeaway.takeaway}</h3>
                      <p className="text-sm text-gray-700">{takeaway.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'commonPitfalls':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-3">
              {slide.pitfalls.map((pitfall, idx) => (
                <div key={idx} className="bg-white border-l-4 border-red-500 p-3 rounded">
                  <h3 className="font-bold text-base text-red-900 mb-2">❌ {pitfall.pitfall}</h3>
                  <p className="text-xs mb-1"><span className="font-semibold">Why:</span> {pitfall.why}</p>
                  <p className="text-xs mb-1 text-gray-600"><em>Example: {pitfall.example}</em></p>
                  <p className="text-xs text-green-700"><span className="font-semibold">✓ Solution:</span> {pitfall.solution}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'labExercise':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="bg-blue-100 p-3 rounded-lg mb-4">
              <p className="text-sm font-semibold text-blue-900">{slide.overview}</p>
            </div>
            <div className="space-y-3">
              {slide.parts.map((part, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-blue-900">{part.part}: {part.title}</h3>
                      <p className="text-xs text-gray-600">{part.duration}</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1 mb-2">
                    {part.objectives.map((obj, oIdx) => (
                      <li key={oIdx}>• {obj}</li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-xs font-semibold text-green-900">Deliverable:</p>
                      <p className="text-xs">{part.deliverable}</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <p className="text-xs font-semibold text-purple-900">Skills:</p>
                      <p className="text-xs">{part.skills}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg mt-4">
              <p className="text-sm"><strong>Assessment:</strong> {slide.assessment.type}</p>
              <p className="text-xs mt-1">{slide.assessment.referenceProvided}</p>
            </div>
          </div>
        );

      case 'assessmentCriteria':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900">{slide.title}</h2>
            <p className="text-lg text-gray-600 mb-4">{slide.subtitle}</p>
            <div className="space-y-3">
              {slide.criteria.map((criterion, idx) => (
                <div key={idx} className="bg-white border-2 border-indigo-300 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">{criterion.criterion}</h3>
                  <ul className="text-sm space-y-1 mb-2">
                    {criterion.components.map((comp, cIdx) => (
                      <li key={cIdx}>• {comp}</li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs"><strong>Assessment Method:</strong> {criterion.assessment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'furtherResources':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-6 text-indigo-900">{slide.title}</h2>
            <div className="space-y-4">
              {slide.categories.map((category, idx) => (
                <div key={idx} className="bg-white border-l-4 border-indigo-500 p-4 rounded">
                  <h3 className="text-lg font-bold text-indigo-900 mb-2">{category.category}</h3>
                  <ul className="text-sm space-y-1">
                    {category.resources.map((resource, rIdx) => (
                      <li key={rIdx}>• {resource}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contactSupport':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-4xl font-bold mb-6 text-indigo-900">{slide.title}</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {slide.sections.map((section, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">{section.type}</h3>
                  <ul className="text-sm space-y-2">
                    {section.info.map((item, iIdx) => (
                      <li key={iIdx} className="text-xs">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-2">Additional Resources:</h3>
              <ul className="text-sm space-y-1">
                {slide.additionalResources.map((resource, idx) => (
                  <li key={idx}>• {resource}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'finalSlide':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 text-white p-12">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-6">{slide.title}</h1>
              <div className="h-1 w-32 bg-white mx-auto mb-6"></div>
              <p className="text-2xl mb-8 max-w-3xl">{slide.message}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-4xl">
              {slide.nextActions.map((action, idx) => (
                <div key={idx} className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{action.action}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white bg-opacity-20 p-6 rounded-lg max-w-2xl backdrop-blur mb-6">
              <p className="text-2xl italic mb-2">"{slide.quote.text}"</p>
              <p className="text-sm opacity-80">— {slide.quote.attribution}</p>
            </div>

            <p className="text-lg opacity-90">{slide.finalNote}</p>
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
      
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between no-print">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            currentSlide === 0 ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Master Index - Complete Session</p>
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
              currentSlide === slides.length - 1 ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-indigo-600 hover:bg-indigo-700'
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

export default MasterIndexSlideShow;