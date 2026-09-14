import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Search, 
  Copy, 
  Check, 
  ShieldAlert, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  Braces,
  Terminal,
  Database,
  Boxes,
  Binary,
  Shield,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileCode2,
  Sparkles
} from 'lucide-react';
import { languagesList, functionsEncyclopedia, LanguageInfo, FunctionDetail } from '../data/languagesEncyclopediaData';
import { useLanguage } from '../context/LanguageContext';

export const LanguagesEncyclopedia: React.FC = () => {
  const { language, isAr, t } = useLanguage();
  const [selectedLangId, setSelectedLangId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLanguageCard, setActiveLanguageCard] = useState<string>('python');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedLineBreakdowns, setExpandedLineBreakdowns] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', labelAr: 'كافة التصنيفات', labelEn: 'All Categories' },
    { id: 'arrays_lists', labelAr: 'القوائم والمصفوفات', labelEn: 'Arrays & Lists' },
    { id: 'crypto_security', labelAr: 'الأمن والتشفير', labelEn: 'Crypto & Security' },
    { id: 'files_io', labelAr: 'الملفات والإدخال/الإخراج', labelEn: 'Files & System I/O' },
    { id: 'concurrency', labelAr: 'التزامن والـ Async', labelEn: 'Concurrency' },
    { id: 'strings', labelAr: 'معالجة النصوص', labelEn: 'Strings' },
    { id: 'built_in', labelAr: 'التحكم والأنماط', labelEn: 'Control & Patterns' },
    { id: 'database', labelAr: 'قواعد البيانات', labelEn: 'Databases' },
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
        const matchesWhat = (isAr ? fn.whatItDoes : fn.whatItDoesEn).toLowerCase().includes(q);
        const matchesSyntax = fn.syntax.toLowerCase().includes(q);
        const matchesLang = fn.language.toLowerCase().includes(q);
        return matchesName || matchesWhat || matchesSyntax || matchesLang;
      }
      return true;
    });
  }, [selectedLangId, selectedCategory, searchQuery, isAr]);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBreakdown = (id: string) => {
    setExpandedLineBreakdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
            <BookOpen className="w-3.5 h-3.5" /> 
            {isAr ? 'المرجع الموسوعي للغات البرمجة والدوال' : 'Programming Languages & Functions Encyclopedia'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isAr ? 'شرح معماريات اللغات البرمجية ومعجم وظائف الدوال' : 'Language Architectures & In-Depth Function Codex'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {isAr 
              ? 'دليل تحليلي شامل يوضح فلسفة كل لغة، نموذج تنفيذها، نقاط قوتها، استخداماتها الدفاعية، مع شرح تفصيلي سطر بسطر لكل دالة وما تفعله بالكامل.'
              : 'A comprehensive analytical guide breaking down language paradigms, execution mechanics, strengths, defense considerations, and line-by-line function mechanics.'}
          </p>
        </div>
      </div>

      {/* SECTION 1: LANGUAGE SELECTOR & SPECS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>{isAr ? 'معماريات وبيئات التشغيل للغات البرمجة' : 'Language Runtimes & Architecture Specifications'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {languagesList.length} {isAr ? 'لغات مدعومة' : 'Supported Languages'}
          </span>
        </div>

        {/* Language Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {languagesList.map((lang) => {
            const isActive = activeLanguageCard === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setActiveLanguageCard(lang.id)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col items-center sm:items-start gap-2 ${
                  isActive 
                    ? `bg-slate-900 ${lang.borderColor} ring-1 ring-cyan-400/30 shadow-lg` 
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${lang.color}`}>
                  {getLanguageIcon(lang.iconName)}
                </div>
                <div className="text-center sm:text-right w-full">
                  <span className="text-xs font-bold text-white block truncate">
                    {isAr ? lang.nameAr : lang.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {lang.fileExtension}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Language Detailed Sheet */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl bg-slate-950 border border-slate-800 ${currentLanguageDetail.color}`}>
                {getLanguageIcon(currentLanguageDetail.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold text-white">
                    {isAr ? currentLanguageDetail.nameAr : currentLanguageDetail.name}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">
                    ({currentLanguageDetail.name})
                  </span>
                </div>
                <p className="text-xs text-cyan-400 font-medium">
                  {isAr ? currentLanguageDetail.badge : currentLanguageDetail.badgeEn}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedLangId(currentLanguageDetail.id);
                const el = document.getElementById('functions-dictionary-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all self-start sm:self-auto"
            >
              {isAr ? `تصفح دوال ${currentLanguageDetail.nameAr} ↓` : `Browse ${currentLanguageDetail.name} Functions ↓`}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr ? currentLanguageDetail.overview : currentLanguageDetail.overviewEn}
          </p>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-bold block">
                {isAr ? 'نمط البرمجة (Paradigm):' : 'Programming Paradigm:'}
              </span>
              <span className="text-slate-200">
                {isAr ? currentLanguageDetail.paradigm : currentLanguageDetail.paradigmEn}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-bold block">
                {isAr ? 'نظام الأنواع (Type System):' : 'Type System:'}
              </span>
              <span className="text-slate-200">
                {isAr ? currentLanguageDetail.typing : currentLanguageDetail.typingEn}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-bold block">
                {isAr ? 'آلية التنفيذ (Execution):' : 'Execution Engine:'}
              </span>
              <span className="text-slate-200">
                {isAr ? currentLanguageDetail.execution : currentLanguageDetail.executionEn}
              </span>
            </div>
          </div>

          {/* Strengths & Best Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/70">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'أبرز نقاط القوة والميزات:' : 'Key Strengths & Architectural Advantages:'}</span>
              </h5>
              <ul className="space-y-2 text-xs text-slate-300">
                {(isAr ? currentLanguageDetail.strengths : currentLanguageDetail.strengthsEn).map((str, idx) => (
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
                <span>{isAr ? 'أفضل مجالات الاستخدام والتطبيق:' : 'Recommended Industry Use Cases:'}</span>
              </h5>
              <ul className="space-y-2 text-xs text-slate-300">
                {(isAr ? currentLanguageDetail.bestUseCases : currentLanguageDetail.bestUseCasesEn).map((use, idx) => (
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
              <span className="text-xs font-bold text-rose-300">
                {isAr 
                  ? `الاعتبارات الأمنية والدفاعية الخاصة بلغة ${currentLanguageDetail.nameAr}:` 
                  : `Security & Defensive Hardening Considerations for ${currentLanguageDetail.name}:`}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr ? currentLanguageDetail.securityFocus : currentLanguageDetail.securityFocusEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FUNCTIONS & METHODS ENCYCLOPEDIA */}
      <div id="functions-dictionary-section" className="space-y-6 pt-6 border-t border-slate-900">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" /> 
            {isAr ? 'معجم الدوال التفاعلي والتفكيك السطري' : 'Interactive Functions & Line-by-Line Breakdown'}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {isAr ? 'دليل الدوال وشرح ماذا تفعل كل دالة بالتفصيل' : 'Comprehensive Function Dictionary & Code Walkthroughs'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {isAr 
              ? 'ابحث عن أي دالة لمعرفة طريقة عملها بالكامل، المعاملات، نوع المخرج، والشفرة العملية مع التفكيك السطري والتنبيه الأمني.'
              : 'Search for any function to understand its purpose, parameters, return types, executable code, and line-by-line mechanics.'}
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
                placeholder={isAr ? "ابحث عن اسم دالة (مثل map, reduce, open)..." : "Search function name (e.g. map, reduce)..."}
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
                {isAr ? 'كافة اللغات' : 'All Languages'}
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
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Functions Grid */}
        {filteredFunctions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredFunctions.map((fn) => {
              const isBreakdownOpen = !!expandedLineBreakdowns[fn.id];
              return (
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
                          {isAr ? fn.categoryLabel : fn.categoryLabelEn}
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
                          <span className="text-emerald-400">{isAr ? 'تم نسخ المثال!' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>{isAr ? 'نسخ الكود' : 'Copy Code'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* What it does */}
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-1.5">
                    <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>{isAr ? 'ما الذي تقوم به هذه الدالة؟ (Function Core Purpose):' : 'What Does This Function Do? (Core Purpose):'}</span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {isAr ? fn.whatItDoes : fn.whatItDoesEn}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {isAr ? fn.deepExplanation : fn.deepExplanationEn}
                    </p>
                  </div>

                  {/* Syntax & Parameters */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Syntax & Return */}
                    <div className="space-y-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block mb-1">
                          {isAr ? 'الصيغة البرمجية (Syntax):' : 'Syntax Specification:'}
                        </span>
                        <code className="block bg-slate-900 p-2.5 rounded-xl font-mono text-cyan-300 text-xs break-all" dir="ltr">
                          {fn.syntax}
                        </code>
                      </div>

                      <div>
                        <span className="text-slate-400 font-bold block mb-1">
                          {isAr ? 'القيمة المرجعة (Return Value):' : 'Return Value:'}
                        </span>
                        <div className="bg-slate-900 p-2.5 rounded-xl text-slate-300 flex items-center gap-2">
                          <span className="font-mono text-amber-300 font-semibold">{fn.returnValue.type}</span>
                          <span>• {isAr ? fn.returnValue.description : (fn.returnValue.descriptionEn || fn.returnValue.description)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Parameters Table */}
                    <div className="space-y-2 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50 text-xs">
                      <span className="text-slate-400 font-bold block">
                        {isAr ? 'معاملات الدالة المدخلة (Parameters):' : 'Parameters & Arguments:'}
                      </span>
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {fn.parameters.map((p, idx) => (
                          <div key={idx} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold" dir="ltr">
                              <span>{p.name}</span>
                              <span className="text-[10px] text-slate-400 font-normal">({p.type})</span>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-0.5">
                              {isAr ? p.description : (p.descriptionEn || p.description)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Practical Code Example */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold flex items-center gap-1.5">
                        <FileCode2 className="w-4 h-4 text-cyan-400" />
                        {isAr ? 'مثال تطبيقي كامل:' : 'Executable Working Example:'}
                      </span>
                      <button
                        onClick={() => toggleBreakdown(fn.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {isBreakdownOpen 
                            ? (isAr ? 'إخفاء الشرح السطري للكود' : 'Hide Line Breakdown') 
                            : (isAr ? '🔍 شرح تفصيلي لأسطر الكود سطر بسطر' : '🔍 Line-by-Line Code Breakdown')}
                        </span>
                        {isBreakdownOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed" dir="ltr">
                      {fn.codeExample}
                    </pre>

                    {/* Interactive Line-by-Line Breakdown Drawer */}
                    {isBreakdownOpen && (
                      <div className="bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-4 space-y-3 animate-fadeIn">
                        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 border-b border-slate-800 pb-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{isAr ? 'التفكيك والتحليل الشامل لأسطر الكود البرمجي:' : 'Deep Line-by-Line Code Breakdown & Explanation:'}</span>
                        </div>
                        <div className="space-y-2.5">
                          {fn.lineBreakdown.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-800">
                                  Line #{idx + 1}
                                </span>
                                <code className="font-mono text-xs text-amber-300 truncate" dir="ltr">
                                  {item.line}
                                </code>
                              </div>
                              <p className="text-xs text-slate-200 leading-relaxed pr-2">
                                {isAr ? item.commentAr : item.commentEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Security Advice & Common Mistake */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs flex items-start gap-2 text-slate-300">
                      <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-300 block">
                          {isAr ? 'نصيحة أمنية دفاعية:' : 'Defensive Security Tip:'}
                        </span>
                        <span>{isAr ? fn.securityTip : fn.securityTipEn}</span>
                      </div>
                    </div>

                    {fn.commonMistake && (
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs flex items-start gap-2 text-slate-300">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300 block">
                            {isAr ? 'خطأ شائع يجب تفاديه:' : 'Common Pitfall to Avoid:'}
                          </span>
                          <span>{isAr ? fn.commonMistake : fn.commonMistakeEn}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
            <p className="text-slate-400 text-sm">
              {isAr ? 'لم يتم العثور على دوال مطابقة لبحثك.' : 'No matching functions found for your query.'}
            </p>
            <button
              onClick={() => { setSelectedLangId('all'); setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              {isAr ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
