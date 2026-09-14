import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only POST is accepted." });
  }

  try {
    const { message, customApiKey, languageContext } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "يرجى تقديم رسالة أو سؤال برمجي صالح." });
    }

    const apiKey = process.env.GEMINI_API_KEY || customApiKey;

    if (!apiKey) {
      return res.status(200).json({
        reply: `⚠️ لم يتم العثور على مفتاح Gemini API مهيأ في الخادم حالياً.

💡 **كيفية التفعيل:**
1. يمكنك إضافة المفتاح السري عبر لوحة إعدادات Vercel تحت اسم \`GEMINI_API_KEY\`.
2. أو يمكنك إدخال المفتاح مباشرة في خانة الإعدادات المخصصة داخل نافذة المساعد.

🔍 **إجابة أولية:**
سؤالك عن: "${message.slice(0, 100)}..."
يرجى الاطلاع على أقسام المنصة المتوفرة (موسوعة اللغات، معجم الدوال، مختبر الثغرات) لآلاف الأمثلة الجاهزة!`,
        isFallback: true
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build-vercel',
        }
      }
    });

    const systemPrompt = `أنت "المساعد البرمجي والدفاعي السيبراني المتقدم" داخل منصة مرجع البرمجة.
مهمتك تقديم شروحات برمجية دقيقة، تفصيلية، واحترافية باللغة العربية مع مراعاة المعايير التالية:
1. اشرح المفاهيم والدوال البرمجية بالتفصيل: ما تفعله الدالة، معاملاتها (Parameters)، مخرجاتها (Return Value)، مع مثال كود واضح ومنسق.
2. التركيز على الأمان الدفاعي (Defensive Coding): وضح أي مخاطر أمنية تتعلق بالكود (مثل ثغرات OWASP، تسريب الذاكرة، حقن الأوامر، أو التلاعب بالمدخلات) وقدم الحل الآمن دائماً.
3. التنسيق: استخدم علامات Markdown البرمجية لتلوين الأكواد مع تحديد لغة البرمجة (python, javascript, bash, etc.).
4. التجاوب: كن مهذباً، موضوعياً، ومباشراً في الإجابة بدون مقدمات تسويقية متكلفة.
${languageContext ? `سياق لغة البرمجة المحددة: ${languageContext}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const text = response.text || "تم استلام الطلب ولكن لم ينتج نموذج الذكاء الاصطناعي أي نص.";
    return res.status(200).json({ reply: text, isFallback: false });
  } catch (error: any) {
    console.error("Vercel AI Assistant Error:", error);
    return res.status(500).json({
      error: "حدث خطأ أثناء معالجة الطلب في خادم الذكاء الاصطناعي.",
      details: error.message
    });
  }
}
