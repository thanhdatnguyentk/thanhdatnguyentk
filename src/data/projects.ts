export type ProjectCategory = 'AI / ML' | 'Web' | 'Systems';

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  url: string;
  category: ProjectCategory;
  tech: string[];
  stars?: number;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    title: 'JavaTorch',
    description: 'PyTorch-like deep learning framework implemented natively in Java.',
    longDescription:
      'A from-scratch Java reimplementation of PyTorch core abstractions, with autograd, dynamic graphs, and GPU acceleration via JCuda, cuBLAS, and cuDNN.',
    url: 'https://github.com/thanhdatnguyentk/JavaTorch',
    category: 'AI / ML',
    tech: ['Java 21', 'JCuda', 'cuDNN', 'Gradle', 'Vue 3'],
    stars: 4,
    highlights: [
      '118+ JUnit 5 test methods, 50 test files',
      'GPU-accelerated matmul, conv, attention',
      'Real-time Neural Dashboard via WebSocket',
    ],
  },
  {
    title: 'RAG Film Chatbot',
    description: 'AI chatbot for films using Retrieval-Augmented Generation.',
    longDescription:
      'A learning project exploring RAG patterns end-to-end — chunking, embeddings, vector retrieval, and grounded LLM responses for film Q&A.',
    url: 'https://github.com/thanhdatnguyentk/RAG_film_chatbot',
    category: 'AI / ML',
    tech: ['Python', 'Hugging Face', 'Vector DB', 'Procfile'],
    stars: 2,
    highlights: [
      'Document chunking & semantic retrieval',
      'LLM-grounded answers with citations',
      'Deployed via Heroku-style Procfile',
    ],
  },
  {
    title: 'Traffic Monitoring Real-time System',
    description: 'Real-time vehicle detection and traffic analysis dashboard.',
    longDescription:
      'Real-time traffic monitoring system using YOLOv8 for vehicle detection, FastAPI backend, and React dashboard with live maps and weather data.',
    url: 'https://github.com/thanhdatnguyentk/Traffic-Monitoring-Realtime-System',
    category: 'AI / ML',
    tech: ['YOLOv8', 'FastAPI', 'React 18', 'Leaflet', 'SQLite'],
    highlights: [
      'YOLOv8 multi-class vehicle detection',
      'YouTube Live / RTSP stream support',
      'Interactive Leaflet map with weather radar',
    ],
  },
  {
    title: 'UIT_PINANCE',
    description: 'Stock trading simulator with portfolio management and analytics.',
    longDescription:
      'Demo web application simulating stock trading — accounts, watchlists, orders, portfolio tracking, and CSV/PDF reports. Flask + PostgreSQL backend with Chart.js visualisations.',
    url: 'https://github.com/thanhdatnguyentk/UIT_PINANCE',
    category: 'Web',
    tech: ['Flask', 'PostgreSQL', 'Chart.js', 'Jinja2'],
    stars: 2,
    highlights: [
      'Order types: limit, market, trailing stop, leverage',
      'CSV / PDF export for trades & portfolio',
      'Multi-language READMEs (EN / JA)',
    ],
  },
  {
    title: 'Milky Way Simulation',
    description: 'High-performance physics simulation of the Milky Way in C/CUDA.',
    longDescription:
      'N-body gravitational simulation of the Milky Way galaxy running on GPU. Hands-on exploration of CUDA kernels, parallel compute, and scientific visualisation.',
    url: 'https://github.com/thanhdatnguyentk/Milky-Way-Simulation-C-CUDA-',
    category: 'Systems',
    tech: ['C', 'CUDA', 'GPU Compute'],
    highlights: [
      'N-body gravitational solver on GPU',
      'Massively parallel CUDA kernels',
      'Scientific visualisation output',
    ],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'AI / ML',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenCV', 'CUDA'],
  },
  {
    label: 'Web & Tools',
    items: ['React', 'FastAPI', 'Flask', 'Docker', 'Git', 'PostgreSQL'],
  },
];

export const stats: { value: string; label: string }[] = [
  { value: '44+', label: 'Public repos' },
  { value: '3rd', label: 'Year IT @ UIT' },
  { value: '5', label: 'Featured projects' },
  { value: '∞', label: 'Lines of coffee' },
];