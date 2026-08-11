import { Course, Exam, Certificate, Order, AppNotification, User } from './types';

export const DEMO_STUDENT: User = {
  id: 'usr_student_01',
  name: 'Rahul Sharma',
  email: 'student@zenfotech.com',
  role: 'student',
  mobile: '+91 98765 43210',
  enrolledAt: '2026-08-01T10:00:00Z',
  status: 'active',
};

export const DEMO_ADMIN: User = {
  id: 'usr_admin_01',
  name: 'Zenfotech Director',
  email: 'admin@zenfotech.com',
  role: 'admin',
  mobile: '+91 99000 11223',
  enrolledAt: '2026-01-01T00:00:00Z',
  status: 'active',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'ai-industry-certification',
    title: 'AI Industry Certification Program',
    tagline: 'Comprehensive Industry-Aligned Artificial Intelligence & Machine Learning Mastery',
    badge: 'Flagship Certification',
    description: 'Master practical AI systems, Generative AI, Large Language Models, Prompt Engineering, Agentic Workflows, and Enterprise Machine Learning with structured assessment and official Zenfotech Digital Certification.',
    level: 'Industry Ready',
    lessonCount: 500, // Program metric display
    learningHours: 500, // Program metric display
    price: 14999,
    originalPrice: 29999,
    discountPercentage: 50,
    rating: 4.9,
    enrolledCount: 12450,
    features: [
      '500+ Structured Lessons & Practical Case Studies',
      'Up to 500 Hours of Self-Paced Learning',
      'Online Automated Final Examination',
      'Official Verifiable Digital Certificate',
      'Hands-on Agentic & LLM Architecture Labs',
      'Lifetime Access to Course Updates'
    ],
    requirements: [
      'Basic familiarity with computers & internet usage',
      'Prior coding experience is helpful but not mandatory',
      'Enthusiasm to learn Artificial Intelligence applications'
    ],
    targetAudience: [
      'Software Engineers & Developers seeking AI specialization',
      'Data Analysts, Product Managers & Tech Consultants',
      'Business Leaders & Executives modernizing operations with AI',
      'Students & Graduates aiming for AI industry roles'
    ],
    modules: [
      {
        id: 'mod_01',
        courseId: 'ai-industry-certification',
        order: 1,
        title: 'Module 01 — AI Fundamentals & Neural Architecture',
        description: 'Understand core AI foundations, historical context, neural network topology, deep learning concepts, and modern AI paradigms.',
        lessons: [
          {
            id: 'les_01',
            moduleId: 'mod_01',
            title: 'Lesson 01 — Introduction to Artificial Intelligence & Modern Ecosystem',
            durationMinutes: 45,
            learningHours: 2,
            type: 'video',
            summary: 'Explore the foundations of AI, narrow vs general AI, key algorithms, and current industry trajectory.',
            contentMarkdown: `### Welcome to Zenfotech AI Academy

Artificial Intelligence is reshaping global business architecture. In this lesson, we break down:

1. **Foundations of AI**: Supervised, Unsupervised, Reinforcement Learning, and Generative AI.
2. **The Paradigm Shift**: Moving from deterministic code to probability-driven Neural Networks.
3. **Enterprise AI Ecosystem**: How Fortune 500 companies integrate LLMs and automation.

#### Key Takeaways:
- AI is not just chatbots; it's intelligence orchestration.
- Modern pipelines rely heavily on Transformer models and Vector Databases.`
          },
          {
            id: 'les_02',
            moduleId: 'mod_01',
            title: 'Lesson 02 — Machine Learning Foundations & Model Paradigms',
            durationMinutes: 50,
            learningHours: 2.5,
            type: 'reading',
            summary: 'Deep dive into feature engineering, training vs testing splits, overfitting prevention, and hyperparameter tuning.',
            contentMarkdown: `### Machine Learning Core Principles

To build enterprise-grade AI, you must understand statistical model evaluation:

- **Supervised Learning**: Regression vs Classification models.
- **Unsupervised Learning**: K-Means clustering, PCA, and dimensionality reduction.
- **Model Evaluation**: Precision, Recall, F1-Score, and ROC-AUC curves.`
          },
          {
            id: 'les_03',
            moduleId: 'mod_01',
            title: 'Lesson 03 — Deep Learning & Neural Network Topologies',
            durationMinutes: 60,
            learningHours: 3,
            type: 'video',
            summary: 'Anatomy of perceptrons, activation functions (ReLU, Softmax), backpropagation, and loss function optimization.',
            contentMarkdown: `### Neural Networks Architecture

Neural networks are mathematical function approximators composed of layered artificial neurons:

- Input Layer -> Hidden Layers (Weights & Biases) -> Activation Function -> Output Layer.
- **Backpropagation**: Gradient descent algorithms (Adam, SGD) updating network weights.`
          },
          {
            id: 'les_04',
            moduleId: 'mod_01',
            title: 'Lesson 04 — Transformer Architecture & Attention Mechanism',
            durationMinutes: 55,
            learningHours: 3,
            type: 'interactive',
            summary: 'Unpacking "Attention Is All You Need", Multi-Head Self-Attention, Positional Encodings, and Tokenization.',
            contentMarkdown: `### The Transformer Revolution

The Transformer architecture introduced in 2017 revolutionized Natural Language Processing:

- **Self-Attention**: Allows models to weigh relationships between all tokens simultaneously.
- **Multi-Head Attention**: Captures multiple semantic perspectives in parallel.`
          }
        ],
        quiz: {
          id: 'quiz_mod_01',
          title: 'Module 01 Knowledge Check — AI & Transformer Foundations',
          passingScore: 70,
          questions: [
            {
              id: 'q_m1_1',
              question: 'What core mechanism enables Transformer architectures to process sequence tokens in parallel rather than sequentially?',
              options: ['Recurrent Neural Connections', 'Self-Attention Mechanism', 'Convolutional Kernels', 'Markov Decision Chains'],
              correctAnswer: 1,
              explanation: 'Self-Attention computes relationships between all tokens in parallel without needing sequential hidden states like RNNs.'
            },
            {
              id: 'q_m1_2',
              question: 'Which machine learning paradigm uses labeled training datasets to predict discrete outcomes?',
              options: ['Unsupervised Clustering', 'Supervised Classification', 'Reinforcement Learning', 'Zero-Shot Generation'],
              correctAnswer: 1,
              explanation: 'Supervised classification relies on ground-truth labeled datasets to learn mapping functions for categorical outputs.'
            }
          ]
        }
      },
      {
        id: 'mod_02',
        courseId: 'ai-industry-certification',
        order: 2,
        title: 'Module 02 — Advanced Prompt Engineering & Context Management',
        description: 'Master systemic prompt design techniques, Zero-Shot/Few-Shot, Chain-of-Thought reasoning, and context window optimization.',
        lessons: [
          {
            id: 'les_05',
            moduleId: 'mod_02',
            title: 'Lesson 01 — Systemic Prompting & Structural Directives',
            durationMinutes: 40,
            learningHours: 2,
            type: 'video',
            summary: 'Structuring system prompts with instructions, roles, context constraints, and output schema formatting.',
            contentMarkdown: `### Systemic Prompt Design

High-performing enterprise prompts use structured markups like XML tags or Markdown headers to enforce determinism in non-deterministic LLMs.`
          },
          {
            id: 'les_06',
            moduleId: 'mod_02',
            title: 'Lesson 02 — Chain-of-Thought & Reasoning Decomposition',
            durationMinutes: 45,
            learningHours: 2.5,
            type: 'reading',
            summary: 'Leveraging step-by-step reasoning strategies to eliminate hallucination in complex mathematical and analytical tasks.',
            contentMarkdown: `### Chain-of-Thought (CoT) Prompting

Asking an LLM to "think step by step" forces intermediate token generation, dramatically increasing reasoning accuracy.`
          },
          {
            id: 'les_07',
            moduleId: 'mod_02',
            title: 'Lesson 03 — Few-Shot In-Context Learning',
            durationMinutes: 50,
            learningHours: 2.5,
            type: 'interactive',
            summary: 'Providing curated input-output demonstrations directly in the prompt to align outputs without model fine-tuning.',
            contentMarkdown: `### Few-Shot Alignment

In-context learning guides model response style and formatting by providing 2 to 5 representative examples.`
          },
          {
            id: 'les_08',
            moduleId: 'mod_02',
            title: 'Lesson 04 — Guardrailing & Red-Teaming AI Prompts',
            durationMinutes: 45,
            learningHours: 2,
            type: 'video',
            summary: 'Preventing prompt injection, jailbreaks, and sensitive data leakage in user-facing LLM applications.',
            contentMarkdown: `### Security & Guardrails

Protect your LLM APIs against adversarial attacks, direct instruction overrides, and unintended output behavior.`
          }
        ]
      },
      {
        id: 'mod_03',
        courseId: 'ai-industry-certification',
        order: 3,
        title: 'Module 03 — Generative AI & Multimodal Intelligence',
        description: 'Explore text-to-image, speech synthesis, vision-language models, and multimodal content production pipelines.',
        lessons: [
          {
            id: 'les_09',
            moduleId: 'mod_03',
            title: 'Lesson 01 — Multimodal Models & Vision Transformers',
            durationMinutes: 55,
            learningHours: 3,
            type: 'video',
            summary: 'Understanding how models process image patches, text tokens, and audio vectors in a joint embedding space.',
            contentMarkdown: `### Multimodal AI

Modern models like Gemini process text, vision, audio, and code simultaneously in unified tensor representations.`
          },
          {
            id: 'les_10',
            moduleId: 'mod_03',
            title: 'Lesson 02 — Synthetic Content & Generative Workflows',
            durationMinutes: 50,
            learningHours: 2.5,
            type: 'reading',
            summary: 'Building automated asset pipelines for marketing, documentation, and localized code generation.',
            contentMarkdown: `### Generative Content Pipelines

Streamline enterprise creative asset creation using automated generation workflows with human-in-the-loop review.`
          }
        ]
      },
      {
        id: 'mod_04',
        courseId: 'ai-industry-certification',
        order: 4,
        title: 'Module 04 — Machine Learning & Data Intelligence',
        description: 'Data preprocessing, feature selection, vector embeddings, semantic search, and RAG (Retrieval-Augmented Generation).',
        lessons: [
          {
            id: 'les_11',
            moduleId: 'mod_04',
            title: 'Lesson 01 — Vector Databases & Semantic Embeddings',
            durationMinutes: 60,
            learningHours: 3.5,
            type: 'video',
            summary: 'Converting high-dimensional text into dense floating-point vector representations for similarity search.',
            contentMarkdown: `### Vector Search & Embeddings

Cosine similarity, Euclidean distance, and Dot product index search algorithms across million-vector databases.`
          },
          {
            id: 'les_12',
            moduleId: 'mod_04',
            title: 'Lesson 02 — RAG Architecture (Retrieval-Augmented Generation)',
            durationMinutes: 65,
            learningHours: 4,
            type: 'interactive',
            summary: 'Connecting LLMs to enterprise knowledge graphs, SQL databases, and document vector stores.',
            contentMarkdown: `### RAG System Design

Combine retrieval of verified internal documents with LLM synthesis to eliminate hallucinations and secure private data.`
          }
        ]
      },
      {
        id: 'mod_05',
        courseId: 'ai-industry-certification',
        order: 5,
        title: 'Module 05 — AI Automation & Agentic Workflows',
        description: 'Building autonomous AI agents, tool integration, function calling, stateful loops, and multi-agent coordination.',
        lessons: [
          {
            id: 'les_13',
            moduleId: 'mod_05',
            title: 'Lesson 01 — Function Calling & Tool Augmentation',
            durationMinutes: 50,
            learningHours: 3,
            type: 'video',
            summary: 'Enabling AI models to trigger external REST APIs, run SQL queries, and manipulate file systems.',
            contentMarkdown: `### Function Calling

Define structured JSON schemas so the LLM can decide when and how to call external services.`
          },
          {
            id: 'les_14',
            moduleId: 'mod_05',
            title: 'Lesson 02 — Multi-Agent Systems & Task Delegation',
            durationMinutes: 55,
            learningHours: 3.5,
            type: 'reading',
            summary: 'Architecting planner, executor, reviewer, and tool-user agent hierarchies for complex multi-step workflows.',
            contentMarkdown: `### Multi-Agent Frameworks

Coordinate specialized agents with dedicated roles to tackle end-to-end software engineering and business analysis tasks.`
          }
        ]
      },
      {
        id: 'mod_06',
        courseId: 'ai-industry-certification',
        order: 6,
        title: 'Module 06 — Practical AI Projects & Enterprise Deployment',
        description: 'Deploying AI microservices, Docker containerization, API rate limiting, latency optimization, and cost governance.',
        lessons: [
          {
            id: 'les_15',
            moduleId: 'mod_06',
            title: 'Lesson 01 — Enterprise API Microservices & Caching',
            durationMinutes: 45,
            learningHours: 2.5,
            type: 'video',
            summary: 'Building high-throughput FastAPI and Next.js backend proxy routes for LLM inference.',
            contentMarkdown: `### Microservice Architecture

Optimize API cost and latency using semantic prompt caching, streaming response chunks, and batch processing.`
          }
        ]
      },
      {
        id: 'mod_07',
        courseId: 'ai-industry-certification',
        order: 7,
        title: 'Module 07 — Industry Applications & AI Ethics',
        description: 'Responsible AI framework, bias audit, copyright law, compliance (EU AI Act), and data privacy.',
        lessons: [
          {
            id: 'les_16',
            moduleId: 'mod_07',
            title: 'Lesson 01 — Responsible AI & Regulatory Compliance',
            durationMinutes: 40,
            learningHours: 2,
            type: 'reading',
            summary: 'Auditing algorithmic bias, data lineage, privacy preservation, and enterprise compliance standards.',
            contentMarkdown: `### Responsible AI Implementation

Ensure fairness, transparency, and data governance in customer-facing and internal automated decision systems.`
          }
        ]
      },
      {
        id: 'mod_08',
        courseId: 'ai-industry-certification',
        order: 8,
        title: 'Module 08 — Final Examination Preparation & Capstone Overview',
        description: 'Comprehensive review of concepts, practice assessments, examination strategy, and certificate issuance.',
        lessons: [
          {
            id: 'les_17',
            moduleId: 'mod_08',
            title: 'Lesson 01 — Final Examination Review & Preparation Guide',
            durationMinutes: 30,
            learningHours: 1.5,
            type: 'interactive',
            summary: 'Reviewing key exam objectives, time management strategy, and passing criteria (60%).',
            contentMarkdown: `### Final Exam Preparation

You are ready for the Online Final Examination!

- **Questions**: 20 Multiple Choice Questions (MCQs)
- **Duration**: 30 Minutes
- **Passing Mark**: 60% (12 correct answers out of 20)
- **Certificate**: Digital Verifiable Certificate issued immediately upon passing.`
          }
        ]
      }
    ]
  },
  {
    id: 'generative-ai-prompt-engineering',
    title: 'Generative AI & Prompt Engineering Masterclass',
    tagline: 'Practical Prompt Tuning, GenAI Tools & Enterprise Workflows',
    badge: 'Demo Listing',
    description: 'Learn system prompting, Chain-of-Thought, context optimization, and generative creative asset creation.',
    level: 'Beginner',
    lessonCount: 85,
    learningHours: 80,
    price: 4999,
    originalPrice: 9999,
    discountPercentage: 50,
    rating: 4.8,
    enrolledCount: 4320,
    features: ['85 Focused Lessons', 'Hands-on Prompt Lab', 'Certificate of Completion'],
    requirements: ['No prior programming needed'],
    targetAudience: ['Marketers, Content Creators, Business Users'],
    modules: []
  },
  {
    id: 'machine-learning-data-intelligence',
    title: 'Machine Learning & Data Intelligence',
    tagline: 'Supervised Models, Feature Engineering & Statistical AI',
    badge: 'Demo Listing',
    description: 'Build predictive models with Python, scikit-learn, XGBoost, and statistical analytics.',
    level: 'Intermediate',
    lessonCount: 140,
    learningHours: 150,
    price: 7999,
    originalPrice: 15999,
    discountPercentage: 50,
    rating: 4.9,
    enrolledCount: 3100,
    features: ['140 Technical Lessons', 'Python Notebooks', 'Certificate of Completion'],
    requirements: ['Basic Python programming knowledge'],
    targetAudience: ['Data Analysts, Developers, Statisticians'],
    modules: []
  },
  {
    id: 'ai-automation-for-business',
    title: 'AI Automation for Business & Operations',
    tagline: 'No-Code/Low-Code AI Workflows, Agents & Robotic Process Automation',
    badge: 'Demo Listing',
    description: 'Automate business workflows, email processing, document extraction, and customer service.',
    level: 'Intermediate',
    lessonCount: 110,
    learningHours: 120,
    price: 6499,
    originalPrice: 12999,
    discountPercentage: 50,
    rating: 4.7,
    enrolledCount: 2890,
    features: ['110 Practical Lessons', 'Zapier & Make Integrations', 'Certificate of Completion'],
    requirements: ['Basic spreadsheet & business workflow knowledge'],
    targetAudience: ['Operations Managers, Entrepreneurs, Analysts'],
    modules: []
  }
];

