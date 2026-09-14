import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  RefreshCw, 
  Code2, 
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { queryCyberKnowledgeEngine } from '../utils/cyberKnowledgeEngine';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  isFallback?: boolean;
}

interface CodeBlockViewerProps {
  language: string;
  code: string;
  isAr: boolean;
}

const CodeBlockViewer: React.FC<CodeBlockViewerProps> = ({ language, code, isAr }) => {
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedClean, setCopiedClean] = useState(false);
  const [copiedLineIdx, setCopiedLineIdx] = useState<number | null>(null);
  const [showLineByLine, setShowLineByLine] = useState(false);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(code.trim());
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleCopyClean = () => {
    const cleanLines = code
      .split('\n')
      .filter(l => !l.trim().startsWith('#') && !l.trim().startsWith('//') && !l.trim().startsWith('--'))
      .join('\n');
    navigator.clipboard.writeText(cleanLines.trim());
    setCopiedClean(true);
    setTimeout(() => setCopiedClean(false), 2000);
  };

  const handleCopyLine = (line: string, index: number) => {
    navigator.clipboard.writeText(line.trim());
    setCopiedLineIdx(index);
    setTimeout(() => setCopiedLineIdx(null), 1500);
  };

  return (
    <div className="my-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-md">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-900/90 border-b border-slate-800">
        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
          {language || 'code'}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyFull}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 border ${
              copiedFull
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {copiedFull ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copiedFull ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy')}</span>
          </button>
          <button
            onClick={handleCopyClean}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 border ${
              copiedClean
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30'
            }`}
            title={isAr ? 'نسخ كود صافي بدون أي شروحات أو تعليقات' : 'Copy pure code'}
          >
            {copiedClean ? <Check className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
            <span>{copiedClean ? (isAr ? 'منسوخ صافي!' : 'Clean!') : (isAr ? 'نسخ صافي (بدون شرح)' : 'Clean Code')}</span>
          </button>
          <button
            onClick={() => setShowLineByLine(!showLineByLine)}
            className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all border ${
              showLineByLine
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-cyan-500/30'
            }`}
          >
            <span>⚡ {showLineByLine ? (isAr ? 'إخفاء الأسطر' : 'Hide') : (isAr ? 'نسخ حبة حبة' : 'Line-by-Line')}</span>
          </button>
        </div>
      </div>

      {/* Code body */}
      {!showLineByLine ? (
        <pre className="p-3 text-slate-200 overflow-x-auto leading-relaxed select-all" dir="ltr">
          <code>{code}</code>
        </pre>
      ) : (
        <div className="p-2 space-y-1 bg-slate-950/90" dir="ltr">
          <div className="text-[10px] text-cyan-400 font-sans pb-1 px-1 border-b border-slate-800 flex items-center justify-between">
            <span>{isAr ? 'اضغط على أي سطر لنسخه منفرداً حبة حبة:' : 'Click any line to copy individually:'}</span>
            <span className="text-slate-500">{code.split('\n').length} lines</span>
          </div>
          {code.split('\n').map((line, idx) => {
            if (!line.trim()) return <div key={idx} className="h-1.5" />;
            const isComment = line.trim().startsWith('#') || line.trim().startsWith('//') || line.trim().startsWith('--');
            return (
              <div
                key={idx}
                onClick={() => handleCopyLine(line, idx)}
                className={`flex items-center justify-between gap-2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                  copiedLineIdx === idx
                    ? 'bg-emerald-950/80 border border-emerald-500/50'
                    : 'hover:bg-slate-900 border border-transparent hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-[10px] text-slate-600 select-none w-5 text-right font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <code className={`truncate text-xs ${isComment ? 'text-slate-500 italic' : 'text-cyan-200'}`}>
                    {line}
                  </code>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLine(line, idx);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-sans border shrink-0 transition-all ${
                    copiedLineIdx === idx
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {copiedLineIdx === idx ? (isAr ? 'منسوخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const AIAssistant: React.FC = () => {
  const { isAr, language } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: isAr
        ? `مرحباً بك! أنا **مساعد الذكاء الاصطناعي الشامل**.
أستطيع مساعدتك في الإجابة عن **أي سؤال أو استفسار تريده** سواء كان:
- 🌐 **أسئلة عامة وعلمية وثقافية**: في الرياضيات، العلوم، التاريخ، الحياة اليومية، تنظيم الوقت، والفلسفة.
- 📖 **شرح لغات البرمجة وتفكيك الدوال**: ما تفعله أي دالة، معاملاتها، وتفكيك الكود سطراً بسطر.
- 🛡️ **الفحص الأمني والدفاع الرقمي**: اكتشاف الثغرات وتأمين الأكواد وفق معايير OWASP.
- ⚡ **كتابة حلول وأكواد عملية**: بلغات Python، Bash، Go، Rust، JS وغيرها.

كيف يمكنني مساعدتك اليوم؟ اسألني عن أي موضوع تريده!`
        : `Welcome! I am your **Comprehensive AI Assistant**.
I can answer questions on **ANY topic** you need:
- 🌐 **General Knowledge & Science**: Mathematics, physics, history, daily productivity, reasoning, and advice.
- 📖 **Programming & Function Deep-Dives**: Purpose, parameters, return types, and line-by-line breakdowns.
- 🛡️ **Defensive Cybersecurity**: Detect vulnerabilities and rewrite code to OWASP standards.
- ⚡ **Production Code & Scripts**: Python, Bash, Go, Rust, and JavaScript.

How can I help you today? Ask me about anything!`,
      time: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [customKey, setCustomKey] = useState<string>('');
  const [showKeySettings, setShowKeySettings] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setIsLoading(true);

    try {
      let assistantReply = '';
      let isFallbackMode = false;

      try {
        const response = await fetch('/api/ai-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            languageContext: selectedLanguage !== 'all' ? selectedLanguage : undefined,
            customApiKey: customKey.trim() || undefined,
            userLanguage: language
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.reply && !data.useLocalEngine) {
            assistantReply = data.reply;
            isFallbackMode = !!data.isFallback;
          }
        }
      } catch (networkErr) {
        console.warn('Backend API unavailable, using built-in Cyber Knowledge Engine', networkErr);
      }

      // If no reply from server yet, query local Cyber Knowledge Engine with user's language
      if (!assistantReply) {
        assistantReply = queryCyberKnowledgeEngine(
          textToSend, 
          selectedLanguage !== 'all' ? selectedLanguage : undefined,
          language
        );
        isFallbackMode = true;
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: assistantReply,
        time: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        isFallback: isFallbackMode
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const fallbackReply = queryCyberKnowledgeEngine(
        textToSend, 
        selectedLanguage !== 'all' ? selectedLanguage : undefined,
        language
      );
      setMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: fallbackReply,
          time: new Date().toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
          isFallback: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = isAr ? [
    { label: '💎 كود محلي ذاتي للشبكة (بدون أي رابط أو نت)', query: 'أعطني كود بايثون وترموكس لفحص الشبكة واستخراج الـ IP والبيانات محلياً وبشكل ذاتي بدون أي رابط أو API خارجي (Pure Native Socket)' },
    { label: '🌐 سويلي كود API الشبكة والـ IP', query: 'سويلي كود بايثون وجافاسكريبت يعطيني API الشبكة حقتي والـ IP مع الدالة وطريقة صنع الرابط والتشغيل على الجوال ونسخ حبة حبة' },
    { label: '🔗 دالة صنع روابط الـ API والمعاملات', query: 'اشرح لي دالة بناء الروابط والمعاملات الآمنة URLSearchParams مع كود جاهز واستخراج البيانات' },
    { label: '📱 أوامر Termux للجوال حبة حبة', query: 'أعطني أهم أوامر وسكربتات Termux للجوال لتشغيل بايثون وفحص الشبكات خطوة بخطوة ونسخ حبة حبة' },
    { label: '🛡️ حماية كود Python من ثغرات الحقن', query: 'كيف أكتب كود بايثون متصل بقاعدة بيانات PostgreSQL محمي 100% من ثغرات SQL Injection؟ وضح الفرق بين الكود المصاب والآمن.' }
  ] : [
    { label: '💎 Native Offline Network Code (Zero URLs)', query: 'Give me 100% native Python and Termux code to inspect network IP and interfaces completely offline without contacting any external URL.' },
    { label: '🌐 Network API & Public IP Script', query: 'Generate Python & JavaScript code to fetch my network public IP & ISP info with functions, safe URL creation, and Termux execution.' },
    { label: '🔗 Build URL & API Query Params', query: 'Explain how to safely construct API endpoints and query parameters with clean code examples.' },
    { label: '📱 Mobile Termux Commands', query: 'Give me essential Termux mobile terminal commands for Python and networking step by step.' },
    { label: '🛡️ Harden Python against SQLi', query: 'How do I write Python database code completely immune to SQL Injection? Compare vulnerable vs parameterized queries.' }
  ];

  const renderMessageContent = (content: string) => {
    // Check if message contains code blocks
    const codeBlockRegex = /(```[\s\S]*?```)/g;
    const parts = content.split(codeBlockRegex);

    return (
      <div className="space-y-2">
        {parts.map((part, idx) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            const lines = part.slice(3, -3).trim().split('\n');
            const firstLine = lines[0].trim();
            const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
            const lang = hasLang ? firstLine : '';
            const code = (hasLang ? lines.slice(1) : lines).join('\n');
            return <CodeBlockViewer key={idx} language={lang} code={code} isAr={isAr} />;
          }
          return (
            <div key={idx} className="whitespace-pre-wrap font-sans select-text leading-relaxed">
              {part}
            </div>
          );
        })}
      </div>
    );
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5" /> 
              <span>{isAr ? 'مساعد الذكاء الاصطناعي الشامل' : 'Universal AI Assistant'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isAr ? 'مساعد الذكاء الاصطناعي للإجابة عن أي سؤال والبرمجة والدفاع السيبراني' : 'Comprehensive AI Assistant: Universal Answers, Code & Cyber Defense'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr 
                ? 'اطرح أي سؤال تريده في شتى مجالات المعرفة أو العلوم أو الحياة اليومية أو تفكيك دوال البرمجة وتأمين الأكواد. يعمل مباشرة بنموذج gemini-3.8-flash مع محرك معرفة فوري.'
                : 'Ask anything across general knowledge, science, daily productivity, code mechanics, or cyber defense. Powered by Gemini Flash with seamless instant response.'}
            </p>
          </div>

          <button
            onClick={() => setShowKeySettings(!showKeySettings)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium self-start md:self-auto transition-colors"
          >
            <Key className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'إعدادات المفتاح الأمني' : 'API Key Settings'}</span>
            {showKeySettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Collapsible Key & Privacy Section */}
        {showKeySettings && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white">
                  {isAr ? 'تنبيه أمان وخصوصية:' : 'Security & Confidentiality Notice:'}
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {isAr 
                    ? 'لا تقم بمشاركة مفاتيح الـ API السرية في المحادثات العامة. المنصة تدير المفتاح بأمان وسرية تامة على الخادم عبر لوحة Settings > Secrets تحت اسم GEMINI_API_KEY.'
                    : 'Never paste sensitive keys in public rooms. Environment secrets are safely retained server-side via Settings > Secrets under GEMINI_API_KEY.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold">
                {isAr ? '(اختياري) تجربة مفتاح Gemini API مخصص لهذه الجلسة:' : '(Optional) Session-specific Gemini API Key override:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono outline-none"
                  dir="ltr"
                />
                {customKey && (
                  <button
                    onClick={() => setCustomKey('')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                  >
                    {isAr ? 'مسح' : 'Clear'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isAr ? 'نماذج أسئلة سريعة (اضغط للتجربة الفورية):' : 'Quick Prompt Presets (Click to run):'}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              disabled={isLoading}
              className={`text-xs px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 text-slate-300 rounded-xl transition-all ${isAr ? 'text-right' : 'text-left'} disabled:opacity-50`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[560px]">
        {/* Chat Control Bar */}
        <div className="bg-slate-950/80 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">{isAr ? 'المساعد الذكي متصل ومستعد لأي سؤال' : 'Universal Assistant Online & Ready'}</span>
            <span className="text-slate-500 hidden sm:inline">• Gemini 3.8 Flash</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">{isAr ? 'تخصيص السياق:' : 'Context:'}</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none focus:border-cyan-500/50"
            >
              <option value="all">{isAr ? 'عام (كافة اللغات)' : 'General (All)'}</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Go">Go</option>
              <option value="Rust">Rust</option>
              <option value="Bash">Bash / Linux</option>
              <option value="Security">Cyber Security & OWASP</option>
            </select>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? (isAr ? 'mr-auto flex-row-reverse' : 'ml-auto flex-row-reverse') : (isAr ? 'ml-auto' : 'mr-auto')}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  msg.sender === 'user'
                    ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-100 max-w-xl'
                    : 'bg-slate-950 border border-slate-800/90 text-slate-200 w-full'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-300">
                      {msg.sender === 'user' ? (isAr ? 'أنت' : 'You') : (isAr ? 'المساعد الذكي الشامل' : 'Universal AI Assistant')}
                    </span>
                    {msg.isFallback && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {isAr ? 'محرك المعرفة المدمج' : 'Offline Knowledge Engine'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">{msg.time}</span>
                    <button
                      onClick={() => handleCopyText(msg.text, msg.id)}
                      className="text-slate-500 hover:text-slate-300 p-1 transition-colors"
                      title={isAr ? 'نسخ الرسالة' : 'Copy message'}
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Body with formatting */}
                {renderMessageContent(msg.text)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`flex gap-3 max-w-xl ${isAr ? 'ml-auto' : 'mr-auto'}`}>
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 animate-spin">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{isAr ? 'جارِ معالجة وتوليد الإجابة بدقة عبر الذكاء الاصطناعي...' : 'Generating detailed response via AI...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isAr ? "اسأل عن أي شيء... سؤال عام، مفهوم علمي، تنظيم الوقت، دالة برمجية، أو فحص أمني..." : "Ask about anything... general topic, science, time management, coding, or cybersecurity..."}
              className={`flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/60 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all`}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-cyan-900/30"
            >
              <span>{isAr ? 'إرسال' : 'Send'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
