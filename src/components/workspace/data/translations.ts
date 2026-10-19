import type { Lang, LocalizedText } from '../../../data/projects';

export interface WorkspaceTranslations {
  heroEyebrow: LocalizedText;
  heroTitle: LocalizedText;
  heroSubtitle: LocalizedText;
  instructionHint: LocalizedText;
  controls: {
    resetCamera: LocalizedText;
    allProjects: LocalizedText;
    dayMode: LocalizedText;
    nightMode: LocalizedText;
    openDrawer: LocalizedText;
    switch2D: LocalizedText;
    switch3D: LocalizedText;
    skipIntro: LocalizedText;
    quickJump: LocalizedText;
  };
  inspector: {
    close: LocalizedText;
    backToRoom: LocalizedText;
    viewCaseStudy: LocalizedText;
    viewGithub: LocalizedText;
    allProjectsTitle: LocalizedText;
    allProjectsSub: LocalizedText;
    galaxyDualTitle: LocalizedText;
    galaxyDualSub: LocalizedText;
    gpuLabTitle: LocalizedText;
    gpuLabSub: LocalizedText;
    robotBadge: LocalizedText;
    robotGreeting: LocalizedText;
    robotPrompt1: LocalizedText;
    robotAnswer1: LocalizedText;
    robotPrompt2: LocalizedText;
    robotAnswer2: LocalizedText;
    skillsTitle: LocalizedText;
    skillsSub: LocalizedText;
    aboutTitle: LocalizedText;
    academicTitle: LocalizedText;
    academicInstitution: LocalizedText;
    academicDegree: LocalizedText;
    academicPeriod: LocalizedText;
    academicHighlights: {
      en: string[];
      vi: string[];
      ja: string[];
    };
    coffeeTitle: LocalizedText;
    coffeeSub: LocalizedText;
    contactTitle: LocalizedText;
    contactSub: LocalizedText;
    emailMe: LocalizedText;
    githubProfile: LocalizedText;
  };
}

