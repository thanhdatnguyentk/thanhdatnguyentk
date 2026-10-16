export type ProjectCategory = 'AI / ML' | 'Web' | 'Systems';

export interface Project {
  slug: string;
  caseLabel: string;
  title: string;
  description: string;
  longDescription: string;
  marqueeText: string;
  headline: string;
  url: string;
  category: ProjectCategory;
  tech: string[];
  stars?: number;
  visualType: 'tensor' | 'rag' | 'traffic' | 'finance' | 'galaxy';
  scope: {
    role: string;
    domain: string;
    stack: string;
  };
  highlights: string[];
  story: {
    motivation: string;
    architecture: string;
    impact: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'javatorch',
    caseLabel: 'Case1',
    title: 'JavaTorch',
    description: 'PyTorch-like deep learning framework implemented natively in Java with CUDA GPU acceleration.',
    longDescription:
      'A from-scratch Java reimplementation of PyTorch core abstractions, featuring reverse-mode autograd, dynamic computational graphs, and GPU acceleration via JCuda, cuBLAS, and cuDNN.',
    marqueeText:
      'From raw memory buffers to dynamic computation graphs. Rebuilding PyTorch core abstractions natively in Java with CUDA acceleration.',
    headline:
      'JavaTorch — Rebuilding PyTorch core abstractions natively in Java 21 with reverse-mode autograd and CUDA acceleration.',
    url: 'https://github.com/thanhdatnguyentk/JavaTorch',
    category: 'AI / ML',
    tech: ['Java 21', 'JCuda', 'cuDNN', 'Gradle', 'Vue 3'],
    stars: 4,
    visualType: 'tensor',
    scope: {
      role: 'Creator & Core Maintainer',
      domain: 'Deep Learning Framework / GPU Systems',
      stack: 'Java 21, JCuda, cuBLAS, cuDNN, JUnit 5, Vue 3, WebSocket',
    },
    highlights: [
      '118+ JUnit 5 test methods across 50 test files verifying gradient & tensor correctness',
      'GPU-accelerated matrix multiplication, 2D convolution, and multi-head attention',
      'Real-time Neural Training Dashboard streaming live loss & gradients via WebSocket',
    ],
    story: {
      motivation:
        'To truly understand how modern deep learning frameworks work under the hood, using high-level Python APIs is not enough. I started JavaTorch to demystify automatic differentiation, strided tensor memory layouts, and GPU kernel dispatch by building every abstraction from first principles in Java 21.',
      architecture:
        'JavaTorch is structured around a multi-dimensional Tensor engine supporting both CPU and CUDA memory backends. The Autograd engine dynamically records a directed acyclic graph (DAG) of operations during the forward pass and executes topological reverse-mode backpropagation. Heavy linear algebra and convolution primitives are bridged directly to NVIDIA cuBLAS and cuDNN via JCuda.',
      impact:
        'Backed by over 118 unit tests across 50 test suites, JavaTorch trains multi-layer perceptrons, CNNs, and Transformer blocks with live telemetry streamed to a Vue 3 WebSocket dashboard.',
    },
  },
  {
    slug: 'rag-film-chatbot',
    caseLabel: 'Case2',
    title: 'RAG Film Chatbot',
    description: 'End-to-end AI assistant for cinema discovery using Retrieval-Augmented Generation.',
    longDescription:
      'A full-pipeline project exploring RAG patterns end-to-end — semantic document chunking, dense vector embeddings, similarity retrieval, and grounded LLM responses for film Q&A.',
    marqueeText:
      'Grounding Large Language Models with semantic vector retrieval. Turning unstructured film knowledge into accurate, citation-backed conversations.',
    headline:
      'RAG Film Chatbot — End-to-end Retrieval-Augmented Generation pipeline for grounded, hallucination-free cinema discovery.',
    url: 'https://github.com/thanhdatnguyentk/RAG_film_chatbot',
    category: 'AI / ML',
    tech: ['Python', 'Hugging Face', 'Vector DB', 'Transformers'],
    stars: 2,
    visualType: 'rag',
    scope: {
      role: 'AI / NLP Engineer',
      domain: 'Natural Language Processing / RAG Systems',
      stack: 'Python, Hugging Face Transformers, Dense Embeddings, Vector Search',
    },
    highlights: [
      'Context-aware document chunking and dense semantic vector indexing',
      'Grounded LLM generation with source attribution to minimize hallucinations',
      'Lightweight web service architecture ready for cloud deployment',
    ],
    story: {
      motivation:
        'Standalone LLMs frequently hallucinate release dates, cast details, and plot nuances when asked about specific films. This project was built to master Retrieval-Augmented Generation (RAG) and bridge the gap between static model weights and verifiable external knowledge.',
      architecture:
        'The ingestion pipeline preprocesses film synopses, metadata, and reviews into overlapping semantic chunks, encodes them using Hugging Face sentence-transformers, and indexes them in a vector store. At query time, top-k relevant passages are retrieved via cosine similarity and injected into a structured prompt template for grounded synthesis.',
      impact:
        'Delivers accurate, context-aware film recommendations and trivia answers while maintaining low latency and transparent citations.',
    },
  },
  {
    slug: 'traffic-monitoring',
    caseLabel: 'Case3',
    title: 'Traffic Monitoring System',
    description: 'Real-time multi-class vehicle detection and urban traffic analytics dashboard.',
    longDescription:
      'Real-time traffic monitoring system using YOLOv8 for multi-class vehicle detection, FastAPI streaming backend, and a React 18 dashboard with interactive Leaflet maps and live weather telemetry.',
    marqueeText:
      'Real-time Computer Vision in action. Transforming live urban camera streams into actionable traffic density insights with YOLOv8 and FastAPI.',
    headline:
      'Traffic Monitoring Real-time System — Live urban vehicle detection and geospatial analytics powered by YOLOv8, FastAPI, and React.',
    url: 'https://github.com/thanhdatnguyentk/Traffic-Monitoring-Realtime-System',
    category: 'AI / ML',
    tech: ['YOLOv8', 'FastAPI', 'React 18', 'Leaflet', 'SQLite'],
    visualType: 'traffic',
    scope: {
      role: 'Full-stack AI Engineer',
      domain: 'Computer Vision / Real-time Video Analytics',
      stack: 'YOLOv8, OpenCV, FastAPI, React 18, Leaflet Maps, SQLite',
    },
    highlights: [
      'Real-time YOLOv8 multi-class vehicle detection (cars, motorbikes, buses, trucks)',
      'Ingests live YouTube streams and RTSP camera feeds with low-latency frame processing',
      'Interactive Leaflet geospatial map integrated with live weather radar overlays',
    ],
    story: {
      motivation:
        'Urban congestion in Ho Chi Minh City requires automated, real-time observability across hundreds of camera feeds. My goal was to connect a high-speed Computer Vision inference pipeline to an intuitive geospatial dashboard that operators can actually use.',
      architecture:
        'Frames from live RTSP/YouTube streams are captured asynchronously via OpenCV and passed through a tuned YOLOv8 detector. FastAPI serves both the annotated video stream and aggregated vehicle count metrics stored in SQLite, while a React 18 + Leaflet frontend visualizes congestion hotspots alongside live weather conditions.',
      impact:
        'Demonstrates a complete production-style AI pipeline from raw video ingestion and GPU/CPU inference to real-time frontend observability.',
    },
  },
  {
    slug: 'uit-pinance',
    caseLabel: 'Case4',
    title: 'UIT_PINANCE',
    description: 'Full-stack stock trading simulator with portfolio analytics and automated reporting.',
    longDescription:
      'Web platform simulating real-world stock trading — multi-currency accounts, watchlists, advanced order execution, portfolio tracking, and CSV/PDF reporting backed by Flask and PostgreSQL.',
    marqueeText:
      'Simulating financial markets with precision. Advanced order matching, real-time portfolio analytics, and automated reporting.',
    headline:
      'UIT_PINANCE — Full-stack stock trading simulator with advanced order types, portfolio analytics, and multi-language support.',
    url: 'https://github.com/thanhdatnguyentk/UIT_PINANCE',
    category: 'Web',
    tech: ['Flask', 'PostgreSQL', 'Chart.js', 'Jinja2'],
    stars: 2,
    visualType: 'finance',
    scope: {
      role: 'Backend & Financial Logic Developer',
      domain: 'FinTech Simulation / Web Engineering',
      stack: 'Python, Flask, PostgreSQL, Chart.js, Jinja2, PDF/CSV Export',
    },
    highlights: [
      'Supports market, limit, trailing stop, and leveraged order execution flows',
      'Automated CSV and PDF financial statement export for trade histories',
      'Documented in both English and Japanese (EN / JA) for cross-border collaboration',
    ],
    story: {
      motivation:
        'Financial trading systems demand strict transactional integrity, accurate state transitions, and clear visual analytics. UIT_PINANCE was created as a risk-free sandbox for testing trading strategies and understanding order-book mechanics.',
      architecture:
        'Built on Flask and PostgreSQL with ACID-compliant transaction handling for account balances and position updates. Interactive Chart.js dashboards track equity curves and asset allocation, complemented by a reporting module that generates downloadable CSV and PDF statements.',
      impact:
        'Provides a complete end-to-end financial simulation environment with comprehensive English and Japanese documentation.',
    },
  },
  {
    slug: 'milky-way-simulation',
    caseLabel: 'Case5',
    title: 'Milky Way Simulation',
    description: 'High-performance N-body gravitational simulation of the Milky Way in C and CUDA.',
    longDescription:
      'N-body gravitational physics simulation of the Milky Way galaxy running on NVIDIA GPUs. Hands-on exploration of custom CUDA kernels, shared-memory tiling, and scientific visualization.',
    marqueeText:
      'Harnessing thousands of GPU threads in C and CUDA. Simulating galactic N-body gravitational dynamics at interactive frame rates.',
    headline:
      'Milky Way Simulation — Massively parallel N-body gravitational simulation written in C and custom CUDA kernels.',
    url: 'https://github.com/thanhdatnguyentk/Milky-Way-Simulation-C-CUDA-',
    category: 'Systems',
    tech: ['C', 'CUDA', 'GPU Compute', 'Physics'],
    visualType: 'galaxy',
    scope: {
      role: 'Systems & GPU Programmer',
      domain: 'High-Performance Computing (HPC) / GPU Simulation',
      stack: 'C, NVIDIA CUDA, Parallel Reduction, Scientific Visualization',
    },
    highlights: [
      'Custom N-body gravitational solver executing in parallel across GPU thread blocks',
      'Optimized memory coalescing and shared-memory tiling to minimize bandwidth bottlenecks',
      'Real-time visual rendering of spiral arm formation and orbital dynamics',
    ],
    story: {
      motivation:
        'Training large AI models relies heavily on GPU parallelism. Writing an N-body gravitational simulator directly in C and CUDA was my way of mastering thread hierarchies, warp execution, and shared memory optimization at the hardware level.',
      architecture:
        'Pairwise gravitational forces across thousands of stellar bodies ($O(N^2)$ complexity) are partitioned across CUDA thread blocks. By staging particle positions in fast on-chip shared memory before accumulating accelerations, the solver dramatically reduces global VRAM traffic.',
      impact:
        'Achieves massive speedups over single-threaded CPU execution and forms the low-level GPU programming foundation that powers my deep learning work.',
    },
  },
];

