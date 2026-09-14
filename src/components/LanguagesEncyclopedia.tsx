import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Search, 
  Copy, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  Braces,
  Terminal,
  Database,
  Boxes,
  Binary,
  Shield,
  BookOpen
} from 'lucide-react';
import { languagesList, functionsEncyclopedia, LanguageInfo, FunctionDetail } from '../data/languagesEncyclopediaData';

export const LanguagesEncyclopedia: React.FC = () => {
  const [selectedLangId, setSelectedLangId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLanguageCard, setActiveLanguageCard] = useState<string>('python');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كافة التصنيفات' },
    { id: 'arrays_lists', label: 'القوائم والمصفوفات' },
    { id: 'crypto_security', label: 'الأمن والتشفير' },
    { id: 'files_io', label: 'الملفات والإدخال/الإخراج' },
    { id: 'concurrency', label: 'التزامن والـ Async' },
    { id: 'strings', label: 'معالجة النصوص' },
    { id: 'built_in', label: 'التحكم والأنماط' },
    { id: 'database', label: 'قواعد البيانات' },
  ];

  // Filtered functions
  const filteredFunctions = useMemo(() => {
    return functionsEncyclopedia.filter(fn => {
      if (selectedLangId !== 'all' && fn.languageId !== selectedLangId) {
        return false;
      }
      if (selectedCategory !== 'all' && fn.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = fn.name.toLowerCase().includes(q);
        const matchesWhat = fn.whatItDoes.toLowerCase().includes(q);
        const matchesSyntax = fn.syntax.toLowerCase().includes(q);
        const matchesLang = fn.language.toLowerCase().includes(q);
        const matchesCat = fn.categoryLabel.toLowerCase().includes(q);
        return matchesName || matchesWhat || matchesSyntax || matchesLang || matchesCat;
      }
      return true;
    });
  }, [selectedLangId, selectedCategory, searchQuery]);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentLanguageDetail = useMemo(() => {
    return languagesList.find(l => l.id === activeLanguageCard) || languagesList[0];
  }, [activeLanguageCard]);

  const getLanguageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Braces': return <Braces className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Binary': return <Binary className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto py-4">
      {/* Intro Header */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute left-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> المرجع الموسوعي للغات البرمجة والدوال
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            شرح معماريات اللغات البرمجية ومعجم وظائف الدوال
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            دليل تحليلي شامل يوضح فلسفة كل لغة، نموذج تنفيذها، نقاط قوتها، استخداماتها الدفاعية، 
            مع فهرس موسوعي تفاعلي لكل دالة: صياغتها (Syntax)، معاملاتها، مخرجاتها، شرح ما تقوم به، وأثرها الأمني.
          </p>
        </div>
      </div>

      {/* SECTION 1: LANGUAGE DEEP-DIVE CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>اختر اللغة لاستعراض تفاصيلها ومعماريتها:</span>
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">اضغط على أي لغة لقراءة تفاصيل بنيتها التحتية</span>
        </div>

        {/* Language selector chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {languagesList.map((lang) => {
            const isActive = activeLanguageCard === lang.id;
            return (
              <button
                key={lang.id}
                id={`lang-select-${lang.id}`}
                onClick={() => setActiveLanguageCard(lang.id)}
                className={`p-3 rounded-2xl border text-right flex flex-col justify-between gap-2 transition-all ${
                  isActive
                    ? 'bg-slate-800/90 border-cyan-400 shadow-md ring-1 ring-cyan-400/40 text-white'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`p-1.5 rounded-lg ${lang.bgColor} ${lang.color}`}>
                    {getLanguageIcon(lang.iconName)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{lang.fileExtension}</span>
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{lang.nameAr}</div>
                  <div className="text-[10px] font-mono text-slate-400">{lang.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Language In-Depth Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl ${currentLanguageDetail.bgColor} ${currentLanguageDetail.borderColor} border flex items-center justify-center ${currentLanguageDetail.color}`}>
                {getLanguageIcon(currentLanguageDetail.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-white">{currentLanguageDetail.nameAr} ({currentLanguageDetail.name})</h4>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
                    {currentLanguageDetail.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">امتداد الملفات: <code className="text-cyan-300 font-mono">{currentLanguageDetail.fileExtension}</code></p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedLangId(currentLanguageDetail.id);
                const el = document.getElementById('functions-dictionary-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold self-start lg:self-auto flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>استعراض دوال {currentLanguageDetail.nameAr} في المعجم ↓</span>
            </button>
          </div>

          {/* Architecture Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-bold block">نموذج البرمجة (Paradigm):</span>
              <span className="text-slate-200 font-medium">{currentLanguageDetail.paradigm}</span>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-bold block">نظام تحديد الأنواع (Typing):</span>
              <span className="text-slate-200 font-medium">{currentLanguageDetail.typing}</span>
            </div>
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-bold block">آلية التنفيذ (Execution Model):</span>
              <span className="text-slate-200 font-medium">{currentLanguageDetail.execution}</span>
            </div>
          </div>

          {/* Overview text */}
          <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="font-semibold text-white mb-1.5">نظرة عامة وفلسفة التصميم:</p>
            {currentLanguageDetail.overview}
          </div>

          {/* Strengths & Best Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/70">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>أبرز نقاط القوة والميزات:</span>
              </h5>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentLanguageDetail.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/70">
              <h5 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>أفضل مجالات الاستخدام والتطبيق:</span>
              </h5>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentLanguageDetail.bestUseCases.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Security gotcha */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-300">الاعتبارات الأمنية والدفاعية الخاصة بلغة {currentLanguageDetail.nameAr}:</span>
              <p className="text-xs text-slate-300 leading-relaxed">{currentLanguageDetail.securityFocus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FUNCTIONS & METHODS ENCYCLOPEDIA */}
      <div id="functions-dictionary-section" className="space-y-6 pt-6 border-t border-slate-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" /> معجم الدوال التفاعلي
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            دليل الدوال وشرح ماذا تفعل كل دالة بالتفصيل
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            ابحث عن أي دالة لمعرفة طريقة عملها بالكامل، المعاملات، نوع المخرج، والشفرة العملية مع التنبيه الأمني.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن اسم دالة (مثل map, reduce, open)..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-200 outline-none"
              />
            </div>

            {/* Language filter pills */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              <button
                onClick={() => setSelectedLangId('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedLangId === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                كافة اللغات
              </button>
              {languagesList.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLangId(lang.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedLangId === lang.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800/60">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-700 text-white font-bold border border-slate-600'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Functions Grid */}
        {filteredFunctions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredFunctions.map((fn) => (
              <div 
                key={fn.id} 
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 hover:border-slate-700 transition-all shadow-md"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 text-[11px] font-mono border border-slate-700">
                        {fn.language}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400 text-[10px]">
                        {fn.categoryLabel}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold font-mono text-cyan-400" dir="ltr">
                      {fn.name}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopy(fn.codeExample, fn.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium self-start sm:self-auto transition-colors"
                  >
                    {copiedId === fn.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم نسخ المثال!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </button>
                </div>

                {/* What it does in plain Arabic */}
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span>ما الذي تقوم به هذه الدالة؟ (Function Core Purpose):</span>
                  </div>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {fn.whatItDoes}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {fn.deepExplanation}
                  </p>
                </div>

                {/* Syntax & Parameters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Syntax & Return */}
                  <div className="space-y-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">الصيغة البرمجية (Syntax):</span>
                      <code className="block bg-slate-900 p-2.5 rounded-xl font-mono text-cyan-300 text-xs break-all" dir="ltr">
                        {fn.syntax}
                      </code>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block mb-1">القيمة المرجعة (Return Value):</span>
                      <div className="bg-slate-900 p-2.5 rounded-xl text-slate-300 flex items-center gap-2">
                        <span className="font-mono text-amber-300 font-semibold">{fn.returnValue.type}</span>
                        <span>• {fn.returnValue.description}</span>
                      </div>
                    </div>
                  </div>

                  {/* Parameters Table */}
                  <div className="space-y-2 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 text-xs">
                    <span className="text-slate-400 font-bold block">معاملات الدالة المدخلة (Parameters):</span>
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {fn.parameters.map((p, idx) => (
                        <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                          <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold" dir="ltr">
                            <span>{p.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({p.type})</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Practical Code Example */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold">مثال تطبيقي كامل:</span>
                    <span className="text-[10px] font-mono text-slate-500">جاهز للتنفيذ والنسخ</span>
                  </div>
                  <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed" dir="ltr">
                    {fn.codeExample}
                  </pre>
                </div>

                {/* Security Advice & Common Mistake */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs flex items-start gap-2 text-slate-300">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-300 block">نصيحة أمنية دفاعية:</span>
                      <span>{fn.securityTip}</span>
                    </div>
                  </div>

                  {fn.commonMistake && (
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs flex items-start gap-2 text-slate-300">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300 block">خطأ شائع يجب تفاديه:</span>
                        <span>{fn.commonMistake}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
            <p className="text-slate-400 text-sm">لم يتم العثور على دوال مطابقة لبحثك.</p>
            <button
              onClick={() => { setSelectedLangId('all'); setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
