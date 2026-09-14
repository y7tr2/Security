import React, { useState } from 'react';
import { ShieldAlert, Info, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EthicalBanner: React.FC = () => {
  const { isAr } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/30 border-y md:border border-amber-500/30 md:rounded-2xl p-4 my-4 max-w-7xl mx-auto backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className={`space-y-1 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-amber-300">
                {isAr ? 'ميثاق الأمن السيبراني الدفاعي والمعايير الأخلاقية' : 'Defensive Cybersecurity Charter & Ethical Standards'}
              </h3>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                {isAr ? 'مرخص للأغراض التعليمية والحماية المشروعة' : 'Authorized for Defensive Education & Hardening'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              {isAr 
                ? 'تم إعداد كافة الأكواد والشروحات والطرفيات في هذه المنصة وفق أعلى معايير الحماية والاستجابة للثغرات (OWASP & NIST). يهدف هذا المرجع إلى تمكين المطورين ومدراء الأنظمة من كتابة كود آمن، وحماية الخوادم، وإغلاق الثغرات، وتدقيق الأنظمة المصرح بفحصها فقط.'
                : 'All code snippets, function breakdowns, and terminal commands adhere to OWASP and NIST defensive guidelines. Designed to empower developers and sysadmins to build resilient software and audit authorized systems.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 
                {isAr ? 'فحص الأنظمة المصرح بها فقط' : 'Audit Authorized Environments Only'}
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Info className="w-3.5 h-3.5" /> 
                {isAr ? 'الوقاية من ثغرات الحقن وسرقة الجلسات' : 'Immunize against Injection & Privilege Escalation'}
              </span>
            </div>
          </div>
        </div>

        <button
          id="dismiss-ethical-banner-btn"
          onClick={() => setIsDismissed(true)}
          className="text-slate-500 hover:text-slate-300 p-1 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          title={isAr ? "إغلاق التنبيه" : "Dismiss notice"}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
