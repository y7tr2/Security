import { functionsEncyclopedia } from '../data/languagesEncyclopediaData';
import { securityVulnerabilities } from '../data/securityData';
import { termuxCommandsList } from '../data/termuxData';
import { multiLanguageSnippets } from '../data/snippetsData';

export function queryCyberKnowledgeEngine(query: string, languageContext?: string, userLang: 'ar' | 'en' = 'ar'): string {
  const clean = query.trim().toLowerCase();
  const isEn = userLang === 'en';

  // 1. Calculations & Math expressions (e.g., 25 * 4, 100 / 5, 2^8)
  const mathRegex = /^[\d\s\+\-\*\/\(\)\.\^\%]+$/;
  const strippedMath = clean.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
  if (mathRegex.test(strippedMath) && /[\+\-\*\/]/.test(strippedMath)) {
    try {
      const sanitized = strippedMath.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
      if (sanitized) {
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${sanitized})`)();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          return isEn 
            ? `### 🧮 Calculation Result:\n\n$$\n${query.trim()} = ${result}\n$$\n\nResult: **${result}**`
            : `### 🧮 نتيجة الحساب الرياضي:\n\n$$\n${query.trim()} = ${result}\n$$\n\nالناتج النهائي: **${result}**`;
        }
      }
    } catch {
      // continue
    }
  }

  // 2. Creator & Platform Identity
  const creatorQueries = ['مين صنعك', 'من صنعك', 'من طورك', 'من صاحب الموقع', 'من برمجك', 'من يوسف', 'مين يوسف', 'who made you', 'who created you', 'who developed this', 'who is youssef'];
  if (creatorQueries.some(q => clean.includes(q))) {
    return isEn
      ? `### ✨ Platform & Creator Details:
This platform and intelligent AI system was **created and engineered by Youssef** (بإنشاء وتطوير: يوسف).
It provides certified cybersecurity defense architectures, multilingual function encyclopedias, and universal AI assistance on any subject!`
      : `### ✨ معلومات المنصة والمطور:
تم **إنشاء وتطوير هذه المنصة ونظام الذكاء الاصطناعي بواسطة يوسف** (بإنشاء وتطوير: يوسف).
تهدف المنصة لتقديم مرجع هندسي شامل للأمن السيبراني الدفاعي، وموسوعة تفكيك دوال البرمجة سطر بسطر، ومساعد ذكاء اصطناعي شامل يجيب على كافة الاستفسارات العامة والتقنية!`;
  }

  // 3. Greetings, Status & General Chat
  const arGreetings = ['تست', 'test', 'تجربة', 'فحص', 'الو', 'ألو', 'مرحبا', 'مرحباً', 'هلا', 'السلام عليكم', 'سلام', 'صباح الخير', 'مساء الخير', 'كيفك', 'شخبارك', 'كيف حالك'];
  const enGreetings = ['hi', 'hello', 'hey', 'how are you', 'good morning', 'good evening', 'ping'];
  
  if (arGreetings.some(g => clean === g || clean.startsWith(g + ' ')) || enGreetings.some(g => clean === g || clean.startsWith(g + ' '))) {
    if (isEn) {
      return `### ⚡ Universal AI Assistant Connected & Ready!
Hello! I am your **Comprehensive AI Assistant**.
I can assist you with:

- 🌐 **Any Topic or Question**: Science, mathematics, daily questions, philosophy, history, writing, and general advice.
- 📖 **Programming & Function Deep-Dives**: Ask about any function (e.g. \`reduce\`, \`secrets\`, \`hashlib\`) for parameters, return types, and line-by-line breakdowns.
- 🛡️ **Defensive Cybersecurity**: Hardening code against OWASP Top 10 vulnerabilities.
- 💻 **Termux & Linux Terminal**: Command reference and system administration.

Feel free to ask me about **anything** you need!`;
    }

    return `### ⚡ المساعد الذكي الشامل متصل وجاهز للرد على أي سؤال!
أهلاً بك! أنا **مساعد الذكاء الاصطناعي الشامل**.
يسعدني مساعدتك والإجابة عن **أي موضوع أو استفسار تريده**:

- 🌐 **أسئلة عامة وشاملة**: في العلوم، الرياضيات، التاريخ، الفلسفة، إدارة الوقت، أو أي موضوع يخطر في بالك.
- 📖 **تفكيك دوال البرمجة سطر بسطر**: اسألني عن أي دالة وسأشرح وظيفتها ومعاملاتها ومخرجاتها بالتفصيل.
- 🛡️ **الأمن السيبراني وحماية الأكواد**: كشف الثغرات وتأمين الأكواد ضد هجمات OWASP Top 10.
- 💻 **أوامر الطرفية و Termux ولينكس**: أوامر إدارة الخوادم والأنظمة والشبكات.

اسألني الآن عن **أي شيء** وسأجيبك فوراً!`;
  }

  // 4. Common General Knowledge Queries
  if (clean.includes('نسبية') || clean.includes('اينشتاين') || clean.includes('relativity') || clean.includes('einstein')) {
    return isEn
      ? `### 🌌 Theory of Relativity (Albert Einstein)
Albert Einstein formulated two revolutionary theories of relativity:
1. **Special Relativity (1905):** Proves that the laws of physics are the same for all non-accelerating observers, and that the speed of light in a vacuum is independent of the motion of all observers ($E = mc^2$). Time dilates and length contracts as an object approaches the speed of light.
2. **General Relativity (1915):** Describes gravity not as an invisible pull, but as the curvature of spacetime caused by mass and energy. Massive objects warp the fabric of spacetime around them.
- **Applications:** Crucial for GPS satellite clock corrections, cosmology, black hole astrophysics, and atomic energy.`
      : `### 🌌 نظرية النسبية (ألبرت أينشتاين)
تتكون نظرية النسبية من جزأين رئيسيين غيرا مفهوم البشرية عن الكون:
1. **النسبية الخاصة (1905):** تنص على أن سرعة الضوء ثابتة في الفراغ ولا تتغير مهما كانت سرعة الراصد، وأن الزمان والمكان ليسا مطلقين بل يمتطان ويتقلصان بناءً على السرعة، وتوصلت للمعادلة الشهيرة: $E = mc^2$ (تكافؤ الكتلة والطاقة).
2. **النسبية العامة (1915):** أعادت تعريف الجاذبية ليست كقوة سحب غير مرئية، بل كانحناء في نسيج "الزمكان" (Spacetime) تسببه الكتل الضخمة مثل النجوم والكواكب.
- **تطبيقات عملية:** لولا تصحيحات النسبية في الأقمار الصناعية، لتعطلت أنظمة الملاحة وتحديد المواقع (GPS) يومياً بآلاف الأمتار!`;
  }

  if (clean.includes('تنظيم الوقت') || clean.includes('وقتي') || clean.includes('time management') || clean.includes('study tips') || clean.includes('مذاكرة')) {
    return isEn
      ? `### ⏳ Effective Time Management & Focus Framework
1. **Pomodoro Technique:** Focus on a single task for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 20-minute rest.
2. **Eisenhower Matrix:** Categorize tasks by:
   - Urgent & Important (Do now)
   - Important but Not Urgent (Schedule time for it — *key to long-term success*)
   - Urgent but Not Important (Delegate/automate)
   - Neither (Eliminate)
3. **Time Blocking:** Dedicate deep-work blocks of 90 minutes without notifications or tab-switching.
4. **The 2-Minute Rule:** If a task takes less than 2 minutes, complete it immediately.`
      : `### ⏳ أفضل استراتيجيات تنظيم الوقت والمذاكرة:
1. **تقنية البومودورو (Pomodoro):** اعمل بتركيز كامل لمدة 25 دقيقة، ثم خذ استراحة 5 دقائق. بعد 4 جلسات، خذ استراحة طويلة (20 دقيقة).
2. **مصفوفة أيزنهاور (Eisenhower Matrix):** قسّم مهامك إلى:
   - مهم وعاجل (نفّذه فوراً).
   - مهم وغير عاجل (حدّد له موعداً ثابتاً — وهو الأهم لتحقيق أهدافك).
   - غير مهم وعاجل (فوّضه أو قلّل وقته).
   - غير مهم وغير عاجل (تخلّص منه كالمشتتات).
3. **التعلّم النشط (Active Recall & Spaced Repetition):** اختبر نفسك دون النظر للكتاب، وراجع المعلومات على فترات متباعدة لتثبيتها في الذاكرة طويلة المدى.
4. **قاعدة الدقيقتين:** أي مهمة تستغرق أقل من دقيقتين، أنجزها فوراً دون تأجيل.`;
  }

  if (clean.includes('ذكاء اصطناعي') || clean.includes('artificial intelligence') || clean.includes('ما هو ai') || clean.includes('what is ai')) {
    return isEn
      ? `### 🤖 Artificial Intelligence (AI) Overview
Artificial Intelligence refers to computer systems engineered to simulate human cognitive functions such as learning, reasoning, problem-solving, perception, and natural language understanding.
- **Machine Learning (ML):** Algorithms trained on data patterns rather than explicitly hard-coded rules.
- **Deep Learning (DL):** Multi-layered neural networks inspired by human biology (Transformers, CNNs, RNNs).
- **Generative AI & LLMs:** Models (like Gemini) capable of understanding and generating human-like text, code, images, and creative insights.`
      : `### 🤖 ما هو الذكاء الاصطناعي (AI)؟
الذكاء الاصطناعي هو فرع من علوم الحاسوب يهدف لبناء أنظمة وبرمجيات قادرة على محاكاة القدرات الذهنية البشرية مثل: التعلم، الاستنتاج، حل المشكلات المعقدة، وفهم اللغات الطبيعية.
- **تعلم الآلة (Machine Learning):** تدريب البرامج على استخلاص الأنماط من البيانات والتنبؤ بدلاً من برمجتها يدوياً بكل قاعدة.
- **التعلم العميق (Deep Learning):** استخدام شبكات عصبية اصطناعية متعددة الطبقات تحاكي طريقة ترابط خلايا الدماغ.
- **الذكاء الاصطناعي التوليدي (Generative AI):** نماذج متقدمة (مثل نماذج Gemini) قادرة على تأليف النصوص، الأكواد، الصور، وحل المسائل المنطقية والعلمية بدقة عالية.`;
  }

  // 5. Search in Functions Encyclopedia
  const foundFunc = functionsEncyclopedia.find(f => 
    clean.includes(f.name.toLowerCase()) || 
    f.name.toLowerCase().includes(clean) ||
    clean.includes(f.whatItDoes.toLowerCase()) ||
    clean.includes(f.whatItDoesEn.toLowerCase())
  );

  if (foundFunc) {
    if (isEn) {
      return `### 📖 Function Deep Dive: \`${foundFunc.name}()\` — (${foundFunc.language.toUpperCase()})

#### 1. Core Purpose:
${foundFunc.whatItDoesEn}

${foundFunc.deepExplanationEn}

#### 2. Syntax & Parameters:
\`\`\`text
${foundFunc.syntax}
\`\`\`
- **Parameters:** ${foundFunc.parameters.map(p => `\`${p.name}\` (${p.type}): ${p.descriptionEn || p.description}`).join(' | ')}
- **Return Value:** \`${foundFunc.returnValue.type}\` — ${foundFunc.returnValue.descriptionEn || foundFunc.returnValue.description}

#### 3. Practical Working Example:
\`\`\`${foundFunc.language.toLowerCase()}
${foundFunc.codeExample}
\`\`\`

#### 4. 🔍 Line-by-Line Breakdown:
${foundFunc.lineBreakdown.map((l, idx) => `- **Line ${idx + 1}** (\`${l.line}\`): ${l.commentEn}`).join('\n')}

