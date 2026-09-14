import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  isAr: boolean;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    appTitle: 'مرجع البرمجة والدفاع السيبراني',
    appBadge: 'معايير أمنية دفاعية',
    appSubtitle: 'مكتبة أكواد متعددة اللغات • شروحات بايثون والدوال • أوامر Termux والطرفية الآمنة',
    searchPlaceholder: 'ابحث عن دالة، كود، أو ثغرة دفاعية...',
    bookmarks: 'المفضلة',
    allBookmarks: 'عرض المفضلة فقط',
    
    // Tabs
    tabSnippets: 'مكتبة الأكواد',
    tabEncyclopedia: 'موسوعة اللغات والدوال',
    tabAssistant: 'المساعد الذكي',
    tabPython: 'مرجع بايثون',
    tabSecurity: 'أمن الدفاع و OWASP',
    tabTermux: 'طرفية Termux و PC',
    tabTools: 'أدوات التدقيق والتشفير',
    tabLab: 'مختبر التحديات والمحاكاة',

    // Global actions
    copy: 'نسخ الكود',
    copied: 'تم النسخ بنجاح!',
    clearSearch: 'مسح البحث',
    explainLineByLine: 'شرح تفصيلي للأسطر',
    hideLineByLine: 'إخفاء شرح الأسطر',
    whatItDoes: 'ما الذي تقوم به هذه الدالة؟',
    syntax: 'الصيغة البرمجية',
    parameters: 'المعاملات والمدخلات',
    returnValue: 'القيمة المرجعة',
    practicalExample: 'مثال تطبيقي كامل',
    securityTip: 'نصيحة أمنية دفاعية',
    commonMistake: 'خطأ شائع يجب تفاديه',

    // Footer
    footerTitle: 'منصة مرجع البرمجة والدفاع السيبراني المعتمدة',
    footerDesc: 'كافة الأكواد والأوامر المتوفرة مجهزة للحماية والدفاع وتدقيق الأنظمة وإدارة الخوادم، وتمت صياغتها وفق معايير الحماية العالمية وتطوير التطبيقات الآمنة.',
    footerBadge1: 'النسخ بنقرة واحدة مفعل ✅',
    footerBadge2: 'متوافق مع الهواتف والكمبيوتر 📱💻',
    footerBadge3: 'مختبر التحديات والمحاكاة التفاعلية 🎯',
    langSwitchBtn: 'English 🇺🇸'
  },
  en: {
    appTitle: 'Cyber Defense & Programming Codex',
    appBadge: 'Defensive Standards',
    appSubtitle: 'Multi-Language Code Library • Deep Function Docs • Secure Termux & Terminal',
    searchPlaceholder: 'Search for a function, code snippet, or vulnerability...',
    bookmarks: 'Bookmarks',
    allBookmarks: 'Show Bookmarks Only',

    // Tabs
    tabSnippets: 'Code Library',
    tabEncyclopedia: 'Languages & Functions',
    tabAssistant: 'AI Assistant',
    tabPython: 'Python Masterclass',
    tabSecurity: 'Defense & OWASP',
    tabTermux: 'Termux & Terminal',
    tabTools: 'Security & Crypto Tools',
    tabLab: 'Cyber Lab & Simulator',

    // Global actions
    copy: 'Copy Code',
    copied: 'Copied Successfully!',
    clearSearch: 'Clear',
    explainLineByLine: 'Line-by-Line Breakdown',
    hideLineByLine: 'Hide Breakdown',
    whatItDoes: 'What does this function do?',
    syntax: 'Syntax',
    parameters: 'Parameters & Inputs',
    returnValue: 'Return Value',
    practicalExample: 'Practical Working Example',
    securityTip: 'Defensive Security Tip',
    commonMistake: 'Common Pitfall to Avoid',

    // Footer
    footerTitle: 'Certified Cyber Defense & Programming Codex',
    footerDesc: 'All code snippets and commands are crafted for defensive hardening, auditing, and secure systems administration according to global OWASP benchmarks.',
    footerBadge1: 'One-Click Copy Active ✅',
    footerBadge2: 'Optimized for Mobile & PC 📱💻',
    footerBadge3: 'Interactive Lab & Simulator 🎯',
    langSwitchBtn: 'العربية 🇸🇦'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    // Check saved preference or system default
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved === 'ar' || saved === 'en') {
      setLanguageState(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['ar'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage,
      setLanguage,
      isAr: language === 'ar',
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
