export interface FunctionDetail {
  id: string;
  name: string;
  language: string;
  languageId: string;
  category: 'strings' | 'arrays_lists' | 'files_io' | 'crypto_security' | 'concurrency' | 'built_in' | 'network' | 'database';
  categoryLabel: string;
  syntax: string;
  parameters: { name: string; type: string; description: string }[];
  returnValue: { type: string; description: string };
  whatItDoes: string;
  deepExplanation: string;
  codeExample: string;
  securityTip: string;
  commonMistake?: string;
}

export interface LanguageInfo {
  id: string;
  name: string;
  nameAr: string;
  badge: string;
  iconName: string;
  color: string;
  borderColor: string;
  bgColor: string;
  paradigm: string;
  typing: string;
  execution: string;
  overview: string;
  strengths: string[];
  bestUseCases: string[];
  securityFocus: string;
  fileExtension: string;
}

export const languagesList: LanguageInfo[] = [
  {
    id: 'python',
    name: 'Python',
    nameAr: 'بايثون',
    badge: 'الأكثر شعبية في الذكاء الاصطناعي والأمن',
    iconName: 'Code2',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/20',
    paradigm: 'متعددة الأنماط (كائنية التوجه OOP، إجرائية، وظيفية)',
    typing: 'ديناميكية وقوية (Dynamic & Strongly Typed)',
    execution: 'مفسرة عبر CPython مع Bytecode إلى Virtual Machine',
    overview: 'لغة عالية المستوى تشتهر ببساطتها الفائقة وقابليتها العالية للقراءة. هي الخيار الأول عالمياً في مجالات الذكاء الاصطناعي، علم البيانات، الأتمتة، وأمن المعلومات والدفاع السيبراني بفضل مكتباتها الضخمة.',
    strengths: [
      'صياغة نظيفة ومقروءة تشبه اللغة الإنجليزية الطبيعية',
      'منظومة مكتبات عملاقة (PyPI) تغطي التشفير، الشبكات، وتعلم الآلة',
      'سرعة فائقة في بناء النماذج الأولية والأتمتة السريعة'
    ],
    bestUseCases: [
      'برمجة أدوات الحماية والتحليل الجنائي الرقمي (Forensics)',
      'الذكاء الاصطناعي وتطبيقات نماذج اللغة الكبيرة (LLMs)',
      'تطوير الواجهات الخلفية للويب (FastAPI, Django, Flask)'
    ],
    securityFocus: 'تجنب دوال التنفيذ المباشر (مثل eval و exec)، واستخدام secrets بدلاً من random للأرقام السرية، والتعامل الآمن مع فك تسلسل البيانات (pickle).',
    fileExtension: '.py'
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    nameAr: 'جافاسكريبت وتيب سكريبت',
    badge: 'لغة الويب والخوادم الشاملة',
    iconName: 'Braces',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/40',
    bgColor: 'bg-yellow-950/20',
    paradigm: 'مبنية على النماذج الأولية (Prototypes)، وظيفية، غير متزامنة (Event-Driven)',
    typing: 'JS ديناميكية ضعيفة | TS تمنح كتابة نوعية صارمة (Static Typing)',
    execution: 'محركات JIT عالية السرعة (مثل Google V8, SpiderMonkey)',
    overview: 'عماد شبكة الإنترنت في جانب العميل (المتصفحات) والخادم عبر بيئات تشغيل مثل Node.js و Bun. تتيح TypeScript الأمان النوعي المسبق قبل التشغيل لمنع الأخطاء البرمجية الشائعة.',
    strengths: [
      'تعمل في كل متصفح على كوكب الأرض بدون أي تثبيت إضافي',
      'معمارية الحدث غير المتزامنة (Event Loop) قادرة على تحمل آلاف الاتصالات المتزامنة',
      'اكتمال المنظومة الكاملة للواجهة والخادم بلغة واحدة عبر npm'
    ],
    bestUseCases: [
      'تطبيقات الويب التفاعلية أحادية الصفحة (SPAs) باستخدام React و Vue',
      'واجهات برمجة التطبيقات السريعة ذات الـ I/O العالي عبر Node.js و Express',
      'تطبيقات الجوال والديسكتوب الهجينة (React Native, Electron)'
    ],
    securityFocus: 'تطهير مدخلات DOM لمنع ثغرات XSS، وتجنب Prototype Pollution، وحماية الـ JWT والـ Cookies باستخدام خاصية HttpOnly و SameSite.',
    fileExtension: '.js / .ts'
  },
  {
    id: 'bash',
    name: 'Bash / Shell',
    nameAr: 'باش / سكريبتات الشل',
    badge: 'لغة إدارة خوادم لينكس والطرفية',
    iconName: 'Terminal',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/20',
    paradigm: 'أوامر تسلسلية وإجرائية (Procedural / Command Language)',
    typing: 'غير مقيدة، كل شيء عبارة عن سلاسل نصية (Strings)',
    execution: 'مفسرة مباشرة بواسطة مفسر صدفة نظام التشغيل (GNU Bash)',
    overview: 'اللغة القياسية لإدارة أنظمة GNU/Linux و Unix وأنظمة السيرفرات وبيئة Termux. تربط بين برامج النظام المختلفة باستخدام تقنية الأنابيب (Pipes) وإعادة توجيه المسارات.',
    strengths: [
      'تحكم مباشر وسريع بنواة النظام، العمليات، الشبكة، ونظام الملفات',
      'إمكانية تشغيلها على أي سيرفر أو حاوية Docker بدون تنصيب أدوات إضافية',
      'ممتازة للأتمتة التكرارية وجدولة المهام الدورية (Cron Jobs)'
    ],
    bestUseCases: [
      'أتمتة إدارة الخوادم وعمليات النشر المتواصل (CI/CD Pipelines)',
      'النسخ الاحتياطي التلقائي المشفر وتدوير السجلات (Log Rotation)',
      'كتابة سكربتات التهيئة الأولية للحاويات والأنظمة'
    ],
    securityFocus: 'وضع المتغيرات داخل علامات تنصيص `"$var"` دائماً لمنع تقسيم الكلمات وحقن الأوامر (Command Injection)، واستخدام `set -euo pipefail` في بداية السكربت.',
    fileExtension: '.sh'
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    nameAr: 'جو (جولانج)',
    badge: 'بطل الأنظمة السحابية والشبكات',
    iconName: 'Cpu',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-950/20',
    paradigm: 'إجرائية كائنية مبسطة (Composition over Inheritance) وتزامنية قوية',
    typing: 'ساكنة وصارمة (Static & Strong Typing)',
    execution: 'مترجمة مباشرة إلى كود آلة ثنائي (Native Binary) بدون بيئة تشغيل ثقيلة',
    overview: 'لغة طورتها شركة Google بهدف الجمع بين سرعة تنفيذ C/C++ وسهولة صياغة بايثون. تتميز بنموذج تزامن ثوري مبني على خيوط خفيفة تسمى Goroutines وقنوات التواصل Channels.',
    strengths: [
      'توليد ملف تنفيذي ثنائي واحد مستقل تماماً (Single Standalone Binary)',
      'تزامن خفيف جداً يستهلك كيلوبايتات معدودة لكل خيط معالجة',
      'أوقات ترجمة وبناء فائقة السرعة وشفرة قياسية متجانسة'
    ],
    bestUseCases: [
      'البنية التحتية السحابية وأدوات الحاويات (Docker و Kubernetes مبرمجان بـ Go)',
      'الخدمات المصغرة (Microservices) ذات الضغط العالي والكمون المنخفض',
      'أدوات الأمن السيبراني الموزعة وفاحصات المنافذ السريعة'
    ],
    securityFocus: 'استخدام سياقات الإلغاء (context.Context) لمنع تسريب الموارد، وتجنب مشاكل سباق البيانات (Race Conditions) عبر فاحص `-race`.',
    fileExtension: '.go'
  },
  {
    id: 'rust',
    name: 'Rust',
    nameAr: 'رست',
    badge: 'أقصى درجات الأمان وحماية الذاكرة',
    iconName: 'Shield',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/40',
    bgColor: 'bg-orange-950/20',
    paradigm: 'وظيفية، إجرائية، متزامنة مع تجريدات بدون تكلفة (Zero-Cost Abstractions)',
    typing: 'ساكنة وصارمة جداً مع استنتاج تلقائي للأنواع (Type Inference)',
    execution: 'مترجمة بالكامل عبر LLVM إلى كود آلة عالي الكفاءة',
    overview: 'اللغة الرائدة في هندسة الأنظمة الحديثة. صممت للقضاء التام على ثغرات أمان الذاكرة (مثل Use-After-Free و Buffer Overflow) في مرحلة الترجمة دون الحاجة لجامع قمامة (Garbage Collector) بفضل نموذج الملكية (Ownership).',
    strengths: [
      'أمان ذاكرة مضمون في مرحلة الترجمة (Memory Safety Guaranteed)',
      'سرعة تنفيذ خام تضاهي وتتفوق على C و C++',
      'نظام حزم متميز وأدوات توثيق واختبار مدمجة (Cargo)'
    ],
    bestUseCases: [
      'تطوير أنظمة التشغيل والبرمجيات المضمنة (Embedded Systems)',
      'محركات الألعاب والمتصفحات وتطبيقات التشفير والعملات المشفرة',
      'تطوير محركات WebAssembly الفائقة للويب'
    ],
    securityFocus: 'تجنب استخدام كتل `unsafe` إلا عند الضرورة القصوى مع مراجعة دقيقة لتدقيق المؤشرات وضمان سلامة الحدود.',
    fileExtension: '.rs'
  },
  {
    id: 'cpp',
    name: 'C / C++',
    nameAr: 'سي وسي بلس بلس',
    badge: 'أساس الحوسبة وهندسة النواة',
    iconName: 'Binary',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-950/20',
    paradigm: 'إجرائية (C) / كائنية، عامة (Generics)، وعالية الأداء (C++)',
    typing: 'ساكنة (Static Typing) مع تحويلات مباشرة',
    execution: 'مترجمة ومحسنة لأقصى حد لمعماريات المعالجات المختلفة',
    overview: 'اللغات الأساسية التي بنيت عليها أنظمة التشغيل الحديثة (نواة لينكس، ويندوز، ماك)، محركات قواعد البيانات، والمترجمات. تمنح المبرمج تحكماً كاملاً بالعتاد وعناوين الذاكرة.',
    strengths: [
      'أقصى سرعة ممكنة وتحكم كامل بالعتاد والذاكرة العشوائية',
      'توافق هائل ومكتبات صناعية تراكمت على مدار عقود',
      'معيار الحوسبة الرسومية والألعاب ثلاثية الأبعاد وعلم الروبوتات'
    ],
    bestUseCases: [
      'تطوير أنوية الأنظمة (Kernels) وتعريفات العتاد (Drivers)',
      'محركات قواعد البيانات مثل MySQL و PostgreSQL',
      'التطبيقات ذات القيود الصارمة على الوقت والذاكرة'
    ],
    securityFocus: 'الحذر الشديد من طفح الذاكرة المؤقتة (Buffer Overflow)، واستخدام المؤشرات الذكية (smart pointers مثل `std::unique_ptr`) بدلاً من `malloc` و `free`.',
    fileExtension: '.c / .cpp'
  },
  {
    id: 'sql',
    name: 'SQL',
    nameAr: 'إس كيو إل',
    badge: 'لغة الاستعلام والبيانات العلائقية',
    iconName: 'Database',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-950/20',
    paradigm: 'تصريحية (Declarative): تحدد ما تريد وليس كيف تحضره',
    typing: 'ساكنة تعتمد على مخطط الجداول (Schema-based)',
    execution: 'تفسر وتحسن عبر محرك تحسين الاستعلامات (Query Planner & Optimizer)',
    overview: 'اللغة القياسية للتعامل مع قواعد البيانات العلائقية (PostgreSQL, MySQL, SQLite, Oracle). مسؤولة عن إدارة وحفظ والبحث في أصول البيانات وضمان تناسقها وقواعد المعاملات (ACID).',
    strengths: [
      'قدرات استعلام وتحليل إحصائي وربط متقدمة بين الجداول المعقدة',
      'ضمان سلامة وتناسق البيانات عبر المفاتيح والقيود (Constraints)',
      'معيار صناعي موحد تعتمده جميع الأنظمة والمؤسسات حول العالم'
    ],
    bestUseCases: [
      'إدارة الحسابات المالية وسجلات المعاملات التجارية',
      'بناء مستودعات البيانات وأنظمة التقارير والذكاء التجاري (BI)',
      'المخازن المركزية لبيانات تطبيقات الويب والخوادم'
    ],
    securityFocus: 'استخدام الاستعلامات ذات المعاملات (Parameterized Queries / Prepared Statements) حصراً للقضاء على ثغرات حقن SQL (SQL Injection).',
    fileExtension: '.sql'
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    nameAr: 'دوكر وهندسة الحاويات',
    badge: 'معيار عزل وتشغيل التطبيقات',
    iconName: 'Boxes',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/40',
    bgColor: 'bg-sky-950/20',
    paradigm: 'بيانات التهيئة والتشغيل كشفرة برمجية (Infrastructure as Code - IaC)',
    typing: 'بنية توجيهية طبقية (Layered Directives)',
    execution: 'عزل عبر مساحات أسماء لينكس (Namespaces) ومجموعات التحكم (cgroups)',
    overview: 'تقنية تعبئة وتغليف التطبيقات مع كافة مكتباتها وبيئتها داخل حاوية خفيفة ومعزولة تعمل في أي مكان بنفس النتيجة، مما يحل نهائياً معضلة "الكود يعمل في جهازي ولا يعمل على السيرفر".',
    strengths: [
      'عزل كامل للبيئة دون استهلاك موارد الأنظمة الافتراضية الكاملة (VMs)',
      'نشر فوري وسرعة إقلاع بالثواني وقابلية تكرار 100%',
      'سهولة ترحيل التطبيقات بين السحابات المختلفة (Multi-Cloud Portability)'
    ],
    bestUseCases: [
      'تغليف ونشر الخدمات المصغرة ومواقع الويب الحديثة',
      'إنشاء بيئات اختبار مطابقة للإنتاج بأمان',
      'تشغيل أدوات الحماية في بيئات رملية معزولة (Sandboxing)'
    ],
    securityFocus: 'عدم تشغيل الحاويات بصلاحية المستخدم الجذري (USER nonroot)، وفحص الحزم والاعتماديات من الثغرات، واستخدام صور أساسية مصغرة مثل Alpine أو Distroless.',
    fileExtension: 'Dockerfile'
  }
];