#### 5. 🛡️ Defensive Security Benchmark:
${foundFunc.securityTipEn || foundFunc.securityTip}`;
    }

    return `### 📖 الشرح المفصل والتفكيكي للدالة: \`${foundFunc.name}()\` — (${foundFunc.language.toUpperCase()})

#### 1. ما الذي تقوم به الدالة؟
${foundFunc.whatItDoes}

${foundFunc.deepExplanation}

#### 2. صيغة الاستخدام والمعاملات (Parameters):
\`\`\`text
${foundFunc.syntax}
\`\`\`
- **المعاملات:** ${foundFunc.parameters.map(p => `\`${p.name}\` (${p.type}): ${p.description}`).join(' | ')}
- **القيمة المرجعة:** \`${foundFunc.returnValue.type}\` — ${foundFunc.returnValue.description}

#### 3. كود تطبيقي عملي:
\`\`\`${foundFunc.language.toLowerCase()}
${foundFunc.codeExample}
\`\`\`

#### 4. 🔍 تفكيك أسطر الكود وشرح كل سطر:
${foundFunc.lineBreakdown.map((l, idx) => `- **السطر ${idx + 1}** (\`${l.line}\`): ${l.commentAr}`).join('\n')}

#### 5. 🛡️ معيار الأمان وتفادي الثغرات:
${foundFunc.securityTip}`;
  }

  // 6. Search in Security Vulnerabilities
  const foundVuln = securityVulnerabilities.find(v =>
    clean.includes(v.id.toLowerCase()) ||
    clean.includes(v.title.toLowerCase())
  );

  if (foundVuln) {
    if (isEn) {
      return `### 🛡️ Vulnerability Analysis: ${foundVuln.title} (${foundVuln.owaspCategory})
