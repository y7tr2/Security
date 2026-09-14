/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Code2, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  Binary, 
  Filter, 
  Layers, 
  Sparkles, 
  Bookmark, 
  RotateCcw
} from 'lucide-react';
import { multiLanguageSnippets } from './data/snippetsData';
import { Language, Category, Difficulty } from './types';
import { Header, TabType } from './components/Header';
import { EthicalBanner } from './components/EthicalBanner';
import { SnippetCard } from './components/SnippetCard';
import { PythonAcademy } from './components/PythonAcademy';
import { CyberSecurityAcademy } from './components/CyberSecurityAcademy';
import { TermuxStudio } from './components/TermuxStudio';
import { SecurityInspector } from './components/SecurityInspector';
import { LanguagesEncyclopedia } from './components/LanguagesEncyclopedia';
import { AIAssistant } from './components/AIAssistant';
import { CyberLab } from './components/CyberLab';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('snippets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cyberdef_favs');
      return saved ? JSON.parse(saved) : ['py-hash-file', 'termux-pkg-update'];
    } catch {
      return ['py-hash-file'];
    }
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cyberdef_favs', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteIds]);

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const languagesList: { id: Language | 'all'; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'كافة اللغات', labelEn: 'All Languages' },
    { id: 'python', labelAr: 'Python', labelEn: 'Python' },
    { id: 'bash', labelAr: 'Bash / Linux', labelEn: 'Bash / Linux' },
    { id: 'termux', labelAr: 'Termux', labelEn: 'Termux' },
    { id: 'javascript', labelAr: 'JavaScript', labelEn: 'JavaScript' },
    { id: 'typescript', labelAr: 'TypeScript', labelEn: 'TypeScript' },
    { id: 'go', labelAr: 'Go', labelEn: 'Go' },
    { id: 'rust', labelAr: 'Rust', labelEn: 'Rust' },
    { id: 'sql', labelAr: 'SQL', labelEn: 'SQL' },
    { id: 'cpp', labelAr: 'C / C++', labelEn: 'C / C++' },
    { id: 'docker', labelAr: 'Docker', labelEn: 'Docker' },
  ];

  const categoriesList: { id: Category | 'all'; labelAr: string; labelEn: string }[] = [
    { id: 'all', labelAr: 'كافة التصنيفات', labelEn: 'All Categories' },
    { id: 'security', labelAr: '🛡️ أمن وتشفير', labelEn: '🛡️ Security & Crypto' },
    { id: 'termux_tools', labelAr: '📱 أدوات Termux', labelEn: '📱 Termux Tools' },
    { id: 'networking', labelAr: '🌐 شبكات واتصالات', labelEn: '🌐 Networking' },
    { id: 'system_admin', labelAr: '⚙️ إدارة الأنظمة', labelEn: '⚙️ System Admin' },
    { id: 'web_dev', labelAr: '💻 تطوير الويب', labelEn: '💻 Web Dev' },
    { id: 'database', labelAr: '🗄️ قواعد البيانات', labelEn: '🗄️ Databases' },
  ];

  // Filtered snippets
  const filteredSnippets = useMemo(() => {
    return multiLanguageSnippets.filter((item) => {
      // Favorites filter
      if (showFavoritesOnly && !favoriteIds.includes(item.id)) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'all' && item.language !== selectedLanguage) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter (search across title, description, code, tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesLang = item.language.toLowerCase().includes(q);

        return matchesTitle || matchesDesc || matchesCode || matchesTags || matchesLang;
      }

      return true;
    });
  }, [selectedLanguage, selectedCategory, searchQuery, showFavoritesOnly, favoriteIds]);

  const resetFilters = () => {
    setSelectedLanguage('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favoriteIds.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Ethical disclaimer banner */}
        <EthicalBanner />

        {/* Main Tabs Content */}
        <main className="space-y-6">
          {/* TAB 1: CODE SNIPPETS BROWSER */}
          {activeTab === 'snippets' && (
            <div className="space-y-6">
              {/* Filter Controls Bar */}
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-sm font-bold text-white">
                      {isAr ? 'تصفية واستكشاف الأكواد' : 'Filter & Explore Snippets'}
                    </h2>
                    <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
                      {filteredSnippets.length} {isAr ? 'كود متاح' : 'Available'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {(selectedLanguage !== 'all' || selectedCategory !== 'all' || searchQuery || showFavoritesOnly) && (
                      <button
                        onClick={resetFilters}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Languages pills */}
                <div>
                  <span className="block text-[11px] text-slate-400 font-semibold mb-2">
                    {isAr ? 'لغة البرمجة والبيئة:' : 'Programming Language:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {languagesList.map((lang) => (
                      <button
                        key={lang.id}
                        id={`filter-lang-${lang.id}`}
                        onClick={() => setSelectedLanguage(lang.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                          selectedLanguage === lang.id
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                            : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {isAr ? lang.labelAr : lang.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories pills */}
                <div>
                  <span className="block text-[11px] text-slate-400 font-semibold mb-2">
                    {isAr ? 'التصنيف الوظيفي:' : 'Functional Category:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat.id}
                        id={`filter-cat-${cat.id}`}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-slate-700 text-white font-bold border border-slate-600'
                            : 'bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {isAr ? cat.labelAr : cat.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Snippets Grid */}
              {filteredSnippets.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filteredSnippets.map((snippet) => (
                    <SnippetCard
                      key={snippet.id}
                      snippet={snippet}
                      isFavorite={favoriteIds.includes(snippet.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-300">
                    {isAr ? 'لا توجد أكواد مطابقة للفلاتر المحددة' : 'No snippets match your filter selection'}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {isAr ? 'جرب البحث بكلمة أخرى أو قم بإعادة تعيين خيارات التصفية لعرض كافة الأكواد.' : 'Try a different search term or reset filters to display all code.'}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    {isAr ? 'عرض كافة الأكواد' : 'Show All Snippets'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LANGUAGES & FUNCTIONS ENCYCLOPEDIA */}
          {activeTab === 'encyclopedia' && <LanguagesEncyclopedia />}

          {/* TAB 3: AI PROGRAMMING & SECURITY ASSISTANT */}
          {activeTab === 'assistant' && <AIAssistant />}

          {/* TAB 4: PYTHON ACADEMY */}
          {activeTab === 'python' && <PythonAcademy />}

          {/* TAB 5: CYBERSECURITY DEFENSE ACADEMY */}
          {activeTab === 'security' && <CyberSecurityAcademy />}

          {/* TAB 6: TERMUX & PC TERMINAL */}
          {activeTab === 'termux' && <TermuxStudio />}

          {/* TAB 7: SECURITY TOOLS & CRYPTO INSPECTOR */}
          {activeTab === 'tools' && <SecurityInspector />}

          {/* TAB 8: CYBER DEFENSE LAB & TERMINAL SIMULATOR */}
          {activeTab === 'lab' && <CyberLab />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>
              {isAr ? 'منصة مرجع البرمجة والدفاع السيبراني المعتمدة' : 'Certified Cyber Defense & Programming Codex'}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <span>✨</span>
            <span>{isAr ? 'إنشاء وتطوير: يوسف' : 'Created & Engineered by: Youssef'}</span>
          </div>
          <p className="text-slate-500 text-[11px] max-w-xl mx-auto">
            {isAr 
              ? 'كافة الأكواد والأوامر المتوفرة مجهزة للحماية والدفاع وتدقيق الأنظمة وإدارة الخوادم، وتمت صياغتها وفق معايير الحماية العالمية وتطوير التطبيقات الآمنة.'
              : 'All code snippets and terminal commands are crafted for defensive hardening, auditing, and secure systems administration according to global OWASP benchmarks.'}
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
            <span>{isAr ? 'النسخ بنقرة واحدة مفعل ✅' : 'One-click copy enabled ✅'}</span>
            <span>•</span>
            <span>{isAr ? 'متوافق مع الهواتف والكمبيوتر 📱💻' : 'Responsive on Mobile & PC 📱💻'}</span>
            <span>•</span>
            <span>{isAr ? 'مختبر التحديات والمحاكاة التفاعلية 🎯' : 'Interactive Cyber Lab & Simulator 🎯'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