export const INITIAL_EXAM: Exam = {
  id: 'exam_ai_certification_01',
  title: 'AI Industry Certification — Final Examination',
  courseId: 'ai-industry-certification',
  durationMinutes: 30,
  totalQuestions: 20,
  passingPercentage: 60,
  questions: [
    {
      id: 'eq_01',
      question: 'In the Transformer neural network architecture, what is the primary function of the Multi-Head Attention mechanism?',
      options: [
        'To reduce dataset training memory consumption to zero',
        'To calculate parallel contextual dependencies between tokens across multiple representation subspaces',
        'To compress images into RGB matrix pixels',
        'To sequentially process tokens one character at a time'
      ],
      correctAnswer: 1,
      explanation: 'Multi-Head Attention allows the model to jointly attend to information from different representation subspaces at different positions.',
      topic: 'AI Fundamentals'
    },
    {
      id: 'eq_02',
      question: 'What is Retrieval-Augmented Generation (RAG) primarily designed to prevent when using Large Language Models?',
      options: [
        'API rate limiting errors',
        'Hallucination and outdated knowledge responses by retrieving verified external domain data',
        'Compiler syntax highlighting issues',
        'Network latency during socket connections'
      ],
      correctAnswer: 1,
      explanation: 'RAG combines factual document retrieval from vector databases with generative LLM synthesis to ground responses in truth and eliminate hallucinations.',
      topic: 'Machine Learning & RAG'
    },
    {
      id: 'eq_03',
      question: 'Which prompting technique explicitly instructs an LLM to show step-by-step reasoning before outputting the final answer?',
      options: [
        'Zero-Shot Direct Output',
        'Chain-of-Thought (CoT) Prompting',
        'Negative Prompting',
        'Binary Masking'
      ],
      correctAnswer: 1,
      explanation: 'Chain-of-Thought prompting forces the model to generate intermediate reasoning steps, significantly increasing performance on complex logic tasks.',
      topic: 'Prompt Engineering'
    },
    {
      id: 'eq_04',
      question: 'What mathematical metric is most commonly used in Vector Databases to calculate semantic similarity between document embeddings?',
      options: [
        'Manhattan Taxicab Grid',
        'Cosine Similarity',
        'Fibonacci Ratio',
        'Standard Deviation Variance'
      ],
      correctAnswer: 1,
      explanation: 'Cosine similarity measures the cosine of the angle between two multi-dimensional vectors, evaluating directional semantic alignment regardless of magnitude.',
      topic: 'Machine Learning & RAG'
    },
    {
      id: 'eq_05',
      question: 'In AI Agent design, what feature allows an LLM to trigger real-world actions like database queries or email delivery?',
      options: [
        'Function Calling / Tool Integration',
        'Random Weight Initialization',
        'Loss Function Regularization',
        'Token Truncation'
      ],
      correctAnswer: 0,
      explanation: 'Function calling allows the LLM to output structured JSON tool calls that client applications execute against external APIs or databases.',
      topic: 'AI Automation & Agents'
    },
    {
      id: 'eq_06',
      question: 'Which learning paradigm relies on rewards and penalties to train an agent interacting with an dynamic environment?',
      options: [
        'Supervised Learning',
        'Reinforcement Learning (RL)',
        'Unsupervised Clustering',
        'Static Rule Parsing'
      ],
      correctAnswer: 1,
      explanation: 'Reinforcement Learning optimizes an agent’s decision-making policy based on cumulative environmental rewards.',
      topic: 'AI Fundamentals'
    },
    {
      id: 'eq_07',
      question: 'What is "Temperature" parameter tuning used for when calling a Generative LLM API?',
      options: [
        'To monitor CPU thermal heat during inference',
        'To control the randomness/creativity of token probability distribution selection',
        'To set the maximum payment price per token',
        'To adjust video frame rendering speed'
      ],
      correctAnswer: 1,
      explanation: 'Lower temperature (e.g. 0.0 - 0.2) makes model outputs deterministic and focused; higher temperature increases output creativity and diversity.',
      topic: 'Prompt Engineering'
    },
    {
      id: 'eq_08',
      question: 'What does "RLHF" stand for in modern Large Language Model alignment?',
      options: [
        'Reinforcement Learning from Human Feedback',
        'Recurrent Loss with High Frequency',
        'Random Logistic Gradient Function',
        'ResNet Layered Hierarchical Filtering'
      ],
      correctAnswer: 0,
      explanation: 'RLHF aligns raw base language models with human preferences regarding helpfulness, accuracy, and safety.',
      topic: 'AI Fundamentals'
    },
    {
      id: 'eq_09',
      question: 'In computer vision, what neural network architecture historically excelled at spatial feature extraction in images?',
      options: [
        'Convolutional Neural Networks (CNNs)',
        'Simple Decision Trees',
        'Markov Chain Monte Carlo',
        'Linear Regression Lines'
      ],
      correctAnswer: 0,
      explanation: 'CNNs use spatial convolution kernels to detect edges, textures, and object hierarchies in image visual grids.',
      topic: 'Generative AI & Multimodal'
    },
    {
      id: 'eq_10',
      question: 'What is a primary advantage of Vector Embeddings over traditional keyword search (like SQL LIKE %keyword%)?',
      options: [
        'Vector embeddings capture semantic meaning and intent rather than requiring exact keyword matches',
        'Vector embeddings require no RAM or storage space',
        'Vector search only works with English single words',
        'Keyword search is always faster regardless of index size'
      ],
      correctAnswer: 0,
      explanation: 'Semantic vector embeddings match concepts (e.g. "physician" and "doctor") even if they share zero exact text characters.',
      topic: 'Machine Learning & RAG'
    },
    {
      id: 'eq_11',
      question: 'What is Prompt Injection in AI application security?',
      options: [
        'Injecting extra RAM into GPU servers',
        'An adversarial technique where untrusted user input tricks the LLM into ignoring system instructions',
        'Automatically updating database indexes',
        'Speeding up token streaming'
      ],
      correctAnswer: 1,
      explanation: 'Prompt injection occurs when malicious inputs override system instructions to execute unauthorized commands or leak confidential data.',
      topic: 'Prompt Engineering'
    },
    {
      id: 'eq_12',
      question: 'What is the role of an Encoder in a Sequence-to-Sequence model architecture?',
      options: [
        'To render HTML webpage elements',
        'To process and compress the input sequence into a dense latent representation vector',
        'To play audio files back to the user',
        'To generate final output text directly without decoding'
      ],
      correctAnswer: 1,
      explanation: 'The encoder processes contextual input tokens and maps them into a dense hidden state representation for the decoder.',
      topic: 'AI Fundamentals'
    },
    {
      id: 'eq_13',
      question: 'What is Fine-Tuning an existing foundation LLM model?',
      options: [
        'Adjusting physical monitor brightness',
        'Further training a pre-trained model on a domain-specific dataset to adapt weights for specialized tasks',
        'Rewriting the backend Python code from scratch',
        'Deleting the model weights after inference'
      ],
      correctAnswer: 1,
      explanation: 'Fine-tuning modifies pre-trained model parameters using target domain data to improve specialized task performance.',
      topic: 'AI Industry Applications'
    },
    {
      id: 'eq_14',
      question: 'Which of the following describes a Multimodal AI system?',
      options: [
        'A system that only processes ASCII text files',
        'A model capable of understanding and synthesizing multiple data modalities (text, vision, audio, code)',
        'An application running on two different laptops simultaneously',
        'A database with multiple tables'
      ],
      correctAnswer: 1,
      explanation: 'Multimodal AI systems natively ingest and generate across different formats including images, audio, video, and text.',
      topic: 'Generative AI & Multimodal'
    },
    {
      id: 'eq_15',
      question: 'In machine learning, what does "Overfitting" mean?',
      options: [
        'When a model performs exceptionally well on unseen test data',
        'When a model memorizes noise in the training data, leading to poor generalization on new test data',
        'When the dataset has too few rows to start training',
        'When the server runs out of disk storage'
      ],
      correctAnswer: 1,
      explanation: 'Overfitting happens when a complex model fits training noise so closely that its performance degrades on novel test inputs.',
      topic: 'AI Fundamentals'
    },
    {
      id: 'eq_16',
      question: 'What is the purpose of a System Prompt in developer API integrations?',
      options: [
        'To configure the operating system desktop wallpaper',
        'To establish persistent global behavioral guidelines, tone, constraints, and identity for the AI assistant',
        'To log user IP addresses in compliance logs',
        'To format SQL select queries'
      ],
      correctAnswer: 1,
      explanation: 'System prompts dictate the foundational operational boundaries, persona, and output rules prior to user inputs.',
      topic: 'Prompt Engineering'
    },
    {
      id: 'eq_17',
      question: 'In agentic workflows, what is the responsibility of a "Planner" agent?',
      options: [
        'To directly write raw CSS styles',
        'To decompose a high-level goal into sequential sub-tasks and assign them to specialized sub-agents',
        'To shut down the server when idle',
        'To print physical paper certificates'
      ],
      correctAnswer: 1,
      explanation: 'Planner agents evaluate complex goals and formulate structured execution steps for specialized executor agents.',
      topic: 'AI Automation & Agents'
    },
    {
      id: 'eq_18',
      question: 'What is Zero-Shot prompting?',
      options: [
        'Asking a model to perform a task with zero prior examples in the prompt context',
        'Prompting a model with zero characters in the text input',
        'Running an LLM without an internet connection',
        'Executing code with zero memory consumption'
      ],
      correctAnswer: 0,
      explanation: 'Zero-shot prompting relies entirely on the pre-trained weights of the model without providing example demonstrations.',
      topic: 'Prompt Engineering'
    },
    {
      id: 'eq_19',
      question: 'Why is AI Ethics & Bias Auditing essential in commercial AI deployments?',
      options: [
        'Because AI models never make mistakes',
        'To identify and mitigate discriminatory outputs, ensure privacy compliance, and build trustworthy systems',
        'To make the website load faster',
        'To bypass regulatory reporting laws'
      ],
      correctAnswer: 1,
      explanation: 'Ethical auditing mitigates historical dataset biases, protects user data rights, and complies with legal guidelines.',
      topic: 'AI Industry Applications'
    },
    {
      id: 'eq_20',
      question: 'What is the recommended approach for storing sensitive API keys (e.g. GEMINI_API_KEY) in full-stack AI web applications?',
      options: [
        'Hardcode the secret key inside public client-side JavaScript bundle files',
        'Keep secrets strictly in server-side environment variables and proxy requests through secure backend API endpoints',
        'Post the secret key in open community forums',
        'Store the secret key in unencrypted URL query parameters'
      ],
      correctAnswer: 1,
      explanation: 'Server-side API proxy routes prevent secret key exposure to client browsers and enable rate limiting and authentication.',
      topic: 'AI Industry Applications'
    }
  ]
};

