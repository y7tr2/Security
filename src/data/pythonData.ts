import { PythonFunctionDoc } from '../types';

export const pythonBuiltInFunctions: PythonFunctionDoc[] = [
  {
    name: 'print()',
    syntax: 'print(*objects, sep=" ", end="\\n", file=None, flush=False)',
    category: 'io',
    description: 'طباعة المخرجات إلى الطرفية أو ملف مع تخصيص الفواصل والنهايات.',
    parameters: ['*objects: العناصر المراد طباعتها', 'sep: الفاصل بين العناصر (الافتراضي مسافة)', 'end: ما يطبع في النهاية (الافتراضي سطر جديد)'],
    returnValue: 'None',
    codeExample: `# طباعة منسقة مع تحديد فاصل مخصص
print("الحالة", "آمن", "200 OK", sep=" | ")

# طباعة بدون الانتقال لسطر جديد
for i in range(3):
    print(f"فحص الحزمة {i+1}...", end=" ")`,
    defensiveTip: 'في بيئات الإنتاج الأمنية، تجنب استخدام print() لطباعة كلمات المرور أو التوكنات، واستخدم مكتبة logging بمستويات مناسبة لمنع تسريب البيانات في السجلات.'
  },
  {
    name: 'len()',
    syntax: 'len(s)',
    category: 'built-in',
    description: 'إرجاع عدد العناصر في كائن متسلسل (مثل القوائم، النصوص، القواميس، والمجموعات).',
    parameters: ['s: كائن قابل للعد (string, list, tuple, dict, set)'],
    returnValue: 'عدد صحيح (int) يمثل الطول',
    codeExample: `username = "admin_sec"
passphrase = "UltraSecureKey#2026!"

if len(passphrase) < 12:
    print("تحذير: كلمة المرور أقل من الحد الأدنى الآمن (12 خانة)")
else:
    print(f"طول كلمة المرور آمن ومقبول: {len(passphrase)} خانة")`,
    defensiveTip: 'استخدم فحص الطول len() دائماً للتحقق من المدخلات (Input Validation) قبل معالجتها للوقاية من هجمات حجب الخدمة (DoS) الناتجة عن مدخلات عملاقة.'
  },
  {
    name: 'type() & isinstance()',
    syntax: 'isinstance(object, classinfo)',
    category: 'built-in',
    description: 'فحص نوع المتغير والتأكد من مطابقة النوع البرمجي بأمان وموثوقية.',
    parameters: ['object: الكائن المراد فحصه', 'classinfo: الصنف أو نوع البيانات المتوقع'],
    returnValue: 'True إذا كان الكائن يطابق النوع، و False عدا ذلك',
    codeExample: `def safe_process_port(port):
    # التحقق الآمن من نوع المدخل لمنع ثغرات حقن الأنواع
    if not isinstance(port, int):
        try:
            port = int(port)
        except (ValueError, TypeError):
            raise ValueError("رقم المنفذ غير صالح")
            
    if 1 <= port <= 65535:
        return f"المنفذ {port} صالح ومقبول"
    return "المنفذ خارج النطاق القياسي"

print(safe_process_port("443"))`,
    defensiveTip: 'يفضل دائماً استخدام isinstance() بدلاً من type() المباشر، لأنه يدعم الوراثة ويعتبر الممارسة الأفضل وفقاً لمعايير PEP 8.'
  },
  {
    name: 'map()',
    syntax: 'map(function, iterable, *iterables)',
    category: 'built-in',
    description: 'تطبيق دالة محددة على كل عنصر من عناصر متتالية معينة دون الحاجة لكتابة حلقة تكرار تقليدية.',
    parameters: ['function: الدالة المراد تطبيقها', 'iterable: المتتالية الأصلية'],
    returnValue: 'كائن map (Iterator) يمكن تحويله إلى list أو تكراره',
    codeExample: `# تحويل قائمة أرقام منافذ نصية إلى أرقام صحيحة دفعة واحدة
raw_ports = ["80", "443", "8080", "22"]
sanitized_ports = list(map(int, raw_ports))

print("المنافذ المعالجة:", sanitized_ports)`,
    defensiveTip: 'الدالة map تُرجع مُولِّداً كسولاً (lazy iterator)، مما يوفر استهلاك الذاكرة بشكل هائل عند معالجة ملفات السجلات الكبيرة (Log Files).'
  },
  {
    name: 'filter()',
    syntax: 'filter(function, iterable)',
    category: 'built-in',
    description: 'تصفية عناصر متتالية بناءً على شرط منطقي تعيده دالة الفحص (True أو False).',
    parameters: ['function: دالة ترجع قيمة منطقية', 'iterable: المتتالية المراد فلترتها'],
    returnValue: 'كائن filter يحتوي فقط على العناصر التي حققت الشرط',
    codeExample: `# فلترة عناوين IP وعزل العناوين غير الصالحة أو المريبة
ip_list = ["192.168.1.1", "10.0.0.1", "0.0.0.0", "172.16.0.5"]

# استبعاد العنوان 0.0.0.0 المجهول
valid_ips = list(filter(lambda ip: ip != "0.0.0.0", ip_list))
print("عناوين الشبكة الصالحة:", valid_ips)`,
    defensiveTip: 'استخدم filter() لتنقية المدخلات وقوائم السماح (Whitelisting) قبل إرسالها إلى قواعد البيانات أو أوامر النظام.'
  },
  {
    name: 'zip()',
    syntax: 'zip(*iterables, strict=False)',
    category: 'built-in',
    description: 'دمج عناصر متعددة من متتاليات مختلفة جنباً إلى جنب في أزواج (Tuples).',
    parameters: ['*iterables: متتاليات مراد دمجها', 'strict: في بايثون 3.10+ يُطلق استثناء إذا لم تتطابق الأطوال'],
    returnValue: 'مكرر من أزواج العناصر (Zip Iterator)',
    codeExample: `headers = ["Host", "User-Agent", "Authorization"]
values = ["api.example.com", "SecurityScanner/1.0", "Bearer secret_token"]

# دمج الترويسات مع قيمها في قاموس آمن
request_headers = dict(zip(headers, values, strict=True))
print("ترويسات الطلب المنظمة:", request_headers)`,
    defensiveTip: 'في بايثون 3.10 وما بعدها، استخدم دائماً strict=True عند ربط بيانات حساسة للتأكد من عدم ضياع أي حقل أو تجاوز قيم غير مقترنة.'
  },
  {
    name: 'enumerate()',
    syntax: 'enumerate(iterable, start=0)',
    category: 'built-in',
    description: 'إرجاع فهرس العنصر مع قيمته أثناء التكرار بشكل أنيق دون استخدام عداد يدوي.',
    parameters: ['iterable: المتتالية', 'start: رقم البداية للعداد (الافتراضي 0)'],
    returnValue: 'أزواج (index, element)',
    codeExample: `firewall_rules = ["ALLOW 192.168.1.0/24", "DENY ANY", "LOG DROP"]

for rule_id, rule in enumerate(firewall_rules, start=1):
    print(f"قاعدة الجدار الناري #{rule_id}: {rule}")`,
    defensiveTip: 'تساعد enumerate() في توليد سجلات تدقيق (Audit Logs) دقيقة توضح رقم السطر أو المعامل الذي حدث عنده الحدث الأمني.'
  },
  {
    name: 'open() [مع Context Manager]',
    syntax: 'with open(file, mode="r", encoding="utf-8") as f:',
    category: 'io',
    description: 'فتح الملفات بطريقة آمنة مع ضمان إغلاقها تلقائياً حتى في حال حدوث أخطاء.',
    parameters: ['file: مسار الملف', 'mode: وضع الفتح (r للقراءة، w للكتابة، a للإضافة)', 'encoding: ترميز الملف (دائماً حدد utf-8)'],
    returnValue: 'كائن ملف (File Object)',
    codeExample: `# الطريقة الآمنة القياسية لقراءة السجلات
import os

log_path = "access.log"
# إنشاء ملف وهمي للتجربة
with open(log_path, "w", encoding="utf-8") as f:
    f.write("2026-09-14 INFO: User admin logged in\\n")

# قراءة آمنة
with open(log_path, "r", encoding="utf-8") as f:
    for line in f:
        if "INFO" in line:
            print("سجل موثق:", line.strip())`,
    defensiveTip: 'تجنب فتح الملفات بدون with، وحدد دائماً encoding="utf-8" لمنع هجمات التشفير أو أخطاء قراءة البايتات غير المتوقعة.'
  },
  {
    name: 'ast.literal_eval() [بديل eval الآمن]',
    syntax: 'import ast; ast.literal_eval(node_or_string)',
    category: 'security',
    description: 'تحليل وتقييم النصوص البرمجية البسيطة (مثل القواميس والقوائم) بأمان تام دون تشغيل أكواد خبيثة.',
    parameters: ['node_or_string: النص البرمجي المراد استخراج البيانات منه'],
    returnValue: 'كائن بايثون مكافئ (Dict, List, Int, Str)',
    codeExample: `import ast

# نص وارد من مصدر خارجي أو مستخدم
untrusted_input = '{"status": "active", "max_attempts": 5}'

# الطريقة الآمنة 100%:
safe_data = ast.literal_eval(untrusted_input)
print("البيانات المستخرجة بأمان:", safe_data["status"])

# تحذير: لا تستخدم مطلقاً eval(untrusted_input) لأنها تسمح بتنفيذ دوال نظام تدميرية!`,
    defensiveTip: 'استخدام eval() على مدخلات المستخدم يمثل ثغرة RCE (Remote Code Execution) حرجة. استخدم دائماً ast.literal_eval أو json.loads.'
  },
  {
    name: 'hashlib [التشفير والهاش الدفاعي]',
    syntax: 'hashlib.sha256(data).hexdigest()',
    category: 'security',
    description: 'توليد بصمات رقمية وتجزئة آمنة للملفات والنصوص للتحقق من سلامتها وعدم التلاعب بها.',
    parameters: ['data: بايتات النص أو الملف المراد عمل هاش له'],
    returnValue: 'سلسلة نصية سداسية عشرية (Hex String)',
    codeExample: `import hashlib

def generate_file_checksum(content: str) -> str:
    # حساب بصمة SHA-256 للتحقق من النزاهة (Integrity Check)
    return hashlib.sha256(content.encode("utf-8")).hexdigest()

file_data = "System Configuration v2.4"
checksum = generate_file_checksum(file_data)
print("بصمة SHA-256 للتحقق من السلامة:")
print(checksum)`,
    defensiveTip: 'تجنب استخدام MD5 أو SHA-1 لحماية البيانات أو كلمات المرور لوجود تصادمات أمنية؛ واستخدم SHA-256 أو SHA-3 للنزاهة، و bcrypt أو Argon2 لكلمات المرور.'
  },
  {
    name: 'secrets [توليد مفاتيح عشوائية آمنة]',
    syntax: 'import secrets; secrets.token_hex(32)',
    category: 'security',
    description: 'توليد أرقام وتوكنات عشوائية مشفرة وغير قابلة للتنبؤ لإدارة الجلسات ورموز الأمان.',
    parameters: ['nbytes: عدد البايتات العشوائية المراد توليدها'],
    returnValue: 'توكن نصي عشوائي فائق الأمان',
    codeExample: `import secrets

# توليد رمز CSRF أو رمز جلسة فائق الأمان
session_token = secrets.token_hex(32)
api_key = secrets.token_urlsafe(32)

print("رمز الجلسة الآمن المشفر (Cryptographically Secure):")
print(session_token)
print("مفتاح API آمن للروابط:", api_key)`,
    defensiveTip: 'مكتبة random القياسية في بايثون غير مخصصة للأمان لأنها قابلة للتنبؤ! استخدم دائماً مكتبة secrets الرسمية لأي متطلب أمني.'
  },
  {
    name: 'dict.get() [الوصول الآمن للقواميس]',
    syntax: 'dictionary.get(key, default=None)',
    category: 'dict',
    description: 'قراءة قيمة من القاموس مع توفير قيمة افتراضية في حال عدم وجود المفتاح لتجنب توقف البرنامج.',
    parameters: ['key: اسم المفتاح', 'default: القيمة المرجعة إن لم يوجد المفتاح'],
    returnValue: 'قيمة المفتاح أو القيمة الافتراضية',
    codeExample: `config = {
    "app_name": "DefenseApp",
    "debug_mode": False
}

# بدلاً من config["timeout"] الذي يُسقط البرنامج بـ KeyError
timeout = config.get("timeout", 30)
role = config.get("user_role", "guest")

print(f"مهلة الاتصال الآمنة: {timeout} ثانية")
print(f"صلاحية المستخدم: {role}")`,
    defensiveTip: 'استخدام .get() يمنع ثغرات تسريب تتبع الأخطاء (Stack Trace Leaks) الناتجة عن KeyError غير المعالج.'
  }
];

