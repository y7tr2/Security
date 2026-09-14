import { TermuxCommandItem } from '../types';

export const termuxCommandsList: TermuxCommandItem[] = [
  {
    id: 'termux-pkg-update',
    title: 'تحديث المستودعات وترقية الحزم الأساسية بأمان',
    command: 'pkg update && pkg upgrade -y',
    category: 'package_manager',
    platformTarget: '📱 Termux (أندرويد)',
    description: 'تحديث كافة المستودعات وحزم نظام أندرويد المعزولة داخل تطبيق Termux لضمان الحصول على أحدث التحديثات والترقيعات الأمنية.',
    prerequisites: 'اتصال نشط بالإنترنت وصلاحية التخزين (اختيارية).',
    outputPreview: 'All packages are up to date. Reading package lists... Done',
    safetyLevel: 'آمن تماماً',
    notes: 'يُنصح بتشغيل هذا الأمر بشكل دوري كل أسبوع لسد أي ثغرات في الحزم القديمة.'
  },
  {
    id: 'termux-storage-permission',
    title: 'طلب إذن الوصول الآمن لمجلد التخزين بالهاتف',
    command: 'termux-setup-storage',
    category: 'file_security',
    platformTarget: '📱 Termux (أندرويد)',
    description: 'إنشاء روابط آمنة لمجلدات الهاتف (التنزيلات، الصور، والمستندات) داخل مجلد ~/storage للوصول للملفات البرمجية.',
    prerequisites: 'الموافقة على نافذة الإذن المنبثقة من نظام أندرويد.',
    outputPreview: 'Symlinks created in ~/storage (downloads, shared, dcim, movies, music, pictures)',
    safetyLevel: 'آمن تماماً',
    notes: 'لا تمنح هذا الإذن إلا إذا كنت بحاجة فعلية لتعديل أو حفظ ملفات بايثون ومشاريعك على ذاكرة الهاتف.'
  },
  {
    id: 'termux-install-python-dev',
    title: 'تثبيت بايثون وحزم التطوير والمحرر الآمن',
    command: 'pkg install python git clang nano -y',
    category: 'python_termux',
    platformTarget: '📱 Termux (أندرويد)',
    description: 'تثبيت بيئة عمل بايثون 3 الكاملة مع مترجم C/Clang ومستودع Git ومحرر النصوص Nano للبرمجة المباشرة من الجوال.',
    prerequisites: 'مساحة تخزين حرة لا تقل عن 350 ميجابايت.',
    outputPreview: 'Setting up python (3.11+) ... Installed: python, git, clang, nano',
    safetyLevel: 'آمن تماماً',
    notes: 'يتيح لك تشغيل برمجيات وأدوات الفحص الدفاعي المكتوبة بلغة Python مباشرة من هاتفك.'
  },
  {
    id: 'linux-open-ports-check',
    title: 'فحص المنافذ المفتوحة والمستمعة محلياً (Open Ports Audit)',
    command: 'ss -tuln',
    category: 'network_audit',
    platformTarget: '📱💻 كلاهما',
    description: 'عرض كافة المنافذ (TCP و UDP) التي تستمع حالياً على جهازك للتأكد من عدم وجود أي خدمة مجهولة أو غير مصرح بها تعمل في الخلفية.',
    prerequisites: 'لا يتطلب روت أو صلاحيات خاصة للمنافذ العادية.',
    outputPreview: 'Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port\\ntcp    LISTEN  0       128      127.0.0.1:8080       0.0.0.0:*',
    safetyLevel: 'آمن تماماً',
    notes: 'تحليل أمني: أي منفذ يظهر بعنوان 0.0.0.0 يعني أنه يستمع للعالم الخارجي؛ أما 127.0.0.1 فهو محلي للجهاز فقط.'
  },
  {
    id: 'linux-active-processes',
    title: 'مراقبة العمليات النشطة واستهلاك المعالج والذاكرة',
    command: 'ps aux --sort=-%mem | head -n 15',
    category: 'system_monitoring',
    platformTarget: '💻 لينكس / سيرفر',
    description: 'عرض أكثر 15 عملية تستهلك ذاكرة الخادم مع معرف العملية (PID) ومستخدم التشغيل لرصد أي نشاط مريب أو عمليات تعدين خفية.',
    outputPreview: 'USER  PID  %CPU %MEM   VSZ   RSS TTY STAT START TIME COMMAND\\nroot    1   0.0  0.1 22560  9440 ?   Ss   Sep10 0:02 /sbin/init',
    safetyLevel: 'آمن تماماً',
    notes: 'إذا وجدت عملية غير معروفة تستهلك 100% من المعالج، يجب التحقق من مسار ملفها عبر ls -l /proc/[PID]/exe.'
  },
  {
    id: 'termux-check-processes',
    title: 'مراقبة العمليات الجارية في هاتف أندرويد عبر Termux',
    command: 'top -m 10 -s cpu',
    category: 'system_monitoring',
    platformTarget: '📱 Termux (أندرويد)',
    description: 'عرض مباشر لأعلى 10 تطبيقات وعمليات تستهلك المعالج في هاتفك مع تحديث فوري.',
    outputPreview: 'PID USER     PR  NI CPU% S  #THR     VSS     RSS PCY Name\\n18320 u0_a201  20   0  12% R    14 114500K  54200K  ta python',
    safetyLevel: 'آمن تماماً',
    notes: 'اضغط على مفتاح Ctrl + C للخروج من شاشة المراقبة في أي وقت.'
  },
  {
    id: 'file-permissions-hardening',
    title: 'حماية وتأمين تصاريح ملفات الإعداد والمفاتيح الحساسة',
    command: 'chmod 600 config.env id_rsa && chmod 700 ~/.ssh',
    category: 'file_security',
    platformTarget: '📱💻 كلاهما',
    description: 'تقييد صلاحيات ملفات المتغيرات البيئية ومفاتيح SSH لتكون مقروءة ومعدلة من قِبل مالك الملف فقط ومنع أي مستخدم آخر على الجهاز من رؤيتها.',
    outputPreview: '-rw------- 1 user user 420 Sep 14 07:45 config.env',
    safetyLevel: 'آمن تماماً',
    notes: 'المعيار الأمني: لا تجعل صلاحيات أي ملف أسرار 777 مطلقاً! استخدام 600 يضمن أعلى درجات الخصوصية.'
  },
  {
    id: 'integrity-checksum-verify',
    title: 'التحقق من بصمة وسلامة الملفات وعدم التلاعب بها',
    command: 'sha256sum backup.tar.gz script.py',
    category: 'file_security',
    platformTarget: '📱💻 كلاهما',
    description: 'حساب بصمة التشفير الرقمية (SHA-256 Hash) لكل ملف لمقارنتها مع البصمة الأصلية المنشورة من المطور الرسمي للتأكد من خلوه من البرمجيات الخبيثة.',
    outputPreview: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  script.py',
    safetyLevel: 'آمن تماماً',
    notes: 'تأكد دائماً من مطابقة البصمة قبل تشغيل أي سكربت تم تحميله من الإنترنت.'
  },
  {
    id: 'linux-firewall-rules',
    title: 'تفعيل الجدار الناري الدفاعي وحظر الدخول غير المصرح به',
    command: 'sudo ufw default deny incoming && sudo ufw default allow outgoing && sudo ufw allow 22/tcp && sudo ufw enable',
    category: 'network_audit',
    platformTarget: '💻 لينكس / سيرفر',
    description: 'تطبيق إستراتيجية الدفاع الشامل: منع كافة الاتصالات الواردة افتراضياً، والسماح بالاتصالات الصادرة، مع فتح منفذ SSH الآمن فقط.',
    prerequisites: 'صلاحية الجذر (sudo / root).',
    outputPreview: 'Default incoming policy changed to "deny"\\nFirewall is active and enabled on system startup',
    safetyLevel: 'يتطلب حذر',
    notes: 'تحذير: تأكد من السماح بمنفذ SSH الخاص بك أولاً قبل التفعيل لتجنب قفل اتصالك بالخادم عن بُعد.'
  },
  {
    id: 'termux-run-python-script',
    title: 'تشغيل سكربت بايثون مع عزل بيئة العمل الافتراضية (VirtualEnv)',
    command: 'python -m venv myenv && source myenv/bin/activate && pip install --upgrade pip',
    category: 'python_termux',
    platformTarget: '📱💻 كلاهما',
    description: 'إنشاء بيئة عمل بايثون معزولة لمنع تضارب المكتبات وحماية النظام الأساسي من أي تثبيتات غير متوافقة.',
    outputPreview: '(myenv) $ pip list\\nPackage    Version\\n---------- -------',
    safetyLevel: 'آمن تماماً',
    notes: 'للخروج من البيئة الافتراضية في أي وقت، اكتب الأمر deactivate.'
  }
];
