import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Copy, 
  Check, 
  FileText, 
  CheckCircle2, 
  Scale, 
  Sparkles,
  Server
} from 'lucide-react';
import { securityVulnerabilities, defensiveReconAuditKnowledge } from '../data/securityData';

export const CyberSecurityAcademy: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedVulnId, setSelectedVulnId] = useState<string>(securityVulnerabilities[0].id);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedVuln = securityVulnerabilities.find(v => v.id === selectedVulnId) || securityVulnerabilities[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Banner */}
      <div className="bg-gradient-to-l from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" /> الأكاديمية الدفاعية الشاملة ومعايير OWASP
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            الأمن السيبراني الدفاعي: تحليل الثغرات، الحماية، وسد المنافذ
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            الهدف الأسمى للأمن السيبراني الأخلاقي هو حماية البيانات والأنظمة الحيوية. 
            استكشف كيفية تفكيك أشهر الثغرات البرمجية وحمايتها بأكواد دفاعية قياسية، بالإضافة إلى كيفية حماية الهوية الرقمية وتقليل البصمة الرقمية للحد من محاولات الاستطلاع (Reconnaissance Defense).
          </p>
        </div>
      </div>

      {/* Part 1: Defensive Recon & Footprint Protection */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">الدفاع ضد الاستطلاع الرقمي وتقليل البصمة (OSINT Defense & Auditing)</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
          في الأمن السيبراني الدفاعي، معرفة كيف تُجمع المعلومات تهدف أولاً إلى حماية الخوادم والأفراد من التعرض للتسريب أو الهندسة الاجتماعية (Social Engineering / Doxxing).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {defensiveReconAuditKnowledge.map((item, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4.5 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200">{item.topic}</h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.details}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                <strong className="block text-emerald-400 font-semibold mb-0.5">الإجراء الدفاعي الموصى به:</strong>
                {item.defensiveAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Interactive Vulnerability vs. Defense Lab */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-rose-400" />
              مختبر المقارنة المزدوجة: الكود الضعيف ❌ مقابل الكود الدفاعي الآمن ✅
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              دراسة تحليلية لكيفية سد الثغرات الموصوفة في معايير OWASP العالمية
            </p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            اختر الثغرة للمعاينة الفورية
          </span>
        </div>

        {/* Vulnerability Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {securityVulnerabilities.map((vuln) => (
            <button
              key={vuln.id}
              onClick={() => setSelectedVulnId(vuln.id)}
              className={`text-right p-3 rounded-xl border text-xs transition-all ${
                selectedVulnId === vuln.id
                  ? 'bg-rose-500/15 text-rose-300 border-rose-500/50 shadow-md font-bold'
                  : 'bg-slate-950/60 hover:bg-slate-800 text-slate-400 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-slate-200">{vuln.title.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-500/30">
                  {vuln.severity}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block truncate">{vuln.owaspCategory}</span>
            </button>
          ))}
        </div>

        {/* Selected Vulnerability Detail Box */}
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
              <h4 className="text-base font-bold text-white">{selectedVuln.title}</h4>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                {selectedVuln.owaspCategory}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedVuln.description}</p>
          </div>

          {/* Side by side code comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Vulnerable Code Card */}
            <div className="bg-slate-950 rounded-xl border border-rose-500/40 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-3 bg-rose-950/40 border-b border-rose-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>الكود الضعيف أمنياً (Vulnerable) ❌</span>
                  </div>
                  <span className="text-[10px] text-rose-300 font-mono uppercase">
                    {selectedVuln.vulnerableCode.language}
                  </span>
                </div>
                <pre className="p-4 text-xs font-mono text-rose-200 overflow-x-auto leading-relaxed select-all" dir="ltr">
                  <code>{selectedVuln.vulnerableCode.code}</code>
                </pre>
              </div>
              <div className="p-3 bg-rose-950/20 border-t border-rose-500/20 text-xs text-rose-300 leading-relaxed">
                <strong className="block text-rose-400 mb-0.5">سبب الثغرة والخلل:</strong>
                {selectedVuln.vulnerableCode.explanation}
              </div>
            </div>

            {/* Defensive Secure Code Card */}
            <div className="bg-slate-950 rounded-xl border border-emerald-500/40 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-3 bg-emerald-950/40 border-b border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>الكود الدفاعي الآمن (Remediated) ✅</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-300 font-mono uppercase">
                      {selectedVuln.defensiveCode.language}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedVuln.defensiveCode.code, 'defense-code')}
                      className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/30 transition-colors"
                    >
                      {copiedId === 'defense-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === 'defense-code' ? 'تم النسخ' : 'نسخ الآمن'}</span>
                    </button>
                  </div>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-200 overflow-x-auto leading-relaxed select-all" dir="ltr">
                  <code>{selectedVuln.defensiveCode.code}</code>
                </pre>
              </div>
              <div className="p-3 bg-emerald-950/20 border-t border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
                <strong className="block text-emerald-400 mb-0.5">الآلية الدفاعية:</strong>
                {selectedVuln.defensiveCode.explanation}
              </div>
            </div>
          </div>

          {/* Remediation Checklist & Safety Advisory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h5 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                خطوات العلاج والوقاية المعتمدة (Remediation Checklist)
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedVuln.remediationSteps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-950/30 p-4 rounded-xl border border-amber-500/30 space-y-2 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>المسؤولية القانونية والأخلاقية</span>
              </div>
              <p className="text-[11px] text-amber-200 leading-relaxed">
                {selectedVuln.safetyAdvisory}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
