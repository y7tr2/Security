import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parsing
  app.use(express.json({ limit: "10mb" }));

  // API 1: Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      hasServerKey: !!process.env.GEMINI_API_KEY
    });
  });

  // API 2: AI Programming & Security Assistant
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { message, customApiKey, languageContext } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "يرجى تقديم رسالة أو سؤال برمجي صالح." });
      }

      // Resolve API key: Server environment takes precedence, or optional user-provided key
      const apiKey = process.env.GEMINI_API_KEY || customApiKey;

      if (!apiKey) {
        // Fallback informative response if no key is configured
        return res.json({
          reply: `⚠️ لم يتم العثور على مفتاح Gemini API مهيأ في الخادم حالياً.

💡 **كيفية التفعيل الآمن:**
1. يمكنك إضافة المفتاح السري عبر لوحة **Settings > Secrets** في AI Studio تحت اسم \`GEMINI_API_KEY\`.
2. أو يمكنك إدخال المفتاح مباشرة في خانة الإعدادات المخصصة داخل نافذة المساعد.

🔍 **إجابة أولية على سؤالك:**
أنت تسأل عن: "${message.slice(0, 100)}..."
يرجى الاطلاع أيضاً على قسم **"موسوعة اللغات والدوال"** وقسم **"مكتبة الأكواد"** في التطبيق حيث ستجد مئات الشروحات والأكواد الآمنة الجاهزة!`,
          isFallback: true
        });
      }

      // Initialize GoogleGenAI SDK lazily as recommended
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
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
      return res.json({ reply: text, isFallback: false });
    } catch (error: any) {
      console.error("AI Assistant API Error:", error);
      return res.status(500).json({ 
        error: "حدث خطأ أثناء معالجة الطلب في خادم الذكاء الاصطناعي.", 
        details: error.message 
      });
    }
  });

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
