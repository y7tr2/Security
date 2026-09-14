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
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { termuxCommandsList } from '../data/termuxData';
import { TermuxCommandItem } from '../types';

export const TermuxStudio: React.FC = () => {
  const [platformFilter, setPlatformFilter] = useState<'all' | 'termux' | 'linux'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchCmd, setSearchCmd] = useState<string>('');
  const [showGuide, setShowGuide] = useState<boolean>(true);

  const handleCopy = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCommands = termuxCommandsList.filter((item) => {
    const matchesPlatform = 
      platformFilter === 'all' ||
      (platformFilter === 'termux' && item.platformTarget.includes('Termux')) ||
      (platformFilter === 'linux' && item.platformTarget.includes('لينكس'));
    
    const matchesSearch = 
      item.command.toLowerCase().includes(searchCmd.toLowerCase()) ||
      item.title.includes(searchCmd) ||
      item.description.includes(searchCmd);

    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Intro Header */}
      <div className="bg-gradient-to-l from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Smartphone className="w-3.5 h-3.5" /> طرفية Termux للهاتف والكمبيوتر
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            استوديو الطرفية: أوامر إدارة النظام، الشبكات، وتشغيل بايثون من الجوال
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            دليل عملي منظم يجمع الأوامر الأساسية لتطبيق Termux على أجهزة أندرويد وطرفيات لينكس للكمبيوتر، 
            مع التركيز على إدارة البيئة الآمنة، تشغيل سكربتات بايثون، وتدقيق المنافذ والعمليات.
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
              إرشادات تثبيت وتشغيل Termux بأمان على أندرويد (تحديث هام)
            </h3>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showGuide && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300 space-y-3 leading-relaxed">
            <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-500/30 text-amber-200">
              <strong className="block text-amber-300 mb-1">⚠️ تنبيه رسمي هام حول متجر Google Play:</strong>
              نسخة Termux الموجودة على Google Play متوقفة وقديمة ولا تستقبل التحديثات بسبب قيود SDK الخاصة بأندرويد.
              النسخة الرسمية والمدعومة حالياً يتم تحميلها من مستودع <strong>F-Droid</strong> المفتوح المصدر أو من صفحة المشروع الرسمية على GitHub.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">1. الخطوة الأولى: التحديث الفوري</span>
                بعد تثبيت التطبيق، أول أمر يجب كتابته دائماً هو:
                <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-cyan-300" dir="ltr">pkg update && pkg upgrade</code>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">2. تثبيت بايثون</span>
                لتشغيل أكواد بايثون على جوالك:
                <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-cyan-300" dir="ltr">pkg install python</code>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">3. تشغيل ملف برمجي</span>
                لتشغيل أي ملف بايثون قمت بإنشائه:
                <code className="block mt-1 p-1 bg-slate-900 rounded font-mono text-cyan-300" dir="ltr">python script.py</code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Commands Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlatformFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                platformFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              كافة الأجهزة
            </button>
            <button
              onClick={() => setPlatformFilter('termux')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                platformFilter === 'termux'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Termux الجوال</span>
            </button>
            <button
              onClick={() => setPlatformFilter('linux')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                platformFilter === 'linux'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>💻 لينكس / سيرفر</span>
            </button>
          </div>

          {/* Search */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={searchCmd}
              onChange={(e) => setSearchCmd(e.target.value)}
              placeholder="ابحث في الأوامر (مثل ss, chmod, python)..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500/50 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Commands Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCommands.map((cmd) => (
            <div
              key={cmd.id}
              id={`cmd-card-${cmd.id}`}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-medium inline-block mb-1.5">
                      {cmd.platformTarget}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {cmd.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border whitespace-nowrap ${
                    cmd.safetyLevel === 'آمن تماماً' 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                  }`}>
                    {cmd.safetyLevel}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cmd.description}
                </p>

                {/* Command Shell Box */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/90 relative group">
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
                      title="نسخ الأمر للطرفية"
                    >
                      {copiedId === cmd.id ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-white" /> منسوخ!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy className="w-3 h-3" /> نسخ
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Output Preview */}
                {cmd.outputPreview && (
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60 text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500 block text-[10px] mb-0.5">شكل المخرجات المتوقعة في الطرفية:</span>
                    <pre className="whitespace-pre-wrap leading-tight text-slate-300" dir="ltr">{cmd.outputPreview}</pre>
                  </div>
                )}
              </div>

              {/* Footer Note */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-300">ملاحظة أمنية: </strong>
                {cmd.notes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
