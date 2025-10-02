import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Sparkles, FileText, Code } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'title',
      content: {
        title: 'Synthetic Data Generation Techniques',
        subtitle: 'Part 6: Methods and Applications',
        details: 'Statistics for AI Applications',
        course: 'MSc Applied Artificial Intelligence'
      }
    },
    {
      type: 'overview',
      title: 'Part 6 Overview',
      duration: '10 minutes',
      topics: [
        'Five major synthetic data generation techniques',
        'Statistical basis for each method',
        'AI applications and use cases',
        'MATLAB implementation examples',
        'Advantages and limitations of each approach',
        'Technique comparison and selection guidance'
      ]
    },
    {
      type: 'techniqueOverview',
      title: 'Five Synthetic Data Generation Techniques',
      techniques: [
        {
          number: 1,
          name: 'Statistical Distribution-Based',
          icon: '📊',
          complexity: 'Low',
          dataType: 'Tabular',
          basis: 'Parametric estimation',
          bestFor: 'Simple structured data'
        },
        {
          number: 2,
          name: 'Data Augmentation',
          icon: '🔄',
          complexity: 'Low-Medium',
          dataType: 'Images, Text, Time Series',
          basis: 'Invariant transformations',
          bestFor: 'Expanding existing datasets'
        },
        {
          number: 3,
          name: 'Generative Adversarial Networks (GANs)',
          icon: '🎭',
          complexity: 'High',
          dataType: 'Images, Tabular, Sequences',
          basis: 'Implicit density estimation',
          bestFor: 'High-quality realistic data'
        },
        {
          number: 4,
          name: 'Variational Autoencoders (VAEs)',
          icon: '🔀',
          complexity: 'Medium-High',
          dataType: 'Images, Sequences, Structured',
          basis: 'Variational inference',
          bestFor: 'Controlled generation'
        },
        {
          number: 5,
          name: 'Simulation-Based',
          icon: '🎮',
          complexity: 'Variable',
          dataType: 'Domain-specific',
          basis: 'Known data-generating process',
          bestFor: 'Physics-based scenarios'
        }
      ]
    },
    {
      type: 'technique',
      number: 1,
      title: 'Technique 1: Statistical Distribution-Based Generation',
      subtitle: 'Parametric density estimation and sampling',
      statisticalBasis: 'Fit probability distribution to real data, then sample from fitted distribution',
      method: {
        step1: 'Estimate distribution parameters θ̂ from real data',
        step2: 'θ̂ = argmax L(θ|X_real) - Maximum likelihood estimation',
        step3: 'Generate synthetic samples: X_synthetic ~ P(X|θ̂)',
        assumption: 'Data follows chosen distribution family'
      },
      commonDistributions: [
        'Gaussian (Normal): Continuous, symmetric data',
        'Gaussian Mixture Model (GMM): Multi-modal continuous data',
        'Multinomial: Categorical data',
        'Copulas: Model dependencies between variables'
      ],
      example: {
        scenario: 'Customer Demographics Generation',
        task: 'Generate synthetic customer age and income data',
        approach: 'Fit bivariate Gaussian or GMM to real data',
        process: 'Estimate mean vector μ and covariance matrix Σ, then sample'
      },
      matlabCode: `% MATLAB: Statistical Distribution-Based Generation
% Load real customer data
load('customer_data.mat'); % age, income columns

% Fit Gaussian Mixture Model with 3 components
gmm = fitgmdist([age, income], 3);

% Generate 1000 synthetic samples
n_synthetic = 1000;
synthetic_data = random(gmm, n_synthetic);

% Extract synthetic age and income
synthetic_age = synthetic_data(:, 1);
synthetic_income = synthetic_data(:, 2);

% Visualize comparison
figure;
subplot(1,2,1);
scatter(age, income, 'b.');
title('Real Data');
xlabel('Age'); ylabel('Income');

subplot(1,2,2);
scatter(synthetic_age, synthetic_income, 'r.');
title('Synthetic Data');
xlabel('Age'); ylabel('Income');`,
      advantages: [
        'Simple to implement and understand',
        'Fast generation once fitted',
        'Mathematically well-founded',
        'Controllable properties'
      ],
      limitations: [
        'Assumes data follows chosen distribution',
        'May not capture complex patterns',
        'Limited to distributions we can specify',
        'Struggles with high-dimensional data'
      ],
      aiApplications: [
        'Tabular data generation (customer data, financial records)',
        'Baseline for comparison with complex methods',
        'Privacy-preserving synthetic databases',
        'Monte Carlo simulations'
      ]
    },
    {
      type: 'technique',
      number: 2,
      title: 'Technique 2: Data Augmentation',
      subtitle: 'Label-preserving transformations to increase diversity',
      statisticalBasis: 'Apply transformations that preserve label while sampling from invariance distribution',
      method: {
        step1: 'Identify label-preserving transformations for domain',
        step2: 'Apply random transformations to existing samples',
        step3: 'Verify transformed samples maintain semantic meaning',
        key: 'Transformation must not change the true label'
      },
      transformations: {
        images: [
          'Geometric: Rotation, flipping, cropping, scaling',
          'Color: Brightness, contrast, saturation adjustment',
          'Noise: Gaussian noise, blur',
          'Advanced: Mixup, CutMix, AutoAugment'
        ],
        text: [
          'Synonym replacement',
          'Back-translation (translate to another language and back)',
          'Random insertion, deletion, swap',
          'Paraphrasing with language models'
        ],
        timeSeries: [
          'Time warping (stretch/compress)',
          'Window slicing',
          'Magnitude warping',
          'Adding noise'
        ]
      },
      example: {
        scenario: 'Image Classification Dataset Expansion',
        task: 'Train digit classifier with limited data (MNIST)',
        original: '60,000 training images',
        augmented: '600,000 images (10 variations per image)',
        result: 'Improved accuracy by 5-10%, reduced overfitting'
      },
      matlabCode: `% MATLAB: Image Data Augmentation
% Load original image
img = imread('digit_5.png');

% Define augmentation parameters
angles = [-15, -10, 0, 10, 15]; % rotation angles
scales = [0.9, 0.95, 1.0, 1.05, 1.1]; % scale factors

% Generate augmented versions
augmented_images = {};
count = 1;

for angle = angles
    for scale = scales
        % Rotate
        img_rotated = imrotate(img, angle, 'bilinear', 'crop');
        
        % Scale
        img_scaled = imresize(img_rotated, scale);
        
        % Adjust to original size if needed
        [h, w] = size(img);
        img_final = imresize(img_scaled, [h, w]);
        
        % Add to collection
        augmented_images{count} = img_final;
        count = count + 1;
    end
end

% Display original and some augmented versions
figure;
subplot(2,3,1); imshow(img); title('Original');
for i = 1:5
    subplot(2,3,i+1); 
    imshow(augmented_images{i*5});
    title(['Augmented ', num2str(i)]);
end`,
      advantages: [
        'Simple and fast to implement',
        'No training required',
        'Preserves real data characteristics',
        'Domain knowledge can guide transformations',
        'Proven effective in practice'
      ],
      limitations: [
        'Limited diversity (based on transformations)',
        'Requires domain expertise',
        'May create unrealistic combinations',
        'Cannot generate truly novel samples'
      ],
      aiApplications: [
        'Standard practice in computer vision',
        'NLP data augmentation',
        'Audio and speech processing',
        'Time series forecasting'
      ]
    },
    {
      type: 'technique',
      number: 3,
      title: 'Technique 3: Generative Adversarial Networks (GANs)',
      subtitle: 'Two networks in competition: Generator vs. Discriminator',
      statisticalBasis: 'Implicit density estimation through adversarial game theory',
      architecture: {
        generator: 'G: Z → X (maps random noise to synthetic data)',
        discriminator: 'D: X → [0,1] (probability that input is real)',
        objective: 'min_G max_D E[log D(X_real)] + E[log(1 - D(G(Z)))]',
        intuition: 'Generator learns to fool discriminator by matching real distribution'
      },
      trainingProcess: [
        '1. Initialize G and D with random weights',
        '2. Train D to distinguish real from fake (maximize D accuracy)',
        '3. Train G to generate realistic samples (minimize D accuracy)',
        '4. Iterate until equilibrium (D cannot tell real from fake)',
        '5. Use trained G to generate synthetic data'
      ],
      example: {
        scenario: 'Synthetic Face Generation',
        dataset: 'CelebA (celebrity faces)',
        model: 'StyleGAN2',
        result: 'Photorealistic synthetic faces indistinguishable from real',
        application: 'Privacy-preserving face datasets, data augmentation'
      },
      matlabCode: `% MATLAB: Simple GAN for 1D Data (Conceptual)
% Note: Full GAN implementation requires Deep Learning Toolbox

% Generator Network
generator_layers = [
    featureInputLayer(100, 'Name', 'noise_input')
    fullyConnectedLayer(128, 'Name', 'fc1')
    reluLayer('Name', 'relu1')
    fullyConnectedLayer(256, 'Name', 'fc2')
    reluLayer('Name', 'relu2')
    fullyConnectedLayer(1, 'Name', 'output')
];

% Discriminator Network
discriminator_layers = [
    featureInputLayer(1, 'Name', 'data_input')
    fullyConnectedLayer(256, 'Name', 'fc1')
    leakyReluLayer(0.2, 'Name', 'lrelu1')
    fullyConnectedLayer(128, 'Name', 'fc2')
    leakyReluLayer(0.2, 'Name', 'lrelu2')
    fullyConnectedLayer(1, 'Name', 'fc3')
    sigmoidLayer('Name', 'output')
];

% Training loop (simplified)
num_epochs = 1000;
batch_size = 64;

for epoch = 1:num_epochs
    % 1. Train Discriminator
    noise = randn(100, batch_size);
    fake_data = predict(generator_net, noise);
    real_data = randsample(real_dataset, batch_size);
    
    % Discriminator loss and update
    % [Implementation details omitted for brevity]
    
    % 2. Train Generator
    noise = randn(100, batch_size);
    % Generator loss and update
    % [Implementation details omitted for brevity]
end

% Generate synthetic samples
noise_test = randn(100, 1000);
synthetic_samples = predict(generator_net, noise_test);`,
      advantages: [
        'Can generate very high-quality, realistic data',
        'No explicit density modeling required',
        'Captures complex data distributions',
        'State-of-the-art for image generation'
      ],
      limitations: [
        'Training instability (mode collapse, non-convergence)',
        'Requires large datasets and computational resources',
        'Difficult to evaluate quality objectively',
        'May memorize training samples',
        'Hyperparameter sensitive'
      ],
      aiApplications: [
        'Image synthesis (faces, art, medical imaging)',
        'Video generation',
        'Tabular data (e.g., CTGAN for categorical data)',
        'Drug molecule generation',
        'Data augmentation for rare classes'
      ],
      variants: [
        'DCGAN: Deep Convolutional GAN',
        'StyleGAN: High-quality face generation with style control',
        'CycleGAN: Unpaired image-to-image translation',
        'CTGAN: Conditional Tabular GAN',
        'WGAN: Wasserstein GAN (improved training stability)'
      ]
    },
    {
      type: 'technique',
      number: 4,
      title: 'Technique 4: Variational Autoencoders (VAEs)',
      subtitle: 'Learn latent representation, then sample and decode',
      statisticalBasis: 'Variational inference - approximate intractable P(X) via tractable Q(Z|X)',
      architecture: {
        encoder: 'Q(Z|X): Maps data X to latent distribution parameters (μ, σ)',
        latentSpace: 'Z ~ N(μ, σ²) - continuous latent representation',
        decoder: 'P(X|Z): Reconstructs data from latent code',
        objective: 'Maximize ELBO = E[log P(X|Z)] - KL[Q(Z|X)||P(Z)]'
      },
      elboComponents: {
        reconstruction: 'E[log P(X|Z)] - How well decoder reconstructs input',
        regularization: 'KL[Q(Z|X)||P(Z)] - Keep latent space close to prior N(0,I)',
        balance: 'Trade-off between reconstruction quality and latent space structure'
      },
      process: [
        '1. Encoder maps input X to latent distribution Q(Z|X)',
        '2. Sample Z from Q(Z|X) using reparameterization trick',
        '3. Decoder reconstructs X from Z',
        '4. Compute ELBO loss and backpropagate',
        '5. For generation: Sample Z ~ N(0,I), decode to get synthetic X'
      ],
      example: {
        scenario: 'Molecular Drug Generation',
        task: 'Generate novel drug molecules with desired properties',
        approach: 'Encode known drugs into latent space, sample for new molecules',
        result: 'Novel molecular structures with predicted efficacy'
      },
      matlabCode: `% MATLAB: VAE for MNIST Digits (Simplified)
% Encoder Network
encoder_layers = [
    imageInputLayer([28 28 1])
    convolution2dLayer(3, 32, 'Padding', 'same')
    reluLayer
    maxPooling2dLayer(2, 'Stride', 2)
    convolution2dLayer(3, 64, 'Padding', 'same')
    reluLayer
    maxPooling2dLayer(2, 'Stride', 2)
    fullyConnectedLayer(128)
];

% Latent layer (mean and log-variance)
latent_dim = 20;
% Split into mu and log_var branches

% Decoder Network
decoder_layers = [
    featureInputLayer(latent_dim)
    fullyConnectedLayer(7*7*64)
    reluLayer
    % Reshape to 7x7x64
    transposedConv2dLayer(3, 32, 'Stride', 2, 'Cropping', 'same')
    reluLayer
    transposedConv2dLayer(3, 1, 'Stride', 2, 'Cropping', 'same')
    sigmoidLayer
];

% Training (simplified)
for epoch = 1:num_epochs
    for batch = 1:num_batches
        % Forward pass
        [mu, log_var] = encoder(X_batch);
        
        % Reparameterization trick
        epsilon = randn(size(mu));
        Z = mu + exp(0.5 * log_var) .* epsilon;
        
        % Decode
        X_reconstructed = decoder(Z);
        
        % Compute ELBO loss
        reconstruction_loss = mean((X_batch - X_reconstructed).^2);
        kl_loss = -0.5 * mean(1 + log_var - mu.^2 - exp(log_var));
        total_loss = reconstruction_loss + kl_loss;
        
        % Backpropagation and update
        % [Implementation details omitted]
    end
end

% Generate new samples
Z_sample = randn(latent_dim, num_samples);
synthetic_images = predict(decoder_net, Z_sample);`,
      advantages: [
        'More stable training than GANs',
        'Explicit likelihood (can compute P(X))',
        'Structured latent space (interpolation works well)',
        'Principled probabilistic framework',
        'Good for controlled generation'
      ],
      limitations: [
        'Generated samples often blurrier than GANs',
        'May not capture fine details',
        'Balancing reconstruction vs. regularization is tricky',
        'Computationally intensive'
      ],
      aiApplications: [
        'Drug discovery (novel molecule generation)',
        'Anomaly detection (reconstruction error)',
        'Data compression',
        'Semi-supervised learning',
        'Image generation and editing'
      ]
    },
    {
      type: 'technique',
      number: 5,
      title: 'Technique 5: Simulation-Based Synthetic Data',
      subtitle: 'Physics-based and rule-based models generate data',
      statisticalBasis: 'Known data-generating process (DGP) with controllable parameters',
      approach: {
        model: 'Build computational model of real-world process',
        parameters: 'Define parameters controlling scenarios (weather, lighting, etc.)',
        simulation: 'Run simulations to generate synthetic observations',
        labels: 'Labels come automatically from simulation (perfect ground truth)'
      },
      types: [
        'Physics-based: Use physical laws (gravity, optics, dynamics)',
        'Agent-based: Simulate behavior of autonomous agents',
        'Procedural: Rule-based generation (games, environments)',
        'Monte Carlo: Random sampling from known distributions'
      ],
      example: {
        scenario: 'Autonomous Vehicle Training',
        simulators: 'CARLA, AirSim, LGSVL',
        capabilities: [
          'Generate diverse driving scenarios',
          'Control weather (rain, fog, night)',
          'Vary traffic density and behavior',
          'Create rare events (pedestrian crossings, accidents)',
          'Perfect labels (bounding boxes, segmentation, depth)'
        ],
        benefit: 'Train and test without real-world risk, zero labeling cost'
      },
      matlabCode: `% MATLAB: Simple Simulation - Projectile Motion Data
% Generate synthetic data for projectile trajectory prediction

% Parameters
g = 9.81; % gravity (m/s^2)
num_samples = 1000;

% Generate random initial conditions
v0 = 20 + 10*rand(num_samples, 1); % initial velocity (m/s)
theta = 30 + 30*rand(num_samples, 1); % launch angle (degrees)

% Convert to radians
theta_rad = deg2rad(theta);

% Compute trajectory features
t_flight = 2*v0.*sin(theta_rad)/g; % flight time
range_x = v0.^2.*sin(2*theta_rad)/g; % horizontal range
max_height = (v0.*sin(theta_rad)).^2/(2*g); % max height

% Add realistic noise
noise_level = 0.05;
range_x = range_x .* (1 + noise_level*randn(size(range_x)));
max_height = max_height .* (1 + noise_level*randn(size(max_height)));

% Create synthetic dataset
synthetic_data = table(v0, theta, t_flight, range_x, max_height);

% Visualize some trajectories
figure;
hold on;
for i = 1:10
    t = linspace(0, t_flight(i), 100);
    x = v0(i)*cos(theta_rad(i))*t;
    y = v0(i)*sin(theta_rad(i))*t - 0.5*g*t.^2;
    plot(x, y);
end
xlabel('Distance (m)');
ylabel('Height (m)');
title('Synthetic Projectile Trajectories');
grid on;

% Save synthetic dataset
writetable(synthetic_data, 'synthetic_projectile_data.csv');`,
      advantages: [
        'Perfect labels at zero cost',
        'Complete control over scenarios',
        'Can generate rare/dangerous events safely',
        'Unlimited data generation',
        'Reproducible and version-controlled'
      ],
      limitations: [
        'Sim-to-real gap (synthetic may not match reality)',
        'Requires domain expertise to build simulator',
        'May miss subtle real-world effects',
        'Computational cost for complex simulations',
        'Validation against real data is critical'
      ],
      aiApplications: [
        'Autonomous vehicles (driving scenarios)',
        'Robotics (manipulation tasks)',
        'Game AI (procedurally generated levels)',
        'Financial modeling (market simulations)',
        'Medical training (surgical simulators)',
        'Aerospace (flight dynamics)'
      ]
    },
    {
      type: 'comparison',
      title: 'Technique Comparison Matrix',
      headers: ['Technique', 'Complexity', 'Data Type', 'Quality', 'Control', 'Cost', 'Best Use Case'],
      rows: [
        ['Distribution-Based', 'Low', 'Tabular', 'Medium', 'High', 'Low', 'Simple structured data'],
        ['Data Augmentation', 'Low-Med', 'Images/Text', 'Medium', 'High', 'Very Low', 'Expanding datasets'],
        ['GANs', 'High', 'Images/Tabular', 'Very High', 'Low', 'High', 'Realistic images'],
        ['VAEs', 'Medium-High', 'Images/Structured', 'High', 'Medium', 'Medium', 'Controlled generation'],
        ['Simulation', 'Variable', 'Domain-specific', 'Variable', 'Very High', 'High', 'Physics-based scenarios']
      ]
    },
    {
      type: 'selectionGuide',
      title: 'Technique Selection Guide',
      decisionFlow: [
        {
          question: 'What type of data do you have?',
          options: [
            { answer: 'Tabular (structured)', recommendation: 'Consider: Distribution-based or GANs (CTGAN)' },
            { answer: 'Images', recommendation: 'Consider: Augmentation (simple), GANs/VAEs (complex)' },
            { answer: 'Text', recommendation: 'Consider: Augmentation, Language Models' },
            { answer: 'Time Series', recommendation: 'Consider: Augmentation, Simulation' },
            { answer: 'Domain-specific (physics)', recommendation: 'Consider: Simulation' }
          ]
        },
        {
          question: 'How much real data do you have?',
          options: [
            { answer: 'Very little (<100 samples)', recommendation: 'Simulation or careful augmentation' },
            { answer: 'Small (100-1000)', recommendation: 'Augmentation or distribution-based' },
            { answer: 'Medium (1000-10000)', recommendation: 'Any technique, but GANs may struggle' },
            { answer: 'Large (>10000)', recommendation: 'GANs or VAEs will work well' }
          ]
        },
        {
          question: 'What is your priority?',
          options: [
            { answer: 'Quick implementation', recommendation: 'Distribution-based or Augmentation' },
            { answer: 'Highest quality', recommendation: 'GANs (if enough data)' },
            { answer: 'Control and interpretability', recommendation: 'Simulation or Distribution-based' },
            { answer: 'Privacy preservation', recommendation: 'VAEs or Distribution-based with differential privacy' }
          ]
        },
        {
          question: 'What computational resources do you have?',
          options: [
            { answer: 'Limited (CPU only)', recommendation: 'Distribution-based or Augmentation' },
            { answer: 'Moderate (single GPU)', recommendation: 'VAEs or small GANs' },
            { answer: 'Extensive (multiple GPUs)', recommendation: 'Any technique, including large GANs' }
          ]
        }
      ]
    },
    {
      type: 'hybridApproaches',
      title: 'Hybrid Approaches: Combining Techniques',
      approaches: [
        {
          name: 'Real + Synthetic Augmentation',
          combination: 'Real data + Augmentation or GANs',
          rationale: 'Leverage real data quality, expand with synthetic',
          example: 'Use real images as base, augment with transformations and GAN samples',
          benefit: 'Best of both worlds - grounded in reality, expanded scale',
          implementation: 'Weight real data higher in training, use synthetic for variety'
        },
        {
          name: 'Simulation + Domain Adaptation',
          combination: 'Simulation + GANs for realism',
          rationale: 'Generate in simulation, make realistic with GANs',
          example: 'Simulate driving scenes, use CycleGAN to make photorealistic',
          benefit: 'Perfect labels from simulation, realism from GANs',
          implementation: 'Sim2Real GANs, domain randomization'
        },
        {
          name: 'Distribution-Based + Neural Networks',
          combination: 'Fit simple distribution, refine with VAE',
          rationale: 'Start with statistical model, improve with deep learning',
          example: 'GMM for initial generation, VAE for fine-tuning',
          benefit: 'Interpretable base, flexible refinement',
          implementation: 'Two-stage generation pipeline'
        },
        {
          name: 'Conditional Generation',
          combination: 'Any technique + conditioning on labels/attributes',
          rationale: 'Control what gets generated',
          example: 'Conditional GAN (cGAN) to generate specific classes',
          benefit: 'Generate exactly what you need (rare classes, specific attributes)',
          implementation: 'Add conditioning variable to generator input'
        }
      ]
    },
    {
      type: 'practicalConsiderations',
      title: 'Practical Implementation Considerations',
      considerations: [
        {
          aspect: 'Start Simple',
          guidance: [
            'Begin with simplest technique that might work',
            'Distribution-based or augmentation before GANs',
            'Validate that complexity is needed',
            'Iterate: simple → complex only if necessary'
          ]
        },
        {
          aspect: 'Computational Budget',
          guidance: [
            'GANs/VAEs: Expensive (GPUs, time)',
            'Distribution/Augmentation: Cheap (CPU, fast)',
            'Simulation: Variable (depends on complexity)',
            'Consider cloud resources for expensive methods'
          ]
        },
        {
          aspect: 'Quality Control',
          guidance: [
            'Always validate synthetic data quality',
            'Use multiple validation methods',
            'Human inspection for semantic correctness',
            'Statistical tests for distribution matching',
            'Downstream task performance critical'
          ]
        },
        {
          aspect: 'Iterative Refinement',
          guidance: [
            'Generate → Validate → Refine → Repeat',
            'Start with small batch, scale after validation',
            'Filter out low-quality samples',
            'Monitor for mode collapse or artifacts'
          ]
        },
        {
          aspect: 'Documentation',
          guidance: [
            'Document generation method and parameters',
            'Track versions of synthetic datasets',
            'Note known limitations and artifacts',
            'Provide code for reproducibility'
          ]
        }
      ]
    },
    {
      type: 'summary',
      title: 'Part 6 Summary: Generation Techniques',
      keyPoints: [
        {
          point: 'Five major techniques',
          detail: 'Distribution-based, augmentation, GANs, VAEs, simulation - each with specific strengths'
        },
        {
          point: 'Complexity-quality tradeoff',
          detail: 'Simple methods (distribution, augmentation) fast but limited; complex (GANs) powerful but challenging'
        },
        {
          point: 'Data type matters',
          detail: 'Choose technique based on data type: tabular, images, text, time series, or domain-specific'
        },
        {
          point: 'Hybrid approaches powerful',
          detail: 'Combining techniques (e.g., simulation + GANs) often yields best results'
        },
        {
          point: 'Start simple, validate often',
          detail: 'Begin with simplest approach, add complexity only if needed and validated'
        },
        {
          point: 'MATLAB implementations available',
          detail: 'All techniques can be implemented in MATLAB using Deep Learning Toolbox and Statistics Toolbox'
        }
      ],
      transition: 'Next: How do we validate synthetic data and integrate it into ML pipelines?'
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
    a.download = 'Part6_Synthetic_Data_Techniques.html';
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
    <title>Part 6: Synthetic Data Generation Techniques</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 900px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-after: always; }
        h1 { color: #059669; font-size: 32px; margin-bottom: 10px; }
        pre { background: #f4f4f4; padding: 15px; border-left: 4px solid #059669; overflow-x: auto; }
        code { font-family: 'Courier New', monospace; font-size: 13px; }
        ul { line-height: 1.8; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
        th { background: #059669; color: white; }
        @media print { .slide { page-break-after: always; } body { background: white; } }
    </style>
</head>
<body>
    ${slides.map((slide, idx) => `<div class="slide"><h1>Slide ${idx + 1}: ${slide.title || 'Content'}</h1></div>`).join('')}
</body>
</html>`;
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-emerald-600 to-green-800 text-white p-12">
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
            <h2 className="text-4xl font-bold mb-3 text-emerald-800">{slide.title}</h2>
            <p className="text-xl text-gray-600 mb-6">Duration: {slide.duration}</p>
            <div className="space-y-4">
              {slide.topics.map((topic, idx) => (
                <div key={idx} className="flex items-start bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <span className="text-emerald-600 font-bold mr-4 text-xl">{idx + 1}</span>
                  <p className="text-lg">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'techniqueOverview':
        return (
          <div className="p-10 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">{slide.title}</h2>
            <div className="space-y-3">
              {slide.techniques.map((tech, idx) => (
                <div key={idx} className="bg-white border-2 border-emerald-300 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      {tech.number}
                    </div>
                    <span className="text-3xl mr-2">{tech.icon}</span>
                    <h3 className="text-xl font-bold text-emerald-900">{tech.name}</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-semibold">Complexity</p>
                      <p>{tech.complexity}</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <p className="font-semibold">Data Type</p>
                      <p>{tech.dataType}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="font-semibold">Basis</p>
                      <p>{tech.basis}</p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <p className="font-semibold">Best For</p>
                      <p>{tech.bestFor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'technique':
        return (
          <div className="p-6 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center mb-3">
              <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">
                {slide.number}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-emerald-800">{slide.title}</h2>
                <p className="text-base text-gray-600">{slide.subtitle}</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-3 rounded-lg mb-3 border-l-4 border-emerald-500">
              <p className="text-sm font-semibold mb-2">Statistical Basis:</p>
              <p className="text-sm">{slide.statisticalBasis}</p>
            </div>

            {slide.method && (
              <div className="bg-white border p-3 rounded mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Method:</h3>
                <div className="space-y-1 text-xs">
                  {Object.entries(slide.method).map(([key, value], idx) => (
                    <p key={idx}><span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}</p>
                  ))}
                </div>
              </div>
            )}

            {slide.commonDistributions && (
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Common Distributions:</h3>
                <ul className="ml-4 text-xs space-y-1">
                  {slide.commonDistributions.map((dist, idx) => (
                    <li key={idx}>• {dist}</li>
                  ))}
                </ul>
              </div>
            )}

            {slide.transformations && (
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Transformations:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(slide.transformations).map(([type, transforms], idx) => (
                    <div key={idx} className="bg-blue-50 p-2 rounded">
                      <p className="font-semibold text-xs capitalize mb-1">{type}:</p>
                      <ul className="text-xs space-y-1">
                        {transforms.map((t, tIdx) => (
                          <li key={tIdx}>• {t}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.architecture && (
              <div className="bg-gray-50 p-3 rounded mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Architecture:</h3>
                <div className="space-y-1 text-xs">
                  {Object.entries(slide.architecture).map(([key, value], idx) => (
                    <p key={idx}><span className="font-semibold capitalize">{key}:</span> {value}</p>
                  ))}
                </div>
              </div>
            )}

            {slide.trainingProcess && (
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Training Process:</h3>
                <ol className="ml-4 text-xs space-y-1">
                  {slide.trainingProcess.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {slide.process && (
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Process:</h3>
                <ol className="ml-4 text-xs space-y-1">
                  {slide.process.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {slide.example && (
              <div className="bg-blue-50 p-3 rounded mb-3">
                <h3 className="font-bold text-blue-900 mb-2 text-sm">Example: {slide.example.scenario}</h3>
                {Object.entries(slide.example).filter(([key]) => key !== 'scenario').map(([key, value], idx) => {
                  if (Array.isArray(value)) {
                    return (
                      <div key={idx} className="mb-1">
                        <p className="text-xs font-semibold capitalize">{key.replace(/_/g, ' ')}:</p>
                        <ul className="ml-4">
                          {value.map((item, i) => (
                            <li key={i} className="text-xs">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return <p key={idx} className="text-xs"><span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}</p>;
                })}
              </div>
            )}

            {slide.matlabCode && (
              <div className="bg-gray-900 p-3 rounded mb-3">
                <div className="flex items-center mb-2">
                  <Code className="w-4 h-4 text-emerald-400 mr-2" />
                  <h3 className="font-bold text-emerald-400 text-sm">MATLAB Implementation</h3>
                </div>
                <pre className="text-xs text-green-300 overflow-x-auto">
                  <code>{slide.matlabCode}</code>
                </pre>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <h3 className="font-bold text-green-800 mb-2 text-sm">✓ Advantages:</h3>
                <ul className="space-y-1 text-xs">
                  {slide.advantages.map((adv, idx) => (
                    <li key={idx}>• {adv}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-800 mb-2 text-sm">⚠ Limitations:</h3>
                <ul className="space-y-1 text-xs">
                  {slide.limitations.map((lim, idx) => (
                    <li key={idx}>• {lim}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded">
              <h3 className="font-bold text-purple-900 mb-2 text-sm">AI Applications:</h3>
              <ul className="space-y-1 text-xs">
                {slide.aiApplications.map((app, idx) => (
                  <li key={idx}>• {app}</li>
                ))}
              </ul>
            </div>

            {slide.variants && (
              <div className="bg-yellow-50 p-3 rounded mt-3">
                <h3 className="font-bold text-yellow-900 mb-2 text-sm">Popular Variants:</h3>
                <ul className="space-y-1 text-xs">
                  {slide.variants.map((variant, idx) => (
                    <li key={idx}>• {variant}</li>
                  ))}
                </ul>
              </div>
            )}

            {slide.elboComponents && (
              <div className="bg-indigo-50 p-3 rounded mt-3">
                <h3 className="font-bold text-indigo-900 mb-2 text-sm">ELBO Components:</h3>
                <div className="space-y-1 text-xs">
                  {Object.entries(slide.elboComponents).map(([key, value], idx) => (
                    <p key={idx}><span className="font-semibold capitalize">{key}:</span> {value}</p>
                  ))}
                </div>
              </div>
            )}

            {slide.types && (
              <div className="mb-3">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">Types:</h3>
                <ul className="space-y-1 text-xs ml-4">
                  {slide.types.map((type, idx) => (
                    <li key={idx}>• {type}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'comparison':
        return (
          <div className="p-12 h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">{slide.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-emerald-700 text-white">
                    {slide.headers.map((header, idx) => (
                      <th key={idx} className="p-2 text-left text-xs">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slide.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="p-2 border-b border-gray-200 text-xs">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'selectionGuide':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.decisionFlow.map((decision, idx) => (
                <div key={idx} className="bg-white border-2 border-emerald-300 p-4 rounded-lg">
                  <p className="text-lg font-bold text-emerald-900 mb-3">{decision.question}</p>
                  <div className="space-y-2">
                    {decision.options.map((option, oIdx) => (
                      <div key={oIdx} className="bg-emerald-50 p-3 rounded border-l-4 border-emerald-500">
                        <p className="text-sm"><span className="font-bold">{option.answer}:</span> {option.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'hybridApproaches':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.approaches.map((approach, idx) => (
                <div key={idx} className="bg-white border-2 border-blue-300 p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{approach.name}</h3>
                  <p className="text-sm mb-2"><span className="font-semibold">Combination:</span> {approach.combination}</p>
                  <p className="text-sm mb-2"><span className="font-semibold">Rationale:</span> {approach.rationale}</p>
                  <p className="text-xs mb-2 text-gray-700"><em>Example: {approach.example}</em></p>
                  <p className="text-sm mb-2 text-green-700"><span className="font-semibold">Benefit:</span> {approach.benefit}</p>
                  <p className="text-sm text-blue-700"><span className="font-semibold">Implementation:</span> {approach.implementation}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'practicalConsiderations':
        return (
          <div className="p-8 h-full flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">{slide.title}</h2>
            <div className="space-y-4">
              {slide.considerations.map((consideration, idx) => (
                <div key={idx} className="bg-white border-l-4 border-emerald-500 p-4 rounded">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">{consideration.aspect}</h3>
                  <ul className="space-y-1 text-sm">
                    {consideration.guidance.map((guide, gIdx) => (
                      <li key={gIdx} className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>{guide}</span>
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
          <div className="p-10 h-full flex flex-col bg-gradient-to-br from-emerald-50 to-white overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-emerald-800">{slide.title}</h2>
            <div className="space-y-4 mb-6">
              {slide.keyPoints.map((kp, idx) => (
                <div key={idx} className="bg-white border-l-4 border-emerald-500 p-5 rounded-lg shadow-sm">
                  <h3 className="font-bold text-xl text-emerald-900 mb-2">{idx + 1}. {kp.point}</h3>
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
            currentSlide === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        <div className="text-center">
          <p className="text-lg font-semibold">Slide {currentSlide + 1} of {slides.length}</p>
          <p className="text-sm text-gray-300">Part 6: Synthetic Data Generation Techniques</p>
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
              currentSlide === slides.length - 1 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-emerald-600 hover:bg-emerald-700'
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