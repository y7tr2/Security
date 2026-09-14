import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  ShieldCheck, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles,
  Layers,
  HelpCircle,
  Play
} from 'lucide-react';
import { pythonBuiltInFunctions, pythonCoreLessons } from '../data/pythonData';
import { PythonFunctionDoc } from '../types';

export const PythonAcademy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [funcSearch, setFuncSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string>(pythonCoreLessons[0].id);
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كافة الدوال' },
    { id: 'security', label: '🛡️ دوال الأمان والتشفير' },
    { id: 'built-in', label: 'دوال مدمجة أساسية' },
    { id: 'io', label: 'الملفات والإدخال/الإخراج' },
    { id: 'dict', label: 'القواميس والبيانات' },
  ];

  const filteredFunctions = pythonBuiltInFunctions.filter((fn) => {
    const matchesCategory = selectedCategory === 'all' || fn.category === selectedCategory;
    const matchesSearch = 
      fn.name.toLowerCase().includes(funcSearch.toLowerCase()) ||
      fn.description.includes(funcSearch) ||
      fn.syntax.toLowerCase().includes(funcSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulateRun = (lessonCode: string) => {
    setSimulatedOutput('جاري تشغيل الكود في البيئة الافتراضية الآمنة...\n---------------------------------\nالمنافذ المعتمدة بعد التنقية: [80, 443, 8080, 22, 53]\nعملية الفحص مكتملة بنجاح ✅ (الذاكرة المستخدمة: 14KB)');
  };

  const activeLesson = pythonCoreLessons.find(l => l.id === activeLessonId) || pythonCoreLessons[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Intro Header */}
      <div className="bg-gradient-to-l from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> مسار إتقان بايثون والدوال البرمجية
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            مرجع لغة بايثون الشامل: الدوال، البنية، والبرمجة الدفاعية
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            تعلم لغة بايثون من الصفر حتى كتابة برمجيات وأدوات فحص دفاعية قوية. استكشف الدوال المدمجة الأكثر استخداماً، 
            وافهم الفروقات الجوهرية بين الأكواد الآمنة والخطيرة (مثل التحذير من eval واستخدام ast.literal_eval و secrets).
          </p>
        </div>
      </div>

      {/* Part 1: Core Python Interactive Lessons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">الدروس الأساسية والمفاهيم الجوهرية</h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            اضغط على الدرس للتطبيق والمشاهدة
          </span>
        </div>

        {/* Lesson Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {pythonCoreLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLessonId(lesson.id);
                setSimulatedOutput(null);
              }}
              className={`text-right p-3.5 rounded-xl border text-xs font-medium transition-all ${
                activeLessonId === lesson.id
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-md'
                  : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <span className="block font-bold mb-1 text-white">{lesson.title}</span>
              <span className="text-slate-400 line-clamp-2 text-[11px] leading-relaxed">{lesson.summary}</span>
            </button>
          ))}
        </div>

        {/* Active Lesson Code Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-300 font-mono flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeLesson.title}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSimulateRun(activeLesson.codeSnippet)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>تشغيل تجريبي</span>
              </button>
              <button
                onClick={() => handleCopy(activeLesson.codeSnippet, activeLesson.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                {copiedId === activeLesson.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === activeLesson.id ? 'تم النسخ!' : 'نسخ الكود'}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed select-all" dir="ltr">
            <code>{activeLesson.codeSnippet}</code>
          </pre>

          {simulatedOutput && (
            <div className="border-t border-slate-800 bg-slate-900/90 p-3.5 text-xs font-mono text-emerald-300">
              <div className="flex items-center justify-between mb-1 text-slate-400 text-[11px]">
                <span>المخرجات التفاعلية (Interactive Terminal Output):</span>
                <button onClick={() => setSimulatedOutput(null)} className="text-slate-500 hover:text-slate-300">إغلاق</button>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{simulatedOutput}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: Functions Encyclopedia */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              فهرس دوال بايثون (Functions Reference)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              توثيق مفصل للدوال الأساسية مع معاملات الدخل، القيم المرجعة، وأهم الممارسات الأمنية لكل دالة
            </p>
          </div>

          {/* Search inside functions */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={funcSearch}
              onChange={(e) => setFuncSearch(e.target.value)}
              placeholder="ابحث عن اسم دالة (مثل map, zip, hash)..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500/50 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Functions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredFunctions.map((fn) => (
            <div
              key={fn.name}
              id={`python-func-${fn.name.replace(/[^a-zA-Z0-9]/g, '')}`}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-md"
            >
              <div className="space-y-3">
                {/* Title & Syntax */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-amber-300 font-mono flex items-center gap-1.5" dir="ltr">
                      <code>{fn.name}</code>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {fn.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(fn.codeExample, fn.name)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs shrink-0 flex items-center gap-1"
                    title="نسخ المثال"
                  >
                    {copiedId === fn.name ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === fn.name ? 'منسوخ' : 'نسخ'}</span>
                  </button>
                </div>

                {/* Syntax Bar */}
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-[11px] text-cyan-300 overflow-x-auto" dir="ltr">
                  <code>{fn.syntax}</code>
                </div>

                {/* Parameters & Return */}
                <div className="text-[11px] space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                  <div className="text-slate-400">
                    <strong className="text-slate-300">المعاملات: </strong>
                    {fn.parameters.join(' • ')}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-300">القيمة المرجعة: </strong>
                    <span className="text-amber-200">{fn.returnValue}</span>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-slate-950 p-3 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800" dir="ltr">
                  <pre className="select-all leading-relaxed">
                    <code>{fn.codeExample}</code>
                  </pre>
                </div>
              </div>

              {/* Defensive Tip */}
              {fn.defensiveTip && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-start gap-2 text-[11px] text-emerald-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{fn.defensiveTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFunctions.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
            لم يتم العثور على دالة تطابق بحثك. جرب كتابة اسم آخر مثل <code>len</code> أو <code>open</code>.
          </div>
        )}
      </div>
    </div>
  );
};
