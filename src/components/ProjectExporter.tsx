import React, { useState } from 'react';
import { 
  Github, 
  Download, 
  Copy, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  FileText, 
  FolderArchive, 
  ExternalLink,
  Code2,
  FileCode,
  Terminal,
  CheckCircle2,
  Info
} from 'lucide-react';
import { multiLanguageSnippets } from '../data/snippetsData';
import { languagesList, functionsEncyclopedia } from '../data/languagesEncyclopediaData';
import { securityVulnerabilities } from '../data/securityData';
import { termuxCommandsList } from '../data/termuxData';

export const ProjectExporter: React.FC = () => {
  const [copiedBundle, setCopiedBundle] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [activeFileView, setActiveFileView] = useState<'bundle' | 'instructions'>('bundle');

  // Generate the full all-in-one consolidated text/markdown file content
  const generateAllInOneContent = () => {
    let doc = `# موسوعة مرجع البرمجة والدفاع السيبراني الموحدة (All-in-One Comprehensive Reference)
تاريخ التوليد: ${new Date().toLocaleDateString('ar-SA')}
تم التجميع تلقائياً لكافة لغات البرمجة، معجم الدوال، الأكواد الدفاعية، أوامر Termux، ومعايير OWASP.

================================================================================
الفهرس العام للمرجع:
1. دليل لغات البرمجة ومعماريتها وتفاصيلها (8 لغات رئيسية)
2. معجم الدوال وشرح ماذا تفعل كل دالة بالتفصيل مع الأمثلة
3. مكتبة الأكواد متعددة اللغات المصنفة (+400 نمط وكود دفاعي)
4. مختبر الدفاع وأمان OWASP (مقارنة الكود المصاب vs الكود المحمي)
5. استوديو طرفية Termux ولينكس (أوامر الجوال والكمبيوتر)
================================================================================\n\n`;

    // 1. LANGUAGES
    doc += `## القسم الأول: دليل لغات البرمجة ومعماريتها\n\n`;
    languagesList.forEach((lang, idx) => {
      doc += `### ${idx + 1}. لغة ${lang.nameAr} (${lang.name})\n`;
      doc += `- **المعمارية والنمط:** ${lang.paradigm}\n`;
      doc += `- **نظام الأنواع:** ${lang.typing}\n`;
      doc += `- **آلية التنفيذ:** ${lang.execution}\n`;
      doc += `- **الفلسفة:** ${lang.overview}\n`;
      doc += `- **أبرز نقاط القوة:**\n  * ${lang.strengths.join('\n  * ')}\n`;
      doc += `- **أهم الاستخدامات:**\n  * ${lang.bestUseCases.join('\n  * ')}\n`;
      doc += `- **الاعتبارات الأمنية:** ${lang.securityFocus}\n\n`;
    });

    // 2. FUNCTIONS ENCYCLOPEDIA
    doc += `\n================================================================================\n`;
    doc += `## القسم الثاني: معجم الدوال وشرح ماذا تفعل كل دالة\n\n`;
    functionsEncyclopedia.forEach((fn, idx) => {
      doc += `### دالة ${idx + 1}: \`${fn.name}\` [${fn.language}]\n`;
      doc += `- **التصنيف:** ${fn.categoryLabel}\n`;
      doc += `- **الصيغة (Syntax):** \`${fn.syntax}\`\n`;
      doc += `- **ما الذي تفعله الدالة؟** ${fn.whatItDoes}\n`;
      doc += `- **الشرح المعمق:** ${fn.deepExplanation}\n`;
      doc += `- **المعاملات (Parameters):**\n`;
      fn.parameters.forEach(p => {
        doc += `  * \`${p.name}\` (${p.type}): ${p.description}\n`;
      });
      doc += `- **المخرج (Return):** ${fn.returnValue.type} - ${fn.returnValue.description}\n`;
      doc += `- **مثال برمجي كامل:**\n\`\`\`\n${fn.codeExample}\n\`\`\`\n`;
      doc += `- **نصيحة أمنية دفاعية:** ${fn.securityTip}\n\n`;
    });

    // 3. CODE SNIPPETS
    doc += `\n================================================================================\n`;
    doc += `## القسم الثالث: مكتبة الأكواد المصنفة الجاهزة للنسخ\n\n`;
    multiLanguageSnippets.forEach((snip, idx) => {
      doc += `### كود ${idx + 1}: ${snip.title} (${snip.language})\n`;
      doc += `- **الوصف:** ${snip.description}\n`;
      doc += `- **المستوى:** ${snip.difficulty} | **المنصة:** ${snip.platform}\n`;
      doc += `- **الكود البرمجي:**\n\`\`\`${snip.language}\n${snip.code}\n\`\`\`\n`;
      doc += `- **الشرح:** ${snip.explanation}\n`;
      if (snip.securityWarning) {
        doc += `- **تحذير وتنبيه أمني:** ${snip.securityWarning}\n`;
      }
      doc += `\n`;
    });

    // 4. OWASP DEFENSE
    doc += `\n================================================================================\n`;
    doc += `## القسم الرابع: مختبر المقارنة الدفاعية ومعايير OWASP\n\n`;
    securityVulnerabilities.forEach((sec, idx) => {
      doc += `### ثغرة وحماية ${idx + 1}: ${sec.title} (${sec.owaspCategory})\n`;
      doc += `- **الخطورة:** ${sec.severity}\n`;
      doc += `- **الوصف الأمني:** ${sec.description}\n`;
      doc += `- **الكود الضعيف ❌:**\n\`\`\`${sec.vulnerableCode.language}\n${sec.vulnerableCode.code}\n\`\`\`\n`;
      doc += `- **الكود الآمن المحمي ✅:**\n\`\`\`${sec.defensiveCode.language}\n${sec.defensiveCode.code}\n\`\`\`\n`;
      doc += `- **خطوات الوقاية:**\n  * ${sec.remediationSteps.join('\n  * ')}\n\n`;
    });

    // 5. TERMUX & LINUX COMMANDS
    doc += `\n================================================================================\n`;
    doc += `## القسم الخامس: أوامر طرفية Termux ولينكس الآمنة\n\n`;
    termuxCommandsList.forEach((cmd, idx) => {
      doc += `### أمر ${idx + 1}: \`${cmd.command}\`\n`;
      doc += `- **العنوان:** ${cmd.title}\n`;
      doc += `- **المنصة المستهدفة:** ${cmd.platformTarget}\n`;
      doc += `- **مستوى الأمان:** ${cmd.safetyLevel}\n`;
      doc += `- **الشرح:** ${cmd.description}\n`;
      if (cmd.outputPreview) {
        doc += `- **شكل المخرجات في الطرفية:**\n\`\`\`\n${cmd.outputPreview}\n\`\`\`\n`;
      }
      doc += `\n`;
    });

    return doc;
  };

  const handleDownloadBundle = () => {
    const content = generateAllInOneContent();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cyber_programming_all_in_one_reference.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopyBundle = () => {
    const content = generateAllInOneContent();
    navigator.clipboard.writeText(content);
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Header */}
      <div className="bg-gradient-to-l from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold">
            <FolderArchive className="w-3.5 h-3.5" /> مركز تصدير الملفات والربط مع GitHub
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            تصدير المشروع بالكامل وحفظ المرجع في ملف واحد
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            احصل على كافة الأكواد، الشروحات، ودليل الدوال مجمعة في ملف نصي واحد منسق، 
            أو تعرف على الطريقة الرسمية والآمنة لرفع المشروع إلى حسابك على GitHub دون الحاجة لمشاركة توكناتك الشخصية.
          </p>
        </div>
      </div>

      {/* SECURITY NOTICE ABOUT GITHUB TOKEN */}
      <div className="p-6 rounded-3xl bg-rose-950/25 border border-rose-500/30 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-900/40 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              تنبيه أمان صارم: لا تقم بمشاركة توكن GitHub الشخصي (Personal Access Token) في الدردشة!
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
              توكن GitHub يمنح صلاحيات الوصول الكاملة لحسابك ومستودعاتك البرمجية، ويمنع أمنياً كتابته في أي نافذة محادثة نصية عامة أو خاصة لحماية حسابك من الاختراق أو تسريب البيانات.
            </p>
          </div>
        </div>

        {/* The Safe Way */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>كيف ترفع المشروع إلى GitHub بضغطة زر واحدة وبأمان تام 100%؟</span>
          </span>
          <ol className="space-y-2 text-slate-300 mr-2 list-decimal list-inside leading-relaxed">
            <li>
              في أعلى واجهة منصة Google AI Studio، اضغط على زر <strong>القائمة العلوية</strong> أو زر المشاركة (Share / Three Dots Menu).
            </li>
            <li>
              اختر خيار <strong>Export to GitHub</strong>.
            </li>
            <li>
              ستفتح نافذة تفويض رسمية من GitHub (OAuth) لتسجيل الدخول بأمان، وستقوم المنصة بإنشاء مستودع ورفع كافة الملفات تلقائياً دون الحاجة لكتابة أو نسخ أي توكن يدوي!
            </li>
          </ol>
        </div>
      </div>

      {/* SECTION: ALL-IN-ONE DOWNLOAD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>خيار "عطني إياهم كلهم بملف واحد" (All-in-One File)</span>
            </h3>
            <p className="text-xs text-slate-400">
              ملف نصي موحد وشامل بصيغة Markdown (.md) يحتوي على كل شروحات اللغات، معجم الدوال، الأكواد، ومعايير OWASP.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBundle}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              {copiedBundle ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedBundle ? 'تم نسخ المرجع كاملاً!' : 'نسخ كامل المرجع'}</span>
            </button>

            <button
              onClick={handleDownloadBundle}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'جاري التنزيل...' : 'تحميل الملف الموحد (.md)'}</span>
            </button>
          </div>
        </div>

        {/* Bundle Content Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold block">1. دليل اللغات:</span>
            <span className="text-cyan-300 font-bold text-sm">8 لغات مبرمجة</span>
            <p className="text-[11px] text-slate-400">Python, JS, TS, Bash, Go, Rust, C++, SQL</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold block">2. معجم الدوال:</span>
            <span className="text-amber-300 font-bold text-sm">شرح تفصيلي للدوال</span>
            <p className="text-[11px] text-slate-400">الصيغة، المعاملات، والمخرجات والأثر الأمني</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold block">3. الأكواد الدفاعية:</span>
            <span className="text-emerald-300 font-bold text-sm">+400 نمط وكود</span>
            <p className="text-[11px] text-slate-400">مقسمة حسب التصنيف والمستوى والمنصة</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold block">4. أوامر الطرفية:</span>
            <span className="text-purple-300 font-bold text-sm">أوامر Termux ولينكس</span>
            <p className="text-[11px] text-slate-400">مخرجات الطرفية ودرجات الأمان والصلاحيات</p>
          </div>
        </div>

        {/* Preview of the file */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold">معاينة أولية لبداية الملف الموحد:</span>
            <span className="font-mono text-[10px] text-slate-500">cyber_programming_all_in_one_reference.md</span>
          </div>
          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 max-h-48 overflow-y-auto leading-relaxed" dir="ltr">
{`# موسوعة مرجع البرمجة والدفاع السيبراني الموحدة (All-in-One Comprehensive Reference)
================================================================================
الفهرس العام للمرجع:
1. دليل لغات البرمجة ومعماريتها وتفاصيلها (8 لغات رئيسية)
2. معجم الدوال وشرح ماذا تفعل كل دالة بالتفصيل مع الأمثلة
3. مكتبة الأكواد متعددة اللغات المصنفة (+400 نمط وكود دفاعي)
4. مختبر الدفاع وأمان OWASP (مقارنة الكود المصاب vs الكود المحمي)
5. استوديو طرفية Termux ولينكس (أوامر الجوال والكمبيوتر)
================================================================================

## القسم الأول: دليل لغات البرمجة ومعماريتها
### 1. لغة بايثون (Python)
- المعمارية والنمط: متعددة الأنماط (كائنية التوجه OOP، إجرائية، وظيفية)
- نظام الأنواع: ديناميكية وقوية (Dynamic & Strongly Typed)
- آلية التنفيذ: مفسرة عبر CPython مع Bytecode إلى Virtual Machine
...`}
          </pre>
        </div>
      </div>

      {/* SECTION: FULL SOURCE CODE ZIP DOWNLOAD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FolderArchive className="w-5 h-5 text-amber-400" />
          <span>تنزيل كامل ملفات الكود المصدري للتطبيق بصيغة ZIP</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          يمكنك في أي لحظة تنزيل كامل المشروع كحزمة مضغوطة (ZIP) تضم جميع ملفات TypeScript و React والخادم، لتشغيلها على جهازك الشخصي أو رفعها إلى أي مستودع تريده:
        </p>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-200">الخطوات في AI Studio:</span>
            <p className="text-slate-400">اضغط على القائمة في الزاوية العلوية &gt; اختر <strong>Export to ZIP</strong> &gt; سيبدأ التنزيل الفوري لأرشيف المشروع كاملاً.</p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-[11px] shrink-0">
            تنزيل مباشر بنقرة واحدة
          </div>
        </div>
      </div>
    </div>
  );
};
