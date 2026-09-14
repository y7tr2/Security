import React, { useState } from 'react';
import { 
  Crosshair, 
  Terminal, 
  ShieldCheck, 
  AlertTriangle, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Award, 
  RotateCcw,
  Code2,
  Lock,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  category: string;
  severity: 'حرج' | 'عالي' | 'متوسط';
  vulnerableCode: string;
  language: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    patchedCode: string;
  }[];
}

const challengesData: Challenge[] = [
  {
    id: 'c-sqli',
    title: 'تحدي حقن قواعد البيانات (SQL Injection)',
    category: 'قواعد البيانات والويب',
    severity: 'حرج',
    language: 'python',
    vulnerableCode: `def get_user_profile(username):
    # ❌ كود غير آمن يعتمد على دمج النصوص مباشرة
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchone()`,
    question: 'ما هو الخلل الأمني في الكود أعلاه وكيف يتم حله وفق أفضل ممارسات الحماية؟',
    options: [
      {
        id: 'opt-1',
        text: 'استبدال f-string بـ string concatenation باستخدام علامة +',
        isCorrect: false,
        explanation: 'الدمج بعلامة + لا يزال عرضة للحقن بنسبة 100% لأن البيانات تُدمج مباشرة في نص الاستعلام.',
        patchedCode: ''
      },
      {
        id: 'opt-2',
        text: 'استخدام الاستعلامات ذات المعاملات (Parameterized Queries / Prepared Statements)',
        isCorrect: true,
        explanation: 'ممتاز! الاستعلامات المعلمية تفصل بنية الاستعلام عن مدخلات المستخدم تماماً في محرك قاعدة البيانات، مما يجعل الحقن مستحيلاً.',
        patchedCode: `def get_user_profile(username):
    # ✅ كود محمي 100% باستخدام Parameterized Query
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    return cursor.fetchone()`
      },
      {
        id: 'opt-3',
        text: 'تحويل الحروف إلى حروف صغيرة (lowercase) قبل تنفيذ الاستعلام',
        isCorrect: false,
        explanation: 'تغيير حالة الأحرف لا يمنع هجمات SQL Injection إطلاقاً (مثل \' OR \'1\'=\'1).',
        patchedCode: ''
      }
    ]
  },
  {
    id: 'c-cmdi',
    title: 'تحدي حقن أوامر نظام التشغيل (Command Injection)',
    category: 'أمن الخوادم والنظام',
    severity: 'حرج',
    language: 'python',
    vulnerableCode: `import os

def ping_host(host_ip):
    # ❌ تشغيل أوامر النظام مباشرة عبر shell=True أو os.system
    os.system(f"ping -c 2 {host_ip}")`,
    question: 'إذا أدخل المهاجم "8.8.8.8; cat /etc/passwd"، كيف نصلح الكود لمنع تنفيذ الأوامر المتعددة؟',
    options: [
      {
        id: 'opt-1',
        text: 'استخدام دالة subprocess.run مع تمرير المعاملات كمصفوفة وقفل shell=False والتحقق من IP',
        isCorrect: true,
        explanation: 'إجابة صحيحة جداً! تمرير المعاملات كمصفوفة List يمنع قشرة النظام (Shell) من تفسير الرموز مثل الفاصلة المنقوطة أو الأنابيب.',
        patchedCode: `import subprocess
import ipaddress

def ping_host(host_ip):
    # ✅ التحقق الصارم من نوع البيانات
    ipaddress.ip_address(host_ip)
    # ✅ استدعاء بدون غلاف صريح (shell=False)
    subprocess.run(["ping", "-c", "2", host_ip], check=True, shell=False)`
      },
      {
        id: 'opt-2',
        text: 'إزالة المسافات من مدخل host_ip فقط',
        isCorrect: false,
        explanation: 'المهاجم يمكنه استخدام رموز مثل ${IFS} في لينكس لتخطي فلتر المسافات بسهولة.',
        patchedCode: ''
      }
    ]
  },
  {
    id: 'c-xss',
    title: 'تحدي الثغرات العابرة للمواقع (Stored / Reflected XSS)',
    category: 'تطبيقات الويب والواجهات',
    severity: 'عالي',
    language: 'javascript',
    vulnerableCode: `// ❌ إدراج مدخلات المستخدم مباشرة داخل DOM
function showUserComment(commentText) {
  document.getElementById('comments').innerHTML = '<p>' + commentText + '</p>';
}`,
    question: 'كيف نقوم بحماية المتصفح من تشغيل سكربتات خبيثة عند عرض التعليق؟',
    options: [
      {
        id: 'opt-1',
        text: 'استخدام textContent بدلاً من innerHTML أو ترميز الكيانات (HTML Entity Encoding)',
        isCorrect: true,
        explanation: 'رائع! خاصية textContent تعامل المدخل كنص خام خالص ولا تقوم أبداً بتفسيره ككود HTML أو وسم <script>.',
        patchedCode: `// ✅ آمن تماماً: معاملة المدخل كنص خام
function showUserComment(commentText) {
  const p = document.createElement('p');
  p.textContent = commentText;
  document.getElementById('comments').appendChild(p);
}`
      },
      {
        id: 'opt-2',
        text: 'استبدال كلمة "script" بكلمة فارغة باستخدام replace()',
        isCorrect: false,
        explanation: 'فلترة كلمة واحدة غير كافية، المهاجم يمكنه كتابة <img src=x onerror=alert(1)> أو <scr<script>ipt>.',
        patchedCode: ''
      }
    ]
  }
];

