export interface FunctionLineExplanation {
  line: string;
  commentAr: string;
  commentEn: string;
}

export interface FunctionDetail {
  id: string;
  name: string;
  language: string;
  languageId: string;
  category: 'strings' | 'arrays_lists' | 'files_io' | 'crypto_security' | 'concurrency' | 'built_in' | 'network' | 'database';
  categoryLabel: string;
  categoryLabelEn: string;
  syntax: string;
  parameters: { name: string; type: string; description: string; descriptionEn?: string }[];
  returnValue: { type: string; description: string; descriptionEn?: string };
  whatItDoes: string;
  whatItDoesEn: string;
  deepExplanation: string;
  deepExplanationEn: string;
  codeExample: string;
  lineBreakdown: FunctionLineExplanation[];
  securityTip: string;
  securityTipEn: string;
  commonMistake?: string;
  commonMistakeEn?: string;
}

export interface LanguageInfo {
  id: string;
  name: string;
  nameAr: string;
  badge: string;
  badgeEn: string;
  iconName: string;
  color: string;
  borderColor: string;
  bgColor: string;
  paradigm: string;
  paradigmEn: string;
  typing: string;
  typingEn: string;
  execution: string;
  executionEn: string;
  overview: string;
  overviewEn: string;
  strengths: string[];
  strengthsEn: string[];
  bestUseCases: string[];
  bestUseCasesEn: string[];
  securityFocus: string;
  securityFocusEn: string;
  fileExtension: string;
}

