import { Model, ModelCategory, ModelStatus } from '@/types/model';

export const MODELS: Model[] = [
  // ==========================================
  // FLAGSHIP MODELS
  // ==========================================
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    slug: 'gpt-4o',
    modelId: 'gpt-4o',
    family: 'GPT-4o',
    category: 'flagship',
    description: 'Model unggulan multimodal OpenAI berkecepatan tinggi. Mendukung input teks dan gambar secara simultan dengan penalaran visual tingkat lanjut dan keluaran terstruktur berkecepatan 2x lipat dari GPT-4 Turbo.',
    shortDescription: 'Model unggulan multimodal berkecepatan tinggi untuk pemrosesan teks dan visi enterprise.',
    reasoning: false,
    contextWindow: 128000,
    maxOutputTokens: 16384,
    inputPrice: 2.50,
    cachedInputPrice: 1.25,
    outputPrice: 10.00,
    knowledgeCutoff: 'Oktober 2023',
    imageInput: true,
    imageGeneration: false,
    audioInput: true,
    audioOutput: false,
    vision: true,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '13 Mei 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/gpt-4o',
    lastUpdated: '15 Februari 2025',
    suitableFor: [
      'Aplikasi komersial serbaguna',
      'Analisis visual dokumen dan gambar teknis',
      'Pembuatan konten kreatif dan copywriting natural',
      'Chatbot multibahasa kompleks'
    ],
    notSuitableFor: [
      'Tugas pembuktian matematika teoretis sangat rumit yang butuh o-series',
      'Aplikasi beranggaran mikro ekstrem dengan jutaan panggilan per jam'
    ],
    recommendedReplacement: null,
    benchmarks: {
      sweBench: 38.8,
      mmluPro: 72.6,
      mathAime: 13.4,
      gpqaDiamond: 56.1
    }
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    slug: 'gpt-4o-mini',
    modelId: 'gpt-4o-mini',
    family: 'GPT-4o',
    category: 'flagship',
    description: 'Model paling hemat biaya dan super cepat dari keluarga GPT-4o. Menyediakan kemampuan visi dan pemrosesan teks cerdas dengan biaya 60% lebih murah daripada GPT-3.5 Turbo.',
    shortDescription: 'Model cerdas super murah dan berkecepatan tinggi untuk volume transaksi besar.',
    reasoning: false,
    contextWindow: 128000,
    maxOutputTokens: 16384,
    inputPrice: 0.15,
    cachedInputPrice: 0.075,
    outputPrice: 0.60,
    knowledgeCutoff: 'Oktober 2023',
    imageInput: true,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: true,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '18 Juli 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/gpt-4o-mini',
    lastUpdated: '15 Februari 2025',
    suitableFor: [
      'Chatbot layanan pelanggan berkapasitas jutaan pengguna',
      'Klasifikasi teks dan perutean intent (intent routing)',
      'Ekstraksi entitas terstruktur (JSON schema)',
      'Pemrosesan dokumen teks beranggaran ketat'
    ],
    notSuitableFor: [
      'Penalaran multi-langkah tingkat doktoral (STEM tingkat tinggi)',
      'Refactoring repositori software raksasa yang kompleks'
    ],
    recommendedReplacement: null,
    benchmarks: {
      sweBench: 18.0,
      mmluPro: 64.5,
      mathAime: 12.0,
      gpqaDiamond: 40.2
    }
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    slug: 'gpt-4-turbo',
    modelId: 'gpt-4-turbo',
    family: 'GPT-4',
    category: 'flagship',
    description: 'Generasi GPT-4 dengan jendela konteks 128k dan kemampuan visi. Banyak digunakan pada sistem warisan enterprise sebelum migrasi penuh ke GPT-4o.',
    shortDescription: 'Model enterprise generasi sebelumnya dengan konteks 128k dan akurasi tinggi.',
    reasoning: false,
    contextWindow: 128000,
    maxOutputTokens: 4096,
    inputPrice: 10.00,
    cachedInputPrice: 5.00,
    outputPrice: 30.00,
    knowledgeCutoff: 'Desember 2023',
    imageInput: true,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: true,
    functionCalling: true,
    structuredOutputs: false,
    webSearch: true,
    fileSearch: true,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '9 April 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/gpt-4-turbo-and-gpt-4',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Sistem enterprise warisan yang bergantung pada karakteristik respons GPT-4',
      'Pemrosesan dokumen panjang hingga 300 halaman'
    ],
    notSuitableFor: [
      'Proyek baru (lebih disarankan menggunakan GPT-4o yang lebih murah dan cepat)'
    ],
    recommendedReplacement: 'gpt-4o',
    benchmarks: {
      sweBench: 26.5,
      mmluPro: 68.2,
      mathAime: 10.5,
      gpqaDiamond: 48.0
    }
  },
  {
    id: 'gpt-6-astra',
    name: 'GPT-6 Astra',
    slug: 'gpt-6-astra',
    modelId: 'gpt-6-astra',
    family: 'GPT-6',
    category: 'flagship',
    description: 'Model frontier generasi mendatang dari lini riset OpenAI yang dirancang untuk kecerdasan multimodal menyeluruh dan alur kerja agen otonom generasi berikutnya.',
    shortDescription: 'Model frontier multimodal generasi mendatang untuk pemecahan masalah skala global.',
    reasoning: true,
    contextWindow: 272000,
    maxOutputTokens: 128000,
    inputPrice: null, // Unannounced pricing
    cachedInputPrice: null,
    outputPrice: null,
    knowledgeCutoff: 'Belum diverifikasi',
    imageInput: true,
    imageGeneration: true,
    audioInput: true,
    audioOutput: true,
    vision: true,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: true,
    status: 'PREVIEW',
    releaseDate: 'Eksplorasi Riset',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://openai.com/research',
    lastUpdated: '01 Februari 2025',
    suitableFor: [
      'Eksplorasi kemampuan agen otonom',
      'Pemrosesan lintas media komprehensif'
    ],
    notSuitableFor: [
      'Penyebaran produksi stabil komersial saat ini'
    ],
    recommendedReplacement: null
  },
  {
    id: 'gpt-6-1-sol',
    name: 'GPT-6.1 Sol',
    slug: 'gpt-6-1-sol',
    modelId: 'gpt-6.1-sol',
    family: 'GPT-6',
    category: 'flagship',
    description: 'Model sistem komputasi berkonteks ultra-lebar (~372k token) yang dioptimalkan untuk analisis kode berskala industri dan penalaran arsitektural terdistribusi.',
    shortDescription: 'Arsitektur flagship generasi lanjutan dengan kapasitas konteks ultra-lebar.',
    reasoning: true,
    contextWindow: 372000,
    maxOutputTokens: 128000,
    inputPrice: null,
    cachedInputPrice: null,
    outputPrice: null,
    knowledgeCutoff: 'Belum diverifikasi',
    imageInput: true,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: true,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: true,
    status: 'PREVIEW',
    releaseDate: 'Eksplorasi Riset',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://openai.com/research',
    lastUpdated: '01 Februari 2025',
    suitableFor: [
      'Analisis repositori perangkat lunak monolitik raksasa',
      'Penalaran multi-dokumen hukum & korporat'
    ],
    notSuitableFor: [
      'Aplikasi chat latensi ultra-cepat'
    ],
    recommendedReplacement: null
  },
  {
    id: 'gpt-6-luna',
    name: 'GPT-6 Luna',
    slug: 'gpt-6-luna',
    modelId: 'gpt-6-luna',
    family: 'GPT-6',
    category: 'flagship',
    description: 'Varian efisiensi komputasi dari generasi GPT-6 yang dioptimalkan untuk inferensi volume masif dengan jejak sumber daya yang sangat terkontrol.',
    shortDescription: 'Model efisien berkinerja tinggi untuk beban kerja berskala masif.',
    reasoning: true,
    contextWindow: 272000,
    maxOutputTokens: 128000,
    inputPrice: null,
    cachedInputPrice: null,
    outputPrice: null,
    knowledgeCutoff: 'Belum diverifikasi',
    imageInput: true,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: true,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: true,
    status: 'PREVIEW',
    releaseDate: 'Eksplorasi Riset',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://openai.com/research',
    lastUpdated: '01 Februari 2025',
    suitableFor: [
      'Infrastruktur inferensi otomatis volume tinggi',
      'Penyaringan dan pemrosesan data semi-terstruktur'
    ],
    notSuitableFor: [
      'Layanan produksi publik saat ini'
    ],
    recommendedReplacement: null
  },

  // ==========================================
  // REASONING MODELS (o-SERIES)
  // ==========================================
  {
    id: 'o3-mini',
    name: 'o3-mini',
    slug: 'o3-mini',
    modelId: 'o3-mini',
    family: 'o-series',
    category: 'reasoning',
    description: 'Model penalaran paling hemat biaya dan canggih dari OpenAI. Dirancang khusus untuk unggul dalam coding, matematika, dan sains dengan kontrol fleksibel tingkat penalaran (low, medium, high reasoning effort). Mendukung Structured Outputs dan Function Calling.',
    shortDescription: 'Model penalaran cepat & hemat biaya dengan akurasi terdepan di coding dan STEM.',
    reasoning: true,
    contextWindow: 200000,
    maxOutputTokens: 100000,
    inputPrice: 1.10,
    cachedInputPrice: 0.55,
    outputPrice: 4.40,
    knowledgeCutoff: 'Oktober 2023',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '31 Januari 2025',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/o3-mini',
    lastUpdated: '05 Februari 2025',
    suitableFor: [
      'Software engineering dan pemecahan bug kompleks (skor SWE-bench 78.3%)',
      'Kompetisi matematika dan pembuktian logika (skor AIME 87.3%)',
      'Analisis keuangan dan sains data terstruktur',
      'Agen otonom yang membutuhkan verifikasi logika mandiri'
    ],
    notSuitableFor: [
      'Tugas yang memerlukan pemrosesan gambar atau analisis visi',
      'Percakapan santai yang butuh respon instan sub-detik'
    ],
    recommendedReplacement: null,
    benchmarks: {
      sweBench: 78.3,
      mmluPro: 78.5,
      mathAime: 87.3,
      gpqaDiamond: 79.7
    }
  },
  {
    id: 'o1',
    name: 'o1 (Full)',
    slug: 'o1',
    modelId: 'o1',
    family: 'o-series',
    category: 'reasoning',
    description: 'Model penalaran terkuat di dunia saat ini. Memiliki kemampuan multimodal visi untuk menalar grafik, diagram ilmiah, dan kode arsitektur secara mendalam sebelum memberikan hasil final.',
    shortDescription: 'Model penalaran multimodal terkuat untuk riset ilmiah, arsitektur software, dan logika kritis.',
    reasoning: true,
    contextWindow: 200000,
    maxOutputTokens: 100000,
    inputPrice: 15.00,
    cachedInputPrice: 7.50,
    outputPrice: 60.00,
    knowledgeCutoff: 'Oktober 2023',
    imageInput: true,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: true,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '5 Desember 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/o1',
    lastUpdated: '20 Januari 2025',
    suitableFor: [
      'Riset akademis dan penulisan makalah ilmiah tingkat lanjut',
      'Analisis diagram sistem, skema rangkaian listrik, dan arsitektur database',
      'Verifikasi kepatuhan hukum dan logika kontrak berlapis',
      'Diagnosa masalah teknis yang memerlukan pemikiran bertahap'
    ],
    notSuitableFor: [
      'Chatbot FAQ sederhana yang membutuhkan respon murah meriah',
      'Tugas streaming teks dengan latensi instan'
    ],
    recommendedReplacement: null,
    benchmarks: {
      sweBench: 75.7,
      mmluPro: 80.2,
      mathAime: 83.3,
      gpqaDiamond: 78.0
    }
  },
  {
    id: 'o1-mini',
    name: 'o1-mini',
    slug: 'o1-mini',
    modelId: 'o1-mini',
    family: 'o-series',
    category: 'reasoning',
    description: 'Versi ringkas dari o1 yang dioptimalkan untuk kecepatan dan efisiensi penalaran matematika dan coding teks tanpa dukungan input visi.',
    shortDescription: 'Model penalaran efisien berbiaya terjangkau untuk kalkulasi dan skrip pemrograman.',
    reasoning: true,
    contextWindow: 128000,
    maxOutputTokens: 65536,
    inputPrice: 1.10,
    cachedInputPrice: 0.55,
    outputPrice: 4.40,
    knowledgeCutoff: 'Oktober 2023',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '12 September 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/o1-mini',
    lastUpdated: '15 Januari 2025',
    suitableFor: [
      'Coding cepat dan debugging algoritma',
      'Kalkulasi formula matematika beranggaran hemat'
    ],
    notSuitableFor: [
      'Penalaran visual yang memerlukan gambar',
      'Penulisan esai naratif sastra'
    ],
    recommendedReplacement: 'o3-mini',
    benchmarks: {
      sweBench: 65.2,
      mmluPro: 73.1,
      mathAime: 74.8,
      gpqaDiamond: 60.0
    }
  },
  {
    id: 'o1-preview',
    name: 'o1-preview',
    slug: 'o1-preview',
    modelId: 'o1-preview',
    family: 'o-series',
    category: 'deprecated',
    description: 'Versi awal preview dari o1 yang diperkenalkan pada September 2024. Saat ini telah digantikan oleh rilis final o1 penuh yang lebih stabil dan mendukung visi.',
    shortDescription: 'Model preview penalaran awal (telah digantikan oleh model o1 rilis penuh).',
    reasoning: true,
    contextWindow: 128000,
    maxOutputTokens: 32768,
    inputPrice: 15.00,
    cachedInputPrice: 7.50,
    outputPrice: 60.00,
    knowledgeCutoff: 'Oktober 2023',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'DEPRECATED',
    releaseDate: '12 September 2024',
    deprecatedDate: '5 Desember 2024',
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/o1',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Evaluasi pembanding riset historis penalaran awal'
    ],
    notSuitableFor: [
      'Penerapan baru (Gunakan o1 atau o3-mini)'
    ],
    recommendedReplacement: 'o1'
  },

  // ==========================================
  // CODING & AGENTIC SPECIALIZED
  // ==========================================
  {
    id: 'gpt-5-3-codex-spark',
    name: 'GPT-5.3 Codex Spark',
    slug: 'gpt-5-3-codex-spark',
    family: 'Codex / Agentic',
    category: 'coding',
    modelId: 'gpt-5.3-codex-spark',
    description: 'Arsitektur agen pengembang perangkat lunak berkecepatan tinggi yang dirancang untuk integrasi CLI, penulisan tes otomatis, dan refactoring kode secara langsung di terminal lokal.',
    shortDescription: 'Agen coding khusus terminal dan rekayasa perangkat lunak otonom.',
    reasoning: true,
    contextWindow: 400000,
    maxOutputTokens: 128000,
    inputPrice: null,
    cachedInputPrice: null,
    outputPrice: null,
    knowledgeCutoff: 'Belum diverifikasi',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: true,
    fileSearch: true,
    computerUse: true,
    status: 'PREVIEW',
    releaseDate: 'Eksplorasi Riset',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://openai.com/research',
    lastUpdated: '01 Februari 2025',
    suitableFor: [
      'Alur kerja agen pengembang mandiri',
      'Pengujian kode integrasi berulang'
    ],
    notSuitableFor: [
      'Layanan publik non-teknis'
    ],
    recommendedReplacement: null
  },

  // ==========================================
  // IMAGE GENERATION & EDITING
  // ==========================================
  {
    id: 'dall-e-3',
    name: 'DALL·E 3',
    slug: 'dall-e-3',
    modelId: 'dall-e-3',
    family: 'DALL·E',
    category: 'image',
    description: 'Sistem sintesis gambar AI paling mutakhir dari OpenAI. Menafsirkan instruksi bahasa alami yang sangat bernuansa, teks tertulis di dalam gambar, dan detail visual rumit secara presisi.',
    shortDescription: 'Model generator gambar mutakhir dengan pemahaman teks & komposisi presisi.',
    reasoning: false,
    contextWindow: 4000,
    maxOutputTokens: 1,
    inputPrice: 40.00, // Standar 1024x1024 = $0.040 per gambar
    cachedInputPrice: 40.00,
    outputPrice: 80.00, // HD 1024x1024 / 1024x1792 = $0.080 - $0.120 per gambar
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: true,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '19 Oktober 2023',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/dall-e-3',
    lastUpdated: '15 Januari 2025',
    suitableFor: [
      'Pembuatan ilustrasi editorial dan konsep visual',
      'Desain aset promosi pemasaran dan periklanan',
      'Gambar dengan tulisan teks spesifik di dalamnya'
    ],
    notSuitableFor: [
      'Penyuntingan piksel ultra-cepat per milidetik',
      'Tugas inferensi murni teks atau data numerik'
    ],
    recommendedReplacement: null
  },
  {
    id: 'dall-e-2',
    name: 'DALL·E 2',
    slug: 'dall-e-2',
    modelId: 'dall-e-2',
    family: 'DALL·E',
    category: 'deprecated',
    description: 'Model gambar generasi kedua OpenAI. Mendukung inpainting dan outpainting dasar dengan resolusi hingga 1024x1024 seharga $0.020 per gambar.',
    shortDescription: 'Generator gambar warisan generasi kedua (kualitas di bawah DALL-E 3).',
    reasoning: false,
    contextWindow: 1000,
    maxOutputTokens: 1,
    inputPrice: 20.00,
    cachedInputPrice: 20.00,
    outputPrice: 20.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: true,
    imageGeneration: true,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'DEPRECATED',
    releaseDate: '20 Juli 2022',
    deprecatedDate: '19 Oktober 2023',
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/dall-e-2',
    lastUpdated: '01 Januari 2025',
    suitableFor: [
      'Alur kerja inpainting dasar warisan'
    ],
    notSuitableFor: [
      'Desain modern dengan teks atau realism tinggi (Gunakan DALL-E 3)'
    ],
    recommendedReplacement: 'dall-e-3'
  },

  // ==========================================
  // AUDIO & SPEECH
  // ==========================================
  {
    id: 'whisper-1',
    name: 'Whisper (Large v2/v3)',
    slug: 'whisper-1',
    modelId: 'whisper-1',
    family: 'Whisper',
    category: 'audio',
    description: 'Model pengenalan suara otomatis (Automatic Speech Recognition / ASR) multibahasa. Mampu mentranskripsi audio ke teks dan menerjemahkan berbagai bahasa ke bahasa Inggris dengan akurasi sangat tinggi.',
    shortDescription: 'Sistem transkripsi wicara-ke-teks multibahasa dengan ketahanan aksen tinggi.',
    reasoning: false,
    contextWindow: 25000,
    maxOutputTokens: 4096,
    inputPrice: 6.00, // $0.006 per menit (~$6.00 per 1000 menit)
    cachedInputPrice: 6.00,
    outputPrice: 0.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: false,
    audioInput: true,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '1 Maret 2023',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/whisper',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Transkripsi notulensi rapat dan wawancara rekaman',
      'Pembuatan subtitle otomatis pada video YouTube / film',
      'Penerjemahan lisan ke teks Inggris'
    ],
    notSuitableFor: [
      'Pembuatan suara sintetis (Gunakan model TTS)'
    ],
    recommendedReplacement: null
  },
  {
    id: 'tts-1',
    name: 'TTS-1',
    slug: 'tts-1',
    modelId: 'tts-1',
    family: 'TTS',
    category: 'audio',
    description: 'Model Text-to-Speech yang dioptimalkan untuk latensi interaksi real-time dengan 6 pilihan karakter suara manusia alami (alloy, echo, fable, onyx, nova, shimmer). Biaya $15.00 per 1M karakter.',
    shortDescription: 'Sintesis suara alami latensi rendah untuk interaksi aplikasi lisan.',
    reasoning: false,
    contextWindow: 4096,
    maxOutputTokens: 4096,
    inputPrice: 15.00, // per 1M karakter
    cachedInputPrice: 15.00,
    outputPrice: 0.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: true,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '6 November 2023',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/tts',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Aplikasi navigasi dan panduan audio real-time',
      'Pembaca layar artikel instan'
    ],
    notSuitableFor: [
      'Produksi audiobook berdefinisi ultra-tinggi (Gunakan TTS-1 HD)'
    ],
    recommendedReplacement: null
  },
  {
    id: 'tts-1-hd',
    name: 'TTS-1 HD',
    slug: 'tts-1-hd',
    modelId: 'tts-1-hd',
    family: 'TTS',
    category: 'audio',
    description: 'Model Text-to-Speech resolusi tinggi yang meminimalkan artefak audio dan menghasilkan kehangatan vokal studio profesional. Biaya $30.00 per 1M karakter.',
    shortDescription: 'Sintesis vokal mutu studio tinggi untuk produksi audiobook dan podcast.',
    reasoning: false,
    contextWindow: 4096,
    maxOutputTokens: 4096,
    inputPrice: 30.00, // per 1M karakter
    cachedInputPrice: 30.00,
    outputPrice: 0.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: true,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '6 November 2023',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/tts',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Narasi audiobook dan buku cerita anak',
      'Iklan dan voiceover materi komersial'
    ],
    notSuitableFor: [
      'Aplikasi percakapan cepat yang menuntut latensi milidetik'
    ],
    recommendedReplacement: null
  },

  // ==========================================
  // REALTIME AUDIO-TO-AUDIO
  // ==========================================
  {
    id: 'gpt-4o-realtime-preview',
    name: 'GPT-4o Realtime Preview',
    slug: 'gpt-4o-realtime-preview',
    modelId: 'gpt-4o-realtime-preview',
    family: 'GPT-4o',
    category: 'realtime',
    description: 'Model interaksi percakapan suara langsung (speech-to-speech) end-to-end melalui protokol WebSocket. Mampu mendengar intonasi, merespon selaan bicara pengguna secara alami, dan menghasilkan emosi vokal dinamis.',
    shortDescription: 'Percakapan audio dua arah berlatensi ultra-rendah (~300ms) tanpa jeda.',
    reasoning: false,
    contextWindow: 128000,
    maxOutputTokens: 4096,
    inputPrice: 5.00, // teks input $5/1M, audio input $100/1M
    cachedInputPrice: 2.50,
    outputPrice: 20.00, // teks output $20/1M, audio output $200/1M
    knowledgeCutoff: 'Oktober 2023',
    imageInput: false,
    imageGeneration: false,
    audioInput: true,
    audioOutput: true,
    vision: false,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'PREVIEW',
    releaseDate: '1 Oktober 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/guides/realtime',
    lastUpdated: '25 Januari 2025',
    suitableFor: [
      'Asisten panggilan telepon cerdas otomatis',
      'Penerjemah lisan simultan antar-bahasa',
      'Karakter NPC suara alami dalam game'
    ],
    notSuitableFor: [
      'Pemrosesan dokumen teks statis skala besar (biaya audio tinggi)'
    ],
    recommendedReplacement: null
  },

  // ==========================================
  // EMBEDDINGS
  // ==========================================
  {
    id: 'text-embedding-3-small',
    name: 'text-embedding-3-small',
    slug: 'text-embedding-3-small',
    modelId: 'text-embedding-3-small',
    family: 'Embeddings',
    category: 'embeddings',
    description: 'Model representasi vektor teks generasi ketiga yang sangat efisien. Menghasilkan vektor dimensi 1536 dengan performa retrieval MTEB yang mengungguli ada-002 seharga hanya $0.02 per 1M token.',
    shortDescription: 'Model embedding hemat biaya dimensi 1536 untuk sistem RAG dan pencarian.',
    reasoning: false,
    contextWindow: 8191,
    maxOutputTokens: 1536,
    inputPrice: 0.02,
    cachedInputPrice: 0.02,
    outputPrice: 0.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '25 Januari 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/embeddings',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Pencarian semantik di katalog produk e-commerce',
      'Sistem RAG (Retrieval-Augmented Generation) beranggaran rendah',
      'Klasterisasi dan pengelompokan artikel berita'
    ],
    notSuitableFor: [
      'Pencarian dokumen hukum atau medis yang menuntut presisi dimensi 3072'
    ],
    recommendedReplacement: null
  },
  {
    id: 'text-embedding-3-large',
    name: 'text-embedding-3-large',
    slug: 'text-embedding-3-large',
    modelId: 'text-embedding-3-large',
    family: 'Embeddings',
    category: 'embeddings',
    description: 'Model representasi vektor paling akurat dari OpenAI dengan dimensi hingga 3072. Menempati peringkat teratas tolok ukur MTEB dan mendukung pemotongan dimensi tanpa kehilangan makna (shortening embeddings). Biaya $0.13 per 1M token.',
    shortDescription: 'Model embedding presisi tertinggi dimensi 3072 untuk sistem retrieval kritis.',
    reasoning: false,
    contextWindow: 8191,
    maxOutputTokens: 3072,
    inputPrice: 0.13,
    cachedInputPrice: 0.13,
    outputPrice: 0.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '25 Januari 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/embeddings',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Pencarian referensi hukum dan jurisprudensi',
      'Basis pengetahuan medis dan sains terperinci',
      'Pencarian semantik multi-bahasa sensitif nuansa'
    ],
    notSuitableFor: [
      'Aplikasi sederhana yang dibatasi oleh memori database vektor'
    ],
    recommendedReplacement: null
  },
  {
    id: 'text-embedding-ada-002',
    name: 'text-embedding-ada-002',
    slug: 'text-embedding-ada-002',
    modelId: 'text-embedding-ada-002',
    family: 'Embeddings',
    category: 'deprecated',
    description: 'Model embedding generasi kedua yang mendominasi industri pada tahun 2022-2023. Saat ini digantikan sepenuhnya oleh text-embedding-3-small yang lebih murah dan lebih akurat.',
    shortDescription: 'Model embedding warisan generasi ke-2 (disarankan migrasi ke v3-small).',
    reasoning: false,
    contextWindow: 8191,
    maxOutputTokens: 1536,
    inputPrice: 0.10,
    cachedInputPrice: 0.10,
    outputPrice: 0.00,
    knowledgeCutoff: 'Bukan Model Teks LLM',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'DEPRECATED',
    releaseDate: '15 Desember 2022',
    deprecatedDate: '25 Januari 2024',
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/embeddings',
    lastUpdated: '01 Januari 2025',
    suitableFor: [
      'Kompatibilitas indeks database vektor yang belum sempat dire-index'
    ],
    notSuitableFor: [
      'Proyek baru (Gunakan text-embedding-3-small yang 5x lebih murah)'
    ],
    recommendedReplacement: 'text-embedding-3-small'
  },

  // ==========================================
  // SAFETY & MODERATION
  // ==========================================
  {
    id: 'omni-moderation-latest',
    name: 'Omni Moderation Latest',
    slug: 'omni-moderation-latest',
    modelId: 'omni-moderation-latest',
    family: 'Moderation',
    category: 'moderation',
    description: 'Model moderasi multimodal terkini yang mampu menganalisis teks dan gambar secara simultan untuk mendeteksi konten kekerasan, ujaran kebencian, pelecehan, dan pelanggaran keselamatan. Disediakan gratis oleh OpenAI bagi pengembang API.',
    shortDescription: 'Model moderasi teks dan gambar gratis untuk menyaring konten terlarang.',
    reasoning: false,
    contextWindow: 32768,
    maxOutputTokens: 1024,
    inputPrice: 0.00, // Gratis
    cachedInputPrice: 0.00,
    outputPrice: 0.00,
    knowledgeCutoff: 'Dikelola Dinamis oleh OpenAI',
    imageInput: true,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: true,
    functionCalling: false,
    structuredOutputs: true,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'ACTIVE',
    releaseDate: '26 September 2024',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/guides/moderation',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Penyaringan input pengguna sebelum diteruskan ke LLM utama',
      'Moderasi forum komunitas dan kolom komentar otomatis',
      'Verifikasi kepatuhan gambar yang diunggah pengguna'
    ],
    notSuitableFor: [
      'Penalaran umum atau pembuatan teks'
    ],
    recommendedReplacement: null
  },

  // ==========================================
  // OPEN-WEIGHT MODELS
  // ==========================================
  {
    id: 'gpt-oss-120b',
    name: 'gpt-oss-120b',
    slug: 'gpt-oss-120b',
    modelId: 'gpt-oss-120b',
    family: 'Open-Weight',
    category: 'open-weight',
    description: 'Inisiatif arsitektur model berbobot terbuka skala besar (~120 miliar parameter) yang ditujukan untuk riset transparansi AI, benchmarking independen, dan eksperimen inferensi mandiri terdistribusi.',
    shortDescription: 'Model terbuka skala besar 120B parameter untuk riset AI independen.',
    reasoning: false,
    contextWindow: 128000,
    maxOutputTokens: 64000,
    inputPrice: null, // Open weight parameter
    cachedInputPrice: null,
    outputPrice: null,
    knowledgeCutoff: 'Belum diverifikasi',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'PREVIEW',
    releaseDate: 'Riset Terbuka',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://openai.com/research',
    lastUpdated: '01 Februari 2025',
    suitableFor: [
      'Riset akademis dan analisis bobot model independen',
      'Eksplorasi fine-tuning lokal berkapasitas besar'
    ],
    notSuitableFor: [
      'Server berdaya komputasi rendah tanpa akselerasi kluster GPU'
    ],
    recommendedReplacement: null
  },
  {
    id: 'gpt-oss-20b',
    name: 'gpt-oss-20b',
    slug: 'gpt-oss-20b',
    modelId: 'gpt-oss-20b',
    family: 'Open-Weight',
    category: 'open-weight',
    description: 'Model berbobot terbuka berukuran sedang (~20 miliar parameter) yang dirancang untuk dapat dijalankan secara efisien pada workstation atau server lokal berperforma menengah.',
    shortDescription: 'Model terbuka 20B parameter yang efisien untuk inferensi workstation mandiri.',
    reasoning: false,
    contextWindow: 64000,
    maxOutputTokens: 32000,
    inputPrice: null,
    cachedInputPrice: null,
    outputPrice: null,
    knowledgeCutoff: 'Belum diverifikasi',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: true,
    structuredOutputs: true,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'PREVIEW',
    releaseDate: 'Riset Terbuka',
    deprecatedDate: null,
    shutdownDate: null,
    officialUrl: 'https://openai.com/research',
    lastUpdated: '01 Februari 2025',
    suitableFor: [
      'Penyebaran lokal di jaringan tertutup (on-premise)',
      'Fine-tuning domain khusus perusahaan berbiaya terjangkau'
    ],
    notSuitableFor: [
      'Tugas penalaran multimodal canggih'
    ],
    recommendedReplacement: null
  },

  // ==========================================
  // DEPRECATED & HISTORICAL RETIRED MODELS
  // ==========================================
  {
    id: 'gpt-3-5-turbo',
    name: 'GPT-3.5 Turbo',
    slug: 'gpt-3-5-turbo',
    modelId: 'gpt-3.5-turbo',
    family: 'GPT-3.5',
    category: 'deprecated',
    description: 'Model legendaris yang memicu revolusi ChatGPT pada awal tahun 2023. Memiliki konteks 16k token dengan biaya $0.50 input / $1.50 output. Saat ini secara resmi digantikan oleh GPT-4o mini yang jauh lebih pintar, lebih cepat, dan 60% lebih murah.',
    shortDescription: 'Model legendaris era 2023 (digantikan sepenuhnya oleh GPT-4o mini).',
    reasoning: false,
    contextWindow: 16385,
    maxOutputTokens: 4096,
    inputPrice: 0.50,
    cachedInputPrice: 0.50,
    outputPrice: 1.50,
    knowledgeCutoff: 'September 2021',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: true,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'DEPRECATED',
    releaseDate: '1 Maret 2023',
    deprecatedDate: '18 Juli 2024',
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Pemeliharaan sistem lama yang belum dimigrasi'
    ],
    notSuitableFor: [
      'Semua proyek baru (Wajib beralih ke gpt-4o-mini)'
    ],
    recommendedReplacement: 'gpt-4o-mini'
  },
  {
    id: 'gpt-3-5-turbo-instruct',
    name: 'GPT-3.5 Turbo Instruct',
    slug: 'gpt-3-5-turbo-instruct',
    modelId: 'gpt-3.5-turbo-instruct',
    family: 'GPT-3.5',
    category: 'deprecated',
    description: 'Varian completion murni (non-chat) yang dirancang untuk kompatibilitas endpoint legacy /v1/completions. Digunakan bagi sistem yang membutuhkan penyelesaian teks langsung tanpa format pesan percakapan.',
    shortDescription: 'Model completion murni tanpa format pesan chat (endpoint legacy).',
    reasoning: false,
    contextWindow: 4096,
    maxOutputTokens: 4096,
    inputPrice: 1.50,
    cachedInputPrice: 1.50,
    outputPrice: 2.00,
    knowledgeCutoff: 'September 2021',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'DEPRECATED',
    releaseDate: '14 September 2023',
    deprecatedDate: '18 Juli 2024',
    shutdownDate: null,
    officialUrl: 'https://platform.openai.com/docs/models/gpt-3-5-turbo',
    lastUpdated: '10 Januari 2025',
    suitableFor: [
      'Aplikasi warisan yang menggunakan API /v1/completions'
    ],
    notSuitableFor: [
      'Aplikasi chat modern'
    ],
    recommendedReplacement: 'gpt-4o-mini'
  },
  {
    id: 'text-davinci-003',
    name: 'text-davinci-003',
    slug: 'text-davinci-003',
    modelId: 'text-davinci-003',
    family: 'GPT-3 (InstructGPT)',
    category: 'deprecated',
    description: 'Puncak model era InstructGPT sebelum era chat. Telah dinonaktifkan secara permanen (shutdown) oleh OpenAI pada Januari 2024 dan tidak dapat dipanggil lagi melalui API.',
    shortDescription: 'Model legendaris InstructGPT (telah dimatikan permanen per Januari 2024).',
    reasoning: false,
    contextWindow: 4097,
    maxOutputTokens: 4097,
    inputPrice: 20.00,
    cachedInputPrice: 20.00,
    outputPrice: 20.00,
    knowledgeCutoff: 'Juni 2021',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'RETIRED',
    releaseDate: '28 November 2022',
    deprecatedDate: '6 Juli 2023',
    shutdownDate: '4 Januari 2024',
    officialUrl: 'https://platform.openai.com/docs/deprecations',
    lastUpdated: '04 Januari 2024',
    suitableFor: [
      'Hanya catatan sejarah perkembangan AI'
    ],
    notSuitableFor: [
      'Tidak dapat dipanggil lagi (HTTP 404/410)'
    ],
    recommendedReplacement: 'gpt-4o-mini'
  },
  {
    id: 'code-davinci-002',
    name: 'code-davinci-002',
    slug: 'code-davinci-002',
    modelId: 'code-davinci-002',
    family: 'Codex (Legacy)',
    category: 'deprecated',
    description: 'Model perdana mesin OpenAI Codex yang mentenagai versi awal GitHub Copilot pada 2021-2022. Telah dihentikan secara permanen pada Maret 2023.',
    shortDescription: 'Model awal OpenAI Codex (telah dimatikan permanen pada Maret 2023).',
    reasoning: false,
    contextWindow: 8001,
    maxOutputTokens: 4096,
    inputPrice: 0.00, // Sempat gratis saat riset beta
    cachedInputPrice: 0.00,
    outputPrice: 0.00,
    knowledgeCutoff: 'Juni 2021',
    imageInput: false,
    imageGeneration: false,
    audioInput: false,
    audioOutput: false,
    vision: false,
    functionCalling: false,
    structuredOutputs: false,
    webSearch: false,
    fileSearch: false,
    computerUse: false,
    status: 'RETIRED',
    releaseDate: '10 Agustus 2021',
    deprecatedDate: '20 Maret 2023',
    shutdownDate: '23 Maret 2023',
    officialUrl: 'https://platform.openai.com/docs/deprecations',
    lastUpdated: '23 Maret 2023',
    suitableFor: [
      'Arsip historis'
    ],
    notSuitableFor: [
      'Tidak aktif (Gunakan o3-mini atau gpt-4o)'
    ],
    recommendedReplacement: 'o3-mini'
  }
];

