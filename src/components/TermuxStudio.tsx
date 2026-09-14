import React, { useState } from 'react';
import { 
  Terminal, 
  Smartphone, 
  Laptop, 
  Copy, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Search
} from 'lucide-react';
import { termuxCommandsList } from '../data/termuxData';
import { useLanguage } from '../context/LanguageContext';

export const TermuxStudio: React.FC = () => {
  const { isAr } = useLanguage();
  const [platformFilter, setPlatformFilter] = useState<'all' | 'termux' | 'linux'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchCmd, setSearchCmd] = useState<string>('');
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [showPieceByPiece, setShowPieceByPiece] = useState<Record<string, boolean>>({});

  const handleCopy = (command: string, id: string) => {
    navigator.clipboard.writeText(command.trim());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePieceByPiece = (id: string) => {
    setShowPieceByPiece(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'all', labelAr: `كافة الأوامر (${termuxCommandsList.length})`, labelEn: `All (${termuxCommandsList.length})` },
    { id: 'termux_api', labelAr: '📱 عتاد Termux API', labelEn: '📱 Termux API' },
    { id: 'networking', labelAr: '🌐 شبكات و API والـ IP', labelEn: '🌐 Network & APIs' },
    { id: 'packages', labelAr: '📦 حزم ومستودعات', labelEn: '📦 Packages' },
    { id: 'python', labelAr: '🐍 بايثون للجوال', labelEn: '🐍 Python' },
    { id: 'nodejs_web', labelAr: '⚡ نود ويب وجافاسكريبت', labelEn: '⚡ Node & Web' },
    { id: 'files', labelAr: '🗂️ ملفات وتخزين', labelEn: '🗂️ Files & Storage' },
    { id: 'git_dev', labelAr: '🐙 Git ومشاريع', labelEn: '🐙 Git & Dev' },
    { id: 'monitoring', labelAr: '📊 معالج ومراقبة', labelEn: '📊 Monitoring' },
    { id: 'remote_ssh', labelAr: '🔒 اتصال SSH', labelEn: '🔒 Remote SSH' },
  ];

  const filteredCommands = termuxCommandsList.filter((item) => {
    const matchesPlatform = 
      platformFilter === 'all' ||
      (platformFilter === 'termux' && item.platformTarget.includes('Termux')) ||
      (platformFilter === 'linux' && item.platformTarget.includes('لينكس'));
    
    const matchesCategory = 
      categoryFilter === 'all' || item.category === categoryFilter;

    const matchesSearch = 
      item.command.toLowerCase().includes(searchCmd.toLowerCase()) ||
      item.title.includes(searchCmd) ||
      item.description.includes(searchCmd);

    return matchesPlatform && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Intro Header */}
      <div className="bg-gradient-to-l from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5" /> 
            <span>{isAr ? 'طرفية Termux للهاتف والكمبيوتر' : 'Termux & Linux Terminal Hub'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isAr 
              ? 'استوديو الطرفية: أوامر إدارة النظام، الشبكات، وتشغيل بايثون من الجوال' 
              : 'Terminal Studio: System Administration, Networking & Mobile Python'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {isAr 
              ? 'دليل عملي منظم يجمع الأوامر الأساسية لتطبيق Termux على أجهزة أندرويد وطرفيات لينكس للكمبيوتر، مع التركيز على إدارة البيئة الآمنة، تشغيل سكربتات بايثون، وتدقيق المنافذ والعمليات.'
              : 'Practical command codex for Termux on Android and Linux servers, emphasizing isolated development, process audits, and network inspection.'}
          </p>
        </div>
      </div>

      {/* Guide Accordion for Termux Setup */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
        <div 
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              {isAr 
                ? 'إرشادات تثبيت وتشغيل Termux بأمان على أندرويد (تحديث هام)' 
                : 'Security & Installation Guide for Android Termux'}
            </h3>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showGuide && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300 space-y-3 leading-relaxed">
            <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-500/30 text-amber-200">
              <strong className="block text-amber-300 mb-1">
                {isAr ? '⚠️ تنبيه رسمي هام حول حزم التطبيق:' : '⚠️ Important Package & Mirror Notice:'}
              </strong>
              {isAr 
                ? 'نسخة Termux الموجودة على Google Play متوقفة وقديمة ولا تستقبل التحديثات بسبب قيود SDK الخاصة بأندرويد. النسخة الرسمية والمدعومة حالياً يتم تحميلها من مستودع F-Droid المفتوح المصدر أو الموقع المعتمد للمشروع.'
                : 'The Google Play version of Termux is deprecated and unmaintained due to Android SDK restrictions. Always obtain official builds from verified F-Droid open-source repository packages.'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">
                  {isAr ? '1. الخطوة الأولى: التحديث الفوري' : '1. Initial Repository Upgrade'}
                </span>
                <p className="text-slate-400 text-[11px] mb-1">
                  {isAr ? 'بعد تثبيت التطبيق، أول أمر يجب كتابته دائماً هو:' : 'First command to run after clean installation:'}
                </p>
                <code className="block p-1 bg-slate-900 rounded font-mono text-cyan-300" dir="ltr">pkg update && pkg upgrade</code>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">
                  {isAr ? '2. تثبيت بايثون والأدوات' : '2. Install Python & Toolchain'}
                </span>
                <p className="text-slate-400 text-[11px] mb-1">
                  {isAr ? 'لتشغيل أكواد بايثون على هاتفك:' : 'Install python3 interpreter:'}
                </p>
                <code className="block p-1 bg-slate-900 rounded font-mono text-cyan-300" dir="ltr">pkg install python</code>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">
                  {isAr ? '3. تشغيل ملف برمجي' : '3. Execute Script File'}
                </span>
                <p className="text-slate-400 text-[11px] mb-1">
                  {isAr ? 'لتشغيل أي سكربت محفوظ:' : 'Execute your script directly:'}
                </p>
                <code className="block p-1 bg-slate-900 rounded font-mono text-cyan-300" dir="ltr">python script.py</code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setPlatformFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                platformFilter === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'كافة الأجهزة' : 'All Devices'}
            </button>
            <button
              onClick={() => setPlatformFilter('termux')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                platformFilter === 'termux'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isAr ? 'أوامر Termux للجوال' : 'Termux Mobile'}</span>
            </button>
            <button
              onClick={() => setPlatformFilter('linux')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                platformFilter === 'linux'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>{isAr ? 'طرفية لينكس والكمبيوتر' : 'Linux / PC'}</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className={`w-4 h-4 text-slate-500 absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              value={searchCmd}
              onChange={(e) => setSearchCmd(e.target.value)}
              placeholder={isAr ? "ابحث عن أمر أو وظيفة..." : "Filter command by keyword..."}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl ${isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500`}
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40 scale-102'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Network API & IP Quick Spotlight Box */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border border-cyan-500/40 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              🌐
            </span>
            <h3 className="text-sm font-bold text-white">
              {isAr ? 'أكواد وأوامر فحص API الشبكة والـ IP (نسخ حبة حبة للجوال)' : 'Network API & IP Tools (Copy-Ready For Mobile)'}
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800">
            {isAr ? 'جاهز للتنفيذ الفوري' : 'Ready To Run'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'net-1', title: isAr ? 'استخراج بيانات الشبكة بالكامل (JSON)' : 'Full Network JSON API', cmd: 'curl -s https://ipinfo.io/json' },
            { id: 'net-2', title: isAr ? 'معرفة الـ IP الخارجي فقط' : 'Public IP Only', cmd: 'curl -s ifconfig.me' },
            { id: 'net-3', title: isAr ? 'بيانات اتصال واي فاي الجوال' : 'Termux WiFi Info', cmd: 'termux-wifi-connectioninfo' },
            { id: 'net-4', title: isAr ? 'كود بايثون سريع لجلب الـ API' : 'Python 1-Liner Request', cmd: 'python -c "import requests; print(requests.get(\'https://ipinfo.io/json\').json())"' }
          ].map((item) => (
            <div key={item.id} className="bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 p-3 rounded-xl flex flex-col justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-300">{item.title}</span>
              <code className="text-[10px] font-mono text-cyan-300 bg-slate-900 p-1.5 rounded truncate select-all" dir="ltr">{item.cmd}</code>
              <button
                onClick={() => handleCopy(item.cmd, item.id)}
                className={`w-full py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  copiedId === item.id 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700 text-cyan-200 border border-slate-700'
                }`}
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === item.id ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ صافي' : 'Copy')}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCommands.map((cmd) => {
          // Check if command has sub-commands (contains && or ;)
          const subCommands = cmd.command.split(/&&|;/).map(s => s.trim()).filter(Boolean);
          const hasMultipleParts = subCommands.length > 1;

          return (
            <div 
              key={cmd.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-medium">
                      {cmd.platformTarget}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      {cmd.category}
                    </span>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    cmd.safetyLevel === 'آمن تماماً' 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                  }`}>
                    {cmd.safetyLevel}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {cmd.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cmd.description}
                </p>

                {/* Command Shell Box */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/90 relative group space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <pre className="font-mono text-xs text-cyan-300 overflow-x-auto select-all pr-2" dir="ltr">
                      <code>{cmd.command}</code>
                    </pre>

                    <button
                      onClick={() => handleCopy(cmd.command, cmd.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border shrink-0 transition-all ${
                        copiedId === cmd.id
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      }`}
                      title={isAr ? "نسخ الأمر كاملاً صافي" : "Copy command"}
                    >
                      {copiedId === cmd.id ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-white" /> {isAr ? 'منسوخ!' : 'Copied!'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" /> {isAr ? 'نسخ كامل' : 'Copy'}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Piece-by-piece (حبة حبة) expander if multiple parts exist */}
                  {hasMultipleParts && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                          ⚡ {isAr ? 'نسخ الأمر حبة حبة (خطوة بخطوة للجوال):' : 'Step-by-Step copy:'}
                        </span>
                        <button
                          onClick={() => togglePieceByPiece(cmd.id)}
                          className="text-[10px] text-slate-400 hover:text-white"
                        >
                          {showPieceByPiece[cmd.id] ? (isAr ? 'إخفاء' : 'Hide') : (isAr ? 'عرض الأجزاء' : 'Show Parts')}
                        </button>
                      </div>

                      {showPieceByPiece[cmd.id] && (
                        <div className="space-y-1.5 pt-1">
                          {subCommands.map((sub, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                              <span className="text-slate-400 shrink-0 text-[10px]">{isAr ? `خطوة ${idx + 1}:` : `Part ${idx + 1}:`}</span>
                              <span className="text-emerald-300 truncate" dir="ltr">{sub}</span>
                              <button
                                onClick={() => handleCopy(sub, `${cmd.id}-part-${idx}`)}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium border shrink-0 ${
                                  copiedId === `${cmd.id}-part-${idx}`
                                    ? 'bg-emerald-600 text-white border-emerald-500'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                                }`}
                              >
                                {copiedId === `${cmd.id}-part-${idx}` ? (isAr ? 'منسوخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Output Preview */}
                {cmd.outputPreview && (
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500 block text-[10px] mb-0.5">
                      {isAr ? 'شكل المخرجات المتوقعة في الطرفية:' : 'Expected Terminal Output:'}
                    </span>
                    <pre className="whitespace-pre-wrap leading-tight text-slate-300" dir="ltr">{cmd.outputPreview}</pre>
                  </div>
                )}
              </div>

              {/* Footer Note */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-300">{isAr ? 'ملاحظة أمنية: ' : 'Security Note: '}</strong>
                {cmd.notes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