const simulatedTerminalCommands = [
  {
    cmd: 'nmap -sS -p 80,443,22 scanme.internal',
    label: 'فحص المنافذ الخفية (SYN Stealth Scan)',
    output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-14 18:45 UTC
Nmap scan report for scanme.internal (10.0.0.15)
Host is up (0.0012s latency).

PORT    STATE  SERVICE
22/tcp  open   ssh
80/tcp  closed http
443/tcp open   https

Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds.`,
    analysis: '✅ تم اكتشاف المنفذين 22 (SSH) و 443 (HTTPS) مفتوحين. المنفذ 80 مغلق مما يعزز التشفير الإجباري.'
  },
  {
    cmd: 'sha256sum backup.tar.gz',
    label: 'التحقق من سلامة الأرشيف والتوقيع الرقمي',
    output: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  backup.tar.gz`,
    analysis: '🔒 البصمة الرقمية مطابقة للشهادة الأصلية، لا توجد أي علامات تلاعب أو تعديل بالملف.'
  },
  {
    cmd: 'ufw status verbose',
    label: 'التحقق من حالة الجدار الناري المدافع',
    output: `Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)
New profiles: skip

To                         Action      From
--                         ------      ----
22/tcp (SSH)               LIMIT       Anywhere
443/tcp (HTTPS)            ALLOW IN    Anywhere
80/tcp (HTTP)              DENY IN     Anywhere`,
    analysis: '🛡️ الجدار الناري مضبوط بدقة: المنفذ 22 مقيد بمعدل الطلبات لمنع هجمات Brute Force.'
  }
];

