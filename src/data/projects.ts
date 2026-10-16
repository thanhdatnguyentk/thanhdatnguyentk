export type Lang = 'en' | 'vi' | 'ja';
export type ProjectCategory = 'AI / ML' | 'Web' | 'Systems';

export interface LocalizedText {
  en: string;
  vi: string;
  ja: string;
}

export interface Project {
  slug: string;
  caseLabel: string;
  title: string;
  category: ProjectCategory;
  tech: string[];
  stars?: number;
  url: string;
  visualType: 'video' | 'tensor' | 'rag' | 'traffic' | 'finance' | 'galaxy';
  marqueeText: string; // Kept in English Righteous display font like mildsugardesign.jp
  description: LocalizedText;
  longDescription: LocalizedText;
  headline: LocalizedText;
  scope: {
    role: LocalizedText;
    domain: LocalizedText;
    stack: string;
  };
  highlights: {
    en: string[];
    vi: string[];
    ja: string[];
  };
  story: {
    motivation: LocalizedText;
    architecture: LocalizedText;
    impact: LocalizedText;
  };
}

export const projects: Project[] = [
  {
    slug: 'video-retrieval-system',
    caseLabel: 'Case1',
    title: 'Video Retrieval System (AIC-26)',
    category: 'AI / ML',
    tech: ['EVA-02 CLIP', 'FAISS', 'YOLOv26x', 'BLIP', 'DINOv2', 'Flask'],
    url: 'https://github.com/huudangg0204/Video-Retrieval-system',
    visualType: 'video',
    marqueeText:
      'Leading a multimodal video retrieval engine for AI Challenge. Dual-stream EVA-02 & CLIP embeddings, FAISS vector search, and TRAKE temporal reasoning.',
    description: {
      en: 'Multimodal video search engine (Lead) powered by EVA-02 CLIP, FAISS, and TRAKE temporal reasoning.',
      vi: 'Hệ thống truy xuất video đa phương thức (Team Lead) tích hợp EVA-02 CLIP, FAISS và suy luận chuỗi sự kiện TRAKE.',
      ja: 'EVA-02 CLIP・FAISS・TRAKE時系列推論を統合したマルチモーダル映像検索システム（チームリーダー）。',
    },
    longDescription: {
      en: 'Led the architecture and engineering of AIC-26 — an intelligent multimodal video retrieval platform for AI Challenge supporting bilingual text-to-video, image-to-video, OCR, object filtering, and TRAKE temporal sequence search.',
      vi: 'Dẫn dắt thiết kế kiến trúc và phát triển AIC-26 — hệ thống truy xuất video thông minh đa phương thức phục vụ kỳ thi AI Challenge, hỗ trợ tìm kiếm bằng ngôn ngữ tự nhiên (Việt/Anh), hình ảnh, văn bản OCR, lọc đối tượng và chuỗi sự kiện theo thời gian (TRAKE).',
      ja: 'AI Challenge向けに開発をリードしたインテリジェント映像検索基盤「AIC-26」。自然言語（日・英・越対応）、類似画像、OCRテキスト、物体フィルタリング、およびTRAKE時系列イベント検索を高速に実行します。',
    },
    headline: {
      en: 'Video Retrieval System (AIC-26) — Leading a sub-second multimodal video search engine with EVA-02 CLIP, FAISS, and TRAKE temporal reasoning.',
      vi: 'Video Retrieval System (AIC-26) — Dẫn dắt phát triển hệ thống truy xuất video đa phương thức tốc độ dưới 1 giây với EVA-02 CLIP, FAISS và TRAKE.',
      ja: 'Video Retrieval System (AIC-26) — EVA-02 CLIP・FAISS・TRAKE時系列推論によるミリ秒級マルチモーダル映像検索システムの開発をリード。',
    },
    scope: {
      role: {
        en: 'Team Lead & Lead AI Architect',
        vi: 'Trưởng nhóm (Team Lead) & Kiến trúc sư AI',
        ja: 'チームリーダー・リードAIアーキテクト',
      },
      domain: {
        en: 'Multimodal Video Retrieval / Vision-Language AI',
        vi: 'Truy xuất Video Đa phương thức / Vision-Language AI',
        ja: 'マルチモーダル映像検索 / 視覚言語AI（VLM）',
      },
      stack:
        'Python 3.10+, PyTorch 2.0+, EVA-02 CLIP, CLIP ViT-B/32, FAISS, YOLOv26x, BLIP, DINOv2, EasyOCR, BM25, Flask, Fuse.js',
    },
    highlights: {
      en: [
        '3-Way Weighted Hybrid Retrieval blending EVA-02 CLIP (w=0.6), CLIP ViT-B/32 (w=0.4), and BM25 captions (w=0.2) over dual FAISS IndexFlatIP indices',
        'TRAKE Temporal Event Search using custom Dynamic Programming (DP) and lazy-loaded BLIP ITM reranking to locate ordered event sequences',
        'DINOv2 scene-change keyframe extraction enriched with YOLOv26x (3×3 spatial grid), Places365 scenes, EasyOCR bilingual text, and instant Fuse.js filtering',
      ],
      vi: [
        'Truy xuất lai 3 luồng có trọng số: kết hợp EVA-02 CLIP (w=0.6), CLIP ViT-B/32 (w=0.4) và BM25 caption (w=0.2) trên cặp chỉ mục FAISS IndexFlatIP dưới 1 giây',
        'Thuật toán TRAKE Temporal Search ứng dụng Quy hoạch động (Dynamic Programming) kết hợp BLIP ITM Reranking để định vị chính xác chuỗi sự kiện theo trình tự thời gian',
        'Trích xuất keyframe đổi cảnh bằng DINOv2 kèm làm giàu Metadata Sidecar: nhận diện đối tượng YOLOv26x (lưới không gian 3×3), bối cảnh Places365, EasyOCR song ngữ và lọc tức thì bằng Fuse.js',
      ],
      ja: [
        'EVA-02 CLIP (w=0.6)、CLIP ViT-B/32 (w=0.4)、BM25キャプション検索 (w=0.2) を融合した3ストリーム重み付けハイブリッドFAISS検索',
        '動的計画法（DP）とBLIP ITMリランキングを組み合わせ、映像内の順序付きイベント系列を特定する「TRAKE」時系列検索アルゴリズム',
        'DINOv2によるシーン変化キーフレーム抽出と、YOLOv26x（3×3空間グリッド）、Places365、EasyOCR、Fuse.js即時フィルタリングによるメタデータ拡張',
      ],
    },
    story: {
      motivation: {
        en: 'Searching through hundreds of hours of unindexed video in competitive AI Challenge benchmarks requires locating exact frames within seconds from vague natural language descriptions or multi-step temporal clues. As Team Lead, I architected AIC-26 to unify dense vision-language representations, lexical OCR/caption matching, and temporal reasoning into a single cohesive retrieval engine.',
        vi: 'Trong bài toán AI Challenge với hàng trăm giờ video phi cấu trúc, việc tìm ra chính xác khung hình mục tiêu chỉ trong vài giây từ mô tả ngôn ngữ tự nhiên hoặc chuỗi hành động liên tiếp là thách thức cốt lõi. Với vai trò Team Lead, mình đã định hình kiến trúc AIC-26 nhằm hợp nhất biểu diễn Vision-Language đa luồng, đối sánh từ khóa OCR/Caption và suy luận thời gian vào một hệ thống duy nhất.',
        ja: '何百時間にも及ぶ非構造化映像から、自然言語の記述や連続するイベントの手がかりをもとに数秒以内で目的のフレームを特定することは大きな課題です。チームリーダーとして、視覚言語埋め込み、OCR・キャプション検索、時系列推論を一つに統合した「AIC-26」のアーキテクチャを設計・主導しました。',
      },
      architecture: {
        en: 'Offline ingestion uses DINOv2 cosine similarity to detect shot boundaries and extract keyframes, generating rich metadata sidecars containing YOLOv26x bounding boxes mapped to a 3×3 spatial grid, Places365 scene categories, EasyOCR text, and BLIP captions. At query time, a threaded Flask server executes a 3-way weighted fusion across EVA-02 CLIP (768-dim), CLIP ViT-B/32 (512-dim), and BM25, while the custom TRAKE Dynamic Programming solver scores sequential event transitions and refines top candidates with BLIP ITM.',
        vi: 'Ở pha tiền xử lý, hệ thống dùng DINOv2 tính độ tương đồng cosine để tách cảnh và trích xuất keyframe, đồng thời sinh Metadata Sidecar gồm tọa độ đối tượng YOLOv26x trên lưới 3×3, phân loại bối cảnh Places365, văn bản EasyOCR và mô tả BLIP. Khi truy vấn, máy chủ Flask đa luồng thực thi kết hợp 3 luồng (EVA-02 768 chiều, CLIP-32 512 chiều và BM25), trong khi bộ giải Quy hoạch động TRAKE tính điểm chuyển tiếp chuỗi sự kiện và tinh chỉnh thứ hạng bằng BLIP ITM.',
        ja: 'オフライン処理ではDINOv2のコサイン類似度でカット変わりを検出してキーフレームを抽出し、YOLOv26xの3×3空間グリッド物体情報、Places365シーン分類、EasyOCRテキスト、BLIPキャプションを含むメタデータを生成。検索時にはマルチスレッドFlaskサーバーがEVA-02（768次元）、CLIP-32（512次元）、BM25の3系統スコアを統合し、TRAKE動的計画法ソルバーとBLIP ITMが時系列イベント検索を高精度に実行します。',
      },
      impact: {
        en: 'Delivered sub-second retrieval latency across large-scale video corpora with both a responsive Web UI (instant Fuse.js metadata filtering) and a CustomTkinter desktop client, establishing clear engineering standards (Black, Ruff, modular specs) across the team.',
        vi: 'Đạt tốc độ truy xuất dưới 1 giây trên tập dữ liệu video lớn cùng lúc hỗ trợ cả giao diện Web (lọc tức thì với Fuse.js) lẫn ứng dụng Desktop CustomTkinter, đồng thời thiết lập quy chuẩn kỹ thuật rõ ràng (Black, Ruff, tài liệu đặc tả module) cho toàn đội ngũ.',
        ja: '大規模映像データセットに対してサブ秒の検索レスポンスを達成し、Fuse.js即時フィルタリング対応のWeb UIとCustomTkinterデスクトップアプリの双方を提供。チーム全体のコーディング規約とモジュール設計標準を確立しました。',
      },
    },
  },
  {
    slug: 'javatorch',
    caseLabel: 'Case2',
    title: 'JavaTorch',
    category: 'AI / ML',
    tech: ['Java 21', 'JCuda', 'cuDNN', 'Gradle', 'Vue 3'],
    stars: 4,
    url: 'https://github.com/thanhdatnguyentk/JavaTorch',
    visualType: 'tensor',
    marqueeText:
      'From raw memory buffers to dynamic computation graphs. Rebuilding PyTorch core abstractions natively in Java with CUDA acceleration.',
    description: {
      en: 'PyTorch-like deep learning framework implemented natively in Java with CUDA GPU acceleration.',
      vi: 'Framework Deep Learning tương tự PyTorch được cài đặt thuần bằng Java 21 kèm tăng tốc GPU qua CUDA.',
      ja: 'Java 21でネイティブ実装された、CUDA GPUアクセラレーション対応のPyTorch風ディープラーニングフレームワーク。',
    },
    longDescription: {
      en: 'A from-scratch Java reimplementation of PyTorch core abstractions, featuring reverse-mode autograd, dynamic computational graphs, and GPU acceleration via JCuda, cuBLAS, and cuDNN.',
      vi: 'Tái hiện từ con số 0 các lớp trừu tượng cốt lõi của PyTorch bằng ngôn ngữ Java, hỗ trợ tự động tính đạo hàm ngược (reverse-mode autograd), đồ thị tính toán động và tăng tốc phần cứng GPU qua JCuda, cuBLAS, cuDNN.',
      ja: 'PyTorchのコア抽象化をゼロからJavaで再実装。リバースモード自動微分（Autograd）、動的計算グラフ、JCuda・cuBLAS・cuDNNによるGPU高速化を備えています。',
    },
    headline: {
      en: 'JavaTorch — Rebuilding PyTorch core abstractions natively in Java 21 with reverse-mode autograd and CUDA acceleration.',
      vi: 'JavaTorch — Xây dựng lại nhân PyTorch thuần bằng Java 21 với đồ thị đạo hàm tự động (Autograd) và tăng tốc GPU CUDA.',
      ja: 'JavaTorch — リバースモード自動微分とCUDA GPU高速化を備え、PyTorchのコア機構をJava 21でゼロから再構築。',
    },
    scope: {
      role: {
        en: 'Creator & Core Maintainer',
        vi: 'Tác giả & Phát triển chính',
        ja: '開発者・コアメンテナー',
      },
      domain: {
        en: 'Deep Learning Framework / GPU Systems',
        vi: 'Framework Học sâu / Hệ thống GPU',
        ja: '深層学習フレームワーク / GPUシステム',
      },
      stack: 'Java 21, JCuda, cuBLAS, cuDNN, JUnit 5, Vue 3, WebSocket',
    },
    highlights: {
      en: [
        '118+ JUnit 5 test methods across 50 test files verifying gradient & tensor correctness',
        'GPU-accelerated matrix multiplication, 2D convolution, and multi-head attention',
        'Real-time Neural Training Dashboard streaming live loss & gradients via WebSocket',
      ],
      vi: [
        'Hơn 118 bài kiểm thử JUnit 5 trên 50 file test đảm bảo độ chính xác của đạo hàm và phép toán Tensor',
        'Tăng tốc GPU cho phép nhân ma trận, tích chập 2D (Conv2D) và cơ chế Multi-Head Attention',
        'Bảng điều khiển huấn luyện thời gian thực (Vue 3 + WebSocket) trực quan hóa hàm mất mát và gradient',
      ],
      ja: [
        '50のテストファイル・118以上のJUnit 5テストにより勾配計算とテンソル演算の正確性を検証',
        '行列積、2次元畳み込み（Conv2D）、Multi-Head AttentionのGPUアクセラレーションを実装',
        'WebSocketとVue 3によるリアルタイム学習ダッシュボードで損失（Loss）や勾配を可視化',
      ],
    },
    story: {
      motivation: {
        en: 'To truly understand how modern deep learning frameworks work under the hood, calling high-level Python APIs is not enough. I started JavaTorch to demystify automatic differentiation, strided tensor memory layouts, and GPU kernel dispatch by building every abstraction from first principles in Java 21.',
        vi: 'Để thực sự làm chủ cách các framework học sâu hiện đại vận hành bên dưới, việc chỉ gọi API bậc cao trong Python là chưa đủ. Mình bắt đầu xây dựng JavaTorch nhằm giải mã cơ chế tự động tính đạo hàm (Autograd), cách bố trí bộ nhớ Tensor và luồng thực thi nhân GPU từ những nguyên lý cơ bản nhất bằng Java 21.',
        ja: '現代のディープラーニングフレームワークの内部構造を本質的に理解するには、Pythonの高水準APIを呼び出すだけでは不十分だと考えました。自動微分やテンソルのメモリレイアウト、GPUカーネルのディスパッチを基礎から解き明かすため、Java 21ですべての抽象化をゼロから構築しました。',
      },
      architecture: {
        en: 'JavaTorch is structured around a multi-dimensional Tensor engine supporting both CPU and CUDA memory backends. The Autograd engine dynamically records a directed acyclic graph (DAG) of operations during the forward pass and executes topological reverse-mode backpropagation. Heavy linear algebra and convolution primitives are bridged directly to NVIDIA cuBLAS and cuDNN via JCuda.',
        vi: 'JavaTorch xoay quanh bộ máy Tensor đa chiều hỗ trợ song song bộ nhớ CPU và CUDA. Bộ máy Autograd tự động ghi lại đồ thị tính toán có hướng không chu trình (DAG) trong lượt truyền xuôi (forward pass) và sắp xếp tô-pô để lan truyền ngược (backpropagation). Các phép đại số tuyến tính và tích chập nặng được kết nối trực tiếp xuống NVIDIA cuBLAS và cuDNN thông qua JCuda.',
        ja: 'CPUとCUDAの双方のメモリバックエンドをサポートする多次元テンソルエンジンを中心に設計されています。Autogradエンジンは順伝播時に有向非巡回グラフ（DAG）を動的に記録し、トポロジカルソートに基づく逆伝播を実行します。高負荷な線形代数および畳み込み演算はJCudaを介してNVIDIA cuBLAS・cuDNNへ直接ブリッジされます。',
      },
      impact: {
        en: 'Backed by over 118 unit tests across 50 test suites, JavaTorch reliably trains multi-layer perceptrons, CNNs, and Transformer blocks with live telemetry streamed to a Vue 3 WebSocket dashboard.',
        vi: 'Được bảo chứng bởi hơn 118 unit test trên 50 bộ kiểm thử, JavaTorch huấn luyện ổn định các mạng MLP, CNN và khối Transformer kèm luồng dữ liệu giám sát trực tiếp lên giao diện Vue 3.',
        ja: '50スイート・118以上の単体テストに裏付けられ、MLP、CNN、Transformerブロックの学習を安定して実行でき、Vue 3ダッシュボードへリアルタイムにメトリクスを配信します。',
      },
    },
  },
  {
    slug: 'rag-film-chatbot',
    caseLabel: 'Case3',
    title: 'RAG Film Chatbot',
    category: 'AI / ML',
    tech: ['Python', 'Hugging Face', 'Vector DB', 'Transformers'],
    stars: 2,
    url: 'https://github.com/thanhdatnguyentk/RAG_film_chatbot',
    visualType: 'rag',
    marqueeText:
      'Grounding Large Language Models with semantic vector retrieval. Turning unstructured film knowledge into accurate, citation-backed conversations.',
    description: {
      en: 'End-to-end AI assistant for cinema discovery using Retrieval-Augmented Generation (RAG).',
      vi: 'Trợ lý AI tra cứu và gợi ý điện ảnh toàn diện ứng dụng kiến trúc Retrieval-Augmented Generation (RAG).',
      ja: '検索拡張生成（RAG）を活用した、映画探索・Q&AのためのエンドツーエンドAIアシスタント。',
    },
    longDescription: {
      en: 'A full-pipeline project exploring RAG patterns end-to-end — semantic document chunking, dense vector embeddings, similarity retrieval, and grounded LLM responses for film Q&A.',
      vi: 'Dự án xây dựng trọn vẹn luồng xử lý RAG từ đầu đến cuối — phân mảnh văn bản theo ngữ nghĩa, tạo vector embedding đậm đặc, truy xuất tương đồng và sinh câu trả lời có dẫn nguồn từ LLM.',
      ja: '意味単位のドキュメント分割（チャンキング）、密ベクトル埋め込み、類似度検索、根拠に基づくLLM回答生成まで、RAGの全工程を一貫して構築したプロジェクトです。',
    },
    headline: {
      en: 'RAG Film Chatbot — End-to-end Retrieval-Augmented Generation pipeline for grounded, hallucination-free cinema discovery.',
      vi: 'RAG Film Chatbot — Hệ thống Retrieval-Augmented Generation giảm thiểu ảo giác cho bài toán hỏi đáp và gợi ý phim ảnh.',
      ja: 'RAG Film Chatbot — ハルシネーションを抑え、根拠ある映画情報を提供するエンドツーエンドRAGパイプライン。',
    },
    scope: {
      role: {
        en: 'AI / NLP Engineer',
        vi: 'Kỹ sư AI / Xử lý Ngôn ngữ Tự nhiên',
        ja: 'AI / 自然言語処理（NLP）エンジニア',
      },
      domain: {
        en: 'Natural Language Processing / RAG Systems',
        vi: 'Xử lý Ngôn ngữ Tự nhiên / Hệ thống RAG',
        ja: '自然言語処理 / RAGシステム',
      },
      stack: 'Python, Hugging Face Transformers, Dense Embeddings, Vector Search',
    },
    highlights: {
      en: [
        'Context-aware document chunking and dense semantic vector indexing',
        'Grounded LLM generation with source attribution to minimize hallucinations',
        'Lightweight web service architecture ready for cloud deployment',
      ],
      vi: [
        'Phân mảnh dữ liệu giữ nguyên ngữ cảnh kết hợp đánh chỉ mục vector ngữ nghĩa mật độ cao',
        'Sinh câu trả lời bám sát dữ liệu gốc kèm trích dẫn rõ ràng nhằm hạn chế tối đa hiện tượng ảo giác (hallucination)',
        'Kiến trúc dịch vụ web gọn nhẹ, sẵn sàng triển khai lên môi trường đám mây',
      ],
      ja: [
        '文脈を保持するドキュメントチャンキングと高密度セマンティックベクトルインデックスの構築',
        '情報源の引用を伴うグラウンディング生成により、LLMのハルシネーションを最小化',
        'クラウドデプロイに対応した軽量なWebサービスアーキテクチャ',
      ],
    },
    story: {
      motivation: {
        en: 'Standalone LLMs frequently hallucinate release dates, cast details, and plot nuances when asked about specific films. This project was built to master Retrieval-Augmented Generation (RAG) and bridge the gap between static model weights and verifiable external knowledge.',
        vi: 'Các mô hình ngôn ngữ lớn (LLM) độc lập thường xuyên bịa đặt năm phát hành, dàn diễn viên hoặc tình tiết khi được hỏi sâu về điện ảnh. Dự án này được thực hiện để làm chủ kiến trúc RAG, kết nối khả năng suy luận của LLM với nguồn tri thức ngoài có thể kiểm chứng.',
        ja: '単体のLLMは、特定の映画の公開年やキャスト、あらすじの細部についてハルシネーションを起こしやすい課題があります。静的なモデル重みと検証可能な外部知識を結びつけるRAGアーキテクチャを習得するため、本プロジェクトを開発しました。',
      },
      architecture: {
        en: 'The ingestion pipeline preprocesses film synopses, metadata, and reviews into overlapping semantic chunks, encodes them using Hugging Face sentence-transformers, and indexes them in a vector store. At query time, top-k relevant passages are retrieved via cosine similarity and injected into a structured prompt template for grounded synthesis.',
        vi: 'Luồng nạp dữ liệu tiến hành làm sạch tóm tắt phim, metadata và đánh giá, sau đó chia thành các đoạn chồng lấp ngữ nghĩa, mã hóa bằng mô hình sentence-transformers trên Hugging Face và lưu vào cơ sở dữ liệu Vector. Khi có truy vấn, top-k đoạn phù hợp nhất được tìm kiếm qua độ tương đồng cosine và đưa vào khung prompt có cấu trúc để LLM tổng hợp câu trả lời.',
        ja: '映画のあらすじ・メタデータ・レビューを重複付きセマンティックチャンクに前処理し、Hugging FaceのSentence-Transformersでベクトル化してインデックスを構築。検索時にはコサイン類似度で上位k件の文脈を取得し、構造化プロンプトに注入して回答を生成します。',
      },
      impact: {
        en: 'Delivers accurate, context-aware film recommendations and trivia answers while maintaining low latency and transparent citations.',
        vi: 'Mang lại trải nghiệm hỏi đáp và gợi ý phim chính xác, sát ngữ cảnh với độ trễ thấp và trích dẫn minh bạch.',
        ja: '低レイテンシかつ透明性の高い引用付きで、文脈に即した映画レコメンデーションと正確なQ&Aを実現しました。',
      },
    },
  },
  {
    slug: 'traffic-monitoring',
    caseLabel: 'Case4',
    title: 'Traffic Monitoring System',
    category: 'AI / ML',
    tech: ['YOLOv8', 'FastAPI', 'React 18', 'Leaflet', 'SQLite'],
    url: 'https://github.com/thanhdatnguyentk/Traffic-Monitoring-Realtime-System',
    visualType: 'traffic',
    marqueeText:
      'Real-time Computer Vision in action. Transforming live urban camera streams into actionable traffic density insights with YOLOv8 and FastAPI.',
    description: {
      en: 'Real-time multi-class vehicle detection and urban traffic analytics dashboard.',
      vi: 'Hệ thống nhận diện phương tiện đa lớp và bảng điều khiển phân tích giao thông đô thị thời gian thực.',
      ja: 'YOLOv8とFastAPIを用いた、リアルタイム複数車種検出および都市交通分析ダッシュボード。',
    },
    longDescription: {
      en: 'Real-time traffic monitoring system using YOLOv8 for multi-class vehicle detection, FastAPI streaming backend, and a React 18 dashboard with interactive Leaflet maps and live weather telemetry.',
      vi: 'Hệ thống giám sát giao thông thời gian thực sử dụng YOLOv8 để phát hiện nhiều loại phương tiện, backend phát luồng bằng FastAPI và giao diện React 18 tích hợp bản đồ tương tác Leaflet cùng dữ liệu thời tiết.',
      ja: 'YOLOv8によるマルチクラス車両検出、FastAPIストリーミングバックエンド、Leaflet地図と気象データを統合したReact 18ダッシュボードからなるリアルタイム交通監視システム。',
    },
    headline: {
      en: 'Traffic Monitoring Real-time System — Live urban vehicle detection and geospatial analytics powered by YOLOv8, FastAPI, and React.',
      vi: 'Hệ thống Giám sát Giao thông Thời gian thực — Nhận diện phương tiện và phân tích bản đồ số trực tiếp với YOLOv8, FastAPI và React.',
      ja: 'リアルタイム交通監視システム — YOLOv8・FastAPI・Reactによる都市車両検出と地理空間アナリティクス。',
    },
    scope: {
      role: {
        en: 'Full-stack AI Engineer',
        vi: 'Kỹ sư AI Full-stack',
        ja: 'フルスタックAIエンジニア',
      },
      domain: {
        en: 'Computer Vision / Real-time Video Analytics',
        vi: 'Thị giác Máy tính / Phân tích Video Thời gian thực',
        ja: 'コンピュータビジョン / リアルタイム映像解析',
      },
      stack: 'YOLOv8, OpenCV, FastAPI, React 18, Leaflet Maps, SQLite',
    },
    highlights: {
      en: [
        'Real-time YOLOv8 multi-class vehicle detection (cars, motorbikes, buses, trucks)',
        'Ingests live YouTube streams and RTSP camera feeds with low-latency frame processing',
        'Interactive Leaflet geospatial map integrated with live weather radar overlays',
      ],
      vi: [
        'Nhận diện đa phương tiện thời gian thực bằng YOLOv8 (ô tô, xe máy, xe buýt, xe tải)',
        'Xử lý trực tiếp luồng video từ YouTube Live và camera RTSP với độ trễ khung hình thấp',
        'Bản đồ số tương tác Leaflet kết hợp lớp phủ radar thời tiết và mật độ giao thông',
      ],
      ja: [
        'YOLOv8によるリアルタイム複数車種検出（乗用車・バイク・バス・トラック）',
        'YouTube LiveおよびRTSPカメラストリームからの低遅延フレーム取り込みと推論',
        '気象レーダーオーバーレイを統合したインタラクティブなLeaflet地理空間マップ',
      ],
    },
    story: {
      motivation: {
        en: 'Urban congestion in Ho Chi Minh City requires automated, real-time observability across hundreds of camera feeds. My goal was to connect a high-speed Computer Vision inference pipeline to an intuitive geospatial dashboard that operators can actually use.',
        vi: 'Bài toán ùn tắc giao thông đô thị tại TP.HCM đòi hỏi khả năng quan sát tự động theo thời gian thực trên hàng trăm luồng camera. Mục tiêu của mình là kết nối luồng suy luận Thị giác Máy tính tốc độ cao vào một giao diện bản đồ trực quan, dễ vận hành.',
        ja: 'ホーチミン市のような大都市の交通渋滞には、多数のカメラ映像をリアルタイムで自動解析する仕組みが求められます。高速なコンピュータビジョン推論パイプラインを、実用的な地理空間ダッシュボードへ直結させることを目指しました。',
      },
      architecture: {
        en: 'Frames from live RTSP/YouTube streams are captured asynchronously via OpenCV and passed through a tuned YOLOv8 detector. FastAPI serves both the annotated video stream and aggregated vehicle count metrics stored in SQLite, while a React 18 + Leaflet frontend visualizes congestion hotspots alongside live weather conditions.',
        vi: 'Các khung hình từ luồng RTSP/YouTube được thu nhận bất đồng bộ qua OpenCV và đưa vào bộ nhận diện YOLOv8 đã tinh chỉnh. FastAPI vừa truyền phát luồng video đã gắn nhãn vừa cung cấp số liệu thống kê lưu lượng từ SQLite lên giao diện React 18 + Leaflet.',
        ja: 'RTSPやYouTubeのライブ映像からOpenCVで非同期にフレームを取得し、YOLOv8検出器で推論を実行。FastAPIがバウンディングボックス付き映像とSQLiteに集約された交通量メトリクスを配信し、React 18 + Leafletフロントエンドが渋滞箇所と天候を可視化します。',
      },
      impact: {
        en: 'Demonstrates a complete production-style AI pipeline from raw video ingestion and GPU/CPU inference to real-time frontend observability.',
        vi: 'Minh chứng cho năng lực xây dựng đường ống AI hoàn chỉnh từ khâu thu thập video thô, suy luận mô hình cho tới hiển thị trực quan thời gian thực.',
        ja: '映像ストリームの取り込みから推論、フロントエンドでのリアルタイム可視化まで、本番環境を想定した一貫したAIパイプラインを実現しました。',
      },
    },
  },
  {
    slug: 'uit-pinance',
    caseLabel: 'Case5',
    title: 'UIT_PINANCE',
    category: 'Web',
    tech: ['Flask', 'PostgreSQL', 'Chart.js', 'Jinja2'],
    stars: 2,
    url: 'https://github.com/thanhdatnguyentk/UIT_PINANCE',
    visualType: 'finance',
    marqueeText:
      'Simulating financial markets with precision. Advanced order matching, real-time portfolio analytics, and automated reporting.',
    description: {
      en: 'Full-stack stock trading simulator with portfolio analytics and automated reporting.',
      vi: 'Nền tảng mô phỏng giao dịch chứng khoán với phân tích danh mục đầu tư và xuất báo cáo tự động.',
      ja: 'ポートフォリオ分析と自動レポート出力を備えた、フルスタック株式取引シミュレーター。',
    },
    longDescription: {
      en: 'Web platform simulating real-world stock trading — multi-currency accounts, watchlists, advanced order execution, portfolio tracking, and CSV/PDF reporting backed by Flask and PostgreSQL.',
      vi: 'Ứng dụng web mô phỏng thị trường giao dịch cổ phiếu thực tế — quản lý tài khoản, danh mục theo dõi, khớp lệnh nâng cao, biểu đồ hiệu suất và xuất báo cáo CSV/PDF trên nền Flask và PostgreSQL.',
      ja: '口座管理、ウォッチリスト、高度な注文執行、ポートフォリオ追跡、CSV/PDFレポート出力を備えた、Flask + PostgreSQLベースの株式取引シミュレーションWebアプリ。',
    },
    headline: {
      en: 'UIT_PINANCE — Full-stack stock trading simulator with advanced order types, portfolio analytics, and multi-language support.',
      vi: 'UIT_PINANCE — Hệ thống mô phỏng giao dịch tài chính với các loại lệnh nâng cao, phân tích danh mục và tài liệu đa ngôn ngữ.',
      ja: 'UIT_PINANCE — 高度な注文方式、ポートフォリオ分析、日英ドキュメントを備えた株式取引シミュレーター。',
    },
    scope: {
      role: {
        en: 'Backend & Financial Logic Developer',
        vi: 'Kỹ sư Backend & Nghiệp vụ Tài chính',
        ja: 'バックエンド・金融ロジック開発',
      },
      domain: {
        en: 'FinTech Simulation / Web Engineering',
        vi: 'Mô phỏng FinTech / Kỹ thuật Web',
        ja: 'FinTechシミュレーション / Webエンジニアリング',
      },
      stack: 'Python, Flask, PostgreSQL, Chart.js, Jinja2, PDF/CSV Export',
    },
    highlights: {
      en: [
        'Supports market, limit, trailing stop, and leveraged order execution flows',
        'Automated CSV and PDF financial statement export for trade histories',
        'Documented in both English and Japanese (EN / JA) for cross-border collaboration',
      ],
      vi: [
        'Hỗ trợ đầy đủ các lệnh Thị trường (Market), Giới hạn (Limit), Dừng lỗ trượt (Trailing Stop) và Đòn bẩy (Leverage)',
        'Tự động kết xuất lịch sử giao dịch và sao kê danh mục ra định dạng CSV và PDF',
        'Tài liệu hóa song ngữ Anh – Nhật (EN / JA) phục vụ làm việc đa quốc gia',
      ],
      ja: [
        '成行（Market）・指値（Limit）・トレーリングストップ・レバレッジ注文の執行フローを実装',
        '取引履歴およびポートフォリオ明細のCSV / PDF自動エクスポート機能',
        '英語・日本語（EN / JA）のマルチリンガルREADMEと設計ドキュメントを整備',
      ],
    },
    story: {
      motivation: {
        en: 'Financial trading systems demand strict transactional integrity, accurate state transitions, and clear visual analytics. UIT_PINANCE was created as a risk-free sandbox for testing trading strategies and understanding order-book mechanics.',
        vi: 'Các hệ thống giao dịch tài chính luôn đòi hỏi tính toàn vẹn giao dịch (ACID) nghiêm ngặt, chuyển đổi trạng thái chính xác và biểu đồ trực quan. UIT_PINANCE được xây dựng như một môi trường thử nghiệm an toàn để kiểm chứng chiến lược đầu tư và cơ chế khớp lệnh.',
        ja: '金融取引システムには厳密なトランザクション整合性と正確な状態遷移、明快な視覚的データ分析が不可欠です。取引戦略の検証と注文処理メカニズムの理解を深めるためのサンドボックスとして開発しました。',
      },
      architecture: {
        en: 'Built on Flask and PostgreSQL with ACID-compliant transaction handling for account balances and position updates. Interactive Chart.js dashboards track equity curves and asset allocation, complemented by a reporting module that generates downloadable CSV and PDF statements.',
        vi: 'Xây dựng trên nền Flask và PostgreSQL với cơ chế khóa giao dịch đảm bảo tính toàn vẹn số dư và vị thế cổ phiếu. Giao diện tích hợp Chart.js theo dõi đường cong tài sản và phân bổ vốn, đi kèm module kết xuất báo cáo CSV/PDF tự động.',
        ja: 'FlaskとPostgreSQLを基盤とし、口座残高やポジション更新にACIDトランザクション制御を適用。Chart.jsによる資産推移・アセットアロケーションの可視化と、CSV/PDFレポート生成モジュールを統合しています。',
      },
      impact: {
        en: 'Provides a complete end-to-end financial simulation environment with comprehensive English and Japanese documentation.',
        vi: 'Cung cấp môi trường mô phỏng tài chính hoàn chỉnh cùng bộ tài liệu kỹ thuật song ngữ Anh – Nhật.',
        ja: '日英両言語のドキュメントを備えた、完結した金融取引シミュレーション環境を実現しました。',
      },
    },
  },
  {
    slug: 'milky-way-simulation',
    caseLabel: 'Case6',
    title: 'Milky Way Simulation',
    category: 'Systems',
    tech: ['C', 'CUDA', 'GPU Compute', 'Physics'],
    url: 'https://github.com/thanhdatnguyentk/Milky-Way-Simulation-C-CUDA-',
    visualType: 'galaxy',
    marqueeText:
      'Harnessing thousands of GPU threads in C and CUDA. Simulating galactic N-body gravitational dynamics at interactive frame rates.',
    description: {
      en: 'High-performance N-body gravitational simulation of the Milky Way in C and CUDA.',
      vi: 'Mô phỏng vật lý hấp dẫn đa vật thể (N-body) hiệu năng cao của Dải Ngân Hà bằng C và CUDA.',
      ja: 'C言語とNVIDIA CUDAによる、天の川銀河の高速N体重力シミュレーション。',
    },
    longDescription: {
      en: 'N-body gravitational physics simulation of the Milky Way galaxy running on NVIDIA GPUs. Hands-on exploration of custom CUDA kernels, shared-memory tiling, and scientific visualization.',
      vi: 'Mô phỏng lực hấp dẫn N-body của Dải Ngân Hà chạy trực tiếp trên GPU NVIDIA. Dự án đào sâu lập trình nhân CUDA tùy chỉnh, tối ưu hóa bộ nhớ dùng chung (shared-memory tiling) và trực quan hóa khoa học.',
      ja: 'NVIDIA GPU上で動作する天の川銀河のN体重力物理シミュレーション。カスタムCUDAカーネル、共有メモリタイリング、科学技術計算の可視化を実践しました。',
    },
    headline: {
      en: 'Milky Way Simulation — Massively parallel N-body gravitational simulation written in C and custom CUDA kernels.',
      vi: 'Milky Way Simulation — Mô phỏng hấp dẫn thiên văn N-body song song quy mô lớn viết bằng C và nhân CUDA.',
      ja: 'Milky Way Simulation — C言語とカスタムCUDAカーネルによる超並列N体銀河重力シミュレーション。',
    },
    scope: {
      role: {
        en: 'Systems & GPU Programmer',
        vi: 'Lập trình viên Hệ thống & GPU',
        ja: 'システム / GPUプログラマー',
      },
      domain: {
        en: 'High-Performance Computing (HPC) / GPU Simulation',
        vi: 'Tính toán Hiệu năng cao (HPC) / Mô phỏng GPU',
        ja: 'ハイパフォーマンスコンピューティング（HPC） / GPU物理シミュレーション',
      },
      stack: 'C, NVIDIA CUDA, Parallel Reduction, Scientific Visualization',
    },
    highlights: {
      en: [
        'Custom N-body gravitational solver executing in parallel across GPU thread blocks',
        'Optimized memory coalescing and shared-memory tiling to minimize bandwidth bottlenecks',
        'Real-time visual rendering of spiral arm formation and orbital dynamics',
      ],
      vi: [
        'Bộ giải phương trình hấp dẫn N-body tùy chỉnh chạy song song trên hàng ngàn luồng GPU',
        'Tối ưu hóa gộp truy cập bộ nhớ (memory coalescing) và bộ nhớ dùng chung (shared memory) giúp giảm nghẽn băng thông',
        'Kết xuất trực quan quá trình hình thành nhánh xoắn ốc và quỹ đạo thiên hà theo thời gian thực',
      ],
      ja: [
        'GPUスレッドブロック全体で並列実行されるカスタムN体重力ソルバーを実装',
        'メモリコアレッシングと共有メモリタイリングによりVRAM帯域幅のボトルネックを大幅に削減',
        '銀河の渦状腕の形成と軌道力学をリアルタイムで視覚的にレンダリング',
      ],
    },
    story: {
      motivation: {
        en: 'Training large AI models relies heavily on GPU parallelism. Writing an N-body gravitational simulator directly in C and CUDA was my way of mastering thread hierarchies, warp execution, and shared memory optimization at the hardware level.',
        vi: 'Việc huấn luyện các mô hình AI lớn phụ thuộc chặt chẽ vào khả năng tính toán song song trên GPU. Viết bộ mô phỏng thiên văn N-body trực tiếp bằng C và CUDA là cách mình rèn luyện tư duy phân cấp luồng (thread hierarchy), thực thi warp và tối ưu bộ nhớ sát phần cứng nhất.',
        ja: '大規模AIモデルの学習はGPUの並列計算能力に大きく依存しています。C言語とCUDAでN体重力シミュレーターを直接実装することで、スレッド階層やワープ実行、共有メモリ最適化をハードウェアレベルで体得しました。',
      },
      architecture: {
        en: 'Pairwise gravitational forces across thousands of stellar bodies (O(N²) complexity) are partitioned across CUDA thread blocks. By staging particle positions in fast on-chip shared memory before accumulating accelerations, the solver dramatically reduces global VRAM traffic.',
        vi: 'Lực tương tác hấp dẫn từng đôi một giữa hàng ngàn thiên thể (độ phức tạp O(N²)) được phân chia trên các khối luồng CUDA. Nhờ nạp tọa độ hạt vào vùng bộ nhớ dùng chung (shared memory) tốc độ cao trên chip trước khi cộng dồn gia tốc, thuật toán giảm thiểu đáng kể số lần đọc/ghi VRAM toàn cục.',
        ja: '数千の恒星間の全対重力計算（計算量 O(N²)）をCUDAスレッドブロックに分割。粒子座標を高速なオンチップ共有メモリにステージングしてから加速度を累積することで、グローバルVRAMへのアクセスを劇的に削減しています。',
      },
      impact: {
        en: 'Achieves massive speedups over single-threaded CPU execution and forms the low-level GPU programming foundation that powers my deep learning work.',
        vi: 'Đạt tốc độ vượt trội gấp nhiều lần so với CPU đơn luồng, đồng thời tạo nền tảng lập trình GPU vững chắc bổ trợ trực tiếp cho các dự án Deep Learning như JavaTorch.',
        ja: 'シングルスレッドCPU実行と比較して圧倒的な高速化を達成し、JavaTorchをはじめとする自身のディープラーニング研究を支える低レイヤGPUプログラミングの礎となっています。',
      },
    },
  },
];