export const languagesList: LanguageInfo[] = [
  {
    id: 'python',
    name: 'Python',
    nameAr: 'بايثون',
    badge: 'الأكثر شعبية في الذكاء الاصطناعي والأمن',
    badgeEn: 'Top Choice in AI & Cyber Security',
    iconName: 'Code2',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/20',
    paradigm: 'متعددة النماذج (كائنية، إجرائية، وظيفية)',
    paradigmEn: 'Multi-paradigm (OOP, Procedural, Functional)',
    typing: 'ديناميكية وقوية (Dynamic, Strongly Typed)',
    typingEn: 'Dynamic, Strongly Typed',
    execution: 'مفسرة عبر مفسر بايثون CPython إلى Bytecode',
    executionEn: 'Interpreted via CPython Bytecode Virtual Machine',
    overview: 'تتميز بتركيبها النحوي السلس وشبه الطبيعي ومكتباتها التشفيرية والشبكية الضخمة، وهي المعيار الذهبي لأتمتة المهام والتحليل الجنائي الرقمي والذكاء الاصطناعي.',
    overviewEn: 'Renowned for clean, human-readable syntax and massive cryptographic/network ecosystems. The gold standard for automation, DFIR, and AI.',
    strengths: [
      'سرعة فائقة في كتابة النماذج الأولية والأتمتة',
      'منظومة مكتبات أمنية ضخمة (cryptography, scapy, requests, pwntools)',
      'مجتمع دعم عالمي هائل في علم البيانات والذكاء الاصطناعي'
    ],
    strengthsEn: [
      'Rapid prototyping and scripting efficiency',
      'Vast security & networking libraries (cryptography, scapy, requests)',
      'Massive global ecosystem in Data Science and Machine Learning'
    ],
    bestUseCases: [
      'كتابة سكربتات فحص الثغرات والتدقيق الأمني التلقائي',
      'بناء خوادم الويب والواجهات الخلفية عبر FastAPI و Django',
      'تحليل البيانات وحزم التشفير وتوليد المفاتيح الآمنة'
    ],
    bestUseCasesEn: [
      'Security audit scripting and vulnerability assessment',
      'Scalable backend web APIs with FastAPI & Django',
      'Data analysis, cryptographic utilities, and token generation'
    ],
    securityFocus: 'احذر من دوال التنفيذ المباشر مثل `eval()` و `exec()` والمكتبات المترجمة التي لا تتحقق من نوع المدخلات، واعتمد مكتبة `secrets` بدلاً من `random` للتشفير.',
    securityFocusEn: 'Never use eval() or exec() on untrusted inputs. Always enforce parameterized operations and use secrets instead of random for cryptographic tokens.',
    fileExtension: '.py'
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    nameAr: 'جافاسكريبت / تايب سكريبت',
    badge: 'لغة الويب والواجهات والتطبيقات الموزعة',
    badgeEn: 'The Lingua Franca of Modern Web & APIs',
    iconName: 'Braces',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/40',
    bgColor: 'bg-yellow-950/20',
    paradigm: 'قائمة على النماذج الأولية (Prototype-based)، وظيفية، تفاعلية بالكامل',
    paradigmEn: 'Prototype-based, functional, event-driven',
    typing: 'ديناميكية (JS) / ساكنة وصارمة (TypeScript)',
    typingEn: 'Dynamic (JS) / Static & Strict (TypeScript)',
    execution: 'مجمعة Just-In-Time عبر محركات فائقة مثل V8 و SpiderMonkey',
    executionEn: 'JIT-compiled via modern engines like V8 & SpiderMonkey',
    overview: 'عمود الإنترنت الحديث. تدعم بناء التطبيقات من جانب العميل والخادم عبر Node.js مع نموذج حلقة الأحداث (Event Loop) أحادي الخيط غير المعطل.',
    overviewEn: 'The backbone of the modern web. Powers client-side interfaces and scalable Node.js server architectures with an asynchronous Event Loop.',
    strengths: [
      'نموذج غير متزامن فائق السرعة عبر Event Loop لمعالجة آلاف الطلبات',
      'أكبر مستودع حزم برمجي في العالم (npm)',
      'TypeScript توفر أمان الأنواع الصارم لمنع الأخطاء مبكراً'
    ],
    strengthsEn: [
      'Non-blocking event-driven I/O for concurrent requests',
      'World largest package registry (npm)',
      'TypeScript strict typing eliminates compile-time null and type bugs'
    ],
    bestUseCases: [
      'تطوير واجهات المستخدم التفاعلية (React, Vue, Next.js)',
      'بناء خوادم الـ API الميكروية ومعالجة تدفقات البيانات الحية',
      'تطبيقات الهواتف وسطح المكتب (Electron, React Native)'
    ],
    bestUseCasesEn: [
      'Interactive frontends with React and modern UI frameworks',
      'Microservice REST & GraphQL APIs with Express and Fastify',
      'Cross-platform desktop and mobile apps with Electron and React Native'
    ],
    securityFocus: 'تجنب ثغرات XSS بالابتعاد عن `innerHTML` و `eval()`، واستخدم دائماً `crypto.subtle` بدلاً من `Math.random` للعمليات الحساسة وتأمين رؤوس HTTP مثل CSP.',
    securityFocusEn: 'Prevent XSS by eliminating innerHTML and eval(). Always use Web Crypto API (crypto.subtle) instead of Math.random for security tokens.',
    fileExtension: '.js / .ts'
  },
  {
    id: 'bash',
    name: 'Bash & Shell',
    nameAr: 'باش والطرفية',
    badge: 'لغة التحكم بالنظام وإدارة السيرفرات',
    badgeEn: 'Operating System Control & Automation',
    iconName: 'Terminal',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/20',
    paradigm: 'لغة أوامر إجرائية وأنابيب تدفق (Pipes)',
    paradigmEn: 'Command procedural and pipeline-based shell',
    typing: 'نصوص غير نمطية (Typeless strings)',
    typingEn: 'Typeless strings and text streams',
    execution: 'تفسير فوري لأوامر غلاف نظام التشغيل',
    executionEn: 'Direct interpretive execution by kernel shell',
    overview: 'أداة القوة المطلقة لمهندسي الأنظمة والدفاع السيبراني. تتيح دمج برامج لينكس المستقلة عبر الأنابيب لإنجاز مهام التدقيق المعقدة في سطر واحد.',
    overviewEn: 'The essential tool for sysadmins and security engineers. Chains modular Linux utilities through pipes to audit and manage infrastructure.',
    strengths: [
      'متوفرة مسبقاً في كل أنظمة لينكس وماك و Termux دون أي تثبيت',
      'قدرة فورية على التحكم بالعمليات ومراقبة العتاد والشبكات',
      'مثالية لخطوط الإنتاج والتسليم المستمر CI/CD'
    ],
    strengthsEn: [
      'Pre-installed on every Linux distribution, macOS, and Termux',
      'Instant process control, network auditing, and filesystem inspection',
      'Foundation for CI/CD runners and deployment pipelines'
    ],
    bestUseCases: [
      'إدارة وتأمين الخوادم عن بعد والتحديثات الدورية للأمان',
      'فحص السجلات (Log Analysis) ورصد محاولات الهجوم',
      'تجهيز بيئات الحاويات السحابية والحزم'
    ],
    bestUseCasesEn: [
      'Remote server hardening and automated security patching',
      'High-speed log analysis and threat signature detection',
      'Container bootstrapping and cloud provisioning'
    ],
    securityFocus: 'ضع دائماً المتغيرات داخل علامات اقتباس مزدوجة `"$VAR"` لمنع تقسيم الكلمات، واستخدم `set -euo pipefail` لإيقاف السكربت فور حدوث أي خطأ غير متوقع.',
    securityFocusEn: 'Always double-quote variables `"$VAR"` to prevent word splitting and command injection. Use `set -euo pipefail` at script top.',
    fileExtension: '.sh'
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    nameAr: 'قو لانق',
    badge: 'معيار البنية السحابية وأدوات الأمان الحديثة',
    badgeEn: 'Cloud Infrastructure & High-Speed Security Tools',
    iconName: 'Cpu',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-950/20',
    paradigm: 'متزامنة، إجرائية مع واجهات Composition مقتضبة',
    paradigmEn: 'Concurrent, procedural with composition interfaces',
    typing: 'ساكنة وصارمة (Static, Statically Typed)',
    typingEn: 'Static, strong type system with inference',
    execution: 'مترجمة إلى ملف ثنائي تنفيذي واحد مستقل (Single Static Binary)',
    executionEn: 'Compiled directly into a self-contained static machine binary',
    overview: 'ابتكرتها Google لإعادة تعريف هندسة البرمجيات الضخمة. تدمج البساطة المتناهية مع نموذج التزامن الفائق عبر قنوات وخيوط Goroutines خفيفة الوزن.',
    overviewEn: 'Designed by Google for scalable software engineering. Combines extreme simplicity with lightweight concurrency via Goroutines and channels.',
    strengths: [
      'ملف تنفيذي واحد بدون الحاجة لتثبيت أي محركات أو مكتبات على الخادم',
      'دعم التزامن بملايين العمليات المتوازية بأقل استهلاك للذاكرة',
      'سرعة ترجمة وبناء تكاد تكون لحظية'
    ],
    strengthsEn: [
      'Single zero-dependency static binary output for rapid deployment',
      'Ultra-lightweight Goroutines allow millions of concurrent tasks',
      'Near-instantaneous compilation speed'
    ],
    bestUseCases: [
      'بناء أدوات فحص الشبكات والماسحات الأمنية السريعة',
      'برمجيات البنية التحتية السحابية (مثل Docker و Kubernetes)',
      'الخوادم المصغرة والخدمات الموجهة للموثوقية العالية'
    ],
    bestUseCasesEn: [
      'High-throughput network scanners and cybersecurity auditing tools',
      'Cloud container orchestration (Docker, Kubernetes are written in Go)',
      'Mission-critical microservices and real-time backend engines'
    ],
    securityFocus: 'استخدم خوارزمية `subtle.ConstantTimeCompare` لمقارنة كلمات المرور والرموز لمنع Timing Attacks، واستخدم أقفال `sync.Mutex` لحماية الذاكرة المشتركة.',
    securityFocusEn: 'Always compare cryptographic hashes using `subtle.ConstantTimeCompare` to stop side-channel timing attacks.',
    fileExtension: '.go'
  },
  {
    id: 'rust',
    name: 'Rust',
    nameAr: 'رست',
    badge: 'أمان الذاكرة المطلق وأعلى كفاءة في الأداء',
    badgeEn: 'Memory Safety & Zero-Cost Systems Performance',
    iconName: 'Shield',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/40',
    bgColor: 'bg-orange-950/20',
    paradigm: 'وظيفية، إجرائية، متزامنة مع تجريدات بدون تكلفة (Zero-Cost Abstractions)',
    paradigmEn: 'Functional, procedural with zero-cost abstractions',
    typing: 'ساكنة وصارمة جداً مع استنتاج تلقائي للأنواع (Type Inference)',
    typingEn: 'Statically typed with powerful compile-time type inference',
    execution: 'مترجمة بالكامل عبر LLVM إلى كود آلة عالي الكفاءة',
    executionEn: 'Compiled natively via LLVM backend to bare-metal performance',
    overview: 'اللغة الرائدة في هندسة الأنظمة الحديثة. صممت للقضاء التام على ثغرات أمان الذاكرة (مثل Use-After-Free و Buffer Overflow) في مرحلة الترجمة دون الحاجة لجامع قمامة بفضل نموذج الملكية (Ownership).',
    overviewEn: 'The modern systems benchmark. Eliminates entire classes of memory safety bugs at compile-time without runtime garbage collection via its Ownership model.',
    strengths: [
      'أمان ذاكرة مضمون في مرحلة الترجمة (Memory Safety Guaranteed)',
      'سرعة تنفيذ خام تضاهي وتتفوق على C و C++',
      'نظام حزم متميز وأدوات توثيق واختبار مدمجة (Cargo)'
    ],
    strengthsEn: [
      'Compile-time memory safety guarantee without garbage collector',
      'Raw execution performance matching or surpassing C and C++',
      'First-class package manager, build tool, and test runner (Cargo)'
    ],
    bestUseCases: [
      'تطوير أنظمة التشغيل والبرمجيات المضمنة وحزم التشفير الآمنة',
      'محركات الألعاب والمتصفحات وتطبيقات التشفير والعملات المشفرة',
      'تطوير محركات WebAssembly الفائقة للويب'
    ],
    bestUseCasesEn: [
      'Operating systems kernels, crypto engines, and embedded firmware',
      'Next-generation browsers, cryptography primitives, and game engines',
      'High-performance WebAssembly browser modules'
    ],
    securityFocus: 'تجنب استخدام كتل `unsafe` إلا عند الضرورة القصوى مع مراجعة دقيقة لتدقيق المؤشرات وضمان سلامة الحدود.',
    securityFocusEn: 'Limit `unsafe` blocks strictly and verify pointer validity to maintain compiler memory safety invariants.',
    fileExtension: '.rs'
  },
  {
    id: 'cpp',
    name: 'C / C++',
    nameAr: 'سي وسي بلس بلس',
    badge: 'أساس الحوسبة وهندسة النواة',
    badgeEn: 'Foundation of Operating Systems & Bare Metal',
    iconName: 'Binary',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-950/20',
    paradigm: 'إجرائية (C) / كائنية، عامة (Generics)، وعالية الأداء (C++)',
    paradigmEn: 'Procedural (C) / Object-oriented & Generic (C++)',
    typing: 'ساكنة مع تحويلات مباشرة بالذاكرة',
    typingEn: 'Statically typed with direct memory addressing',
    execution: 'مترجمة ومحسنة لأقصى حد لمعماريات المعالجات المختلفة',
    executionEn: 'Compiled and optimized directly for target CPU architectures',
    overview: 'اللغات الأساسية التي بنيت عليها أنظمة التشغيل الحديثة (نواة لينكس، ويندوز، ماك)، محركات قواعد البيانات، والمترجمات. تمنح المبرمج تحكماً كاملاً بالعتاد وعناوين الذاكرة.',
    overviewEn: 'The architectural foundation for modern operating system kernels, databases, and compilers. Grants absolute control over CPU instructions and memory.',
    strengths: [
      'أقصى سرعة ممكنة وتحكم كامل بالعتاد والذاكرة العشوائية',
      'توافق هائل ومكتبات صناعية تراكمت على مدار عقود',
      'معيار الحوسبة الرسومية والألعاب ثلاثية الأبعاد وعلم الروبوتات'
    ],
    strengthsEn: [
      'Unsurpassed raw execution speed and direct hardware memory control',
      'Vast industrial footprint and battle-tested libraries across decades',
      'Industry standard for 3D graphics engines, robotics, and low-latency systems'
    ],
    bestUseCases: [
      'تطوير أنوية الأنظمة (Kernels) وتعريفات العتاد (Drivers)',
      'محركات قواعد البيانات مثل MySQL و PostgreSQL',
      'التطبيقات ذات القيود الصارمة على الوقت والذاكرة'
    ],
    bestUseCasesEn: [
      'Kernel programming and bare-metal device drivers',
      'High-performance database storage engines and virtualization',
      'Ultra-low-latency financial trading systems and game engines'
    ],
    securityFocus: 'احذر من طفح الذاكرة المؤقتة (Buffer Overflow) وتلف الذاكرة، واستخدم المؤشرات الذكية `std::unique_ptr` ودوال التحقق من الحدود بدلاً من `strcpy` و `malloc`.',
    securityFocusEn: 'Prevent buffer overflows and memory corruption by using smart pointers (std::unique_ptr) and bounds-checked functions over raw malloc/strcpy.',
    fileExtension: '.c / .cpp'
  },
  {
    id: 'sql',
    name: 'SQL',
    nameAr: 'إس كيو إل',
    badge: 'لغة الاستعلام والبيانات العلائقية',
    badgeEn: 'Relational Database Queries & Persistence',
    iconName: 'Database',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-950/20',
    paradigm: 'تصريحية (Declarative Language)',
    paradigmEn: 'Declarative query specification language',
    typing: 'ساكنة وصارمة وفق جداول قاعدة البيانات',
    typingEn: 'Statically typed database schema constraints',
    execution: 'تفسير وتنفيذ عبر محرك تخطيط الاستعلامات في قاعدة البيانات',
    executionEn: 'Optimized by query planner and execution engine',
    overview: 'المعيار العالمي لإدارة واسترجاع البيانات المهيكلة في قواعد البيانات العلائقية (PostgreSQL, MySQL, SQLite). تحدد ما تريده وليس كيفية استخراجه.',
    overviewEn: 'The international standard for structured relational data persistence, indexing, and querying in PostgreSQL, MySQL, and SQLite.',
    strengths: [
      'كفاءة رياضية عالية في تصفية وربط ملايين السجلات في أجزاء من الثانية',
      'ضمان معايير ACID للحفاظ على نزاهة وموثوقية البيانات المالية والحساسة',
      'معيار ثابت ومدعوم في كافة منصات السحابة والتطبيقات'
    ],
    strengthsEn: [
      'High relational performance in filtering and joining millions of rows',
      'ACID transaction guarantees for data integrity in mission-critical apps',
      'Universal compatibility across every cloud and enterprise framework'
    ],
    bestUseCases: [
      'تخزين واسترجاع بيانات المستخدمين والجلسات والحسابات',
      'إنشاء التقارير التحليلية والمالية المعقدة',
      'بناء جداول التدقيق وتوثيق سجلات الأمان (Audit Trails)'
    ],
    bestUseCasesEn: [
      'User accounts, permission persistence, and relational data modeling',
      'Complex analytical aggregation and financial transaction ledgers',
      'Security audit logging and event tracking'
    ],
    securityFocus: 'لا تدمج أبداً مدخلات المستخدم نصياً داخل عبارة الاستعلام لتفادي ثغرة SQL Injection الخطيرة. استخدم دائماً الاستعلامات المعلمية (Prepared Statements).',
    securityFocusEn: 'Never concatenate user inputs into SQL strings. Always enforce Parameterized Queries / Prepared Statements to block SQL Injection.',
    fileExtension: '.sql'
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    nameAr: 'دوكر والحاويات',
    badge: 'عزل التطبيقات وتوحيد بيئات الإنتاج',
    badgeEn: 'Container Isolation & Immutable Deployments',
    iconName: 'Boxes',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/40',
    bgColor: 'bg-sky-950/20',
    paradigm: 'إعلانية لتوصيف البنية والتغليف (Infrastructure as Code)',
    paradigmEn: 'Declarative packaging and Infrastructure as Code',
    typing: 'تكوين نصي وصفي للطبقات (Layered Specifications)',
    typingEn: 'Layered container configuration instructions',
    execution: 'معزولة عبر مساحات أسماء النواة (cgroups & namespaces)',
    executionEn: 'Linux kernel isolated namespaces & control groups (cgroups)',
    overview: 'تقنية تعبئة التطبيق مع كافة مكتباته واعتمادياته في حاوية برمجية معزولة وخفيفة تعمل بنفس الطريقة على جهاز المطور أو السيرفر السحابي.',
    overviewEn: 'Packages applications with dependencies into immutable, isolated container images that run deterministically across dev and production.',
    strengths: [
      'حل مشكلة "كان يعمل على جهازي!" نهائياً',
      'عزل كامل للعمليات والمنافذ لتقليل سطح الهجوم',
      'نشر سريع وتوسع سلس في البنى السحابية'
    ],
    strengthsEn: [
      'Eliminates the "works on my machine" environmental discrepancy',
      'Process and filesystem sandboxing to minimize host attack surface',
      'Instant deployment and horizontal scalability across Kubernetes clusters'
    ],
    bestUseCases: [
      'نشر التطبيقات والخدمات المصغرة معزولة عن النظام المضيف',
      'إنشاء بيئات اختبار مطابقة للإنتاج بأمان',
      'تشغيل أدوات الحماية في بيئات رملية معزولة (Sandboxing)'
    ],
    bestUseCasesEn: [
      'Hardened deployment of microservices with minimal attack surface',
      'Isolated ephemeral sandbox environments for malware analysis',
      'Deterministic CI/CD build environments'
    ],
    securityFocus: 'عدم تشغيل الحاويات بصلاحية المستخدم الجذري (USER nonroot)، وفحص الحزم والاعتماديات من الثغرات، واستخدام صور أساسية مصغرة مثل Alpine أو Distroless.',
    securityFocusEn: 'Never run containers as root (USER nonroot). Use minimal base images (Alpine or Distroless) and scan layers for CVE vulnerabilities.',
    fileExtension: 'Dockerfile'
  }
];