export const CyberLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'challenges' | 'simulator'>('challenges');
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Simulator state
  const [terminalInput, setTerminalInput] = useState('nmap -sS -p 80,443,22 scanme.internal');
  const [terminalLogs, setTerminalLogs] = useState<{ cmd: string; output: string; analysis: string; time: string }[]>([
    {
      cmd: 'nmap -sS -p 80,443,22 scanme.internal',
      output: simulatedTerminalCommands[0].output,
      analysis: simulatedTerminalCommands[0].analysis,
      time: '18:45:00'
    }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  const challenge = challengesData[currentChallengeIdx];

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswered) return;
    setIsAnswered(true);

    const chosen = challenge.options.find(o => o.id === selectedOptionId);
    if (chosen && chosen.isCorrect) {
      if (!completedChallenges.includes(challenge.id)) {
        setScore(prev => prev + 100);
        setCompletedChallenges(prev => [...prev, challenge.id]);
      }
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCurrentChallengeIdx((prev) => (prev + 1) % challengesData.length);
  };

  const handleRunSimulator = () => {
    if (!terminalInput.trim() || isSimulating) return;
    setIsSimulating(true);

    const matchingCmd = simulatedTerminalCommands.find(c => 
      terminalInput.toLowerCase().includes(c.cmd.split(' ')[0])
    ) || {
      cmd: terminalInput,
      output: `[SIMULATED EXECUTION] ${terminalInput}\nExit Code: 0 (SUCCESS)\nPrivilege: Sandbox (Non-root user)\nStatus: Command verified under security policy.`,
      analysis: '⚡ تم فحص وتنفيذ الأمر داخل البيئة الافتراضية الآمنة بنجاح.'
    };

    setTimeout(() => {
      setTerminalLogs(prev => [
        {
          cmd: terminalInput,
          output: matchingCmd.output,
          analysis: matchingCmd.analysis,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        },
        ...prev
      ]);
      setIsSimulating(false);
    }, 600);
  };

  const handleCopyPatched = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-l from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              <Crosshair className="w-3.5 h-3.5" /> مختبر الدفاع والأمان العملي
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              تحديات صيد الثغرات ومحاكي الطرفية التفاعلي
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              اختبر قدرتك على رصد الثغرات البرمجية وحلها بأعلى معايير OWASP، مع محاكي طرفية حي لتجربة أوامر الفحص والحماية.
            </p>
          </div>

          {/* Gamification Score Card */}
          <div className="flex items-center gap-3 bg-slate-950/90 border border-emerald-500/30 px-5 py-3 rounded-2xl shadow-inner self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-semibold">نقاط الدفاع المكتسبة</div>
              <div className="text-xl font-black text-emerald-400 font-mono">{score} XP</div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('challenges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'challenges'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>تحديات كشف الثغرات ({challengesData.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>محاكي الطرفية وفحص الأوامر</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CHALLENGES */}
      {activeSubTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Challenge Card */}
          <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  تحدي {currentChallengeIdx + 1} من {challengesData.length}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                  مستوى الخطورة: {challenge.severity}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                التصنيف: {challenge.category}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">{challenge.question}</p>
            </div>

            {/* Vulnerable Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-rose-400 font-bold px-1">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> الكود البرمجي المصاب:
                </span>
                <span className="text-slate-500 font-mono text-[11px] uppercase">{challenge.language}</span>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-rose-200 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                {challenge.vulnerableCode}
              </pre>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 block">اختر الترقيع الأمني الصحيح:</span>
              {challenge.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let borderStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 text-slate-200';
                
                if (isSelected && !isAnswered) {
                  borderStyle = 'border-cyan-500 bg-cyan-950/30 text-white ring-2 ring-cyan-500/30';
                } else if (isAnswered) {
                  if (opt.isCorrect) {
                    borderStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/30';
                  } else if (isSelected && !opt.isCorrect) {
                    borderStyle = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-2 ring-rose-500/30';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered}
                    className={`w-full text-right p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-3 ${borderStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isAnswered && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isAnswered && isSelected && !opt.isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                      {(!isAnswered || (!isSelected && !opt.isCorrect)) && (
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono ${
                          isSelected ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-bold' : 'border-slate-700 text-slate-500'
                        }`}>
                          {opt.id.replace('opt-', '')}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div>{opt.text}</div>
                      {isAnswered && (
                        <div className={`mt-2 text-xs pt-2 border-t font-normal leading-relaxed ${
                          opt.isCorrect ? 'border-emerald-500/30 text-emerald-300' : 'border-rose-500/30 text-rose-300'
                        }`}>
                          {opt.explanation}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId || isAnswered}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  selectedOptionId && !isAnswered
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                تأكيد الإجابة والتدقيق الأمني
              </button>

              {isAnswered && (
                <button
                  onClick={handleNextChallenge}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <span>التحدي التالي</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Patched Code View if Correct */}
            {isAnswered && challenge.options.find(o => o.id === selectedOptionId)?.isCorrect && (
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> الكود المحمي المعتمد (Secure Patch):
                  </span>
                  <button
                    onClick={() => handleCopyPatched(challenge.options.find(o => o.isCorrect)?.patchedCode || '')}
                    className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'تم النسخ' : 'نسخ الكود الآمن'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-emerald-500/20">
                  {challenge.options.find(o => o.isCorrect)?.patchedCode}
                </pre>
              </div>
            )}
          </div>

          {/* Sidebar: Challenge Roadmap */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>قائمة التحديات الدفاعية</span>
              </h4>
              <div className="space-y-2">
                {challengesData.map((c, idx) => {
                  const isDone = completedChallenges.includes(c.id);
                  const isCurrent = currentChallengeIdx === idx;

                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCurrentChallengeIdx(idx);
                        setSelectedOptionId(null);
                        setIsAnswered(false);
                      }}
                      className={`w-full text-right p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm'
                          : isDone
                          ? 'bg-slate-900/60 text-slate-300 border-emerald-500/20'
                          : 'bg-slate-900/30 text-slate-400 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500 font-mono shrink-0">
                            {idx + 1}
                          </div>
                        )}
                        <span className="truncate">{c.title.replace('تحدي ', '')}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        +100 XP
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                💡 جميع التحديات مأخوذة من حوادث اختراق حقيقية وثغرات OWASP Top 10 لتدريبك على كتابة كود دفاعي خالٍ من العيوب.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TERMINAL SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>محاكي الطرفية وفحص الأوامر والشبكات</span>
              </h3>
              <p className="text-xs text-slate-400">
                نفّذ أوامر الفحص والحماية في بيئة افتراضية تفاعلية مع تحليل فوري للمخرجات والأثر الأمني.
              </p>
            </div>

            {/* Quick Command Presets */}
            <div className="flex flex-wrap gap-1.5">
              {simulatedTerminalCommands.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setTerminalInput(item.cmd)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono transition-colors"
                >
                  {item.cmd.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Command Prompt Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-mono text-sm font-bold">
                $
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunSimulator()}
                placeholder="اكتب أمراً هنا (مثال: nmap -sS -p 80,443,22 scanme.internal)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/50 rounded-xl pr-8 pl-4 py-3 text-xs sm:text-sm font-mono text-emerald-300 placeholder-slate-600 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-left dir-ltr"
              />
            </div>
            <button
              onClick={handleRunSimulator}
              disabled={isSimulating}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isSimulating ? 'جارِ المحاكاة...' : 'تنفيذ'}</span>
            </button>
          </div>

          {/* Terminal Screen Output */}
          <div className="space-y-4">
            {terminalLogs.map((log, index) => (
              <div key={index} className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="dir-ltr">$ {log.cmd}</span>
                  </div>
                  <span>{log.time}</span>
                </div>

                <div className="p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/60 dir-ltr text-left overflow-x-auto">
                  {log.output}
                </div>

                <div className="p-3 bg-emerald-950/30 border-t border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{log.analysis}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
