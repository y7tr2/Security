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
  RotateCcw,
  ExternalLink,
  Github
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
import { ProjectExporter } from './components/ProjectExporter';

export default function App() {
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

  const languagesList: { id: Language | 'all'; label: string }[] = [
    { id: 'all', label: 'كافة اللغات' },
    { id: 'python', label: 'Python' },
    { id: 'bash', label: 'Bash / Linux' },
    { id: 'termux', label: 'Termux' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'go', label: 'Go' },
    { id: 'rust', label: 'Rust' },
    { id: 'sql', label: 'SQL' },
    { id: 'cpp', label: 'C / C++' },
    { id: 'docker', label: 'Docker' },
  ];

  const categoriesList: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'كافة التصنيفات' },
    { id: 'security', label: '🛡️ أمن وتشفير' },
    { id: 'termux_tools', label: '📱 أدوات Termux' },
    { id: 'networking', label: '🌐 شبكات واتصالات' },
    { id: 'system_admin', label: '⚙️ إدارة الأنظمة' },
    { id: 'web_dev', label: '💻 تطوير الويب' },
    { id: 'database', label: '🗄️ قواعد البيانات' },
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

      // Difficulty filter
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesLang = item.language.toLowerCase().includes(q);
        return matchesTitle || matchesCode || matchesDesc || matchesTags || matchesLang;
      }

      return true;
    });
  }, [
    showFavoritesOnly, 
    favoriteIds, 
    selectedLanguage, 
    selectedCategory, 
    selectedDifficulty, 
    searchQuery
  ]);

  const resetFilters = () => {
    setSelectedLanguage('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Navigation & Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          favoritesCount={favoriteIds.length}
          showFavoritesOnly={showFavoritesOnly}
          setShowFavoritesOnly={setShowFavoritesOnly}
        />

        {/* Global Ethical & Defensive Banner */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <EthicalBanner />

          {/* TAB 1: SNIPPETS VAULT */}
          {activeTab === 'snippets' && (
            <div className="space-y-6">
              {/* Filter controls bar */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-sm font-bold text-white">تصفية مكتبة الأكواد</h2>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                      {filteredSnippets.length} كود ونمط متوفر
                    </span>
                  </div>

                  {(selectedLanguage !== 'all' || selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery || showFavoritesOnly) && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة تعيين الفلاتر</span>
                    </button>
                  )}
                </div>

                {/* Languages pills */}
                <div>
                  <span className="block text-[11px] text-slate-400 font-semibold mb-2">اللغة البرمجية:</span>
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
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories pills */}
                <div>
                  <span className="block text-[11px] text-slate-400 font-semibold mb-2">التصنيف الوظيفي:</span>
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
                        {cat.label}
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
                  <h3 className="text-base font-bold text-slate-300">لا توجد أكواد مطابقة للفلاتر المحددة</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    جرب البحث بكلمة أخرى أو قم بإعادة تعيين خيارات التصفية لعرض كافة الأكواد.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    عرض كافة الأكواد
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

          {/* TAB 8: PROJECT EXPORTER & GITHUB HUB */}
          {activeTab === 'exporter' && <ProjectExporter />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>منصة مرجع البرمجة والدفاع السيبراني المعتمدة</span>
          </div>
          <p className="text-slate-500 text-[11px] max-w-xl mx-auto">
            كافة الأكواد والأوامر المتوفرة مجهزة للحماية والدفاع وتدقيق الأنظمة وإدارة الخوادم، وتمت صياغتها وفق معايير الحماية العالمية وتطوير التطبيقات الآمنة.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
            <span>النسخ بنقرة واحدة مفعل ✅</span>
            <span>•</span>
            <span>متوافق مع الهواتف والكمبيوتر 📱💻</span>
            <span>•</span>
            <span>دعم التصدير إلى GitHub متاح 🚀</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
