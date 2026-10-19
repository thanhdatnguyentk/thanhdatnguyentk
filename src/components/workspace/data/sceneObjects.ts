import type { LocalizedText } from '../../../data/projects';
import type { InteractiveObjectId } from './cameraPresets';

export type InspectorKind =
  | 'all-projects'
  | 'single-project'
  | 'dual-galaxy'
  | 'gpu-compute'
  | 'robot-rag'
  | 'skills'
  | 'about'
  | 'academic'
  | 'coffee'
  | 'contact';

export interface SceneObjectDefinition {
  id: InteractiveObjectId;
  icon: string;
  accentColor: string;
  inspectorKind: InspectorKind;
  projectSlugs?: string[];
  label: LocalizedText;
  shortHint: LocalizedText;
  subtitle: LocalizedText;
  hotspotPosition: [number, number, number];
}

export const SCENE_OBJECTS: SceneObjectDefinition[] = [
  {
    id: 'video-monitor',
    icon: '🎬',
    accentColor: '#22d3ee',
    inspectorKind: 'single-project',
    projectSlugs: ['video-retrieval-system'],
    label: {
      en: 'AIC-26 Video Search',
      vi: 'Truy xuất Video AIC-26',
      ja: 'AIC-26 映像検索',
    },
    shortHint: {
      en: 'AIC-26 Video Search',
      vi: 'Truy xuất Video AIC-26',
      ja: 'AIC-26 映像検索',
    },
    subtitle: {
      en: 'Lead Project · CLIP + BLIP-2 + FAISS',
      vi: 'Dự án Lead · CLIP + BLIP-2 + FAISS',
      ja: 'リード案件 · CLIP + BLIP-2 + FAISS',
    },
    hotspotPosition: [-0.78, 1.48, -1.08],
  },
  {
    id: 'galaxy-hologram',
    icon: '🌌',
    accentColor: '#7ddcf7',
    inspectorKind: 'dual-galaxy',
    projectSlugs: ['milky-way-galaxy', 'milky-way-simulation'],
    label: {
      en: 'Milky Way 3D Hologram',
      vi: 'Hologram Thiên hà 3D',
      ja: '3D天の川ホログラム',
    },
    shortHint: {
      en: 'Milky Way 3D',
      vi: 'Thiên hà 3D',
      ja: '3D銀河',
    },
    subtitle: {
      en: 'WebGL2 / WebGPU & CUDA Barnes-Hut',
      vi: 'WebGL2 / WebGPU & CUDA Barnes-Hut',
      ja: 'WebGL2 / WebGPU & CUDA Barnes-Hut',
    },
    hotspotPosition: [1.38, 0.96, 0.82],
  },
  {
    id: 'gpu-server',
    icon: '⚡',
    accentColor: '#ac98ff',
    inspectorKind: 'gpu-compute',
    projectSlugs: ['javatorch', 'milky-way-simulation'],
    label: {
      en: 'CUDA & JavaTorch Rack',
      vi: 'Tủ GPU CUDA & JavaTorch',
      ja: 'CUDA & JavaTorch ラック',
    },
    shortHint: {
      en: 'JavaTorch & CUDA',
      vi: 'JavaTorch & CUDA',
      ja: 'JavaTorch & CUDA',
    },
    subtitle: {
      en: 'Deep Learning Framework & GPU Kernels',
      vi: 'Framework Deep Learning & Nhân GPU',
      ja: '深層学習フレームワーク & GPUカーネル',
    },
    hotspotPosition: [1.68, 1.38, -1.16],
  },
  {
    id: 'ai-robot',
    icon: '🤖',
    accentColor: '#34d399',
    inspectorKind: 'robot-rag',
    projectSlugs: ['rag-film-chatbot'],
    label: {
      en: 'DatBot-01 · RAG Bot',
      vi: 'DatBot-01 · Trợ lý RAG',
      ja: 'DatBot-01 · RAGボット',
    },
    shortHint: {
      en: 'RAG Film Chatbot',
      vi: 'RAG Film Chatbot',
      ja: 'RAG映画チャットボット',
    },
    subtitle: {
      en: 'Hybrid RAG · FAISS + BM25 + LLM',
      vi: 'Hybrid RAG · FAISS + BM25 + LLM',
      ja: 'ハイブリッドRAG · FAISS + BM25 + LLM',
    },
    hotspotPosition: [0.64, 1.18, -0.82],
  },
  {
    id: 'cctv-display',
    icon: '📹',
    accentColor: '#ffc992',
    inspectorKind: 'single-project',
    projectSlugs: ['traffic-monitoring'],
    label: {
      en: 'YOLOv8 Traffic Monitor',
      vi: 'Màn hình Giao thông YOLOv8',
      ja: 'YOLOv8 交通監視モニター',
    },
    shortHint: {
      en: 'Traffic CV (30+ FPS)',
      vi: 'Giám sát Giao thông',
      ja: '交通監視CV (30+ FPS)',
    },
    subtitle: {
      en: 'Real-Time YOLOv8 + ByteTrack (30+ FPS)',
      vi: 'YOLOv8 + ByteTrack Thời gian thực (30+ FPS)',
      ja: 'リアルタイム YOLOv8 + ByteTrack',
    },
    hotspotPosition: [-0.78, 2.48, -2.02],
  },
  {
    id: 'finance-display',
    icon: '📈',
    accentColor: '#ffc992',
    inspectorKind: 'single-project',
    projectSlugs: ['uit-pinance'],
    label: {
      en: 'UIT_PINANCE Terminal',
      vi: 'Thiết bị Đầu cuối UIT_PINANCE',
      ja: 'UIT_PINANCE クオンツ端末',
    },
    shortHint: {
      en: 'Quant Finance AI',
      vi: 'Tài chính Định lượng',
      ja: 'クオンツ金融AI',
    },
    subtitle: {
      en: 'Algorithmic Trading · Sharpe Ratio 1.8+',
      vi: 'Giao dịch Thuật toán · Sharpe 1.8+',
      ja: 'アルゴリズム取引 · シャープレシオ 1.8+',
    },
    hotspotPosition: [1.02, 1.48, -1.06],
  },
  {
    id: 'main-monitor',
    icon: '🖥️',
    accentColor: '#7ddcf7',
    inspectorKind: 'all-projects',
    projectSlugs: [
      'video-retrieval-system',
      'milky-way-galaxy',
      'javatorch',
      'rag-film-chatbot',
      'traffic-monitoring',
      'uit-pinance',
      'milky-way-simulation',
    ],
    label: {
      en: 'All 7 Projects Hub',
      vi: 'Trung tâm 7 Dự án',
      ja: '全7プロジェクト一覧',
    },
    shortHint: {
      en: 'All 7 Projects',
      vi: 'Tất cả 7 Dự án',
      ja: '全7プロジェクト',
    },
    subtitle: {
      en: 'Ultrawide Command Center · 7 Case Studies',
      vi: 'Trạm Chỉ huy · 7 Nghiên cứu Tình huống',
      ja: 'コマンドセンター · 7つのケーススタディ',
    },
    hotspotPosition: [0.12, 1.56, -1.32],
  },
  {
    id: 'bookshelf',
    icon: '📚',
    accentColor: '#ffc992',
    inspectorKind: 'skills',
    label: {
      en: 'Technical Library & Skills',
      vi: 'Thư viện Kỹ thuật & Kỹ năng',
      ja: '技術ライブラリ & スキル',
    },
    shortHint: {
      en: 'Tech Stack & Skills',
      vi: 'Tech Stack & Kỹ năng',
      ja: '技術スタック & スキル',
    },
    subtitle: {
      en: 'PyTorch · CUDA · Vision · RAG · Systems',
      vi: 'PyTorch · CUDA · Vision · RAG · Hệ thống',
      ja: 'PyTorch · CUDA · Vision · RAG · システム',
    },
    hotspotPosition: [-1.84, 1.86, -1.16],
  },
  {
    id: 'whiteboard',
    icon: '🧠',
    accentColor: '#ac98ff',
    inspectorKind: 'about',
    label: {
      en: 'Neural Architecture Board',
      vi: 'Bảng Kiến trúc Neural & RAG',
      ja: 'ニューラル設計ホワイトボード',
    },
    shortHint: {
      en: 'AI Architecture',
      vi: 'Kiến trúc AI',
      ja: 'AIアーキテクチャ',
    },
    subtitle: {
      en: 'Multimodal RAG · Attention · Vector Index',
      vi: 'Multimodal RAG · Attention · Vector Index',
      ja: 'マルチモーダルRAG · Attention · ベクトル検索',
    },
    hotspotPosition: [0.38, 2.52, -2.04],
  },
  {
    id: 'desk-calendar',
    icon: '🎓',
    accentColor: '#2dd4bf',
    inspectorKind: 'academic',
    label: {
      en: 'UIT — VNU-HCM Plaque',
      vi: 'Kỷ niệm chương UIT — ĐHQG-HCM',
      ja: 'UIT — VNU-HCM 記念プレート',
    },
    shortHint: {
      en: 'Education @ UIT',
      vi: 'Học vấn @ UIT',
      ja: 'UIT学歴',
    },
    subtitle: {
      en: 'B.S. in Computer Science · AI Research',
      vi: 'Cử nhân Khoa học Máy tính · Nghiên cứu AI',
      ja: 'コンピュータサイエンス学士 · AI研究',
    },
    hotspotPosition: [-0.46, 1.16, -0.92],
  },
  {
    id: 'coffee-mug',
    icon: '☕',
    accentColor: '#fbbf24',
    inspectorKind: 'coffee',
    label: {
      en: 'Steaming Espresso Mug',
      vi: 'Tách Cà Phê Nóng',
      ja: '温かいコーヒーマグ',
    },
    shortHint: {
      en: 'Coffee Quote ☕',
      vi: 'Châm ngôn Cà phê ☕',
      ja: 'コーヒーの格言 ☕',
    },
    subtitle: {
      en: 'Engineering Fuel · Easter Egg',
      vi: 'Nhiên liệu Kỹ sư · Easter Egg',
      ja: 'エンジニアの燃料 · イースターエッグ',
    },
    hotspotPosition: [-0.24, 1.16, -0.82],
  },
  {
    id: 'mail-dock',
    icon: '✉️',
    accentColor: '#34d399',
    inspectorKind: 'contact',
    label: {
      en: 'Contact & Social Dock',
      vi: 'Trạm Kết nối & Liên hệ',
      ja: 'コンタクト & SNSドック',
    },
    shortHint: {
      en: 'Contact Me',
      vi: 'Liên hệ',
      ja: 'お問い合わせ',
    },
    subtitle: {
      en: 'Email · GitHub · LinkedIn',
      vi: 'Email · GitHub · LinkedIn',
      ja: 'メール · GitHub · LinkedIn',
    },
    hotspotPosition: [1.16, 1.18, -0.82],
  },
];

export const SCENE_OBJECT_MAP: Record<InteractiveObjectId, SceneObjectDefinition> =
  Object.fromEntries(SCENE_OBJECTS.map((obj) => [obj.id, obj])) as Record<
    InteractiveObjectId,
    SceneObjectDefinition
  >;

export function getSceneObject(
  id: InteractiveObjectId
): SceneObjectDefinition | undefined {
  return SCENE_OBJECT_MAP[id];
}
