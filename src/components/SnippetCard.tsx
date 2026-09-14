import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Bookmark, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Terminal,
  Cpu
} from 'lucide-react';
import { Snippet } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SnippetCardProps {
  snippet: Snippet;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  isFavorite,
  onToggleFavorite,
}) => {
  const { isAr } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const extensions: Record<string, string> = {
      python: 'py',
      javascript: 'js',
      typescript: 'ts',
      bash: 'sh',
      termux: 'sh',
      sql: 'sql',
      go: 'go',
      rust: 'rs',
      cpp: 'cpp',
      html_css: 'html',
      docker: 'dockerfile',
    };
    const ext = extensions[snippet.language] || 'txt';
    const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snippet.id}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'python':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'javascript':
      case 'typescript':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'bash':
      case 'termux':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'go':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'rust':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'sql':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'docker':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div 
      id={`snippet-card-${snippet.id}`}
      className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow-lg shadow-black/40"
    >
      {/* Card Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-md border font-semibold ${getLanguageColor(snippet.language)}`}>
              {snippet.language}
            </span>

            {snippet.platform === 'termux' && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> {isAr ? 'Termux أندرويد' : 'Termux Android'}
              </span>
            )}
            {snippet.platform === 'linux' && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> {isAr ? 'لينكس / سيرفر' : 'Linux / Server'}
              </span>
            )}

            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60">
              {snippet.difficulty}
            </span>

            {snippet.isDefensiveSecurity && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-medium">
                🛡️ {isAr ? 'أمان دفاعي' : 'Defensive'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              id={`fav-btn-${snippet.id}`}
              onClick={() => onToggleFavorite(snippet.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white'
              }`}
              title={isFavorite ? (isAr ? 'إزالة من المفضلة' : 'Remove from Bookmarks') : (isAr ? 'حفظ في المفضلة' : 'Save to Bookmarks')}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              id={`dl-btn-${snippet.id}`}
              onClick={handleDownload}
              className="p-1.5 rounded-lg border bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white transition-colors"
              title={isAr ? 'تحميل كملف برمجي' : 'Download code file'}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-100 hover:text-cyan-400 transition-colors">
          {snippet.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {snippet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {snippet.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-800">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Code Container */}
      <div className="relative bg-slate-950 p-4 font-mono text-xs overflow-x-auto border-b border-slate-800/80">
        <div className={`absolute top-2.5 ${isAr ? 'left-2.5' : 'right-2.5'} z-10`}>
          <button
            id={`copy-btn-${snippet.id}`}
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 shadow-md ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500 scale-105'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isAr ? 'نسخ الكود' : 'Copy Code'}</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <pre className="text-slate-300 pt-8 pb-2 leading-relaxed select-all" dir="ltr">
          <code>{snippet.code}</code>
        </pre>
      </div>

      {/* Footer / Expandable Explanation */}
      <div className="p-3.5 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <button
            id={`expand-btn-${snippet.id}`}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            <span>
              {isExpanded 
                ? (isAr ? 'إخفاء الشرح والتحذيرات' : 'Hide Explanation & Warnings')
                : (isAr ? 'عرض الشرح والتحذير الأمني' : 'Show Explanation & Warnings')}
            </span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopy}
            className="text-[11px] text-slate-400 hover:text-slate-200 underline underline-offset-4"
          >
            {copied ? (isAr ? 'منسوخ ✅' : 'Copied ✅') : (isAr ? 'نسخ سريع' : 'Quick Copy')}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
              <strong className="text-cyan-300 block mb-1">
                {isAr ? '💡 آلية العمل والشرح التفصيلي:' : '💡 Execution Mechanism & In-Depth Explanation:'}
              </strong>
              {snippet.explanation}
            </div>

            {snippet.securityWarning && (
              <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/30 text-amber-200 flex items-start gap-2.5 leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-0.5">
                    {isAr ? 'تحذير أمني دفاعي:' : 'Defensive Security Advisory:'}
                  </strong>
                  {snippet.securityWarning}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
