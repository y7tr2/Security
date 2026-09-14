import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Hardening: Disable Express signature header
  app.disable("x-powered-by");

  // 2. Security Headers Middleware (OWASP Secure Headers)
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    // Strict MIME type handling and safe caching for API
    if (req.path.startsWith("/api/")) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
    next();
  });

  // 3. Security Hardening: Strict JSON body limit (100kb max) to prevent memory-exhaustion DoS
  app.use(express.json({ limit: "100kb" }));

  // 4. In-Memory Sliding-Window Rate Limiter for API endpoints
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  
  // Cleanup expired rate limit entries every 5 minutes to prevent memory leak
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);

  const apiRateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const rawIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
    const clientIp = Array.isArray(rawIp) 
      ? rawIp[0] 
      : (typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "127.0.0.1");

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 45; // 45 requests per minute

    const current = rateLimitMap.get(clientIp);
    if (!current || now > current.resetTime) {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (current.count >= maxRequests) {
      return res.status(429).json({
        error: "عدد الطلبات تجاوز الحد المسموح به مؤقتاً، يرجى الانتظار دقيقة واحدة (Too Many Requests).",
        retryAfterSeconds: Math.ceil((current.resetTime - now) / 1000)
      });
    }

    current.count++;
    next();
  };

  // API 1: Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      hasServerKey: !!process.env.GEMINI_API_KEY
    });
  });

  // API 2: AI Programming & Security Assistant with strict validation & sanitization
  app.post("/api/ai-assistant", apiRateLimiter, async (req, res) => {
    try {
      const { message, customApiKey, languageContext, userLanguage } = req.body;

      // Input Validation & Sanitization: Ensure string type and reasonable length (max 3500 chars)
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "طلب غير صالح: يرجى تقديم استفسار نصي واضح." });
      }

      const cleanMessage = message.trim().slice(0, 3500);
      if (cleanMessage.length === 0) {
        return res.status(400).json({ error: "لا يمكن إرسال رسالة فارغة." });
      }

      // Validate customApiKey format if provided (only allow standard alphanumeric key characters)
      let validCustomKey: string | undefined = undefined;
      if (customApiKey && typeof customApiKey === "string") {
        const trimmed = customApiKey.trim();
        if (/^[A-Za-z0-9_\-]{20,80}$/.test(trimmed)) {
          validCustomKey = trimmed;
        }
      }

      // Resolve API key: Server environment takes precedence, or validated user key
      const apiKey = process.env.GEMINI_API_KEY || validCustomKey;

      if (!apiKey) {
        // Fall back gracefully to the built-in Cyber Knowledge Engine on the client
        return res.json({
          reply: "",
          isFallback: true,
          useLocalEngine: true
        });
      }

      // Initialize GoogleGenAI SDK lazily as recommended
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-cyber-codex",
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

      const text = response.text || "تم استلام الطلب ومعالجته بنجاح.";
      return res.json({ reply: text, isFallback: false });
    } catch (error: any) {
      // Safe error handling: Do not leak sensitive stack traces or environment keys
      console.error("AI Assistant API Handled Error:", error?.message || "Unknown error");
      return res.json({ 
        reply: "", 
        isFallback: true,
        useLocalEngine: true,
        error: "Handled gracefully by fallback knowledge engine"
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
