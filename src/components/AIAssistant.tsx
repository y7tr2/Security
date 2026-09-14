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

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  isFallback?: boolean;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `مرحباً بك! أنا **المساعد البرمجي والدفاعي السيبراني**. 
أستطيع مساعدتك في:
- 📖 **شرح أي لغة برمجة وأي دالة بالتفصيل**: ما تفعله، معاملاتها، وقيمتها المرجعة.
- 🛡️ **الفحص الأمني للدفاع**: اكتشاف الثغرات في أكوادك وإعادة كتابتها بمعايير OWASP الآمنة.
- ⚡ **كتابة أوامر وسكربتات**: حلول عملية جاهزة للتشغيل والنسخ بلغات Python، Bash، Go، Rust، JS وغيرها.

كيف يمكنني مساعدتك برمجياً اليوم؟`,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('عام');
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
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          languageContext: selectedLanguage !== 'عام' ? selectedLanguage : undefined,
          customApiKey: customKey.trim() || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`خطأ في استجابة الخادم: ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'تمت معالجة الطلب.',
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        isFallback: data.isFallback
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ تعذر الاتصال بخادم المساعد الذكي (${err.message}). يرجى التحقق من اتصال الشبكة، أو إضافة مفتاح Gemini API في لوحة الإعدادات.`,
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: 'شرح دالة reduce() بالتفصيل', query: 'اشرح لي دالة reduce في جافاسكريبت بالتفصيل: ما هي فكرتها، كيف يعمل المجمع (accumulator)، مع مثالين عمليين ونصيحة لتفادي الأخطاء.' },
    { label: 'حماية كود Python من SQLi', query: 'كيف أكتب كود بايثون متصل بقاعدة بيانات PostgreSQL محمي 100% من ثغرات SQL Injection؟ وضح الفرق بين الكود المصاب والكود الآمن.' },
    { label: 'سكربت Bash لمراقبة السيرفر', query: 'اكتب لي سكربت Bash احترافي يقوم بمراقبة استخدام المعالج CPU والذاكرة RAM ويرسل تحذيراً إذا تجاوز الاستهلاك 85% مع معايير set -euo pipefail.' },
    { label: 'نظام الملكية في لغة Rust', query: 'اشرح لي مفهوم الملكية (Ownership) والإعارة (Borrowing) في لغة Rust ولماذا تمنع أخطاء الذاكرة نهائياً دون الحاجة لـ Garbage Collector؟' }
  ];

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
              <Bot className="w-3.5 h-3.5" /> المساعد البرمجي والدفاعي الذكي
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              مساعد الذكاء الاصطناعي لشرح اللغات والدوال وتأمين الأكواد
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              اسأل عن أي لغة برمجة، دالة معقدة، فحص أخطاء، أو كتابة شفرات أمنية دفاعية. الخادم مرتبط مباشرة بنموذج 
              <code className="mx-1 px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs">gemini-3.8-flash</code>.
            </p>
          </div>

          <button
            onClick={() => setShowKeySettings(!showKeySettings)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium self-start md:self-auto transition-colors"
          >
            <Key className="w-4 h-4 text-cyan-400" />
            <span>إعدادات المفتاح الأمني</span>
            {showKeySettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Key & Privacy Section */}
        {showKeySettings && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-white">تنبيه أمان وخصوصية:</span>
                <p className="text-slate-300 leading-relaxed">
                  لا تقم بمشاركة مفاتيح الـ API أو التوكنات السرية في المحادثة النصية لحماية حسابك من التسريب.
                  منصة AI Studio تدير المفتاح بأمان وسرية تامة على الخادم عبر لوحة <strong>Settings &gt; Secrets</strong> تحت اسم <code className="text-cyan-300 font-mono">GEMINI_API_KEY</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold">
                (اختياري) تجربة مفتاح Gemini API مخصص لهذه الجلسة:
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
                    مسح
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                المفتاح يُرسل إلى خادم التطبيق الداخلي فقط لمعالجة استفساراتك ولا يُسجل أو يُشارك خارج التطبيق.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>نماذج أسئلة سريعة (اضغط للتجربة الفورية):</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.query)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 text-slate-300 rounded-xl transition-all text-right disabled:opacity-50"
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
            <span className="font-bold text-white">المساعد البرمجي متصل</span>
            <span className="text-slate-500 hidden sm:inline">• Gemini 3.8 Flash</span>
          </div>

          {/* Context Language Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">سياق اللغة:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-900 text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-cyan-500"
            >
              <option value="عام">عام (كافة اللغات)</option>
              <option value="Python">Python</option>
              <option value="JavaScript / TypeScript">JavaScript / TypeScript</option>
              <option value="Bash / Linux">Bash / Linux</option>
              <option value="Go">Go (Golang)</option>
              <option value="Rust">Rust</option>
              <option value="C / C++">C / C++</option>
              <option value="SQL">SQL</option>
              <option value="Docker">Docker</option>
            </select>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-800 text-cyan-400 border border-slate-700'
                }`}>
                  {isUser ? 'أنت' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 relative group ${
                  isUser
                    ? 'bg-cyan-600 text-white rounded-tl-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tr-none'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/10 text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="opacity-60 hover:opacity-100 flex items-center gap-1 text-cyan-300"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'تم النسخ' : 'نسخ النص'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-2 text-xs text-slate-400">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>المساعد يحلل السؤال ويجهز الشرح البرمجي الآمن...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="اكتب سؤالك أو الكود الذي تريد شرحه أو تحسين أمانه..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 outline-none placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <span>إرسال</span>
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
