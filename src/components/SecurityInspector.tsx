import React, { useState } from 'react';
import { 
  Binary, 
  KeyRound, 
  ShieldCheck, 
  Copy, 
  Check, 
  Hash, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Code
} from 'lucide-react';

export const SecurityInspector: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'hasher' | 'password' | 'regex'>('hasher');

  // Hasher State
  const [inputText, setInputText] = useState<string>('System Defense 2026');
  const [computedSha256, setComputedSha256] = useState<string>('');
  const [verifyTargetHash, setVerifyTargetHash] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Password Inspector State
  const [passwordInput, setPasswordInput] = useState<string>('AdminSecure#2026!');

  // RegEx Tester State
  const [testString, setTestString] = useState<string>('admin_user123');
  const [regexPattern, setRegexPattern] = useState<string>('^[a-zA-Z0-9_]{3,20}$');

  // Compute SHA-256 in browser natively using Web Crypto API
  React.useEffect(() => {
    async function calculateHash() {
      if (!inputText) {
        setComputedSha256('');
        return;
      }
      try {
        const msgUint8 = new TextEncoder().encode(inputText);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setComputedSha256(hashHex);
      } catch (err) {
        console.error('Hash calculation error:', err);
      }
    }
    calculateHash();
  }, [inputText]);

  // Password strength calculator
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 20;
    if (pass.length >= 16) score += 15;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[a-z]/.test(pass)) score += 10;
    if (/[0-9]/.test(pass)) score += 10;
    if (/[^A-Za-z0-9]/.test(pass)) score += 10;

    let rating = 'ضعيف جداً';
    let color = 'text-rose-400';
    let barColor = 'bg-rose-500';

    if (score >= 80) {
      rating = 'فائق الأمان (معياري ممتاز)';
      color = 'text-emerald-400';
      barColor = 'bg-emerald-500';
    } else if (score >= 60) {
      rating = 'قوي ومقبول';
      color = 'text-cyan-400';
      barColor = 'bg-cyan-500';
    } else if (score >= 40) {
      rating = 'متوسط (بحاجة لتعزيز)';
      color = 'text-amber-400';
      barColor = 'bg-amber-500';
    }

    return { score, rating, color, barColor };
  };

  const passStats = calculatePasswordStrength(passwordInput);

  // Regex evaluation
  let isRegexValid = false;
  let regexError = '';
  try {
    const re = new RegExp(regexPattern);
    isRegexValid = re.test(testString);
  } catch (e: any) {
    regexError = e.message;
  }

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="bg-gradient-to-l from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
            <Binary className="w-3.5 h-3.5" /> مختبر الفحص الأمني السريع
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            أدوات التشفير والتدقيق الدفاعي المباشر
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            أدوات تفاعلية تعمل محلياً داخل المتصفح بنسبة 100% دون إرسال أي بيانات لخوادم خارجية: 
            حساب بصمات SHA-256 للتحقق من سلامة الأكواد والملفات، قياس مناعة كلمات المرور، واختبار فلاتر التطهير (Regex Sanitization).
          </p>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTool('hasher')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTool === 'hasher'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>حاسبة بصمة SHA-256</span>
        </button>

        <button
          onClick={() => setActiveTool('password')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTool === 'password'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>فاحص قوة كلمات المرور</span>
        </button>

        <button
          onClick={() => setActiveTool('regex')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTool === 'regex'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>فاحص التعابير النمطية (RegEx)</span>
        </button>
      </div>

      {/* TOOL 1: SHA-256 HASHER */}
      {activeTool === 'hasher' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              توليد ومقارنة بصمة التشفير (SHA-256 Checksum)
            </h3>
            <p className="text-xs text-slate-400">
              تستخدم للتحقق من أن كودك أو ملفك لم يتم تعديله أو التلاعب به أثناء النقل.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                النص أو الكود المراد توليد البصمة له:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-xl p-3 text-xs text-slate-200 outline-none font-mono"
                placeholder="اكتب أو الصق النص هنا..."
              />
            </div>

            {/* Computed Hash Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">البصمة المحسوبة (SHA-256 Output):</span>
                <button
                  onClick={() => handleCopy(computedSha256, 'sha256')}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  {copiedField === 'sha256' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'sha256' ? 'تم النسخ!' : 'نسخ الهاش'}</span>
                </button>
              </div>
              <div className="font-mono text-xs text-cyan-300 break-all select-all p-2 bg-slate-900/80 rounded-lg border border-slate-800" dir="ltr">
                {computedSha256 || '...'}
              </div>
            </div>

            {/* Verify against another hash */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                مقارنة مع هاش أصلي للتأكد من التطابق (Integrity Verification):
              </label>
              <input
                type="text"
                value={verifyTargetHash}
                onChange={(e) => setVerifyTargetHash(e.target.value.trim())}
                placeholder="الصق الهاش المعلن من المطور هنا لمقارنته..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                dir="ltr"
              />

              {verifyTargetHash && (
                <div className="pt-1">
                  {verifyTargetHash.toLowerCase() === computedSha256.toLowerCase() ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تطابق تام بنسبة 100%! الملف أو الكود سليم وموثوق تماماً ولم يتعرض لأي تعديل.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold bg-rose-950/30 p-2.5 rounded-lg border border-rose-500/30">
                      <XCircle className="w-4 h-4" />
                      <span>تحذير: الهاش غير متطابق! قد يكون الملف مختلفاً أو تم التلاعب به.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: PASSWORD STRENGTH & DEFENSE */}
      {activeTool === 'password' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-cyan-400" />
              محلل مناعة كلمات المرور ومقاومة التخمين (Password Entropy)
            </h3>
            <p className="text-xs text-slate-400">
              يقيس مدى مقاومة كلمة المرور لهجمات القوة الغاشمة (Brute Force) وجداول Rainbow Tables.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                أدخل كلمة مرور لاختبار معايير أمانها:
              </label>
              <input
                type="text"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-xl p-3 text-sm font-mono text-slate-200 outline-none"
                dir="ltr"
              />
            </div>

            {/* Score Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">مستوى الأمان المحسوب:</span>
                <span className={`font-bold ${passStats.color}`}>{passStats.rating} ({passStats.score}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${passStats.barColor}`} 
                  style={{ width: `${Math.min(100, passStats.score)}%` }}
                />
              </div>
            </div>

            {/* Defensive Criteria Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${passwordInput.length >= 12 ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                {passwordInput.length >= 12 ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
                <span>الطول لا يقل عن 12 خانة ({passwordInput.length} خانات حالياً)</span>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${/[A-Z]/.test(passwordInput) ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                {/[A-Z]/.test(passwordInput) ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
                <span>يحتوي على أحرف كبيرة (Uppercase A-Z)</span>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${/[0-9]/.test(passwordInput) ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                {/[0-9]/.test(passwordInput) ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
                <span>يحتوي على أرقام (0-9)</span>
              </div>

              <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${/[^A-Za-z0-9]/.test(passwordInput) ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                {/[^A-Za-z0-9]/.test(passwordInput) ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-600" />}
                <span>يحتوي على رموز خاصة (!@#$%^&*)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: REGEX DEFENSIVE SANITIZER */}
      {activeTool === 'regex' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-cyan-400" />
              فاحص التعابير النمطية لتطهير المدخلات (Input Sanitization RegEx)
            </h3>
            <p className="text-xs text-slate-400">
              اختبر القواعد النمطية لحجب المحارف الخبيثة وتأكيد مدخلات الاستمارات.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  التعبير النمطي (RegEx Pattern):
                </label>
                <input
                  type="text"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-xl p-2.5 text-xs font-mono text-cyan-300 outline-none"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  النص المراد فحصه (Test String):
                </label>
                <input
                  type="text"
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-xl p-2.5 text-xs font-mono text-slate-200 outline-none"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Ready Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400">قوالب جاهزة:</span>
              <button
                onClick={() => {
                  setRegexPattern('^[a-zA-Z0-9_]{3,20}$');
                  setTestString('valid_user99');
                }}
                className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
              >
                اسم مستخدم آمن (3-20 حرف/رقم)
              </button>
              <button
                onClick={() => {
                  setRegexPattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
                  setTestString('sec_admin@defense.org');
                }}
                className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
              >
                بريد إلكتروني
              </button>
              <button
                onClick={() => {
                  setRegexPattern('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
                  setTestString('192.168.1.1');
                }}
                className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
              >
                عنوان IPv4
              </button>
            </div>

            {/* Test Result */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              {regexError ? (
                <div className="text-xs text-rose-400 font-mono">خطأ في صياغة RegEx: {regexError}</div>
              ) : isRegexValid ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>المدخل مطابق للقاعدة بنجاح (Valid & Matched ✅)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <XCircle className="w-4 h-4" />
                  <span>المدخل غير مطابق للقاعدة أو تم رفضه (Invalid / Mismatched ❌)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