// ==========================================
// HELPER QUERY FUNCTIONS (Section 39)
// ==========================================

export function getAllModels(): Model[] {
  return MODELS;
}

export function getModelBySlug(slug: string): Model | undefined {
  return MODELS.find(m => m.slug.toLowerCase() === slug.toLowerCase() || m.modelId.toLowerCase() === slug.toLowerCase());
}

export function getModelsByCategory(category: ModelCategory): Model[] {
  return MODELS.filter(m => m.category === category);
}

export function getModelsByStatus(status: ModelStatus): Model[] {
  return MODELS.filter(m => m.status === status);
}

export function compareModels(ids: string[]): Model[] {
  const normalized = ids.map(id => id.toLowerCase().trim());
  return MODELS.filter(m => normalized.includes(m.id.toLowerCase()) || normalized.includes(m.slug.toLowerCase()) || normalized.includes(m.modelId.toLowerCase()));
}

export function searchModels(query: string): Model[] {
  const q = query.toLowerCase().trim();
  if (!q) return MODELS;
  return MODELS.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.modelId.toLowerCase().includes(q) ||
    m.family.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q) ||
    m.shortDescription.toLowerCase().includes(q) ||
    m.suitableFor.some(s => s.toLowerCase().includes(q))
  );
}

export function getAllModelSlugs(): string[] {
  return MODELS.map(m => m.slug);
}