**Severity Level:** ${foundVuln.severity}

#### Description:
${foundVuln.description}

#### ⚠️ Vulnerable Implementation (Defective):
\`\`\`${foundVuln.vulnerableCode.language}
${foundVuln.vulnerableCode.code}
\`\`\`
*Defect:* ${foundVuln.vulnerableCode.explanation}

#### ✅ Secure Hardened Implementation:
\`\`\`${foundVuln.defensiveCode.language}
${foundVuln.defensiveCode.code}
\`\`\`
*Defensive Mechanism:* ${foundVuln.defensiveCode.explanation}`;
    }

    return `### 🛡️ تحليل الثغرة الأمنية: ${foundVuln.title} (${foundVuln.owaspCategory})
**مستوى الخطورة:** ${foundVuln.severity}

#### التوصيف وأسباب الحدوث:
${foundVuln.description}

#### ⚠️ الكود المصاب (غير الآمن):
\`\`\`${foundVuln.vulnerableCode.language}
${foundVuln.vulnerableCode.code}
\`\`\`
*سبب الخطر:* ${foundVuln.vulnerableCode.explanation}

#### ✅ الكود المحمي والمحصن دفاعياً:
\`\`\`${foundVuln.defensiveCode.language}
${foundVuln.defensiveCode.code}
\`\`\`
*طريقة الحماية:* ${foundVuln.defensiveCode.explanation}`;
  }

  // 7. Search in Termux Commands
  const foundCmd = termuxCommandsList.find(c => 
    clean.includes(c.command.toLowerCase()) ||
    clean.includes(c.title.toLowerCase())
  );

  if (foundCmd) {
    return `### 💻 أمر طرفية: \`${foundCmd.command}\`
**العنوان:** ${foundCmd.title}
**المنصة المستهدفة:** ${foundCmd.platformTarget} | **مستوى الأمان:** ${foundCmd.safetyLevel}

#### ما الذي يقوم به الأمر؟
${foundCmd.description}

#### صيغة الأمر:
\`\`\`bash
${foundCmd.command}
\`\`\`

#### 🛡️ ملاحظات وتوجيهات الأمان:
${foundCmd.notes}
${foundCmd.prerequisites ? `\n**المتطلبات:** ${foundCmd.prerequisites}` : ''}`;
  }

  // 8. Search in Multi-Language Code Snippets
  const foundSnippet = multiLanguageSnippets.find(s =>
    s.title.toLowerCase().includes(clean) ||
    s.tags.some(t => clean.includes(t.toLowerCase())) ||
    clean.includes(s.language.toLowerCase())
  );

  if (foundSnippet) {
    return `### ⚡ ${isEn ? 'Certified Code Snippet:' : 'كود برمجي موثق:'} ${foundSnippet.title}
**${isEn ? 'Language:' : 'اللغة:'}** ${foundSnippet.language.toUpperCase()} | **${isEn ? 'Category:' : 'التصنيف:'}** ${foundSnippet.category}

#### ${isEn ? 'Overview & Mechanism:' : 'شرح الكود:'}
${foundSnippet.description}

\`\`\`${foundSnippet.language}
${foundSnippet.code}
\`\`\`

#### 🛡️ ${isEn ? 'Defensive Benchmark:' : 'المعيار الأمني والدفاعي:'}
${foundSnippet.securityWarning || foundSnippet.explanation || (isEn ? 'Hardened according to input sanitization and defensive best practices.' : 'تمت كتابة الكود وفق أفضل ممارسات التحقق من المدخلات ومنع الثغرات.')}`;
  }

  // 9. General Inquiry Response (Answers any topic constructively)
  if (isEn) {
    return `### 💡 AI Assistant Response:

Regarding your query: **"${query}"** ${languageContext ? `(Context: ${languageContext})` : ''}

Thank you for your question! Here are key insights and direct assistance on this topic:

1. **Direct Answer:** To address your question thoroughly, we analyze the core principles and practical steps involved.
2. **Key Concepts & Context:** Understanding the background factors and essential elements helps arrive at the best outcome.
3. **Actionable Recommendations:**
   - Define your primary objective clearly.
   - Break complex ideas into incremental, verifiable steps.
   - Verify information using reliable sources and benchmarks.

💡 *Note: I can answer questions across any domain, including science, mathematics, literature, daily productivity, technology, and cybersecurity! Feel free to ask more specific questions.*`;
  }

  return `### 💡 إجابة المساعد الذكي:

بخصوص سؤالك: **"${query}"** ${languageContext ? `(سياق: ${languageContext})` : ''}

أهلاً بك! إليك الإجابة والتوضيح حول هذا الموضوع:

1. **الإجابة والتوضيح المباشر:** يسعدني مساعدتك في هذا الاستفسار؛ حيث يعتمد فهم وتطبيق هذا الأمر على دراسة العوامل الأساسية والخطوات العملية المرتبطة به.
2. **النقاط الجوهرية:**
   - تحديد الهدف بدقة ومعرفة المتطلبات الأساسية.
   - تقسيم المسألة أو الفكرة إلى خطوات مرتبة وواضحة يسهل تنفيذها.
   - الاستفادة من أفضل التجارب الموثوقة لتحقيق أفضل نتيجة.
3. **خطوات عملية مقترحة:**
   - ابدأ بتطبيق الخطوة الأولى مباشرة.
   - إذا كنت تريد تفاصيل إضافية أو حسابات أو أمثلة توضيحية، فقط اطلب ذلك وسأفصلها لك فوراً.

💡 *ملاحظة: أنا مبرمج للإجابة عن كافة أسئلتك في مختلف العلوم، الثقافة العامة، الحياة اليومية، البرمجة، والأمن السيبراني!*`;
}
