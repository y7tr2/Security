import { Snippet } from '../types';

export const multiLanguageSnippets: Snippet[] = [
  // --- PYTHON SNIPPETS ---
  {
    id: 'py-hash-file',
    title: 'حساب بصمة SHA-256 للملفات الكبيرة بأسلوب البث (Streaming)',
    description: 'قراءة الملف على أجزاء (Chunks) لتجنب استهلاك الذاكرة في الملفات الضخمة وحساب بصمتها بدقة.',
    language: 'python',
    category: 'security',
    difficulty: 'مبتدئ',
    platform: 'all',
    tags: ['تجزئة', 'hashlib', 'sha256', 'نزاهة الملفات'],
    isDefensiveSecurity: true,
    code: `import hashlib

def get_file_sha256(filepath: str) -> str:
    """حساب هاش SHA-256 للملفات دون استنزاف ذاكرة RAM"""
    hasher = hashlib.sha256()
    # قراءة الملف بأجزاء متفرقة (64 كيلوبايت لكل دفعة)
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()

# مثال استخدام
# print(get_file_sha256("system_backup.iso"))`,
    explanation: 'باستخدام حجم كتلة محدد (Chunking)، يمكن حساب بصمة ملف بحجم 10 جيجابايت باستهلاك ذاكرة لا يتجاوز 64 كيلوبايت فقط.',
    securityWarning: 'تحقق دائماً من تطابق الهاش مع الموقع الرسمي للمطور للوقاية من هجمات استبدال الحزم الوسيطة (Supply-Chain Attacks).'
  },
  {
    id: 'py-rate-limiter',
    title: 'محدد معدل الطلبات في الذاكرة (In-Memory Token Rate Limiter)',
    description: 'حماية مسارات التطبيق من محاولات التخمين والإغراق (Brute-force / DoS) بحساب عدد الطلبات لكل IP.',
    language: 'python',
    category: 'security',
    difficulty: 'متوسط',
    platform: 'all',
    tags: ['حماية', 'rate-limit', 'دفاع', 'api'],
    isDefensiveSecurity: true,
    code: `import time
from collections import defaultdict

class SimpleRateLimiter:
    def __init__(self, max_requests: int = 5, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        # تصفية الطلبات التي تجاوزت النافذة الزمنية
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip] 
            if now - req_time < self.window_seconds
        ]
        
        # فحص الحد الأقصى
        if len(self.requests[client_ip]) >= self.max_requests:
            return False
            
        self.requests[client_ip].append(now)
        return True

# تجربة المحاكي
limiter = SimpleRateLimiter(max_requests=3, window_seconds=10)
ip = "192.168.1.100"
for i in range(5):
    status = "مسموح ✅" if limiter.is_allowed(ip) else "محظور 🛑 (تجاوز المعدل)"
    print(f"الطلب {i+1}: {status}")`,
    explanation: 'خوارزمية النافذة المنزلقة (Sliding Window) تمنع الروبوتات من إرسال آلاف الطلبات في الثواني المعدودة.',
    securityWarning: 'في أنظمة الإنتاج الموزعة، استخدم Redis كخزن مركزي لضمان التزامن بين جميع خوادم الويب.'
  },
  {
    id: 'py-safe-request',
    title: 'طلب HTTP آمن مع تحديد المهلة وإعادة المحاولة والتحقق من الشهادة',
    description: 'تنفيذ طلبات شبكية آمنة مع فرض مهلة اتصال (Timeout) صارمة للوقاية من تجميد السيرفر.',
    language: 'python',
    category: 'networking',
    difficulty: 'مبتدئ',
    platform: 'all',
    tags: ['شبكات', 'requests', 'timeout', 'ssl'],
    code: `import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def safe_fetch(url: str):
    session = requests.Session()
    # ضبط استراتيجية إعادة المحاولة في حال الأخطاء المؤقتة
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[502, 503, 504])
    session.mount('https://', HTTPAdapter(max_retries=retries))

    try:
        # فرض مهلة صارمة (3 ثوان للاتصال، 5 ثوان للقراءة) وفحص شهادة SSL
        response = session.get(url, timeout=(3.0, 5.0), verify=True)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.SSLError:
        print("خطأ أمني: فشل التحقق من شهادة التشفير SSL!")
    except requests.exceptions.Timeout:
        print("خطأ: استغرق الخادم وقتاً أطول من المسموح (Timeout)")
    except requests.exceptions.RequestException as e:
        print(f"خطأ في الطلب الشبكي: {e}")
    return None`,
    explanation: 'عدم تحديد timeout في الطلبات الشبكية قد يؤدي إلى استنزاف الخيوط البرمجية وتوقف التطبيق كلياً عند استهداف روابط بطيئة عمداً (Slowloris).'
  },
  {
    id: 'py-ip-validation',
    title: 'التحقق الصارم من صحة عناوين IPv4 و IPv6 وعزل الشبكات الخاصة',
    description: 'فحص عنوان IP والتأكد من أنه عام وليس محلياً للوقاية من ثغرات SSRF (Server-Side Request Forgery).',
    language: 'python',
    category: 'security',
    difficulty: 'متوسط',
    platform: 'all',
    tags: ['ssrf', 'ipaddress', 'تحقق', 'أمن'],
    isDefensiveSecurity: true,
    code: `import ipaddress

def is_safe_public_ip(ip_str: str) -> bool:
    """التحقق من أن العنوان عام وليس محلياً أو مخصصاً للشبكات الداخلية"""
    try:
        ip_obj = ipaddress.ip_address(ip_str.strip())
        # التحقق من أن العنوان ليس خاصاً أو محلياً أو حلقياً (Loopback)
        if ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_reserved:
            return False
        return True
    except ValueError:
        return False

# اختبارات
print("8.8.8.8 عام وآمن:", is_safe_public_ip("8.8.8.8"))        # True
print("192.168.1.1 محلي غير آمن:", is_safe_public_ip("192.168.1.1")) # False
print("127.0.0.1 داخلي غير آمن:", is_safe_public_ip("127.0.0.1")) # False`,
    explanation: 'تساعد هذه الدالة في منع ثغرات SSRF عندما يطلب الخادم روابط يقدمها المستخدم ويوجهها نحو الخدمات الداخلية (مثل 169.254.169.254 الخاص ببيانات السحابة).'
  },

  // --- JAVASCRIPT / TYPESCRIPT SNIPPETS ---
  {
    id: 'js-xss-sanitize',
    title: 'تطهير نصوص HTML لمنع هجمات XSS في الواجهات الأمامية',
    description: 'ترميز المحارف الخاصة (<, >, &, ", \') قبل إضافتها للـ DOM لمنع تشغيل أكواد نصية غير مصرح بها.',
    language: 'javascript',
    category: 'web_dev',
    difficulty: 'مبتدئ',
    platform: 'browser',
    tags: ['xss', 'escaping', 'front-end', 'أمان'],
    isDefensiveSecurity: true,
    code: `function escapeHtml(unsafeText) {
    if (!unsafeText) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(unsafeText).replace(/[&<>"']/g, (char) => map[char]);
}

// تجربة الكود
const userComment = '<script>alert("Hacked!")</script> مرحباً بكم';
const safeOutput = escapeHtml(userComment);
console.log("النص المطهر الآمن للعرض:");
console.log(safeOutput);`,
    explanation: 'استبدال العلامات البرمجية بمكافئاتها النصية يمنع محرك المتصفح من تفسير النص كوسم تنفيذي.',
    securityWarning: 'عند بناء تطبيقات React الحديثة، يقوم محرك JSX بتطبيق الترميز تلقائياً، ولكن تجنب استخدام dangerouslySetInnerHTML تماماً إلا بعد تعقيم صارم.'
  },
  {
    id: 'ts-secure-cookie-options',
    title: 'إعدادات الكوكيز الآمنة في خوادم Node.js / Express',
    description: 'تطبيق الترويسات الدفاعية لمنع سرقة رموز الجلسات وحمايتها من هجمات MITM و CSRF.',
    language: 'typescript',
    category: 'security',
    difficulty: 'مبتدئ',
    platform: 'all',
    tags: ['cookies', 'express', 'httponly', 'samesite'],
    isDefensiveSecurity: true,
    code: `import { CookieOptions } from 'express';

export const SECURE_SESSION_COOKIE: CookieOptions = {
  httpOnly: true,     // يمنع كلياً قراءة الكوكي بواسطة JavaScript (حماية من XSS)
  secure: process.env.NODE_ENV === 'production', // يرسل الكوكي فقط عبر بروتوكول HTTPS المشفر
  sameSite: 'strict', // يمنع إرسال الكوكي مع الطلبات القادمة من مواقع خارجية (حماية من CSRF)
  maxAge: 1000 * 60 * 60 * 24, // انتهاء الجلسة بعد 24 ساعة
  path: '/',
};

// طريقة الاستخدام:
// res.cookie('session_token', token, SECURE_SESSION_COOKIE);`,
    explanation: 'تفعيل خيار httpOnly و sameSite هو المعيار الذهبي لحماية بيانات اعتماد المستخدمين من السرقة عن بُعد.'
  },
  {
    id: 'ts-input-schema-validation',
    title: 'التحقق الصارم من مدخلات واجهات البرمجة (Input Validation)',
    description: 'فحص نوع وحجم وتنسيق كل حقل وارد من العميل لمنع استغلال الثغرات وتمرير البيانات غير الصالحة.',
    language: 'typescript',
    category: 'web_dev',
    difficulty: 'متوسط',
    platform: 'all',
    tags: ['typescript', 'validation', 'api', 'defense'],
    code: `interface UserRegistrationInput {
  username: string;
  email: string;
  age: number;
}

function validateRegistration(input: any): { isValid: boolean; error?: string } {
  if (!input || typeof input !== 'object') {
    return { isValid: false, error: 'المدخلات غير صالحة' };
  }

  // فحص اسم المستخدم (أحرف وأرقام فقط وطول محدد)
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(input.username)) {
    return { isValid: false, error: 'اسم المستخدم يجب أن يتكون من 3-20 حرفاً إنجليزياً أو رقماً فقط' };
  }

  // فحص البريد الإلكتروني
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(input.email)) {
    return { isValid: false, error: 'صيغة البريد الإلكتروني غير صحيحة' };
  }

  return { isValid: true };
}`,
    explanation: 'تنقية المدخلات في الطبقة الأولى يمنع وصول الحمولات الضارة إلى قواعد البيانات أو محركات القوالب.'
  },

  // --- BASH / SHELL / LINUX / TERMUX SNIPPETS ---
  {
    id: 'sh-backup-compress-hash',
    title: 'سكربت نسخ احتياطي مؤتمت مع التشفير والتحقق من البصمة',
    description: 'ضغط ملفات المشروع وإنشاء سجل تدقيق وبصمة SHA-256 للتأكد من نزاهة النسخة الاحتياطية.',
    language: 'bash',
    category: 'system_admin',
    difficulty: 'متوسط',
    platform: 'linux',
    tags: ['backup', 'tar', 'sha256', 'automation'],
    code: `#!/bin/bash
set -euo pipefail # إيقاف السكربت فوراً عند حدوث أي خطأ لضمان الأمان

BACKUP_DIR="/var/backups/project"
SOURCE_DIR="/var/www/html"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="backup_$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "[+] جاري إنشاء النسخة الاحتياطية لـ $SOURCE_DIR..."
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" "$SOURCE_DIR"

# حساب بصمة النزاهة وحفظها بجانب الملف
echo "[+] جاري حساب بصمة SHA-256..."
sha256sum "$BACKUP_DIR/$ARCHIVE_NAME" > "$BACKUP_DIR/$ARCHIVE_NAME.sha256"

# حماية صلاحيات ملف النسخ الاحتياطي
chmod 600 "$BACKUP_DIR/$ARCHIVE_NAME"

echo "[✓] تمت العملية بنجاح! الملف: $BACKUP_DIR/$ARCHIVE_NAME"`,
    explanation: 'استخدام set -euo pipefail يضمن عدم اكتمال السكربت إذا فشلت إحدى خطوات الضغط أو الحفظ.'
  },
  {
    id: 'sh-detect-suspicious-ssh',
    title: 'فحص محاولات تسجيل الدخول الفاشلة إلى الخادم (SSH Audit)',
    description: 'قراءة سجلات auth.log وحصر عناوين IP التي تحاول تخمين كلمات المرور بكثرة.',
    language: 'bash',
    category: 'security',
    difficulty: 'متوسط',
    platform: 'linux',
    tags: ['ssh', 'audit', 'logs', 'grep'],
    isDefensiveSecurity: true,
    code: `#!/bin/bash
# استخراج أكثر 10 عناوين IP حاولت تسجيل الدخول بكلمات مرور خاطئة
LOG_FILE="/var/log/auth.log"

if [ ! -f "$LOG_FILE" ]; then
    echo "ملف السجل غير موجود في هذا المسار، جرب /var/log/secure"
    exit 1
fi

echo "=== تقرير محاولات تسجيل الدخول الفاشلة (Failed SSH Logins) ==="
grep "Failed password" "$LOG_FILE" | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -n 10`,
    explanation: 'تساعد هذه الأداة مدراء الأنظمة في معرفة ما إذا كان السيرفر يتعرض لهجوم قوة غاشمة لتحديث قواعد الجدار الناري وحظر تلك العناوين.'
  },
  {
    id: 'termux-python-http-server',
    title: 'تشغيل خادم مشاركة ملفات محلي معزول داخل شبكة الجوال',
    description: 'مشاركة ملفاتك البرمجية بين الجوال والكمبيوتر بسرعة وأمان عبر شبكة Wi-Fi المحلية.',
    language: 'termux',
    category: 'termux_tools',
    difficulty: 'مبتدئ',
    platform: 'termux',
    tags: ['termux', 'server', 'python', 'wifi'],
    code: `# الانتقال إلى المجلد المراد مشاركته
cd ~/my_project

# معرفة عنوان IP الخاص بالجوال في الشبكة المحلية
ip route get 1.1.1.1 | awk '{print $7}'

# تشغيل خادم ويب بايثون خفيف على المنفذ 8080
python -m http.server 8080 --bind 0.0.0.0`,
    explanation: 'يمكنك فتح المتصفح على جهاز الكمبيوتر وكتابة IP الجوال مع :8080 لتصفح وتحميل ملفاتك دون الحاجة لكابلات.',
    securityWarning: 'لا تقم بتشغيل هذا الخادم على شبكات Wi-Fi العامة المفتوحة (مثل المقاهي) لحماية ملفاتك من اطلاع المتصلين معك.'
  },

  // --- GO (GOLANG) SNIPPETS ---
  {
    id: 'go-tls-server',
    title: 'خادم ويب مشفر فائق السرعة والأمان (TLS 1.3 Strict)',
    description: 'تشغيل خادم HTTP آمن في Go مع إجبار التشفير على أحدث معايير TLS 1.3 وتعطيل البروتوكولات القديمة.',
    language: 'go',
    category: 'security',
    difficulty: 'متقدم',
    platform: 'all',
    tags: ['go', 'tls', 'https', 'server'],
    isDefensiveSecurity: true,
    code: `package main

import (
	"crypto/tls"
	"fmt"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		fmt.Fprintf(w, \`{"status":"healthy","secure":true}\`)
	})

	// إعدادات التشفير الدفاعية الصارمة
	tlsConfig := &tls.Config{
		MinVersion: tls.VersionTLS13, // قبول TLS 1.3 فقط
		CurvePreferences: []tls.CurveID{
			tls.X25519,
			tls.CurveP256,
		},
	}

	server := &http.Server{
		Addr:         ":8443",
		Handler:      mux,
		TLSConfig:    tlsConfig,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	fmt.Println("جاري تشغيل الخادم الآمن على المنفذ 8443...")
	// server.ListenAndServeTLS("cert.pem", "key.pem")
}`,
    explanation: 'تحديد MinVersion لـ TLS 1.3 يمنع هجمات التراجع (Downgrade Attacks) التي تستغل ثغرات في إصدارات التشفير القديمة.'
  },

  // --- RUST SNIPPETS ---
  {
    id: 'rust-safe-file-integrity',
    title: 'التحقق من سلامة البيانات في لغة ريست بأمان ذاكرة صارم',
    description: 'الاستفادة من نظام الملكية (Ownership) في Rust لمنع ثغرات الوصول العشوائي للذاكرة وحساب الهاش.',
    language: 'rust',
    category: 'security',
    difficulty: 'متوسط',
    platform: 'all',
    tags: ['rust', 'memory-safety', 'crypto'],
    isDefensiveSecurity: true,
    code: `// في Cargo.toml أضف: sha2 = "0.10"
use sha2::{Sha256, Digest};

pub fn verify_integrity(data: &[u8], expected_hex_hash: &str) -> bool {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    
    let computed_hash = format!("{:x}", result);
    // المقارنة الزمنية الثابتة لمنع هجمات التوقيت
    computed_hash == expected_hex_hash
}

fn main() {
    let payload = b"Safe defense payload 2026";
    let hash = "cf9f6c7708b8b0e8c257855010a30b201f82245b780df244d5a999bb30b80988";
    
    let is_valid = verify_integrity(payload, hash);
    println!("هل البيانات مطابقة للهاش الأصلي؟ {}", is_valid);
}`,
    explanation: 'لغة Rust تضمن بطبيعتها خلو الكود من ثغرات طفحان الذاكرة الوسيطة (Buffer Overflow) واستخدام المتغيرات بعد تحريرها (Use-After-Free).'
  },

  // --- SQL DEFENSIVE SNIPPETS ---
  {
    id: 'sql-rls-policy',
    title: 'سياسة أمان على مستوى الصفوف (Row-Level Security - RLS)',
    description: 'عزل بيانات المستخدمين في قاعدة البيانات حتى لا يرى أي مستخدم سوى صفوفه الخاصة.',
    language: 'sql',
    category: 'database',
    difficulty: 'متقدم',
    platform: 'all',
    tags: ['sql', 'postgres', 'rls', 'defense'],
    isDefensiveSecurity: true,
    code: `-- 1. تفعيل سياسة الأمان على جدول المستندات الحساسة
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 2. إنشاء سياسة تسمح للمستخدم بقراءة مستنداته فقط
CREATE POLICY user_documents_isolation ON documents
    FOR ALL
    TO authenticated_users
    USING (owner_id = current_user_id())
    WITH CHECK (owner_id = current_user_id());

-- نتيجة: حتى لو نسي المبرمج كتابة WHERE owner_id = 123 في الاستعلام،
-- فإن محرك قاعدة البيانات نفسه سيحجب البيانات ويمنع تسريبها تلقائياً!`,
    explanation: 'تعتبر RLS أفضل استراتيجية دفاعية في العمق (Defense in Depth) لمنع تسريب البيانات حتى في حال وجود ثغرات في طبقة كود التطبيق.'
  },

  // --- C/C++ SAFE CODING ---
  {
    id: 'cpp-buffer-overflow-prevention',
    title: 'الوقاية من ثغرات طفحان الذاكرة (Buffer Overflow) في C/C++',
    description: 'مقارنة بين دالة strcpy الخطرة واستخدام strncpy_s والحد من أحجام المصفوفات.',
    language: 'cpp',
    category: 'security',
    difficulty: 'متوسط',
    platform: 'all',
    tags: ['c++', 'buffer-overflow', 'memory', 'امن'],
    isDefensiveSecurity: true,
    code: `#include <iostream>
#include <cstring>
#include <string>

void safe_string_copy(const char* untrusted_input) {
    // ❌ تجنب استخدام strcpy(dest, src) مطلقاً لأنها لا تفحص الحدود!
    
    // ✅ الطريقة الآمنة الحديثة:
    const size_t BUFFER_SIZE = 32;
    char safe_buffer[BUFFER_SIZE];

    // نسخ مع قصر الحد الأقصى وترك مساحة للمحرف الصفري '\\0'
    strncpy(safe_buffer, untrusted_input, BUFFER_SIZE - 1);
    safe_buffer[BUFFER_SIZE - 1] = '\\0'; // ضمان إغلاق السلسلة

    std::cout << "النص المحمي في الذاكرة: " << safe_buffer << std::endl;
}

int main() {
    const char* long_text = "هذا_نص_طويل_جداً_قد_يتسبب_في_انهيار_الذاكرة_إذا_لم_تتم_حمايته";
    safe_string_copy(long_text);
    return 0;
}`,
    explanation: 'عدم فحص طول السلاسل النصية في C/C++ كان السبب الرئيسي لأكثر من 70% من الثغرات الحرجة التاريخية في أنظمة التشغيل.',
    securityWarning: 'في C++ الحديثة يفضل دائماً استخدام std::string بدلاً من مؤشرات char* الخام.'
  },

  // --- DOCKER SECURE CONTAINERFILE ---
  {
    id: 'docker-hardened-container',
    title: 'ملف Dockerfile مصفح أمنياً بتشغيل مستخدم بدون صلاحيات جذر (Non-Root)',
    description: 'بناء حاويات تطبيقات معزولة ومحمية تمنع المهاجم من السيطرة على الخادم حتى لو اخترق الحاوية.',
    language: 'docker',
    category: 'security',
    difficulty: 'متوسط',
    platform: 'linux',
    tags: ['docker', 'devsecops', 'hardening', 'containers'],
    isDefensiveSecurity: true,
    code: `# استخدام صورة أساسية صغيرة ومحدثة لتقليل مساحة الهجوم
FROM python:3.11-alpine AS base

# إنشاء مستخدم بنظام تشغيل بدون صلاحيات الجذر (Non-root user)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# نسخ وتثبيت التبعيات
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# نسخ كود التطبيق وتغيير المالك للمستخدم المحدود
COPY . .
RUN chown -R appuser:appgroup /app

# الانتقال للمستخدم غير المميز قبل التشغيل
USER appuser

EXPOSE 8080
CMD ["python", "app.py"]`,
    explanation: 'تشغيل الحاويات كمستخدم root يسهل هجمات الهروب من الحاوية (Container Escape)، بينما المستخدم المحدود يمنع الوصول لأجهزة النظام.'
  }
];