export const workspaceTranslations: WorkspaceTranslations = {
  heroEyebrow: {
    en: '3D ISOMETRIC AI LABORATORY • UIT — VNU-HCM',
    vi: 'PHÒNG LAB AI 3D ISOMETRIC • UIT — ĐHQG-HCM',
    ja: '3DアイソメトリックAIラボ • UIT — VNU-HCM',
  },
  heroTitle: {
    en: 'Building intelligence, one system at a time.',
    vi: 'Kiến tạo trí tuệ nhân tạo từ từng hệ thống cốt lõi.',
    ja: '知能を築く、一つのシステムから着実に。',
  },
  heroSubtitle: {
    en: 'Explore Nguyễn Thành Đạt’s miniature AI laboratory — click any monitor, hologram, GPU rack, or research board to inspect real engineering projects.',
    vi: 'Khám phá phòng thí nghiệm AI thu nhỏ của Nguyễn Thành Đạt — nhấp vào màn hình, hologram thiên hà, dàn GPU hoặc bảng trắng để xem chi tiết từng dự án.',
    ja: 'グエン・タン・ダットのミニチュアAIラボへようこそ。モニター、銀河ホログラム、GPUラック、ホワイトボードをクリックして実装プロジェクトを探索できます。',
  },
  instructionHint: {
    en: 'Click objects to inspect • Drag gently to orbit • Scroll to zoom • Press ESC to reset view',
    vi: 'Nhấp vào vật thể để khám phá • Kéo nhẹ để xoay góc nhìn • Cuộn để thu phóng • Nhấn ESC để đặt lại',
    ja: 'オブジェクトをクリックして詳細表示 • ドラッグで視点微調整 • スクロールでズーム • ESCでリセット',
  },
  controls: {
    resetCamera: {
      en: 'Reset View',
      vi: 'Góc nhìn Chuẩn',
      ja: '視点をリセット',
    },
    allProjects: {
      en: 'All 7 Projects',
      vi: 'Tất cả 7 Dự án',
      ja: '全7プロジェクト',
    },
    dayMode: {
      en: 'Daylight Lab ☀️',
      vi: 'Ánh sáng Ngày ☀️',
      ja: 'デイライト ☀️',
    },
    nightMode: {
      en: 'Night Lab 🌙',
      vi: 'Phòng Lab Đêm 🌙',
      ja: 'ナイトラボ 🌙',
    },
    openDrawer: {
      en: 'Profile & Bio',
      vi: 'Hồ sơ Cá nhân',
      ja: 'プロフィール',
    },
    switch2D: {
      en: '2D Lite Mode',
      vi: 'Chế độ 2D Nhẹ',
      ja: '2D軽量モード',
    },
    switch3D: {
      en: '3D Lab Mode',
      vi: 'Chế độ Phòng 3D',
      ja: '3Dラボモード',
    },
    skipIntro: {
      en: 'Skip Intro ⏭',
      vi: 'Bỏ qua Intro ⏭',
      ja: 'スキップ ⏭',
    },
    quickJump: {
      en: 'Lab Stations:',
      vi: 'Trạm Tương tác:',
      ja: 'ラボ設備:',
    },
  },
  inspector: {
    close: {
      en: 'Close (ESC)',
      vi: 'Đóng (ESC)',
      ja: '閉じる (ESC)',
    },
    backToRoom: {
      en: '← Return to Room View',
      vi: '← Quay lại Toàn cảnh Phòng',
      ja: '← ラボ全体表示へ戻る',
    },
    viewCaseStudy: {
      en: 'Read Full Case Study',
      vi: 'Xem Chi tiết Case Study',
      ja: 'ケーススタディ詳細を読む',
    },
    viewGithub: {
      en: 'GitHub Repository ↗',
      vi: 'Mã nguồn GitHub ↗',
      ja: 'GitHubリポジトリ ↗',
    },
    allProjectsTitle: {
      en: 'Engineering Project Explorer (All 7 Cases)',
      vi: 'Danh mục Dự án Kỹ thuật (Tất cả 7 Dự án)',
      ja: 'エンジニアリング制作実績（全7プロジェクト）',
    },
    allProjectsSub: {
      en: 'Select any case study below or click dedicated hardware stations inside the 3D lab.',
      vi: 'Chọn trực tiếp dự án bên dưới hoặc nhấp vào từng thiết bị chuyên dụng trong phòng lab 3D.',
      ja: '以下のリストから選択するか、3Dラボ内の各ステーションをクリックして詳細を確認できます。',
    },
    galaxyDualTitle: {
      en: 'Galactic & N-Body Astrophysics Suite',
      vi: 'Bộ đôi Mô phỏng Thiên hà 3D & Vật lý N-Body GPU',
      ja: '3D天の川銀河展望台 & CUDA N体重力シミュレーション',
    },
    galaxyDualSub: {
      en: 'Bridging interactive WebGL2/GLSL scientific visualization with low-level C/CUDA parallel N-body physics.',
      vi: 'Kết hợp đài quan sát vũ trụ 3D tương tác trên WebGL2/GLSL với bộ giải hấp dẫn N-body song song bằng C/CUDA.',
      ja: 'WebGL2/GLSLによる3D宇宙可視化と、C/CUDAによる並列N体重力計算の2つのアプローチ。',
    },
    gpuLabTitle: {
      en: 'GPU Compute & Deep Learning Systems',
      vi: 'Hệ thống Tính toán Song song GPU & Nhân Deep Learning',
      ja: 'GPU並列計算 & ディープラーニング基盤システム',
    },
    gpuLabSub: {
      en: 'Custom reverse-mode autograd tensors, JCuda/cuDNN kernels, and parallel N-body force solvers.',
      vi: 'Tự xây dựng bộ máy Tensor Autograd, kết nối nhân JCuda/cuDNN và tối ưu hóa bộ nhớ dùng chung trên GPU.',
      ja: '独自実装のAutogradテンソルエンジン、JCuda/cuDNNブリッジ、共有メモリ最適化カーネル。',
    },
    robotBadge: {
      en: 'SCRIPTED DEMO • NO LIVE LLM BACKEND',
      vi: 'DEMO KỊCH BẢN MẪU • KHÔNG GỌI API LLM TRỰC TIẾP',
      ja: 'スクリプトデモ • 外部LLM通信なし',
    },
    robotGreeting: {
      en: 'Beep-boop! 👋 I am DatBot-01, the lab’s companion droid. I showcase how the RAG Film Chatbot grounds LLM answers using dense vector search!',
      vi: 'Bíp-bíp! 👋 Mình là DatBot-01, robot trợ lý tại phòng lab. Mình minh họa cách dự án RAG Film Chatbot kết hợp truy xuất vector ngữ nghĩa để chống ảo giác cho LLM!',
      ja: 'ピピッ！👋 私はラボの相棒ロボット「DatBot-01」です。RAG Film Chatbotがベクトル検索でハルシネーションを防ぐ仕組みをご紹介します！',
    },
    robotPrompt1: {
      en: 'How does your RAG pipeline prevent hallucinations?',
      vi: 'Hệ thống RAG giảm thiểu ảo giác (hallucination) như thế nào?',
      ja: 'RAGパイプラインはどのようにハルシネーションを防ぎますか？',
    },
    robotAnswer1: {
      en: '[Retrieved Top-K Cosine Chunks → Hugging Face Embeddings]: Film synopses and reviews are split into context-preserving chunks, indexed in FAISS/Vector DB, and injected into a strict citation prompt before synthesis.',
      vi: '[Truy xuất Top-K đoạn văn qua Cosine Similarity → Hugging Face Embeddings]: Tóm tắt và đánh giá phim được phân mảnh giữ ngữ cảnh, lưu vào Vector DB và đưa kèm nguồn trích dẫn vào prompt để LLM trả lời chính xác.',
      ja: '[Top-Kコサイン類似度検索 → Hugging Face埋め込み]: 映画のあらすじやレビューを意味単位で分割してベクトルDBに格納し、根拠テキストをプロンプトに注入して回答を生成します。',
    },
    robotPrompt2: {
      en: 'What is Nguyễn Thành Đạt’s core AI focus?',
      vi: 'Định hướng nghiên cứu AI trọng tâm của Nguyễn Thành Đạt là gì?',
      ja: 'グエン・タン・ダットの主なAI研究領域は何ですか？',
    },
    robotAnswer2: {
      en: 'He focuses on Multimodal Retrieval (EVA-02 CLIP, FAISS, TRAKE), NLP/RAG (BERT, T5, Transformers), Real-time Computer Vision (YOLOv8, YOLOv26x), and CUDA GPU systems!',
      vi: 'Đạt tập trung chuyên sâu vào Truy xuất Đa phương thức (EVA-02 CLIP, FAISS, TRAKE), NLP/RAG (BERT, T5), Thị giác Máy tính thời gian thực (YOLOv8, YOLOv26x) và lập trình GPU CUDA!',
      ja: 'マルチモーダル映像検索（EVA-02 CLIP, FAISS, TRAKE）、自然言語処理・RAG、リアルタイム画像認識（YOLOv8）、そしてCUDA GPUコンピューティングに注力しています！',
    },
    skillsTitle: {
      en: 'Technical Arsenal & Research Bookshelf',
      vi: 'Tủ sách Nghiên cứu & Hệ sinh thái Công nghệ',
      ja: '研究ブックシェルフ & 技術スタック一覧',
    },
    skillsSub: {
      en: 'Core languages, AI/ML frameworks, and deployment tools used across 45+ public repositories.',
      vi: 'Ngôn ngữ lập trình, thư viện AI/ML và công cụ hạ tầng được ứng dụng xuyên suốt hơn 45 kho mã nguồn công khai.',
      ja: '45以上の公開リポジトリで実践しているプログラミング言語、AI/MLフレームワーク、インフラ技術。',
    },
    aboutTitle: {
      en: 'Research Whiteboard — Philosophy & Engineering Workflow',
      vi: 'Bảng trắng Nghiên cứu — Triết lý & Quy trình Kỹ thuật AI',
      ja: 'リサーチホワイトボード — 設計思想とエンジニアリング手法',
    },
    academicTitle: {
      en: 'Academic Background & Leadership Milestones',
      vi: 'Học vấn Đại học & Dấu ấn Dẫn dắt Dự án',
      ja: '学歴・研究背景およびプロジェクトリーダー実績',
    },
    academicInstitution: {
      en: 'University of Information Technology (UIT) — VNU-HCM',
      vi: 'Trường Đại học Công nghệ Thông tin (UIT) — ĐHQG TP.HCM',
      ja: 'ベトナム国家大学ホーチミン市校 情報工科大学 (UIT — VNU-HCM)',
    },
    academicDegree: {
      en: 'B.S. in Information Technology (3rd-Year Undergraduate)',
      vi: 'Cử nhân Công nghệ Thông tin (Sinh viên Năm 3)',
      ja: '情報工学専攻 学部3年生',
    },
    academicPeriod: {
      en: '2023 – Present • Ho Chi Minh City, Vietnam',
      vi: '2023 – Hiện tại • TP. Hồ Chí Minh, Việt Nam',
      ja: '2023年 – 現在 • ベトナム・ホーチミン市',
    },
    academicHighlights: {
      en: [
        'Team Lead & Lead AI Architect for Video Retrieval System (AIC-26) — multimodal EVA-02 CLIP + FAISS + TRAKE temporal event search',
        'Creator of JavaTorch — native Java 21 deep learning framework with reverse-mode autograd & JCuda/cuDNN GPU acceleration (118+ JUnit tests)',
        'Author of 45+ public repositories spanning NLP (BERT, T5, RAG), Computer Vision (YOLOv8, BlazeFace), and WebGL2/CUDA simulations',
      ],
      vi: [
        'Team Lead & Kiến trúc sư AI chính của hệ thống Video Retrieval System (AIC-26) — kết hợp EVA-02 CLIP, FAISS và thuật toán chuỗi sự kiện TRAKE',
        'Tác giả JavaTorch — framework Deep Learning thuần Java 21 với đồ thị đạo hàm tự động Autograd và tăng tốc GPU JCuda/cuDNN (118+ unit tests)',
        'Xây dựng hơn 45 kho mã nguồn công khai trải rộng từ NLP (BERT, T5, RAG), Computer Vision (YOLOv8, BlazeFace) đến mô phỏng thiên văn WebGL2 & CUDA',
      ],
      ja: [
        'マルチモーダル映像検索システム「Video Retrieval System (AIC-26)」のチームリーダー兼リードAIアーキテクト',
        'Java 21ネイティブ深層学習フレームワーク「JavaTorch」（逆伝播自動微分・CUDA高速化・118以上の単体テスト）の開発者',
        'NLP（BERT, T5, RAG）、コンピュータビジョン（YOLOv8）、WebGL2/CUDA物理シミュレーションなど45以上の公開リポジトリを構築',
      ],
    },
    coffeeTitle: {
      en: 'Freshly Brewed Espresso — The Fuel Behind the Tensors ☕',
      vi: 'Tách Cà Phê Nóng — Nguồn Năng Lượng Phía Sau Những Dòng Code ☕',
      ja: '淹れたてのコーヒー — テンソル演算とコードを支える原動力 ☕',
    },
    coffeeSub: {
      en: 'Every converged loss curve and debugged CUDA kernel starts right here at this mug.',
      vi: 'Mọi đường cong hàm mất mát hội tụ và mọi nhân CUDA chạy mượt đều bắt đầu từ tách cà phê trên bàn làm việc này.',
      ja: '収束する損失曲線も、デバッグされたCUDAカーネルも、すべてはこのデスクのコーヒーから始まります。',
    },
    contactTitle: {
      en: 'Direct Dispatch — Let’s Build Together',
      vi: 'Kết nối Trực tiếp — Sẵn sàng Hợp tác & Thực tập AI/ML',
      ja: 'コンタクト — AI/MLインターン・共同研究のお問い合わせ',
    },
    contactSub: {
      en: 'Open for AI/ML engineering internships, research collaborations, and technical discussions in Ho Chi Minh City & remote.',
      vi: 'Mình luôn sẵn sàng cho các cơ hội thực tập Kỹ sư AI/ML, hợp tác nghiên cứu khoa học và trao đổi học thuật tại TP.HCM hoặc từ xa.',
      ja: 'ホーチミン市およびリモートでのAI/MLエンジニアリングインターンシップ、共同研究、技術ディスカッションを歓迎します。',
    },
    emailMe: {
      en: 'Send Email',
      vi: 'Gửi Email Trực tiếp',
      ja: 'メールを送る',
    },
    githubProfile: {
      en: 'GitHub @thanhdatnguyentk',
      vi: 'GitHub @thanhdatnguyentk',
      ja: 'GitHub @thanhdatnguyentk',
    },
  },
};

export function tText(text: LocalizedText, lang: Lang): string {
  return text[lang] || text.en;
}