export const pythonCoreLessons = [
  {
    id: 'py-basics',
    title: '1. الأساسيات والأنواع وحماية المدخلات',
    summary: 'فهم أنواع المتغيرات (int, str, float, bool) والتعامل الدفاعي مع أخطاء التحويل.',
    codeSnippet: `# التعامل الآمن مع إدخال المستخدم
def get_safe_user_age(raw_input: str) -> int:
    try:
        # التحويل الآمن
        age = int(raw_input.strip())
        if age < 0 or age > 130:
            raise ValueError("العمر خارج النطاق المنطقي")
        return age
    except ValueError as e:
        print(f"خطأ في المدخل: {e}")
        return -1

# تجربة
print("العمر الآمن:", get_safe_user_age(" 25 "))`
  },
  {
    id: 'py-data-structures',
    title: '2. تراكيب البيانات والقوائم المعالجة (Comprehensions)',
    summary: 'القوائم (Lists)، القواميس (Dicts)، والمجموعات (Sets) مع استخدام List Comprehensions السريعة والآمنة.',
    codeSnippet: `# تنقية وفرز قائمة مدخلات آمنة
unfiltered_ports = [80, 443, -1, 8080, 999999, 22, 53]

# استخلاص المنافذ القياسية الشرعية فقط
legitimate_ports = [
    port for port in unfiltered_ports 
    if isinstance(port, int) and 1 <= port <= 65535
]

print("المنافذ المعتمدة بعد التنقية:", legitimate_ports)`
  },
  {
    id: 'py-functions-decorators',
    title: '3. الدوال (Functions) والمزخرفات (Decorators) الأمنية',
    summary: 'بناء دوال مخصصة وتصميم مزخرف (Decorator) للتحقق من صلاحيات المستخدم قبل تنفيذ الكود.',
    codeSnippet: `from functools import wraps

# مزخرف أمني لفحص الصلاحيات (Authorization Decorator)
def require_admin(func):
    @wraps(func)
    def wrapper(user_role, *args, **kwargs):
        if user_role != "admin":
            raise PermissionError("تحذير: لا تملك صلاحية الوصول لهذه الوظيفة الحساسة!")
        return func(user_role, *args, **kwargs)
    return wrapper

@require_admin
def update_system_firewall(user_role, new_rule):
    return f"تم تطبيق القاعدة بنجاح: {new_rule}"

# تجربة دالة الحماية
try:
    print(update_system_firewall("guest", "ALLOW 10.0.0.1"))
except PermissionError as err:
    print(err)`
  },
  {
    id: 'py-oop',
    title: '4. البرمجة كائنية التوجه (OOP) وتغليف البيانات (Encapsulation)',
    summary: 'حماية المتغيرات الحساسة داخل الأصناف باستخدام الخاصية الخاصة (__private) و @property.',
    codeSnippet: `class SecureUserAccount:
    def __init__(self, username: str, initial_balance: float):
        self.username = username
        # حقل خاص محمي من التعديل العشوائي الخارجي
        self.__balance = max(0.0, initial_balance)

    @property
    def balance(self) -> float:
        return self.__balance

    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            print("خطأ: لا يمكن إيداع قيمة صفرية أو سالبة!")
            return False
        self.__balance += amount
        return True

account = SecureUserAccount("Khalid", 150.0)
account.deposit(50.0)
print(f"الرصيد المحمي: {account.balance} ريال")`
  }
];