export const INITIAL_CERTIFICATE: Certificate = {
  id: 'ZAA-2026-000001',
  studentId: DEMO_STUDENT.id,
  studentName: DEMO_STUDENT.name,
  courseTitle: 'AI Industry Certification Program',
  issueDate: '11 August 2026',
  status: 'valid',
  scorePercentage: 82,
  verificationUrl: 'https://zenfotech.com/verify?id=ZAA-2026-000001'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-ZAA-8901',
    transactionId: 'TXN-98421033',
    enrollmentId: 'ZAA-ENR-2026-0811',
    studentId: DEMO_STUDENT.id,
    studentName: DEMO_STUDENT.name,
    studentEmail: DEMO_STUDENT.email,
    courseId: 'ai-industry-certification',
    courseTitle: 'AI Industry Certification Program',
    amount: 14999,
    originalAmount: 29999,
    taxAmount: 2699,
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    createdAt: '2026-08-01T10:15:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    title: 'Welcome to Zenfotech AI Academy!',
    message: 'Your enrollment in AI Industry Certification Program is active. Start Module 01 now.',
    createdAt: '2026-08-01T10:16:00Z',
    read: true,
    type: 'success'
  },
  {
    id: 'notif_02',
    title: 'Final Examination Available',
    message: 'You have completed 68% of the coursework! You can attempt the Final Examination anytime.',
    createdAt: '2026-08-10T09:30:00Z',
    read: false,
    type: 'exam'
  },
  {
    id: 'notif_03',
    title: 'Certificate Ready',
    message: 'Congratulations on completing your exam! Your verifiable digital certificate ZAA-2026-000001 is issued.',
    createdAt: '2026-08-11T04:00:00Z',
    read: false,
    type: 'certificate'
  }
];