export const functionsEncyclopedia: FunctionDetail[] = [
  // PYTHON FUNCTIONS
  {
    id: 'py-fn-map',
    name: 'map(function, iterable, ...)',
    language: 'Python',
    languageId: 'python',
    category: 'arrays_lists',
    categoryLabel: 'القوائم والمصفوفات',
    syntax: 'map(function, iterable, ...)',
    parameters: [
      { name: 'function', type: 'callable', description: 'دالة يتم تطبيقها على كل عنصر في المجموعة' },
      { name: 'iterable', type: 'iterable', description: 'مجموعة قابلة للتكرار (مثل List أو Tuple أو Set)' }
    ],
    returnValue: { type: 'map object (iterator)', description: 'كائن متكرر مولد يمكن تحويله لقائمة عبر list()' },
    whatItDoes: 'تطبق الدالة المحددة على كل عنصر من عناصر المصفوفة أو المجموعة دون الحاجة لكتابة حلقة تكرار for صريحة.',
    deepExplanation: 'تعمل دالة map بتقنية التقييم الكسول (Lazy Evaluation)، مما يعني أنها لا تحسب النتائج دفعة واحدة وتستهلك الذاكرة، بل تنتج كل قيمة عند طلبها فقط في كل دورة تكرار، مما يجعلها فعالة جداً في معالجة البيانات الضخمة.',
    codeExample: `# تنظيف وتحويل عناوين IP إلى مصفوفة نصوص
raw_ips = ["  192.168.1.1  ", "10.0.0.1\\n", " 172.16.0.5 "]
clean_ips = list(map(str.strip, raw_ips))

print(clean_ips)
# النتيجة: ['192.168.1.1', '10.0.0.1', '172.16.0.5']`,
    securityTip: 'عند استخدام map مع مدخلات من مستخدم خارجي، تجنب تمرير دوال مجهولة المصدر أو تنفيذية قد تسبب DoS أو معالجة غير متوقعة.',
    commonMistake: 'نسيان تحويل النتيجة إلى list() ومحاولة طباعة كائن map مباشرة.'
  },
  {
    id: 'py-fn-secrets',
    name: 'secrets.token_hex([nbytes])',
    language: 'Python',
    languageId: 'python',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    syntax: 'secrets.token_hex(nbytes=None)',
    parameters: [
      { name: 'nbytes', type: 'int (اختياري)', description: 'عدد البايتات العشوائية المراد توليدها (الافتراضي 32 بايت)' }
    ],
    returnValue: { type: 'str', description: 'سلسلة نصية بالنظام الست عشري (Hexadecimal) تمثل التوكن الآمن' },
    whatItDoes: 'تولد توكنات أمان عشوائية مشفرة وغير قابلة للتنبؤ لإدارة الجلسات ورموز إعادة تعيين كلمات المرور.',
    deepExplanation: 'تعتمد وحدة secrets على خوارزمية CSPRNG (Cryptographically Secure Pseudo-Random Number Generator) التابعة لنظام التشغيل (مثل /dev/urandom في لينكس)، خلافاً لوحدة random العادية التي تعتمد على خوارزمية Mersenne Twister القابلة للتوقع بعد مراقبة عدة عينات.',
    codeExample: `import secrets

# توليد رمز أمان جلسة مؤقت CSRF Token
session_token = secrets.token_hex(32)
print(f"Secure Token: {session_token}")
# ينتج سلسلة بطول 64 حرفاً ست عشرياً عشوائياً مستحيلاً تخمينه`,
    securityTip: 'لا تستخدم أبداً مكتبة random.randint أو random.choice في توليد مفاتيح التشفير، كلمات المرور، أو توكنات الجلسات، واعتمد secrets حصراً.',
  },
  {
    id: 'py-fn-hashlib',
    name: 'hashlib.sha256(data).hexdigest()',
    language: 'Python',
    languageId: 'python',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    syntax: 'hashlib.sha256(data_bytes).hexdigest()',
    parameters: [
      { name: 'data_bytes', type: 'bytes', description: 'البيانات المراد توليد بصمتها بصيغة البايتات الثنائية (Bytes)' }
    ],
    returnValue: { type: 'str', description: 'بصمة هاش رقمية مشفرة بطول 64 حرفاً ست عشرياً (256-bit)' },
    whatItDoes: 'تحسب البصمة الرقمية أحادية الاتجاه (One-Way Hash) لأي نص أو ملف للتحقق من سلامته ومنع التلاعب.',
    deepExplanation: 'دوال التجزئة التشفيرية تضمن أن أي تغيير ولو بمقدار بايت واحد في البيانات الأصلية سينتج عنه هاش مختلف تماماً (Avalanche Effect)، مما يجعلها الأداة الأساسية للتحقق من التوقيع الرقمي والنزاهة.',
    codeExample: `import hashlib

def get_file_integrity_hash(file_content: str) -> str:
    # يجب تحويل النص إلى بايتات قبل التشفير
    encoded_data = file_content.encode('utf-8')
    return hashlib.sha256(encoded_data).hexdigest()

checksum = get_file_integrity_hash("System Config Critical Version 1.0")
print(checksum)`,
    securityTip: 'لا تستخدم خوارزميات MD5 أو SHA-1 القديمة لأنها مكسورة وتتعرض لهجمات التصادم (Collision Attacks). استخدم SHA-256 أو SHA-3 دائماً.',
  },
  {
    id: 'py-fn-open',
    name: 'open(file, mode, encoding)',
    language: 'Python',
    languageId: 'python',
    category: 'files_io',
    categoryLabel: 'الملفات والإدخال/الإخراج',
    syntax: 'with open(file, mode="r", encoding="utf-8") as f:',
    parameters: [
      { name: 'file', type: 'str | Path', description: 'مسار الملف المراد فتحه' },
      { name: 'mode', type: 'str', description: 'وضع الفتح: r (قراءة)، w (كتابة مع استبدال)، a (إلحاق)' },
      { name: 'encoding', type: 'str', description: 'ترميز النصوص، يفضل utf-8 دوماً' }
    ],
    returnValue: { type: 'file object', description: 'مقبض الملف للقراءة أو الكتابة' },
    whatItDoes: 'تفتح ملفاً في نظام التشغيل لإجراء عمليات القراءة أو التعديل بأمان داخل مدير السياق (with statement).',
    deepExplanation: 'استخدام سياق `with` يضمن إغلاق مقبض الملف تلقائياً حتى في حال حدوث خطأ استثنائي (Exception)، مما يمنع تسريب واستهلاك File Descriptors في نظام التشغيل.',
    codeExample: `import os

safe_log_path = os.path.abspath("audit.log")

# كتابة سجل أمني مع الإغلاق التلقائي
with open(safe_log_path, "a", encoding="utf-8") as log_file:
    log_file.write("[SECURITY AUDIT] User admin authenticated successfully.\\n")`,
    securityTip: 'احذر من ثغرات Path Traversal عند تمرير أسماء ملفات مأخوذة من المستخدم؛ تأكد دائماً باستخدام os.path.basename أو Path.resolve().',
  },

  // JAVASCRIPT / TYPESCRIPT FUNCTIONS
  {
    id: 'js-fn-reduce',
    name: 'Array.prototype.reduce(callback, initialValue)',
    language: 'JavaScript / TypeScript',
    languageId: 'javascript',
    category: 'arrays_lists',
    categoryLabel: 'القوائم والمصفوفات',
    syntax: 'array.reduce((accumulator, currentValue, index, arr) => { ... }, initialValue)',
    parameters: [
      { name: 'callback', type: 'function', description: 'دالة تنفذ على كل عنصر لتحديث القيمة التراكمية' },
      { name: 'initialValue', type: 'any', description: 'القيمة الابتدائية للمجمع (Accumulator)' }
    ],
    returnValue: { type: 'any', description: 'القيمة النهائية المجمعة (رقم، كائن، مصفوفة، إلخ)' },
    whatItDoes: 'تختصر وتدمج جميع عناصر المصفوفة في قيمة واحدة نهائية بناءً على دالة تجميعية محددة.',
    deepExplanation: 'تعتبر دالة reduce الأقوى في المعالجة الوظيفية للمصفوفات، حيث يمكن من خلالها محاكاة map و filter وتحويل مصفوفة إلى قاموس كائنات (Object Indexing) بكفاءة معالجة خطية O(n).',
    codeExample: `// حساب تكرار محاولات الدخول بحسب اسم المستخدم
const auditLogs = ['admin', 'guest', 'admin', 'operator', 'admin'];

const loginAttempts = auditLogs.reduce((acc, user) => {
  acc[user] = (acc[user] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log(loginAttempts);
// النتيجة: { admin: 3, guest: 1, operator: 1 }`,
    securityTip: 'وفر دائماً initialValue صريح لتجنب حدوث TypeError في حال كانت المصفوفة المدخلة فارغة.',
  },
  {
    id: 'js-fn-promise-all',
    name: 'Promise.all(iterable)',
    language: 'JavaScript / TypeScript',
    languageId: 'javascript',
    category: 'concurrency',
    categoryLabel: 'التزامن والوعود (Async)',
    syntax: 'Promise.all([promise1, promise2, ...])',
    parameters: [
      { name: 'iterable', type: 'Array<Promise>', description: 'مصفوفة من الوعود (Promises) المراد تنفيذها بالتوازي' }
    ],
    returnValue: { type: 'Promise<Array>', description: 'وعد يُحل بمصفوفة نتائج كل الوعود أو يرفض فور فشل أي وعد' },
    whatItDoes: 'تنفذ عدة عمليات غير متزامنة بالتوازي وتنتظر اكتمالها جميعاً في أسرع وقت ممكن.',
    deepExplanation: 'تطلق العمليات بالتوازي وتستفيد من الطبيعة غير المتزامنة للمتصفح أو Node.js، خلافاً لتنفيذها المتتالي عبر حلقات for-await التي تبطئ الأداء.',
    codeExample: `async function fetchSystemHealth() {
  const [dbStatus, apiStatus, cacheStatus] = await Promise.all([
    fetch('/api/health/db').then(r => r.json()),
    fetch('/api/health/api').then(r => r.json()),
    fetch('/api/health/cache').then(r => r.json())
  ]);

  return { dbStatus, apiStatus, cacheStatus };
}`,
    securityTip: 'إذا كان أحد الطلبات غير حرج ويمكن الاستمرار حتى لو فشل، استخدم `Promise.allSettled()` بدلاً من `Promise.all()` لتجنب إلغاء كل العمليات بسبب خطأ واحد.',
  },
  {
    id: 'js-fn-subtle-crypto',
    name: 'crypto.subtle.digest(algorithm, data)',
    language: 'JavaScript / TypeScript',
    languageId: 'javascript',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    syntax: 'await crypto.subtle.digest("SHA-256", dataBuffer)',
    parameters: [
      { name: 'algorithm', type: 'string', description: 'اسم الخوارزمية (مثل "SHA-256" أو "SHA-512")' },
      { name: 'dataBuffer', type: 'ArrayBufferView', description: 'مصفوفة البايتات المشفرة عبر TextEncoder' }
    ],
    returnValue: { type: 'Promise<ArrayBuffer>', description: 'وعد يحل بذاكرة البايتات الخاصة بالهاش' },
    whatItDoes: 'تحسب الهاش التشفيري مباشرة داخل المتصفح أو بيئة Node الحديثة باستخدام المحرك الأمني للنظام (Web Crypto API).',
    deepExplanation: 'تتميز Web Crypto API بأنها مكتبة قياسية مدعومة من العتاد، وتعمل في معزل أمني (Hardware Acceleration) دون الحاجة لتحميل مكتبات تشفير خارجية قد تحتوي على ثغرات في سلاسل التوريد (Supply Chain Attacks).',
    codeExample: `async function sha256Browser(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// تجربة البصمة
sha256Browser("Confidential Message").then(console.log);`,
    securityTip: 'استخدم هذه الواجهة دوماً في جانب العميل لتدقيق سلامة الملفات وبصمات الـ Subresource Integrity (SRI).',
  },

  // BASH / SHELL FUNCTIONS & COMMANDS
  {
    id: 'bash-fn-grep',
    name: 'grep [options] pattern [file]',
    language: 'Bash / Linux',
    languageId: 'bash',
    category: 'strings',
    categoryLabel: 'معالجة النصوص والفلترة',
    syntax: 'grep -E -i "pattern" /path/to/logfile',
    parameters: [
      { name: '-E (extended)', type: 'flag', description: 'تفعيل التعابير النمطية المتقدمة (Regex)' },
      { name: '-i (ignore-case)', type: 'flag', description: 'تجاهل حالة الأحرف الكبيرة والصغيرة' },
      { name: '-r / -R (recursive)', type: 'flag', description: 'البحث التكراري داخل جميع المجلدات الفرعية' }
    ],
    returnValue: { type: 'Exit Code', description: '0 إذا وُجد تطابق، 1 إذا لم يوجد، >1 في حال وجود خطأ' },
    whatItDoes: 'تبحث داخل الملفات أو مخرجات الطرفية عن أسطر تطابق نصاً أو تعبيراً نمطياً وتقوم بفرزها.',
    deepExplanation: 'أداة grep هي الركيزة الأساسية لمهندسي الأمن والأنظمة لتحليل سجلات النظام واكتشاف محاولات الاختراق، وتعتمد على خوارزميات مطابقة نصوص عالية السرعة مكتوبة بلغة C.',
    codeExample: `# البحث عن محاولات تسجيل الدخول الفاشلة في سجلات لينكس
grep -i "failed password" /var/log/auth.log | awk '{print $1, $2, $3, $11}'`,
    securityTip: 'عند البحث في ملفات ثنائية أو مجهولة المصدر، أضف خيار `-I` لتخطي الملفات الثنائية ومنع تشويه مخرجات الطرفية.',
  },
  {
    id: 'bash-fn-chmod',
    name: 'chmod [options] mode file',
    language: 'Bash / Linux',
    languageId: 'bash',
    category: 'files_io',
    categoryLabel: 'الملفات وصلاحيات النظام',
    syntax: 'chmod 600 id_rsa # أو chmod 700 backup_script.sh',
    parameters: [
      { name: 'mode', type: 'octal / symbolic', description: 'أرقام الصلاحيات الثلاثية: المالك، المجموعة، والآخرون' },
      { name: 'file', type: 'path', description: 'مسار الملف أو المجلد المطلوب تعديل صلاحياته' }
    ],
    returnValue: { type: 'Exit Code', description: '0 في حال النجاح' },
    whatItDoes: 'تحدد وتغير أذونات الوصول وقراءة وكتابة وتنفيذ الملفات في أنظمة يونكس ولينكس.',
    deepExplanation: 'يعتمد نظام الصلاحيات في لينكس على 3 بتات لكل فئة: القراءة (4)، الكتابة (2)، والتنفيذ (1). على سبيل المثال، الرقم 600 يعني (4+2=6 للمالك، و 0 للمجموعة، و 0 للآخرين)، وهو المعيار الأمني الصارم لمفاتيح SSH الخاصة.',
    codeExample: `# حماية مفتاح SSH الخاص ومنع قراءته من أي مستخدم آخر
chmod 600 ~/.ssh/id_ed25519

# حماية مجلد المفاتيح بالكامل
chmod 700 ~/.ssh`,
    securityTip: 'لا تقم أبداً بمنح صلاحية `chmod 777` لأي ملف أو مجلد على خادم إنتاجي؛ هذا يسمح لأي مستخدم أو ثغرة بالكتابة والتنفيذ في النظام.',
  },
  {
    id: 'bash-fn-trap',
    name: 'trap command signal',
    language: 'Bash / Linux',
    languageId: 'bash',
    category: 'crypto_security',
    categoryLabel: 'الأمان وإدارة المقاطعات',
    syntax: 'trap cleanup_function EXIT SIGINT SIGTERM',
    parameters: [
      { name: 'command', type: 'string / function', description: 'الأمر أو الدالة المنفذة عند التقاط الإشارة' },
      { name: 'signal', type: 'signals', description: 'إشارات النظام مثل EXIT، INT (Ctrl+C)، أو TERM' }
    ],
    returnValue: { type: 'void', description: 'تسجيل معالج الإشارة' },
    whatItDoes: 'تلتقط إشارات التوقف والمقاطعة لتنفيذ أوامر تنظيف آمنة وحذف الملفات المؤقتة الحساسة قبل خروج السكربت.',
    deepExplanation: 'تمنع دالة trap بقاء ملفات مؤقتة غير مشفرة (Temp Files) أو عمليات معلقة في الخلفية عند قيام المستخدم أو النظام بإنهاء السكربت قسراً عبر Ctrl+C أو انتهاء المهام.',
    codeExample: `#!/bin/bash
set -euo pipefail

TEMP_DIR=$(mktemp -d)
# ضمان حذف المجلد المؤقت فور إنهاء السكربت تحت أي ظرف
trap 'rm -rf "$TEMP_DIR"; echo "[INFO] Cleaned up temporary files."' EXIT

echo "Working safely in: $TEMP_DIR"`,
    securityTip: 'استخدم trap دائماً في سكربتات الأتمتة التي تتعامل مع ملفات فك تشفير أو شهادات رقمية مؤقتة لضمان محوها الآمن.',
  },

  // GO (GOLANG) FUNCTIONS
  {
    id: 'go-fn-goroutine',
    name: 'go func() { ... }()',
    language: 'Go (Golang)',
    languageId: 'golang',
    category: 'concurrency',
    categoryLabel: 'التزامن ومعالجة الخيوط',
    syntax: 'go myWorkerFunction(param)',
    parameters: [
      { name: 'function_call', type: 'call', description: 'الدالة المراد إطلاقها كخيط خفيف مستقل (Goroutine)' }
    ],
    returnValue: { type: 'void', description: 'يبدأ التنفيذ فوراً في الخلفية' },
    whatItDoes: 'تطلق خيط معالجة فائق الخفة (Goroutine) يعمل بالتزامن مع البرنامج الرئيسي دون حجب المسار.',
    deepExplanation: 'الـ Goroutine ليست خيط معالجة حقيقي على مستوى نظام التشغيل (OS Thread) الذي يستهلك ميغابايت من الذاكرة، بل تدار بواسطة Go Runtime وتستهلك 2 كيلوبايت فقط عند البدء، مما يتيح تشغيل مئات الآلاف منها في نفس الوقت.',
    codeExample: `package main

import (
	"fmt"
	"net/http"
	"sync"
)

func checkURL(url string, wg *sync.WaitGroup) {
	defer wg.Done()
	resp, err := http.Get(url)
	if err == nil {
		fmt.Printf("[ALIVE] %s -> Status: %d\\n", url, resp.StatusCode)
	}
}

func main() {
	var wg sync.WaitGroup
	targets := []string{"https://google.com", "https://github.com"}
	for _, target := range targets {
		wg.Add(1)
		go checkURL(target, &wg) // إطلاق فحص متزامن فوري
	}
	wg.Wait()
}`,
    securityTip: 'استخدم دائماً `sync.WaitGroup` أو قنوات `channels` لتنظيم إنهاء الخيوط، وتجنب مشاركة متغيرات الذاكرة بدون أقفال `sync.Mutex` لتفادي Race Conditions.',
  },
  {
    id: 'go-fn-crypto-rand',
    name: 'rand.Read(b []byte)',
    language: 'Go (Golang)',
    languageId: 'golang',
    category: 'crypto_security',
    categoryLabel: 'الأمن والتشفير',
    syntax: 'import "crypto/rand" ... rand.Read(buffer)',
    parameters: [
      { name: 'buffer', type: '[]byte', description: 'مصفوفة البايتات المراد ملؤها بالقيم المشفرة العشوائية' }
    ],
    returnValue: { type: '(n int, err error)', description: 'عدد البايتات المعبأة وأي خطأ قد يطرأ' },
    whatItDoes: 'تملأ مصفوفة بايتات بأرقام عشوائية مشفرة وآمنة تماماً مستخرجة من محرك النواة التشفيري.',
    deepExplanation: 'حزمة `crypto/rand` في لغة Go مهيأة للمطابقة مع معايير FIPS 140 وتستقي العشوائية من مولدات أمان العتاد، وهي المعيار الإلزامي لتوليد مفاتيح AES وحبيبات التمليح (Salts).',
    codeExample: `package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
)

func generateSecureSalt(size int) (string, error) {
	salt := make([]byte, size)
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}
	return hex.EncodeToString(salt), nil
}`,
    securityTip: 'لا تخلط بين حزمة `crypto/rand` وحزمة `math/rand`. الحزمة الأخيرة حتمية وغير آمنة للتشفير مطلقاً.',
  },

  // RUST FUNCTIONS
  {
    id: 'rs-fn-match',
    name: 'match value { Pattern => expr }',
    language: 'Rust',
    languageId: 'rust',
    category: 'built_in',
    categoryLabel: 'التحكم ومطابقة الأنماط',
    syntax: 'match result { Ok(val) => ..., Err(e) => ... }',
    parameters: [
      { name: 'value', type: 'expression', description: 'المتغير أو التعبير المراد مطابقته وفحصه' }
    ],
    returnValue: { type: 'any', description: 'قيمة الذراع المطابق' },
    whatItDoes: 'بناء تحكم شامل يفحص جميع الاحتمالات الممكنة ويجبر المطور على معالجة كل حالات النجاح والأخطاء.',
    deepExplanation: 'في لغة Rust، ميزة مطابقة الأنماط (Pattern Matching) شاملة (Exhaustive)، مما يعني أن المترجم سيرفض بناء البرنامج إذا نسيت معالجة حالة واحدة محتملة (مثل حالة الخطأ في النتيجة Err أو غياب القيمة None). هذا يلغي تماماً خطأ المؤشر الفارغ Null Pointer Exception الشهير.',
    codeExample: `fn inspect_port(port: u16) -> &'static str {
    match port {
        22 => "SSH - Secure Shell Service",
        80 => "HTTP - Web Traffic (Unencrypted)",
        443 => "HTTPS - Secure Web Traffic",
        1..=1024 => "System Privileged Port",
        _ => "Standard User / Dynamic Port",
    }
}`,
    securityTip: 'اعتمد دوماً على `match` بدلاً من استدعاء `.unwrap()` المباشر على كائنات `Result`، لأن unwrap يتسبب في انهيار (Panic) للبرنامج في حال حدوث خطأ.',
  },

  // SQL FUNCTIONS
  {
    id: 'sql-fn-coalesce',
    name: 'COALESCE(val1, val2, ...)',
    language: 'SQL',
    languageId: 'sql',
    category: 'database',
    categoryLabel: 'قواعد البيانات ومعالجة القيم',
    syntax: 'SELECT COALESCE(user_phone, alternative_phone, "غير محدد") FROM users;',
    parameters: [
      { name: 'values', type: 'list of expressions', description: 'قائمة القيم المراد فحصها بالترتيب' }
    ],
    returnValue: { type: 'any', description: 'أول قيمة غير خالية (Non-NULL) في القائمة' },
    whatItDoes: 'ترجع أول قيمة غير معدومة (غير NULL) من بين الحقول الممررة، وتوفر قيمة بديلة آمنة.',
    deepExplanation: 'في قواعد البيانات، التعامل مع حقول NULL غير المنضبطة قد يؤدي إلى نتائج خاطئة في العمليات الحسابية ومقارنات الشروط، وتضمن COALESCE توفير قيمة افتراضية مستقرة.',
    codeExample: `-- استخراج سجلات محاولات الدخول مع توفير قيمة افتراضية آمنة في حال عدم توفر عنوان IP
SELECT 
    user_id, 
    COALESCE(client_ip, '0.0.0.0') AS ip_address,
    created_at
FROM authentication_events
WHERE status = 'FAILED';`,
    securityTip: 'عند برمجة استعلامات الصلاحيات، لا تعتمد على أن الحقول المفقودة تعني الموافقة؛ استخدم COALESCE(is_blocked, TRUE) لتطبيق مبدأ الأمان الافتراضي (Fail-Secure).',
  },

  // DOCKER DIRECTIVES
  {
    id: 'docker-dir-user',
    name: 'USER <user>[:<group>]',
    language: 'Docker & Containers',
    languageId: 'docker',
    category: 'files_io',
    categoryLabel: 'إدارة الصلاحيات والعزل',
    syntax: 'RUN adduser -D appuser && USER appuser',
    parameters: [
      { name: 'user', type: 'string / UID', description: 'اسم أو معرف المستخدم غير الجذري لتشغيل التطبيق' }
    ],
    returnValue: { type: 'directive', description: 'تغيير مستخدم التشغيل لجميع التعليمات اللاحقة' },
    whatItDoes: 'تحدد المستخدم غير الجذري (Non-root user) الذي سيشغل حاوية Docker بدلاً من مستخدم root الخطير.',
    deepExplanation: 'إذا تم اختراق تطبيق يعمل داخل حاوية تعمل بصلاحية root، فإن المهاجم يمتلك صلاحيات النواة الجذري ويسهل عليه اختراق حاجز الحاوية (Container Breakout) والوصول إلى السيرفر المضيف (Host Server). تحديد مستخدم مقيد يحصر أثر الاختراق داخل مسار محمي.',
    codeExample: `FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# إنشاء مستخدم آمن ومقيد
USER node

EXPOSE 3000
CMD ["node", "server.js"]`,
    securityTip: 'التزم دائماً بقاعدة الـ Non-Root User في كل Dockerfile تقوم بإنشائه لضمان حماية خادم الإنتاج.',
  }
];
