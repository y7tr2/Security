import { GoogleGenAI } from "@google/genai";

// Vercel serverless function with complete safety guardrails
export default async function handler(req: any, res: any) {
  // Add CORS & Security headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({ status: "ready", method: req.method });
  }

  try {
    let parsedBody = req.body;
    if (typeof parsedBody === "string") {
      try {
        parsedBody = JSON.parse(parsedBody);
      } catch {
        parsedBody = {};
      }
    }
    parsedBody = parsedBody || {};

    const rawMessage = typeof parsedBody.message === 'string' ? parsedBody.message : '';
    const cleanMessage = rawMessage.trim().slice(0, 4000);
    const customApiKey = typeof parsedBody.customApiKey === 'string' ? parsedBody.customApiKey.trim() : '';
    const languageContext = typeof parsedBody.languageContext === 'string' ? parsedBody.languageContext.slice(0, 50) : undefined;
    const userLanguage = parsedBody.userLanguage === 'en' ? 'en' : 'ar';

    if (!cleanMessage) {
      return res.status(200).json({ 
        reply: userLanguage === 'en' ? "Welcome! Please enter your code or security question to begin." : "مرحباً بك! يرجى كتابة سؤالك البرمجي أو الأمني للبدء.",
        isFallback: true 
      });
    }

    let validCustomKey: string | undefined = undefined;
    if (customApiKey && /^AIza[0-9A-Za-z-_]{35}$/.test(customApiKey)) {
      validCustomKey = customApiKey;
    }

    // Resolve API key: Server environment takes precedence, or optional user-provided key
    const apiKey = process.env.GEMINI_API_KEY || validCustomKey;

    if (!apiKey) {
      return res.status(200).json({
        reply: "",
        isFallback: true,
        useLocalEngine: true
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-cyber-codex-vercel',
        }
      }
    });

    const isEnglish = userLanguage === "en";
    const systemPrompt = isEnglish 
      ? `You are an intelligent, versatile, and comprehensive AI assistant.
You are fully capable of answering any question on ANY topic—including general knowledge, science, mathematics, literature, daily life, history, philosophy, logic, and general advice—while also possessing world-class mastery in software engineering, programming, and defensive cybersecurity.
Guidelines:
1. Universal Knowledge: Answer any inquiry clearly, accurately, and politely. Never refuse or restrict answers to programming only.
2. Programming & Security Depth: If the user asks about programming or cybersecurity, provide deep, pedagogical, production-grade guidance, parameters, return values, line-by-line breakdowns, and OWASP defensive security standards.
3. Clean Formatting: Organize your thoughts with clean Markdown (headings, bullet points, bold key terms, and language-tagged code blocks).
4. Tone: Objective, helpful, engaging, and direct.
${languageContext ? `Language/topic context: ${languageContext}` : ''}`
      : `أنت مساعد ذكاء اصطناعي شامل، ذكي، وواسع المعرفة.
لديك القدرة الكاملة على الإجابة باحترافية وتفصيل عن أي سؤال أو موضوع يطرحه المستخدم (سواء كان في العلوم، الرياضيات، الثقافة العامة، التاريخ، الحياة اليومية، الفلسفة، أو أي استفسار عام)، بالإضافة إلى امتلاكك خبرة عميقة وتخصصية في البرمجة وهندسة البرمجيات والأمن السيبراني والدفاع الرقمي.
إرشادات الإجابة:
1. شمولية الإجابة: أجب عن أي موضوع أو سؤال بحرية وبأسلوب واضح ودقيق ومفيد. لا ترفض أي موضوع مشروع ولا تقيد إجاباتك بالبرمجة فقط.
2. التميز البرمجي والأمني: إذا كان السؤال متعلقاً بالبرمجة أو التقنية، قدم شرحاً متعمقاً مع تفكيك الأسطر وتوضيح المعاملات والمخرجات وأفضل ممارسات الحماية من ثغرات OWASP.
3. التنسيق: استخدم تنسيق Markdown الأنيق (عناوين، نقاط، وتلوين الأكواد).
4. الأسلوب: علمي، مهذب، مفيد، ومباشر دون حشو زائد.
${languageContext ? `سياق اللغة أو الموضوع: ${languageContext}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: cleanMessage,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
      }
    });

    const text = response.text || (isEnglish ? "Request processed successfully." : "تم استلام الطلب ومعالجته بنجاح.");
    return res.status(200).json({ reply: text, isFallback: false });
  } catch (error: any) {
    console.error("Vercel AI Assistant Error:", error?.message || error);
    return res.status(200).json({
      reply: "",
      isFallback: true,
      useLocalEngine: true,
      errorNotice: "Handled gracefully by client fallback engine"
    });
  }
}