export const skillGroups: { label: string; subtitle: string; items: string[] }[] = [
  {
    label: 'Languages',
    subtitle: 'Core programming languages for AI pipelines, systems, and web applications',
    items: ['Python', 'Java 21', 'C / C++', 'CUDA C', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: 'AI / ML & Deep Learning',
    subtitle: 'Frameworks and architectures I explore and deploy end-to-end',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'BERT / T5 / LLMs', 'RAG Pipelines', 'YOLOv8 / OpenCV', 'BlazeFace / UltraFace', 'MLTK'],
  },
  {
    label: 'Web, Data & Infrastructure',
    subtitle: 'Tools for serving models, building dashboards, and shipping reproducibly',
    items: ['FastAPI', 'Flask', 'React 18', 'Vue 3', 'Astro', 'Docker', 'PostgreSQL', 'Git / Linux'],
  },
];

export const stats: { value: string; label: string }[] = [
  { value: '44+', label: 'Public repos' },
  { value: '3rd', label: 'Year IT @ UIT' },
  { value: '5', label: 'Featured cases' },
  { value: '∞', label: 'Cups of coffee' },
];

export const profileInfo = {
  name: 'Nguyễn Thành Đạt',
  brandLogo: 'thanh dat design & ai',
  shortBrand: 'thanh dat .ai',
  handle: 'thanhdatnguyentk',
  role: 'AI Engineer in Training',
  school: 'University of Information Technology (UIT) — VNU-HCM',
  location: 'Ho Chi Minh City, Vietnam',
  timezone: 'UTC+07:00',
  email: '23520261@gm.uit.edu.vn',
  github: 'https://github.com/thanhdatnguyentk',
  quote: "AI is not magic — it's just a lot of math, code, and coffee.",
  headerRoles: [
    'Machine Learning',
    'NLP & LLM Systems',
    'Computer Vision',
    'AI System Deployment',
  ],
};