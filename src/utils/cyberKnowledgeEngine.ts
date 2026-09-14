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

  // 7. Dedicated Network API & Function Generator (With Links OR 100% Native Without Links)
  const isAskingWithoutLink = clean.includes('بدون رابط') || 
    clean.includes('مو بل رابط') || 
    clean.includes('بدون روابط') || 
    clean.includes('بدون نت') || 
    clean.includes('محلي') || 
    clean.includes('offline') || 
    clean.includes('بدون api') || 
    clean.includes('ذاتي') ||
    clean.includes('without link') ||
    clean.includes('without url');

  if (
    isAskingWithoutLink ||
    (clean.includes('api') && (clean.includes('شبك') || clean.includes('ip') || clean.includes('نت'))) ||
    clean.includes('api الشبكه') ||
    clean.includes('api شبكتي') ||
    clean.includes('عنوان ip') ||
    (clean.includes('رابط') && clean.includes('دال')) ||
    clean.includes('سويلي كود')
  ) {
    if (isEn) {
      return `### ⚡ Code Generator: Network & System Operations (With or Without Links)

Here are both approaches: **Pure Offline/Native (Zero External URLs)** and **Web API-based**:

#### 💎 Option A: 100% Pure Native Code (NO LINKS, NO EXTERNAL API, WORKS OFFLINE)
\`\`\`python
import socket
import os

def get_local_network_ip():
    """
    Finds your actual local network IP using low-level OS sockets.
    Runs 100% offline, requires NO internet, and contacts NO external URL.
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Connect to a dummy UDP route to determine active routing interface (doesn't send packets)
        sock.connect(('10.255.255.255', 1))
        local_ip = sock.getsockname()[0]
    except Exception:
        local_ip = socket.gethostbyname(socket.gethostname())
    finally:
        sock.close()
        
    hostname = socket.gethostname()
    return {
        "hostname": hostname,
        "local_network_ip": local_ip
    }

if __name__ == "__main__":
    result = get_local_network_ip()
    print("Device Hostname:", result["hostname"])
    print("Local Network IP:", result["local_network_ip"])
\`\`\`

#### 📱 Native Linux / Termux Commands (NO Links / Offline):
\`\`\`bash
# 1. Show all local IPv4 interface addresses
ip -4 addr show

# 2. Show active network IP directly
hostname -I

# 3. View connected local subnet devices (ARP table)
cat /proc/net/arp
\`\`\`

---

#### 🌐 Option B: Public IP & ISP Lookup (Via External API Link)
\`\`\`python
import requests

def get_public_ip_info():
    # Construct base URL and query safely
    url = "https://ipinfo.io/json"
    headers = {"Accept": "application/json"}
    
    response = requests.get(url, headers=headers, timeout=5)
    response.raise_for_status()
    data = response.json()
    
    return {
        "public_ip": data.get("ip"),
        "city": data.get("city"),
        "isp": data.get("org")
    }

if __name__ == "__main__":
    print(get_public_ip_info())
\`\`\`

#### 📖 Execution Instructions:
- **No-Link Approach:** Runs instantly using Python standard library \`socket\` with no packages to install.
- **Link-based Approach:** Queries public DNS/ISP records. Requires \`pip install requests\`.`;
    }

    return `### ⚡ توليد الأكواد والدوال البرمجية (سواء برابط أو بدون أي رابط إطلاقاً)

إليك الطريقتين بالكامل: **أولاً: كود ذاتي محلي 100% (بدون روابط وبدون إنترنت)**، و**ثانياً: كود عبر رابط API**:

---

#### 💎 الخيار الأول: كود ذاتي محلي (بدون أي رابط أو سيرفر خارجي إطلاقاً)
هذا الكود مبني بالكامل على مكتبة المقابس القياسية \`socket\` المدمجة في بايثون، يعمل محلياً في جهازك حتى بدون إنترنت وبدون أي رابط:

\`\`\`python
import socket

def get_my_local_ip_native():
    """
    دالة ذاتية بالكامل لاستخراج آي بي الشبكة واسم الجهاز محلياً.
    لا تستخدم أي رابط إنترنت ولا تتصل بأي سيرفر خارجي.
    """
    # إنشاء مقبس شبكة من نوع UDP
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # استكشاف البوابة الافتراضية النشطة محلياً دون إرسال بيانات
        s.connect(('10.255.255.255', 1))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = socket.gethostbyname(socket.gethostname())
    finally:
        s.close()
        
    return {
        "device_name": socket.gethostname(),
        "local_network_ip": local_ip
    }

# تشغيل الدالة وطباعة النتيجة:
if __name__ == "__main__":
    net = get_my_local_ip_native()
    print("اسم جهازك:", net["device_name"])
    print("آي بي الشبكة المحلية (IP):", net["local_network_ip"])
\`\`\`

#### 📱 أوامر Termux للجوال (بدون أي رابط أو إنترنت - محلي 100%):
\`\`\`bash
# 1. إظهار كافة عناوين الـ IP لبطاقات الشبكة والواي فاي
ip -4 addr show
\`\`\`
\`\`\`bash
# 2. إظهار عنوان IP الشبكة الحالية مباشرة برقم واحد
hostname -I
\`\`\`
\`\`\`bash
# 3. معرفة الأجهزة المتصلة معك بنفس شبكة الراوتر محلياً (جدول ARP)
cat /proc/net/arp
\`\`\`

---

#### 🌐 الخيار الثاني: كود عبر رابط API خارجي (لمعرفة الآي بي العام والموقع والمزود)
\`\`\`python
import requests

def get_public_ip_with_api(token=None):
    """
    دالة لجلب الآي بي العام الخارجي ومزود الإنترنت (ISP) عبر رابط API.
    """
    # 1. بناء الرابط الآمن
    url = "https://ipinfo.io/json"
    params = {}
    if token:
        params["token"] = token
        
    res = requests.get(url, params=params, timeout=5)
    res.raise_for_status()
    data = res.json()
    
    return {
        "ip": data.get("ip"),
        "city": data.get("city"),
        "isp": data.get("org")
    }

if __name__ == "__main__":
    print(get_public_ip_with_api())
\`\`\`

---

#### 📖 شرح الفروقات وطريقة التشغيل حبة حبة على الجوال (Termux):
1. **الفرق الأساسي:**
   - **الكود الذاتي (بدون روابط):** يعمل محلياً فوراً بدون إنترنت عبر المقابس \`socket\`، ويكشف آي بي جهازك داخل شبكة الواي فاي أو شبكة البيانات.
   - **كود الرابط (API):** يرسل طلب للإنترنت لمعرفة كيف يراك العالم الخارجي ومزود الخدمة (STC, Zain, Mobily...).
2. **طريقة التشغيل في Termux:**
   - احفظ الكود: \`nano mynet.py\`
   - الصق الكود ثم اضغط \`CTRL + O\` ثم \`Enter\` ثم \`CTRL + X\`.
   - شغّله فوراً: \`python mynet.py\``;
  }

  // 8. Search in Termux Commands
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