export const skillGroups: {
  label: LocalizedText;
  subtitle: LocalizedText;
  items: string[];
}[] = [
  {
    label: {
      en: 'Languages',
      vi: 'Ngôn ngữ Lập trình',
      ja: 'プログラミング言語',
    },
    subtitle: {
      en: 'Core programming languages for AI pipelines, systems, and web applications',
      vi: 'Các ngôn ngữ cốt lõi phục vụ xây dựng đường ống AI, lập trình hệ thống và ứng dụng web',
      ja: 'AIパイプライン、GPUシステム、Webアプリケーション開発のコア言語',
    },
    items: ['Python', 'Java 21', 'C / C++', 'CUDA C', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: {
      en: 'AI / ML & Deep Learning',
      vi: 'AI / Học máy & Học sâu',
      ja: 'AI / 機械学習・深層学習',
    },
    subtitle: {
      en: 'Frameworks and architectures I explore and deploy end-to-end',
      vi: 'Các framework và kiến trúc mô hình mình nghiên cứu và triển khai thực tế',
      ja: '研究開発からエンドツーエンドの実装まで扱うフレームワークとモデル構造',
    },
    items: [
      'PyTorch',
      'EVA-02 CLIP / BLIP / DINOv2',
      'FAISS / Vector Search',
      'BERT / T5 / LLMs',
      'RAG Pipelines',
      'YOLOv8 / YOLOv26x / OpenCV',
      'BlazeFace / UltraFace',
      'MLTK / TensorFlow',
    ],
  },
  {
    label: {
      en: 'Web, Data & Infrastructure',
      vi: 'Web, Dữ liệu & Hạ tầng',
      ja: 'Web・データ基盤・インフラ',
    },
    subtitle: {
      en: 'Tools for serving models, building dashboards, and shipping reproducibly',
      vi: 'Công cụ đóng gói mô hình, xây dựng dashboard trực quan và triển khai hệ thống',
      ja: 'モデル配信、可視化ダッシュボード構築、再現性の高いデプロイを支えるツール群',
    },
    items: ['FastAPI', 'Flask', 'React 18', 'Vue 3', 'Astro', 'Docker', 'PostgreSQL', 'Git / Linux'],
  },
];

export const stats: { value: string; label: LocalizedText }[] = [
  {
    value: '44+',
    label: {
      en: 'Public repos',
      vi: 'Repo công khai',
      ja: '公開リポジトリ',
    },
  },
  {
    value: '3rd',
    label: {
      en: 'Year IT @ UIT',
      vi: 'Sinh viên Năm 3 UIT',
      ja: 'UIT 情報工学3年',
    },
  },
  {
    value: '6',
    label: {
      en: 'Featured cases',
      vi: 'Dự án tiêu biểu',
      ja: '主要ケース',
    },
  },
  {
    value: '∞',
    label: {
      en: 'Cups of coffee',
      vi: 'Tách cà phê',
      ja: 'コーヒーの数',
    },
  },
];

export const profileInfo = {
  name: 'Nguyễn Thành Đạt',
  shortBrand: 'thanh dat .ai',
  handle: 'thanhdatnguyentk',
  email: 'ngthanhdat1303@gmail.com',
  github: 'https://github.com/thanhdatnguyentk',
  headerRoles: {
    en: ['Machine Learning', 'NLP & LLM Systems', 'Computer Vision', 'AI System Deployment'],
    vi: ['Học máy (Machine Learning)', 'Xử lý Ngôn ngữ & LLM', 'Thị giác Máy tính (CV)', 'Triển khai Hệ thống AI'],
    ja: ['機械学習 (Machine Learning)', '自然言語処理・LLMシステム', 'コンピュータビジョン', 'AIシステム実装・デプロイ'],
  },
  quote: {
    en: "AI is not magic — it's just a lot of math, code, and coffee.",
    vi: 'AI không phải phép thuật — đó là sự kết tinh của toán học, mã nguồn và rất nhiều cà phê.',
    ja: 'AIは魔法ではありません。たくさんの数学とコード、そしてコーヒーの結晶です。',
  },
};

export const uiStrings = {
  nav: {
    home: { en: 'Home', vi: 'Trang chủ', ja: 'ホーム' },
    about: { en: 'About & Skills', vi: 'Giới thiệu & Kỹ năng', ja: '私について・スキル' },
    casesTitle: { en: 'Cases (All 6)', vi: 'Dự án (Tất cả 6)', ja: '制作実績 (全6件)' },
    contact: { en: 'Contact', vi: 'Liên hệ', ja: 'お問い合わせ' },
  },
  home: {
    afternoonLab: { en: 'Afternoon Lab ☀️', vi: 'Phòng Lab Chiều ☀️', ja: '昼のラボ ☀️' },
    nightLab: { en: 'Night Lab 🌙', vi: 'Phòng Lab Đêm 🌙', ja: '夜のラボ 🌙' },
    openProfile: { en: 'Say “Hey!” / Open Profile', vi: 'Chào “Hey!” / Mở Hồ sơ', ja: '“Hey!”と声をかける / プロフィール' },
    hideProfile: { en: 'Hide Profile', vi: 'Đóng Hồ sơ', ja: 'プロフィールを閉じる' },
    close: { en: '× Close', vi: '× Đóng', ja: '× 閉じる' },
    chip: {
      en: 'Available for AI/ML internships & research collaborations',
      vi: 'Sẵn sàng cho cơ hội thực tập & hợp tác nghiên cứu AI/ML',
      ja: 'AI/MLインターンシップおよび共同研究の機会を募集中',
    },
    profileEn: {
      en: 'I’m Nguyễn Thành Đạt,\nan AI Engineer in\ntraining @ UIT.',
      vi: 'Mình là Nguyễn Thành Đạt,\nKỹ sư AI tương lai\ntại UIT - VNU-HCM.',
      ja: 'グエン・タン・ダットです。\nUITでAIエンジニアを\n目指し研究しています。',
    },
    bio1: {
      en: 'Hello! I am Nguyễn Thành Đạt (@thanhdatnguyentk), a 3rd-year Information Technology student at the University of Information Technology — VNU-HCM (UIT).',
      vi: 'Xin chào! Mình là Nguyễn Thành Đạt (@thanhdatnguyentk), sinh viên năm 3 ngành Công nghệ Thông tin tại Trường Đại học Công nghệ Thông tin — ĐHQG TP.HCM (UIT - VNU-HCM).',
      ja: 'こんにちは！ベトナム国家大学ホーチミン市校 情報工科大学（UIT - VNU-HCM）情報工学科3年のグエン・タン・ダット（@thanhdatnguyentk）です。',
    },
    bio2: {
      en: 'I specialize in building end-to-end Machine Learning, Natural Language Processing (BERT, Transformers, T5, RAG), and Computer Vision (YOLOv8, BlazeFace, UltraFace) systems — from data preprocessing and GPU kernel optimization (CUDA / cuDNN) to production deployment.',
      vi: 'Mình đam mê xây dựng các hệ thống Machine Learning, Natural Language Processing (BERT, Transformers, T5, RAG) và Computer Vision (YOLOv8, BlazeFace, UltraFace) từ bước tiền xử lý dữ liệu, tối ưu hóa suy luận trên GPU (CUDA / cuDNN) cho tới triển khai thực tế.',
      ja: 'データの前処理からGPUカーネル最適化（CUDA / cuDNN）、本番環境へのデプロイまで、機械学習・自然言語処理（BERT, Transformers, T5, RAG）・コンピュータビジョン（YOLOv8, BlazeFace, UltraFace）のエンドツーエンド開発に取り組んでいます。',
    },
    getToKnowMe: {
      en: 'Get to know me',
      vi: 'Khám phá hồ sơ',
      ja: '詳しく見る',
    },
  },
  cases: {
    aboutNav: { en: 'About', vi: 'Giới thiệu', ja: 'About' },
    contactNav: { en: 'Contact', vi: 'Liên hệ', ja: 'Contact' },
    aboutSummary: {
      en: 'From mathematical foundations, raw code, and coffee to scalable AI systems. Explore my journey in ML, NLP, Computer Vision & LLMs at UIT-VNUHCM.',
      vi: 'Từ toán học, mã nguồn và cà phê đến các hệ thống AI thực tiễn. Khám phá hành trình nghiên cứu ML, NLP, Computer Vision & LLMs tại UIT-VNUHCM.',
      ja: '数学的基礎とコード、そしてコーヒーから実践的なAIシステムへ。UIT-VNUHCMでの機械学習・NLP・コンピュータビジョン・LLMの探求をご紹介します。',
    },
    contactSub: {
      en: 'Drop me an email or connect on GitHub anytime!',
      vi: 'Gửi email cho mình hoặc kết nối qua GitHub bất cứ lúc nào nhé!',
      ja: 'メールまたはGitHubからいつでもお気軽にご連絡ください！',
    },
    prev: { en: '← Prev', vi: '← Trước', ja: '← 前へ' },
    next: { en: 'Next →', vi: 'Tiếp →', ja: '次へ →' },
  },
  aboutPage: {
    eyebrow: {
      en: 'About / Nguyễn Thành Đạt',
      vi: 'Giới thiệu / Nguyễn Thành Đạt',
      ja: 'About / グエン・タン・ダット',
    },
    headline: {
      en: 'From mathematical foundations and raw tensors to scalable AI solutions — exploring the beauty of utility in Machine Learning, NLP, and Computer Vision.',
      vi: 'Từ nền tảng toán học và các phép toán Tensor cốt lõi đến giải pháp AI thực tiễn — theo đuổi vẻ đẹp của tính ứng dụng trong Học máy, NLP và Thị giác Máy tính.',
      ja: '数学的基礎と生のテンソル演算からスケーラブルなAIソリューションへ — 機械学習・NLP・コンピュータビジョンにおける「用の美」を探求する。',
    },
    tagRole: { en: 'AI Engineer in Training', vi: 'Kỹ sư AI Tương lai', ja: 'AIエンジニア志望' },
    tagSchool: { en: 'UIT — VNU-HCM (3rd Year)', vi: 'Sinh viên Năm 3 UIT — ĐHQG-HCM', ja: 'UIT — VNU-HCM (学部3年)' },
    tagLocation: { en: 'Ho Chi Minh City, Vietnam', vi: 'TP. Hồ Chí Minh, Việt Nam', ja: 'ベトナム・ホーチミン市' },
    scopeNameLabel: { en: 'Full Name', vi: 'Họ và Tên', ja: '氏名' },
    scopeUniLabel: { en: 'University', vi: 'Trường Đại học', ja: '所属大学' },
    scopeFocusLabel: { en: 'Primary Focus', vi: 'Lĩnh vực Trọng tâm', ja: '専門領域' },
    whoTitle: { en: 'Who I Am', vi: 'Về Bản thân', ja: '私について' },
    whoP1: {
      en: 'I am Nguyễn Thành Đạt, a 3rd-year Information Technology student at the University of Information Technology — VNU-HCM (UIT), focusing deeply on Machine Learning, Natural Language Processing (NLP), Computer Vision, and AI System Deployment.',
      vi: 'Mình là Nguyễn Thành Đạt, sinh viên năm 3 ngành Công nghệ Thông tin tại Trường Đại học Công nghệ Thông tin — ĐHQG TP.HCM (UIT - VNU-HCM), định hướng chuyên sâu về Machine Learning, Natural Language Processing (NLP), Computer Vision và Triển khai hệ thống AI (AI System Deployment).',
      ja: 'ベトナム国家大学ホーチミン市校 情報工科大学（UIT - VNU-HCM）の3年生、グエン・タン・ダットです。機械学習（ML）、自然言語処理（NLP）、コンピュータビジョン（CV）、およびAIシステムのデプロイメントを専門的に学んでいます。',
    },
    whoP2: {
      en: 'If I had to sum up my engineering mindset in one sentence: “AI is not magic — it’s just a lot of math, code, and coffee.” Rather than treating frameworks as black boxes, I love understanding the underlying mathematics — from building a custom PyTorch autograd engine in Java & CUDA (JavaTorch) and simulating galactic N-body physics on GPUs, to architecting end-to-end BERT, Transformers, T5, and RAG pipelines.',
      vi: 'Nếu phải gói gọn tư duy kỹ thuật của mình trong một câu nói, đó là: “AI không phải phép thuật — đó là sự kết tinh của toán học, mã nguồn và rất nhiều cà phê.” Thay vì coi các thư viện là hộp đen, mình luôn đào sâu bản chất toán học bên dưới — từ việc tự tay cài đặt lại nhân PyTorch Autograd bằng Java & CUDA (JavaTorch), mô phỏng vật lý N-body trên GPU, cho tới thiết kế các đường ống BERT, Transformers, T5 và RAG hoàn chỉnh.',
      ja: '私のエンジニアリング姿勢を一言で表すなら、「AIは魔法ではなく、数学とコードとコーヒーの結晶である」ということです。ライブラリをブラックボックスとして扱うのではなく、JavaとCUDAによるPyTorch自動微分エンジンの再構築（JavaTorch）やGPU上のN体物理シミュレーションから、BERT・Transformers・T5・RAGパイプラインの構築まで、根底にある数理と構造の理解を大切にしています。',
    },
    whoCaption: {
      en: 'Combining first-principles math and GPU systems knowledge with practical end-to-end AI product engineering.',
      vi: 'Kết hợp tư duy toán học nền tảng và hệ thống GPU với kỹ năng xây dựng sản phẩm AI thực tế.',
      ja: '第一原理に基づく数学・GPUシステムの理解と、実践的なAIプロダクト開発を両立。',
    },
    whatTitle: { en: 'What I Do', vi: 'Năng lực Chuyên môn', ja: 'できること' },
    what1Title: {
      en: '1. Natural Language Processing & LLM Systems (BERT / T5 / RAG)',
      vi: '1. Xử lý Ngôn ngữ Tự nhiên & Hệ thống LLM (BERT / T5 / RAG)',
      ja: '1. 自然言語処理・LLMシステム (BERT / T5 / RAG)',
    },
    what1Body: {
      en: 'Designing Transformer workflows, dense semantic vector retrieval, and Retrieval-Augmented Generation (RAG) pipelines with transparent citations to minimize hallucinations.',
      vi: 'Nghiên cứu kiến trúc Transformer, tối ưu hóa truy xuất ngữ nghĩa (Semantic Vector Retrieval) và thiết kế pipeline Retrieval-Augmented Generation (RAG) gắn trích dẫn minh bạch giúp giảm thiểu ảo giác.',
      ja: 'Transformerアーキテクチャの活用、高密度セマンティック検索、ハルシネーションを抑制し明確な引用を伴うRAGパイプラインの設計・実装を行います。',
    },
    what2Title: {
      en: '2. Computer Vision & Real-time Edge AI (YOLOv8 / BlazeFace / UltraFace / MLTK)',
      vi: '2. Thị giác Máy tính & Edge AI Thời gian thực (YOLOv8 / BlazeFace / UltraFace / MLTK)',
      ja: '2. コンピュータビジョン・リアルタイムEdge AI (YOLOv8 / BlazeFace / UltraFace / MLTK)',
    },
    what2Body: {
      en: 'Building real-time multi-object detection and tracking pipelines over live RTSP/YouTube streams, combined with model inference optimization using MLTK, BlazeFace, and UltraFace.',
      vi: 'Xây dựng hệ thống nhận diện và theo dõi đa đối tượng thời gian thực từ luồng camera RTSP/YouTube Live, kết hợp tối ưu hóa suy luận mô hình với MLTK, BlazeFace, UltraFace.',
      ja: 'RTSPやYouTubeライブ映像からのリアルタイム物体検出・追跡システムの構築、およびMLTK・BlazeFace・UltraFaceを用いた推論最適化に取り組んでいます。',
    },
    what3Title: {
      en: '3. Deep Learning Foundations & GPU Computing (CUDA / JCuda / cuDNN)',
      vi: '3. Nền tảng Học sâu & Tính toán Song song trên GPU (CUDA / JCuda / cuDNN)',
      ja: '3. 深層学習基盤・GPU並列コンピューティング (CUDA / JCuda / cuDNN)',
    },
    what3Body: {
      en: 'Deep understanding of strided tensor memory layouts, dynamic computation graphs, reverse-mode automatic differentiation, and parallel C/CUDA kernel programming.',
      vi: 'Hiểu sâu về cấu trúc bộ nhớ Tensor, đồ thị tính toán động, giải thuật lan truyền ngược tự động (Reverse-mode Autograd) và lập trình song song trên GPU bằng C/CUDA.',
      ja: 'テンソルのメモリレイアウト、動的計算グラフ、リバースモード自動微分、そしてC/CUDAによる並列カーネルプログラミングを深く理解しています。',
    },
    what4Title: {
      en: '4. End-to-End AI Product Engineering (FastAPI / Flask / React / Vue / Docker)',
      vi: '4. Phát triển Sản phẩm AI Toàn diện (FastAPI / Flask / React / Vue / Docker)',
      ja: '4. エンドツーエンドAIプロダクト開発 (FastAPI / Flask / React / Vue / Docker)',
    },
    what4Body: {
      en: 'Taking machine learning models out of notebooks into production via REST/WebSocket APIs, PostgreSQL/Vector databases, and interactive real-time web dashboards.',
      vi: 'Đưa mô hình học máy từ Jupyter Notebook ra môi trường vận hành thông qua REST/WebSocket APIs, cơ sở dữ liệu PostgreSQL/Vector DB và giao diện trực quan hóa dữ liệu thời gian thực.',
      ja: 'モデルをノートブック環境からREST/WebSocket API、PostgreSQL/ベクトルDB、リアルタイムWebダッシュボードへと統合し、実用的なプロダクトへ仕上げます。',
    },
    techTitle: { en: 'Tech Stack', vi: 'Công nghệ & Công cụ', ja: '技術スタック' },
    visionTitle: { en: 'Vision & Goals', vi: 'Tầm nhìn & Mục tiêu', ja: 'アプローチと目標' },
    workflowTitle: { en: 'My Engineering Workflow:', vi: 'Quy trình Kỹ thuật của mình:', ja: 'エンジニアリングプロセス：' },
    workflowSteps: {
      en: 'Understand the problem & data → Master the math & model architecture → Experiment & benchmark quantitatively → Optimize inference latency → Package into a scalable end-to-end system.',
      vi: 'Thấu hiểu bài toán & dữ liệu → Nắm vững toán học & kiến trúc mô hình → Thử nghiệm & đo lường định lượng → Tối ưu hóa tốc độ suy luận → Đóng gói thành hệ thống End-to-End có thể mở rộng.',
      ja: '課題とデータの理解 → 数理とモデル構造の把握 → 定量的な実験とベンチマーク → 推論レイテンシの最適化 → スケーラブルなシステムへの統合。',
    },
    shortTermTitle: { en: '🚀 Short-term Goal:', vi: '🚀 Mục tiêu Ngắn hạn:', ja: '🚀 短期目標：' },
    shortTermBody: {
      en: 'Build high-performance, production-ready AI systems and contribute to impactful AI/ML engineering internships and research collaborations.',
      vi: 'Xây dựng các hệ thống AI hiệu năng cao, sẵn sàng vận hành trong môi trường Production và tham gia các dự án thực tập / nghiên cứu chuyên sâu về AI/ML.',
      ja: '本番環境で稼働する高性能なAIシステムを構築し、AI/MLエンジニアリングのインターンシップや共同研究に貢献すること。',
    },
    longTermTitle: { en: '🌟 Long-term Vision:', vi: '🌟 Tầm nhìn Dài hạn:', ja: '🌟 長期ビジョン：' },
    longTermBody: {
      en: 'Lead AI-powered product development that solves complex real-world problems at scale.',
      vi: 'Dẫn dắt việc phát triển các sản phẩm ứng dụng AI giải quyết những bài toán thực tiễn có quy mô lớn cho người dùng và doanh nghiệp.',
      ja: '実社会の複雑な課題を大規模に解決する、AIプロダクト開発をリードするエンジニアになること。',
    },
    ghTitle: { en: 'GitHub Stats', vi: 'Hoạt động GitHub', ja: 'GitHub統計' },
    ghDesc: {
      en: 'Live statistics from my GitHub profile (@thanhdatnguyentk) fetched automatically via the GitHub REST API at build time:',
      vi: 'Số liệu thống kê trực tiếp từ tài khoản GitHub (@thanhdatnguyentk) được tổng hợp tự động qua GitHub REST API khi build:',
      ja: 'ビルド時にGitHub REST APIから自動取得した、GitHubアカウント（@thanhdatnguyentk）の統計データです：',
    },
    ghRepos: { en: 'Repositories', vi: 'Kho mã nguồn', ja: 'リポジトリ数' },
    ghStars: { en: 'Stars Earned', vi: 'Tổng số Sao', ja: '獲得スター' },
    ghFollowers: { en: 'Followers', vi: 'Người theo dõi', ja: 'フォロワー' },
    ghFollowing: { en: 'Following', vi: 'Đang theo dõi', ja: 'フォロー中' },
    ghTopLangs: {
      en: 'Top Languages Across Public Repos',
      vi: 'Ngôn ngữ Sử dụng Nhiều nhất',
      ja: '公開リポジトリの主要言語',
    },
  },
  caseDetail: {
    role: { en: 'Role', vi: 'Vai trò', ja: '担当役割' },
    domain: { en: 'Domain', vi: 'Lĩnh vực', ja: '領域' },
    stack: { en: 'Core Stack', vi: 'Công nghệ chính', ja: '使用技術' },
    overview: { en: 'Overview', vi: 'Tổng quan', ja: '概要' },
    architecture: { en: 'Architecture', vi: 'Kiến trúc Hệ thống', ja: 'アーキテクチャ' },
    highlights: { en: 'Highlights', vi: 'Điểm nhấn Kỹ thuật', ja: 'ハイライト' },
    impact: { en: 'Impact & Code', vi: 'Kết quả & Mã nguồn', ja: '成果とソースコード' },
    exploreGithub: {
      en: 'Explore on GitHub',
      vi: 'Xem Mã nguồn trên GitHub',
      ja: 'GitHubでコードを見る',
    },
    nextCase: { en: 'Next Case', vi: 'Dự án Tiếp theo', ja: '次のケース' },
    backToList: { en: 'Back to the list', vi: 'Quay lại danh sách', ja: '一覧へ戻る' },
  },
};