export const functionsEncyclopedia: FunctionDetail[] = [
  // 1. PYTHON: map()
  {
    id: 'py-fn-map',
    name: 'map(function, iterable, ...)',
    language: 'Python',
    languageId: 'python',
    category: 'arrays_lists',
    categoryLabel: 'القوائم والمصفوفات',
    categoryLabelEn: 'Arrays & Lists',
    syntax: 'map(function, iterable, ...)',
    parameters: [
      { name: 'function', type: 'callable', description: 'دالة تطبق على كل عنصر بالتناوب', descriptionEn: 'Function applied to each element in the iterable' },
      { name: 'iterable', type: 'iterable', description: 'مجموعة قابلة للتكرار (قائمة، مصفوفة، صفوف)', descriptionEn: 'Sequence to iterate over (list, tuple, etc.)' }
    ],
    returnValue: { type: 'map iterator', description: 'مولد كسول ينتج العناصر المعالجة عند الطلب', descriptionEn: 'Lazy iterator yielding transformed elements on demand' },
    whatItDoes: 'تطبق الدالة المحددة على كل عنصر من عناصر المجموعة دون الحاجة لكتابة حلقة for صريحة.',
    whatItDoesEn: 'Applies a designated transformation function to every item in an iterable without explicit for loops.',
    deepExplanation: 'تعمل بتقنية التقييم الكسول (Lazy Evaluation). هذا يعني أنها لا تستهلك الذاكرة باحتساب جميع العناصر دفعة واحدة، بل تحتفظ بالموقع وتنتج العنصر التالي فقط عندما تطلبه حلقة التكرار أو دالة list() أو next().',
    deepExplanationEn: 'Employs lazy evaluation, meaning transformed values are computed on the fly rather than allocating a full new list in RAM.',
    codeExample: `# تنظيف وتوحيد عناوين IP المدخلة
raw_ips = ["  192.168.1.1  ", "10.0.0.1\\n", " 172.16.0.5 "]
clean_ips = list(map(str.strip, raw_ips))

print("Clean IPs:", clean_ips)`,
    lineBreakdown: [
      { line: 'raw_ips = ["  192.168.1.1  ", "10.0.0.1\\n", " 172.16.0.5 "]', commentAr: 'تعريف قائمة تحتوي على نصوص عناوين IP غير منسقة وبها مسافات وأسطر جديدة.', commentEn: 'Defines an array of raw IP strings with trailing whitespace and newline characters.' },
      { line: 'clean_ips = list(map(str.strip, raw_ips))', commentAr: 'تطبيق دالة str.strip على كل عنصر لإزالة المسافات، ثم تحويل الناتج إلى قائمة list نهائية.', commentEn: 'Applies str.strip to each element to strip spaces, then collects into a final list.' },
      { line: 'print("Clean IPs:", clean_ips)', commentAr: 'طباعة القائمة المنظفة بعد إزالة الفراغات غير المرغوبة.', commentEn: 'Outputs the cleansed sanitized list of IP addresses.' }
    ],
    securityTip: 'تجنب تمرير دوال ديناميكية أو مجهولة المصدر للمدخلات؛ تأكد أن الدالة الممررة آمنة وتتعامل مع أنواع البيانات المتوقعة فقط.',
    securityTipEn: 'Do not pass dynamic or untrusted functions to map(); ensure the callable handles edge-case input types safely without raising unhandled errors.',
    commonMistake: 'محاولة طباعة كائن map مباشرة دون تحويله عبر list()؛ حيث سيطبع عنوان المؤشر بالذاكرة بدلاً من المحتويات.',
    commonMistakeEn: 'Printing a map object directly instead of wrapping with list(), which outputs the iterator memory pointer instead of values.'
  },

  // 2. PYTHON: secrets.token_hex()
  {
    id: 'py-fn-secrets',
    name: 'secrets.token_hex([nbytes])',
    language: 'Python',
    languageId: 'python',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    categoryLabelEn: 'Cryptography & Security',
    syntax: 'secrets.token_hex(nbytes=32)',
    parameters: [
      { name: 'nbytes', type: 'int (اختياري)', description: 'عدد البايتات العشوائية التشفيرية المراد توليدها', descriptionEn: 'Number of random bytes to generate (default: 32)' }
    ],
    returnValue: { type: 'str', description: 'سلسلة نصية ست عشرية (Hex) عشوائية مستحيلة التنبؤ', descriptionEn: 'Cryptographically unpredictable hex-encoded string' },
    whatItDoes: 'تولد توكنات أمان ورموز تحقق عشوائية غير قابلة للتخمين لإدارة الجلسات ورموز CSRF واستعادة الحسابات.',
    whatItDoesEn: 'Generates cryptographically secure, unpredictable random tokens for sessions, CSRF guards, and password resets.',
    deepExplanation: 'تعتمد وحدة secrets على مولدات الأرقام العشوائية الآمنة لنظام التشغيل (CSPRNG مثل /dev/urandom في لينكس أو CryptGenRandom في ويندوز)، خلافاً لمكتبة random العادية القابلة للتوقع بعد فحص عينات.',
    deepExplanationEn: 'Powered by OS-level CSPRNG (/dev/urandom) unlike standard math/random which uses predictable pseudorandom PRNG algorithms.',
    codeExample: `import secrets

# توليد توكن جلسة آمن بطول 32 بايت (64 حرف ست عشري)
csrf_token = secrets.token_hex(32)
print("CSRF Token:", csrf_token)`,
    lineBreakdown: [
      { line: 'import secrets', commentAr: 'استيراد المكتبة القياسية المخصصة للأمان والتشفير في بايثون.', commentEn: 'Imports Python dedicated cryptographic randomness standard module.' },
      { line: 'csrf_token = secrets.token_hex(32)', commentAr: 'توليد 32 بايت من العشوائية المشفرة وتحويلها إلى 64 حرفاً بالنظام الست عشري.', commentEn: 'Generates 32 bytes of secure entropy formatted as a 64-character hex string.' },
      { line: 'print("CSRF Token:", csrf_token)', commentAr: 'طباعة الرمز الآمن المولد للاستخدام في حماية طلبات الويب.', commentEn: 'Prints the generated high-entropy token ready for web request protection.' }
    ],
    securityTip: 'لا تستخدم أبداً مكتبة `random.randint` أو `random.choice` لتوليد كلمات المرور أو التوكنات؛ استخدم `secrets` حصراً.',
    securityTipEn: 'Never use the `random` module for secrets, session IDs, or crypto keys; always use `secrets`.',
    commonMistake: 'تحديد عدد بايتات قليل جداً (أقل من 16 بايت)، مما يسهل هجمات التخمين بالقوة الغاشمة (Brute-Force).',
    commonMistakeEn: 'Supplying insufficient entropy (under 16 bytes), allowing brute-force or collision vulnerabilities.'
  },

  // 3. PYTHON: hashlib.sha256()
  {
    id: 'py-fn-hashlib',
    name: 'hashlib.sha256(data).hexdigest()',
    language: 'Python',
    languageId: 'python',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    categoryLabelEn: 'Cryptography & Security',
    syntax: 'hashlib.sha256(data_bytes).hexdigest()',
    parameters: [
      { name: 'data_bytes', type: 'bytes', description: 'البيانات الثنائية المراد حساب بصمتها الرقمية', descriptionEn: 'Binary byte stream to compute the hash digest for' }
    ],
    returnValue: { type: 'str', description: 'بصمة تشفيرية ثابتة بطول 64 حرفاً ست عشرياً (256-bit)', descriptionEn: 'Fixed-length 64-char hexadecimal digest (256 bits)' },
    whatItDoes: 'تحسب البصمة الرقمية أحادية الاتجاه (One-Way Hash) لأي نص أو ملف للتحقق من النزاهة ومنع التلاعب.',
    whatItDoesEn: 'Calculates a deterministic one-way cryptographic hash of arbitrary data to guarantee integrity and detect tampering.',
    deepExplanation: 'تعتمد خوارزمية SHA-256 على تأثير الانهيار التشفيري (Avalanche Effect)؛ فإذا تغير حرف واحد في النص المدخل، تتغير ما لا يقل عن 50% من أحرف البصمة الناتجة تماماً وبشكل شبه عشوائي.',
    deepExplanationEn: 'SHA-256 exhibits strong avalanche effect: changing a single bit in the input radically alters more than 50% of the output digest.',
    codeExample: `import hashlib

def calculate_checksum(payload: str) -> str:
    raw_bytes = payload.encode('utf-8')
    return hashlib.sha256(raw_bytes).hexdigest()

print(calculate_checksum("Security-Policy-Version-1"))`,
    lineBreakdown: [
      { line: 'import hashlib', commentAr: 'استيراد وحدة خوارزميات التجزئة والتشفير في بايثون.', commentEn: 'Imports the hashlib cryptographic hashing module.' },
      { line: 'def calculate_checksum(payload: str) -> str:', commentAr: 'تعريف دالة تقبل نصاً وترجع بصمة الهاش كنص.', commentEn: 'Declares function receiving string payload and returning string hash.' },
      { line: 'raw_bytes = payload.encode("utf-8")', commentAr: 'تحويل النص إلى مصفوفة بايتات ثنائية لأن دوال الهاش لا تقبل نصوصاً مجردة.', commentEn: 'Encodes text to UTF-8 bytes required by hashing algorithms.' },
      { line: 'return hashlib.sha256(raw_bytes).hexdigest()', commentAr: 'حساب SHA-256 وتحويل النتيجة إلى صيغة نصية ست عشرية.', commentEn: 'Calculates SHA-256 and returns hex string representation.' }
    ],
    securityTip: 'لا تستخدم SHA-256 مباشرة لحفظ كلمات المرور بدون تمليح وتكرار؛ استخدم Argon2 أو bcrypt لحماية كلمات المرور من جداول Rainbow Tables.',
    securityTipEn: 'Do not use plain SHA-256 for password storage; use slow memory-hard password hashers like Argon2id or bcrypt.',
    commonMistake: 'تمرير نص str مباشرة إلى sha256 دون تحويله إلى bytes عبر .encode()، مما يسبب TypeError.',
    commonMistakeEn: 'Passing a string directly to sha256 without calling .encode(), causing a TypeError.'
  },

  // 4. PYTHON: subprocess.run()
  {
    id: 'py-fn-subprocess',
    name: 'subprocess.run(args, check, shell)',
    language: 'Python',
    languageId: 'python',
    category: 'files_io',
    categoryLabel: 'الملفات والإدخال/الإخراج',
    categoryLabelEn: 'Files & System I/O',
    syntax: 'subprocess.run(["cmd", "arg1"], check=True, shell=False, capture_output=True)',
    parameters: [
      { name: 'args', type: 'list[str]', description: 'قائمة تحتوي الأمر ومعاملاته مفصولة', descriptionEn: 'List containing executable and its arguments separately' },
      { name: 'shell', type: 'bool', description: 'يجب ضبطها دائماً على False لمنع ثغرات حقن الأوامر', descriptionEn: 'Must remain False to prevent command injection vulnerabilities' },
      { name: 'check', type: 'bool', description: 'إطلاق استثناء في حال فشل الأمر (Exit Code != 0)', descriptionEn: 'Raises CalledProcessError if returncode is non-zero' }
    ],
    returnValue: { type: 'CompletedProcess', description: 'كائن يحتوي على مخرجات الأمر وحالة الانتهاء', descriptionEn: 'CompletedProcess instance holding stdout, stderr, returncode' },
    whatItDoes: 'تشغل أوامر وبرامج نظام التشغيل بأمان وعزل تام مع منع ثغرات حقن أوامر النظام Command Injection.',
    whatItDoesEn: 'Safely spawns and executes operating system processes while preventing command injection attacks.',
    deepExplanation: 'عند تعيين shell=False وتمرير الأمر كمصفوفة، يتم استدعاء واجهة execve في النواة مباشرة بدون وسيط قشرة النظام (Shell). هذا يمنع تفسير الرموز الخبيثة مثل الفاصلة المنقوطة (;) أو الأنابيب (|).',
    deepExplanationEn: 'With shell=False and list arguments, execve kernel system call is invoked directly, preventing shell meta-character evaluation.',
    codeExample: `import subprocess

# تشغيل أمر آمن ومحمي من حقن الأوامر
result = subprocess.run(
    ["ping", "-c", "2", "127.0.0.1"],
    capture_output=True,
    text=True,
    shell=False,
    check=True
)

print("Output:\\n", result.stdout)`,
    lineBreakdown: [
      { line: 'import subprocess', commentAr: 'استيراد وحدة إدارة العمليات الفرعية في نظام التشغيل.', commentEn: 'Imports the subprocess OS management module.' },
      { line: 'result = subprocess.run(', commentAr: 'بدء تشغيل عملية فرعية جديدة مع انتظار اكتمالها.', commentEn: 'Starts a subprocess and awaits synchronous completion.' },
      { line: '    ["ping", "-c", "2", "127.0.0.1"],', commentAr: 'تمرير الأمر والمعاملات كمصفوفة عناصر منفصلة لمنع تفسير أي رموز نظام خبيثة.', commentEn: 'Passes executable and arguments as discrete array tokens.' },
      { line: '    capture_output=True, text=True, shell=False, check=True', commentAr: 'التقاط المخرجات وقفل shell=False لضمان الأمان ورفع استثناء عند الفشل.', commentEn: 'Captures stdout as text with shell=False for defense.' },
      { line: 'print("Output:\\n", result.stdout)', commentAr: 'طباعة النص القياسي الراجع من تنفيذ الأمر.', commentEn: 'Prints captured stdout stream.' }
    ],
    securityTip: 'لا تقم أبداً بتفعيل shell=True عند التعامل مع مدخلات خارجية مأخوذة من المستخدم أو شبكة الإنترنت.',
    securityTipEn: 'Never enable shell=True when processing variables influenced by user input.',
    commonMistake: 'استخدام os.system(cmd_string) القديمة التي لا تلتقط المخرجات وتفتح الباب على مصراعيه لحقن الأوامر.',
    commonMistakeEn: 'Using legacy os.system() which forwards strings directly to /bin/sh without safety controls.'
  },

  // 5. JAVASCRIPT: Array.prototype.reduce()
  {
    id: 'js-fn-reduce',
    name: 'Array.prototype.reduce(callback, initialValue)',
    language: 'JavaScript / TypeScript',
    languageId: 'javascript',
    category: 'arrays_lists',
    categoryLabel: 'القوائم والمصفوفات',
    categoryLabelEn: 'Arrays & Lists',
    syntax: 'array.reduce((acc, curr, index, arr) => { ... }, initialValue)',
    parameters: [
      { name: 'callback', type: 'Function', description: 'دالة تنفذ على كل عنصر لتحديث المجمع (Accumulator)', descriptionEn: 'Function executed on every element to update accumulator' },
      { name: 'initialValue', type: 'any', description: 'القيمة الابتدائية التي يبدأ بها المجمع التراكمي', descriptionEn: 'Initial value for the accumulator' }
    ],
    returnValue: { type: 'any', description: 'القيمة النهائية المتراكمة الناتجة عن المعالجة', descriptionEn: 'The single final accumulated value' },
    whatItDoes: 'تختزل عناصر مصفوفة كاملة إلى قيمة واحدة مفردة (مثل مجموع، كائن مصنف، أو خريطة بيانات).',
    whatItDoesEn: 'Reduces all elements of an array into a single accumulated value (sum, object index, map, etc.).',
    deepExplanation: 'تعتبر reduce أقوى دالة وظيفية في جافاسكريبت؛ حيث يمكن من خلالها محاكاة دوال map و filter معاً في دورة تكرار واحدة O(N)، مما يوفر استهلاك الذاكرة.',
    deepExplanationEn: 'The fundamental functional aggregator in JavaScript; can implement map and filter concurrently in a single O(N) traversal.',
    codeExample: `// تجميع وإحصاء هجمات الأمان حسب النوع
const securityAlerts = [
  { type: 'SQLi', ip: '1.2.3.4' },
  { type: 'XSS', ip: '5.6.7.8' },
  { type: 'SQLi', ip: '9.1.2.3' }
];

const counts = securityAlerts.reduce((acc, alert) => {
  acc[alert.type] = (acc[alert.type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log(counts); // { SQLi: 2, XSS: 1 }`,
    lineBreakdown: [
      { line: 'const securityAlerts = [...]', commentAr: 'تعريف مصفوفة تحتوي سجلات تنبيهات الأمان بنوع كل هجمة وعنوان IP.', commentEn: 'Defines an array of security alert objects containing type and IP.' },
      { line: 'const counts = securityAlerts.reduce((acc, alert) => {', commentAr: 'بدء عملية الاختزال مع تمرير المجمع acc والعنصر الحالي alert.', commentEn: 'Initiates reduce with accumulator object and current alert.' },
      { line: '  acc[alert.type] = (acc[alert.type] || 0) + 1;', commentAr: 'زيادة عداد نوع الهجمة بمقدار 1 أو البدء من الصفر إذا كانت جديدة.', commentEn: 'Increments alert type count, defaulting to zero if undefined.' },
      { line: '  return acc;', commentAr: 'إرجاع كائن المجمع المحدث للدورة التكرارية التالية.', commentEn: 'Returns mutated accumulator for the next loop iteration.' },
      { line: '}, {} as Record<string, number>);', commentAr: 'تحديد كائن فارغ {} كقيمة ابتدائية للمجمع لتفادي أخطاء المصفوفات الفارغة.', commentEn: 'Supplies an empty object as initial value to prevent empty array runtime crashes.' }
    ],
    securityTip: 'حدد دائماً القيمة الابتدائية initialValue؛ لأن استدعاء reduce على مصفوفة فارغة بدون قيمة ابتدائية سيتسبب في انهيار البرنامج بـ TypeError.',
    securityTipEn: 'Always provide an explicit initialValue; executing reduce on an empty array without initialValue throws a TypeError.',
    commonMistake: 'نسيان عبارة return acc داخل دالة callback، مما يجعل المجمع undefined في الدورات التالية.',
    commonMistakeEn: 'Forgetting to return the accumulator inside the reducer callback, yielding undefined.'
  },

  // 6. JAVASCRIPT: crypto.getRandomValues()
  {
    id: 'js-fn-crypto-random',
    name: 'crypto.getRandomValues(typedArray)',
    language: 'JavaScript / TypeScript',
    languageId: 'javascript',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    categoryLabelEn: 'Cryptography & Security',
    syntax: 'window.crypto.getRandomValues(new Uint8Array(length))',
    parameters: [
      { name: 'typedArray', type: 'TypedArray', description: 'مصفوفة بايتات رقمية لملئها بقيم عشوائية مشفرة', descriptionEn: 'TypedArray (e.g. Uint8Array) to populate with cryptographic bytes' }
    ],
    returnValue: { type: 'TypedArray', description: 'نفس المصفوفة الممررة بعد تعبئتها بالعشوائية', descriptionEn: 'The same typed array populated with cryptographically random bytes' },
    whatItDoes: 'تولد بايتات عشوائية تشفيرية عالية النزاهة في المتصفح وبيئات Node.js لمنع هجمات التنبؤ.',
    whatItDoesEn: 'Fills a typed array with cryptographically strong pseudorandom values directly from hardware entropy.',
    deepExplanation: 'تستقي العشوائية من مولدات الأمان في النواة وليس خوارزمية Math.random الضعيفة، وتستخدم لتوليد Nonces ومفاتيح تشفير AES ومُعرفات UUIDv4 الآمنة.',
    deepExplanationEn: 'Hardware entropy powered alternative to Math.random. Imperative for session IDs, nonces, and symmetric keys.',
    codeExample: `// توليد توكن مصادقة آمن 16 بايت في المتصفح
const buffer = new Uint8Array(16);
window.crypto.getRandomValues(buffer);

const hexToken = Array.from(buffer)
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');

console.log("Secure Token:", hexToken);`,
    lineBreakdown: [
      { line: 'const buffer = new Uint8Array(16);', commentAr: 'إنشاء مصفوفة بايتات غير سالبة بطول 16 بايت (128-bit).', commentEn: 'Allocates a 16-byte (128-bit) unsigned integer typed array.' },
      { line: 'window.crypto.getRandomValues(buffer);', commentAr: 'تعبئة المصفوفة بأرقام عشوائية تشفيرية من مولد الأمان بالنظام.', commentEn: 'Populates buffer with cryptographic entropy from the OS CSPRNG.' },
      { line: 'const hexToken = Array.from(buffer).map(...).join("");', commentAr: 'تحويل البايتات إلى سلسلة نصوص بالنظام الست عشري المنظم.', commentEn: 'Converts byte values to formatted 2-character hexadecimal representation.' }
    ],
    securityTip: 'لا تستخدم Math.random() مطلقاً في أي سيناريو أمني أو توليد توكنات؛ استخدم دائماً crypto.getRandomValues().',
    securityTipEn: 'Never use Math.random() for security tokens, passwords, or crypto nonces; use crypto.getRandomValues().',
    commonMistake: 'تمرير مصفوفة JavaScript عادية [] بدلاً من TypedArray (مثل Uint8Array)، مما ينتج TypeMismatchError.',
    commonMistakeEn: 'Passing standard JavaScript Array instead of a typed array, triggering a TypeMismatchError.'
  },

  // 7. BASH: set -euo pipefail
  {
    id: 'bash-fn-strict',
    name: 'set -euo pipefail',
    language: 'Bash & Shell',
    languageId: 'bash',
    category: 'built_in',
    categoryLabel: 'التحكم وحماية السكربتات',
    categoryLabelEn: 'Control & Script Hardening',
    syntax: 'set -euo pipefail',
    parameters: [
      { name: '-e', type: 'flag', description: 'إيقاف السكربت فور فشل أي أمر', descriptionEn: 'Exit immediately if any command returns non-zero' },
      { name: '-u', type: 'flag', description: 'اعتبار المتغيرات غير المعرفة خطأ قاتلاً', descriptionEn: 'Treat unset variables as error and exit' },
      { name: '-o pipefail', type: 'flag', description: 'إيقاف السكربت إذا فشل أي طرف في سلسلة الأنابيب', descriptionEn: 'Pipeline returns exit code of first failing command' }
    ],
    returnValue: { type: 'shell state', description: 'تغيير سلوك قشرة باش للوضع الآمن الصارم', descriptionEn: 'Configures strict defense execution mode for the shell' },
    whatItDoes: 'التعويذة الأساسية لحماية سكربتات باش؛ تمنع استمرار تنفيذ السكربت عند حدوث أخطاء أو استخدام متغيرات غير معينة.',
    whatItDoesEn: 'The definitive defense header for Bash scripts; halts execution on unexpected errors or undefined variables.',
    deepExplanation: 'بدون هذا السطر، إذا فشل أمر مثل rm -rf "$DIR/*" وكان متغير $DIR فارغاً لخطأ مطبعي، سيتحول الأمر إلى rm -rf "/*" ويمسح كامل نظام التشغيل!',
    deepExplanationEn: 'Without this, an unset variable in rm -rf "$PATH_VAR/*" expands to root directory deletion. This directive stops that instantly.',
    codeExample: `#!/usr/bin/env bash
# تفعيل الوضع الصارم الدفاعي
set -euo pipefail

BACKUP_DIR="/var/backups"
echo "Starting safe backup to $BACKUP_DIR"

# لو كان المتغير غير معرف هنا سيتوقف السكربت فوراً قبل أي كارثة
tar -czf "$BACKUP_DIR/data.tar.gz" /etc/nginx 2>/dev/null`,
    lineBreakdown: [
      { line: '#!/usr/bin/env bash', commentAr: 'سطر Shebang لتحديد مفسر باش المتوافق مع كافة التوزيعات.', commentEn: 'Portable shebang identifying Bash interpreter.' },
      { line: 'set -euo pipefail', commentAr: 'تفعيل إيقاف السكربت عند الأخطاء، ومنع المتغيرات غير المعرفة، والتحقق من الأنابيب.', commentEn: 'Enables strict exit-on-error, undefined variable check, and pipe failure propagation.' },
      { line: 'BACKUP_DIR="/var/backups"', commentAr: 'تعريف مسار الحفظ الآمن داخل متغير.', commentEn: 'Defines target destination path string.' },
      { line: 'tar -czf "$BACKUP_DIR/data.tar.gz" ...', commentAr: 'أرشفة المجلد مع ضمان وضع المتغيرات بين اقتباسات مزدوجة لمنع التلاعب.', commentEn: 'Executes compression with double-quoted path preventing word splitting.' }
    ],
    securityTip: 'اجعل `set -euo pipefail` السطر الأول في كل سكربت باش تكتبه على الإطلاق.',
    securityTipEn: 'Place `set -euo pipefail` at the very top of every production Bash script.',
    commonMistake: 'عدم توفير قيمة افتراضية لمتغير اختياري مثل ${VAR:-default} مما يؤدي لإيقاف السكربت بسبب علم -u.',
    commonMistakeEn: 'Not providing fallback syntax for optional variables like ${VAR:-fallback}, causing premature exits.'
  },

  // 8. GO: subtle.ConstantTimeCompare
  {
    id: 'go-fn-constant-time',
    name: 'subtle.ConstantTimeCompare(x, y []byte)',
    language: 'Go (Golang)',
    languageId: 'golang',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    categoryLabelEn: 'Cryptography & Security',
    syntax: 'subtle.ConstantTimeCompare(hashA, hashB) == 1',
    parameters: [
      { name: 'x', type: '[]byte', description: 'البايتات التشفيرية الأولى للمقارنة', descriptionEn: 'First byte slice to compare' },
      { name: 'y', type: '[]byte', description: 'البايتات التشفيرية الثانية للمقارنة', descriptionEn: 'Second byte slice to compare' }
    ],
    returnValue: { type: 'int', description: 'يرجع 1 إذا كانت القيمتان متطابقتين تماماً، و 0 خلاف ذلك', descriptionEn: 'Returns 1 if slices have identical contents and length; 0 otherwise' },
    whatItDoes: 'تقارن سلسلتين مشفرتين في زمن زمني ثابت O(1) لمنع هجمات التحليل الزمني (Timing Attacks).',
    whatItDoesEn: 'Compares cryptographic tokens and hashes in constant time to eliminate side-channel timing attack vulnerabilities.',
    deepExplanation: 'عامل المقارنة العادي == يتوقف فور اكتشاف أول بايت غير متطابق. يستغل المهاجم فرق النانو ثانية لمعرفة الحروف الصحيحة تدريجياً. هذه الدالة تفحص كافة البايتات دوماً في نفس الزمن بدقة.',
    deepExplanationEn: 'Standard string equality returns early on first mismatch. Attackers measure timing differences to forge valid tokens. Constant-time checks always inspect every byte.',
    codeExample: `package main

import (
	"crypto/subtle"
	"fmt"
)

func verifyApiSignature(expected, received []byte) bool {
	// مقارنة زمنية ثابتة تمنع هجمات Timing Attack
	return subtle.ConstantTimeCompare(expected, received) == 1
}

func main() {
	keyA := []byte("secret_api_token_hash_a")
	keyB := []byte("secret_api_token_hash_a")
	isValid := verifyApiSignature(keyA, keyB)
	fmt.Println("Is Signature Valid:", isValid)
}`,
    lineBreakdown: [
      { line: 'import "crypto/subtle"', commentAr: 'استيراد حزمة العمليات التشفيرية الدقيقة والآمنة زمنياً.', commentEn: 'Imports Go cryptographic subtle constant-time utilities.' },
      { line: 'func verifyApiSignature(expected, received []byte) bool', commentAr: 'دالة فحص توقيع الطلبات واستقبال مصفوفتي بايتات.', commentEn: 'Declares signature verification taking two byte slices.' },
      { line: 'return subtle.ConstantTimeCompare(expected, received) == 1', commentAr: 'المقارنة في وقت ثابت دون إنهاء مبكر، وإرجاع true عند التطابق الكامل.', commentEn: 'Executes constant-time comparison, returning boolean match.' }
    ],
    securityTip: 'استخدم دائماً دوال المقارنة ذات الوقت الثابت عند التحقق من توكنات API ورموز HMAC وكلمات المرور.',
    securityTipEn: 'Always use constant-time comparison when verifying API keys, HMAC signatures, and auth tokens.',
    commonMistake: 'مقارنة نصوص الهاش باستخدام عامل == العادي في مسارات التوثيق الحساسة.',
    commonMistakeEn: 'Comparing hashes or signatures using plain == in authentication endpoints.'
  },

  // 9. RUST: match on Result<T, E>
  {
    id: 'rs-fn-match',
    name: 'match result { Ok(val) => ..., Err(e) => ... }',
    language: 'Rust',
    languageId: 'rust',
    category: 'built_in',
    categoryLabel: 'التحكم ومطابقة الأنماط',
    categoryLabelEn: 'Pattern Matching & Control',
    syntax: 'match operation_result { Ok(v) => v, Err(err) => handle_error(err) }',
    parameters: [
      { name: 'expression', type: 'Result / Option / Enum', description: 'التعبير المراد مطابقة كافة حالاته الممكنة', descriptionEn: 'The enum, Result, or Option expression to evaluate' }
    ],
    returnValue: { type: 'any', description: 'قيمة الذراع المطابق الناتج عن الفحص', descriptionEn: 'The evaluated expression of the matching pattern branch' },
    whatItDoes: 'بناء تحكم شامل يجبر المطور في مرحلة الترجمة على معالجة كل حالات النجاح والفشل الممكنة دون إهمال أي سيناريو.',
    whatItDoesEn: 'Exhaustive pattern matching construct forcing developers to handle all success and failure branches at compile time.',
    deepExplanation: 'في Rust لا يوجد مفهوم Null Pointer Exception. دوال النظام ترجع كائن Result يحتوي إما على Ok وإما على Err. والمترجم يرفض بناء البرنامج إذا أهملت معالجة أي حالة.',
    deepExplanationEn: 'Eliminates null pointer exceptions completely. Rust compiler rejects code that does not account for all potential variants.',
    codeExample: `use std::fs::File;

fn open_security_config(filepath: &str) {
    match File::open(filepath) {
        Ok(file) => println!("Config file opened successfully: {:?}", file),
        Err(err) => eprintln!("SECURITY ALERT: Failed to open file: {}", err),
    }
}`,
    lineBreakdown: [
      { line: 'use std::fs::File;', commentAr: 'استيراد بنية التعامل مع الملفات من مكتبة رست القياسية.', commentEn: 'Imports standard library File struct.' },
      { line: 'fn open_security_config(filepath: &str)', commentAr: 'تعريف دالة تقبل مسار الملف كمرجع نصي مقترض &str.', commentEn: 'Defines function taking a borrowed string slice path.' },
      { line: 'match File::open(filepath) {', commentAr: 'فتح الملف ومطابقة كائن النتيجة Result المرجع.', commentEn: 'Attempts file opening and begins pattern matching on Result.' },
      { line: '    Ok(file) => println!("Config file opened successfully: {:?}", file),', commentAr: 'معالجة حالة النجاح Ok واستلام مقبض الملف بأمان.', commentEn: 'Handles Ok variant safely accessing the file handle.' },
      { line: '    Err(err) => eprintln!("SECURITY ALERT: Failed to open file: {}", err),', commentAr: 'معالجة حالة الخطأ Err وطباعتها على مسار الأخطاء القياسي لمنع الانهيار.', commentEn: 'Handles Err variant gracefully without panic crash.' }
    ],
    securityTip: 'تجنب استخدام .unwrap() في كود الإنتاج لأنها تسبب انهياراً كاملاً للبرنامج (Panic) عند حدوث خطأ؛ استخدم match أو unwrap_or_else.',
    securityTipEn: 'Avoid using .unwrap() in production code; use match or unwrap_or_else to avoid panic crashes.',
    commonMistake: 'نسيان تغطية كافة الحالات المحتملة، مما يؤدي لرفض المترجم للكود بخطأ non-exhaustive patterns.',
    commonMistakeEn: 'Missing a case variant, causing the Rust compiler to reject the build with a non-exhaustive patterns error.'
  },

  // 10. SQL: PREPARE & Parameterized Queries
  {
    id: 'sql-fn-prepared',
    name: 'PREPARE stmt FROM query / Parameterized Query',
    language: 'SQL',
    languageId: 'sql',
    category: 'database',
    categoryLabel: 'قواعد البيانات',
    categoryLabelEn: 'Database Security',
    syntax: 'SELECT * FROM users WHERE username = $1 AND role = $2;',
    parameters: [
      { name: '$1, $2 (أو ?)', type: 'placeholders', description: 'علامات حجز مكان المعاملات المنفصلة عن بنية الاستعلام', descriptionEn: 'Placeholders separating data values from SQL query structure' }
    ],
    returnValue: { type: 'recordset', description: 'سجلات النتائج الآمنة بنسبة 100% ضد الحقن', descriptionEn: 'Sanitized query result set guaranteed immune to injection' },
    whatItDoes: 'تمنع ثغرات حقن قواعد البيانات SQL Injection نهائياً عن طريق فصل كود الاستعلام عن بيانات المستخدم.',
    whatItDoesEn: 'Completely neutralizes SQL Injection by pre-compiling the query structure separately from user-provided values.',
    deepExplanation: 'يقوم محرك قاعدة البيانات بترجمة وهيكلة الاستعلام مسبقاً في الذاكرة كشجرة تنفيذ. عندما تصل مدخلات المستخدم، تعامل كقيم بيانات نقية (Literal Data) حتى لو احتوت على عبارات مثل OR 1=1.',
    deepExplanationEn: 'The database compiles the query syntax tree beforehand; incoming parameters are strictly treated as data literals rather than executable SQL clauses.',
    codeExample: `-- استعلام معلمي آمن تماماً (Parameterized Query)
-- في PostgreSQL / Python / Node.js
PREPARE get_user_by_role (text, text) AS
    SELECT id, username, email, created_at
    FROM system_users
    WHERE username = $1 AND status = $2;

EXECUTE get_user_by_role('admin', 'ACTIVE');`,
    lineBreakdown: [
      { line: 'PREPARE get_user_by_role (text, text) AS', commentAr: 'تجهيز وبناء الاستعلام في محرك قاعدة البيانات وتحديد أنواع المدخلات.', commentEn: 'Pre-compiles query structure in database specifying strict parameter types.' },
      { line: '    SELECT id, username, email, created_at FROM system_users', commentAr: 'تحديد الحقول المطلوبة بدقة وتجنب استعلامات SELECT * غير المنضبطة.', commentEn: 'Selects specific fields avoiding unbounded SELECT * resource overhead.' },
      { line: '    WHERE username = $1 AND status = $2;', commentAr: 'استخدام المعاملات $1 و $2 كبيانات نقية تفصل بين الشفرة والمدخلات.', commentEn: 'Binds parameters ($1, $2) strictly as literals eliminating SQL injection.' },
      { line: 'EXECUTE get_user_by_role("admin", "ACTIVE");', commentAr: 'تنفيذ الاستعلام بتمرير القيم الفعلية بأمان تام.', commentEn: 'Executes prepared plan with validated user arguments.' }
    ],
    securityTip: 'لا تدمج أبداً متغيرات بايثون أو جافاسكريبت داخل نص SQL بواسطة علامة + أو f-strings أو Template literals.',
    securityTipEn: 'Never concatenate strings or format templates into SQL commands; parameterize all variable bindings.',
    commonMistake: 'استبدال المعاملات بتعقيم يدوي للنصوص (Sanitization) عبر استبدال الفواصل؛ المهاجمون يجدون دائماً ثغرات في الفلاتر اليدوية.',
    commonMistakeEn: 'Relying on custom regex or string-replace filters instead of native database parameterized queries.'
  },

  // 11. JAVASCRIPT / TYPESCRIPT: fetch() & API Calling
  {
    id: 'js-fn-fetch',
    name: 'fetch(url, [options])',
    language: 'JavaScript',
    languageId: 'javascript',
    category: 'network',
    categoryLabel: 'الشبكات والـ APIs',
    categoryLabelEn: 'Network & APIs',
    syntax: 'const response = await fetch(url, { method, headers, body, signal });',
    parameters: [
      { name: 'url', type: 'string | URL', description: 'رابط واجهة برمجة التطبيقات (API Endpoint) المستهدف', descriptionEn: 'Target resource URL or endpoint string' },
      { name: 'options', type: 'RequestInit (اختياري)', description: 'إعدادات الطلب: method (GET/POST), headers, body, timeout signal', descriptionEn: 'Configuration object: method, headers, payload body, AbortSignal' }
    ],
    returnValue: { type: 'Promise<Response>', description: 'وعد برمجياً يُحل بكائن الاستجابة Response لفحص الحالة واستخراج البيانات', descriptionEn: 'Promise resolving to Response object containing status, headers, and body methods' },
    whatItDoes: 'إرسال واستقبال طلبات HTTP و REST APIs عبر الشبكة بشكل غير متزامن (Asynchronous) من المتصفح أو خادم Node.js.',
    whatItDoesEn: 'Asynchronously fetches HTTP and REST resources across networks in modern browsers and Node.js runtimes.',
    deepExplanation: 'تعتمد على معمارية Promises. لا ترفض الوعد (Reject) عند حدوث أخطاء HTTP كـ 404 أو 500؛ بل يجب دائماً فحص الخاصية response.ok للتأكد من نجاح الطلب، واستخدام AbortController لتحديد مهلة زمنية (Timeout) تمنع تعليق التطبيق.',
    deepExplanationEn: 'Built on Promises. Fetch only rejects on network failures, not on HTTP 4xx/5xx errors; you must explicitly check response.ok and use AbortSignal for timeouts.',
    codeExample: `// استدعاء API ومعرفة تفاصيل الشبكة مع مهلة زمنية 5 ثوانٍ
async function getNetworkInfo() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const url = new URL("https://ipinfo.io/json");
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { "Accept": "application/json" },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(\`HTTP Error: \${res.status}\`);
    const data = await res.json();
    return { ip: data.ip, city: data.city, org: data.org };
  } catch (error) {
    console.error("Network Fetch Failed:", error.message);
    throw error;
  }
}`,
    lineBreakdown: [
      { line: 'const controller = new AbortController();', commentAr: 'إنشاء كائن للتحكم في إلغاء الطلب في حال تأخر الخادم عن الرد.', commentEn: 'Instantiates AbortController to cancel hanging requests.' },
      { line: 'const timeoutId = setTimeout(() => controller.abort(), 5000);', commentAr: 'تحديد مهلة زمنية قصوى 5 ثوانٍ تفادياً لتعليق واجهة المستخدم.', commentEn: 'Sets a strict 5000ms timeout threshold.' },
      { line: 'const res = await fetch(url.toString(), { ... signal: controller.signal });', commentAr: 'إرسال طلب HTTP GET مع ترويسة قبول JSON وربطه بإشارة الإلغاء.', commentEn: 'Dispatches HTTP request binding signal to timeout abort controller.' },
      { line: 'if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);', commentAr: 'فحص حالة الاستجابة صراحةً للتأكد من عدم وجود خطأ 4xx أو 5xx.', commentEn: 'Explicitly validates HTTP response status code.' },
      { line: 'const data = await res.json();', commentAr: 'تحويل نص الاستجابة إلى كائن جافاسكريبت نقي.', commentEn: 'Parses and returns the JSON payload body.' }
    ],
    securityTip: 'حدد دائماً مهلة زمنية (Timeout via AbortSignal) لأي استدعاء شبكي لتفادي هجمات حجب الخدمة الناتجة عن استهلاك المقابس المفتوحة (Socket Exhaustion).',
    securityTipEn: 'Always attach an AbortSignal timeout to prevent socket exhaustion and application freeze.',
    commonMistake: 'افتراض أن fetch يرمي خطأ عند إرجاع كود 404 أو 500؛ الدالة تعتبر ذلك استجابة ناجحة ويجب فحص res.ok يدوياً.',
    commonMistakeEn: 'Assuming fetch throws on 404/500 HTTP errors; it only rejects on DNS or total network drops.'
  },

  // 12. PYTHON: requests.get()
  {
    id: 'py-fn-requests',
    name: 'requests.get(url, params=None, headers=None, timeout=None)',
    language: 'Python',
    languageId: 'python',
    category: 'network',
    categoryLabel: 'الشبكات والـ APIs',
    categoryLabelEn: 'Network & APIs',
    syntax: 'response = requests.get(url, params=query_dict, headers=headers_dict, timeout=5)',
    parameters: [
      { name: 'url', type: 'str', description: 'رابط الـ API المراد استدعاؤه', descriptionEn: 'Target API endpoint URL' },
      { name: 'params', type: 'dict (اختياري)', description: 'معاملات الاستعلام (Query Parameters) تدمج تلقائياً بالرابط بعد تشفيرها', descriptionEn: 'Dictionary of query parameters automatically URL-encoded' },
      { name: 'headers', type: 'dict (اختياري)', description: 'ترويسات الطلب مثل التوثيق و User-Agent و Content-Type', descriptionEn: 'Custom HTTP request headers' },
      { name: 'timeout', type: 'float / tuple', description: 'أقصى مدة للاتصال واستلام البيانات بالثواني', descriptionEn: 'Connection and read timeout in seconds' }
    ],
    returnValue: { type: 'requests.Response', description: 'كائن استجابة يحتوي على status_code و json() و text و headers', descriptionEn: 'Response object providing status code, parsed json(), headers, and raw text' },
    whatItDoes: 'استدعاء روابط الويب وواجهات برمجة التطبيقات (APIs) في بايثون بسهولة فائقة وأمان عالي.',
    whatItDoesEn: 'Sends an HTTP GET request to a specified URL, abstracting socket connection and query encoding.',
    deepExplanation: 'تعتبر المكتبة الأكثر استخداماً في العالم لاستدعاء APIs في بايثون. تتولى تشفير المعاملات تلقائياً لمنع حقن الروابط (URL Injection)، وتحافظ على اتصالات Keep-Alive لتسريع الطلبات المتكررة.',
    deepExplanationEn: 'The gold standard for HTTP in Python. Automatically handles connection pooling, URL escaping, and stream chunking.',
    codeExample: `# كود جلب تفاصيل الـ IP وبناء الرابط مع المعاملات بأمان
import requests

def fetch_network_api(token=None):
    url = "https://ipinfo.io/json"
    params = {}
    if token:
        params["token"] = token

    headers = {
        "User-Agent": "CyberToolkit/2.0",
        "Accept": "application/json"
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=(3.05, 10))
        response.raise_for_status()  # يرمي استثناء إذا كان الكود 4xx أو 5xx
        return response.json()
    except requests.exceptions.RequestException as err:
        print(f"Network API Error: {err}")
        return None`,
    lineBreakdown: [
      { line: 'url = "https://ipinfo.io/json"', commentAr: 'تحديد مسار واجهة برمجة التطبيقات للشبكة.', commentEn: 'Specifies the base network API endpoint.' },
      { line: 'params = {} ... if token: params["token"] = token', commentAr: 'بناء معالمات الرابط (Query Params) في قاموس لتتولى المكتبة تشفيرها بأمان.', commentEn: 'Assembles query parameters dict for automatic safe URL encoding.' },
      { line: 'response = requests.get(..., timeout=(3.05, 10))', commentAr: 'تحديد مهلة 3.05 ثانية للاتصال و 10 ثوانٍ لقراءة البيانات لتفادي التعليق.', commentEn: 'Sets explicit connection and read timeouts.' },
      { line: 'response.raise_for_status()', commentAr: 'التحقق التلقائي من كود الاستجابة ورمي خطأ فوري إذا فشل الخادم.', commentEn: 'Throws an HTTPError exception if response code indicates failure.' }
    ],
    securityTip: 'لا تستدعِ أبداً requests.get بدون معامل timeout صريح؛ فالافتراضي هو الانتظار اللانهائي مما قد يوقف تطبيقك بالكامل!',
    securityTipEn: 'Never omit the timeout argument; requests defaults to waiting indefinitely if a server hangs.',
    commonMistake: 'دمج معاملات الرابط يدوياً مثل url + "?key=" + key بدلاً من استخدام params={...}؛ مما يسبب ثغرات وتلف الروابط عند وجود رموز خاصة.',
    commonMistakeEn: 'Concatenating URL strings manually instead of passing a dictionary to params.'
  },

  // 13. JAVASCRIPT: URL & URLSearchParams
  {
    id: 'js-fn-urlsearchparams',
    name: 'new URLSearchParams([init])',
    language: 'JavaScript',
    languageId: 'javascript',
    category: 'network',
    categoryLabel: 'الشبكات والـ APIs',
    categoryLabelEn: 'Network & APIs',
    syntax: 'const params = new URLSearchParams({ search: "query", page: "1" });',
    parameters: [
      { name: 'init', type: 'object | string | array', description: 'كائن يحتوي على مفاتيح وقيم المعاملات المراد دمجها بالرابط', descriptionEn: 'Object, query string, or key-value pairs array' }
    ],
    returnValue: { type: 'URLSearchParams', description: 'كائن يتيح إضافة وقراءة وتشفير معاملات الروابط تلقائياً', descriptionEn: 'Instance providing get, set, append, and toString methods' },
    whatItDoes: 'بناء روابط الـ APIs ومعاملاتها وتشفير النصوص الحساسة والفراغات والرموز العربية تلقائياً وفق معايير W3C.',
    whatItDoesEn: 'Constructs, parses, and safely encodes URL query parameters preventing parameter injection.',
    deepExplanation: 'تحل المشكلة الشائعة للأخطاء الأمنية في تكوين الروابط. تقوم الدالة بتطبيق Percent-Encoding لعلامات مثل المسافات، علامات & و =، والرموز الخاصة، مما يمنع ثغرات تلاعب المعاملات (Parameter Pollution).',
    deepExplanationEn: 'Applies rigorous standard percent-encoding on all query keys and values, mitigating HTTP parameter pollution attacks.',
    codeExample: `// دالة بناء رابط API آمن مع المعاملات
function buildApiEndpoint(baseUrl, queryParams) {
  const url = new URL(baseUrl);
  const searchParams = new URLSearchParams(queryParams);
  url.search = searchParams.toString();
  return url.toString();
}

// تجربة البناء:
const endpoint = buildApiEndpoint("https://api.example.com/search", {
  q: "أمن سيبراني",
  limit: 20,
  filter: "active & verified"
});
console.log(endpoint);`,
    lineBreakdown: [
      { line: 'const url = new URL(baseUrl);', commentAr: 'إنشاء كائن URL للتحقق من صحة بروتوكول ونطاق الرابط.', commentEn: 'Parses base URL ensuring valid protocol and hostname.' },
      { line: 'const searchParams = new URLSearchParams(queryParams);', commentAr: 'تمرير كائن المعاملات وتشفير الرموز الخاصة تلقائياً.', commentEn: 'Encodes query parameters safely handling special symbols and unicode.' },
      { line: 'url.search = searchParams.toString();', commentAr: 'دمج المعاملات المشفرة مع الرابط الأصلي بعد علامة الاستفهام ?.', commentEn: 'Attaches formatted query string to base URL.' }
    ],
    securityTip: 'استخدم دائماً URLSearchParams لبناء الروابط بدلاً من الدمج النصي لتفادي ثغرات حقن المعاملات والمسارات.',
    securityTipEn: 'Always use URLSearchParams over manual string concatenation to avoid query parameter manipulation.',
    commonMistake: 'كتابة علامة ? يدوياً قبل searchParams.toString() عند استخدام url.search؛ كائن URL يضيف علامة الاستفهام تلقائياً.',
    commonMistakeEn: 'Adding a manual question mark prefix when assigning to url.search.'
  }
];
