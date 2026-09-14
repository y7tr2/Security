import React from 'react';
import { 
  ShieldCheck, 
  Code2, 
  Terminal, 
  BookOpen, 
  Search, 
  Bookmark, 
  Binary, 
  Sparkles,
  Bot,
  FolderArchive,
  Layers
} from 'lucide-react';

export type TabType = 'snippets' | 'encyclopedia' | 'assistant' | 'python' | 'security' | 'termux' | 'tools' | 'exporter';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with title and stats */}
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white tracking-wide">
                    مرجع البرمجة والدفاع السيبراني
                  </h1>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Sparkles className="w-3 h-3" /> معايير أمنية دفاعية
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  مكتبة أكواد متعددة اللغات • شروحات بايثون والدوال • أوامر Termux والطرفية الآمنة
                </p>
              </div>
            </div>

            {/* Mobile bookmarks button */}
            <button
              id="mobile-favorites-btn"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`md:hidden p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                showFavoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{favoritesCount}</span>
            </button>
          </div>

          {/* Search bar & Desktop bookmarks */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن دالة، كود، أو ثغرة دفاعية..."
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500/50 rounded-xl pr-9 pl-4 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  مسح
                </button>
              )}
            </div>

            <button
              id="desktop-favorites-btn"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                showFavoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>المفضلة ({favoritesCount})</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex overflow-x-auto no-scrollbar gap-1 sm:gap-2 pb-2 pt-1 border-t border-slate-900">
          <button
            id="nav-tab-snippets"
            onClick={() => { setActiveTab('snippets'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'snippets' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>مكتبة الأكواد (+400 نمط)</span>
          </button>

          <button
            id="nav-tab-encyclopedia"
            onClick={() => { setActiveTab('encyclopedia'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'encyclopedia' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>موسوعة اللغات والدوال</span>
          </button>

          <button
            id="nav-tab-assistant"
            onClick={() => { setActiveTab('assistant'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'assistant' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>المساعد البرمجي (AI)</span>
          </button>

          <button
            id="nav-tab-python"
            onClick={() => { setActiveTab('python'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'python' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>مسار بايثون والدوال</span>
          </button>

          <button
            id="nav-tab-security"
            onClick={() => { setActiveTab('security'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'security' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>أمن الدفاع و OWASP</span>
          </button>

          <button
            id="nav-tab-termux"
            onClick={() => { setActiveTab('termux'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'termux' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>طرفية Termux والكمبيوتر</span>
          </button>

          <button
            id="nav-tab-tools"
            onClick={() => { setActiveTab('tools'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'tools' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>أداة الفحص والتشفير</span>
          </button>

          <button
            id="nav-tab-exporter"
            onClick={() => { setActiveTab('exporter'); setShowFavoritesOnly(false); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'exporter' && !showFavoritesOnly
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-amber-400" />
            <span>تصدير و GitHub</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
